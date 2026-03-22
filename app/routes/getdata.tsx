import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function meta() {
  return [{ title: "Import Câu Hỏi - Admin" }];
}

interface Question {
  id: number;
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  isCritical: boolean;
}

interface ExamInput {
  examNumber: number;
  html: string;
}

// Parse HTML to extract questions (client-side)
function parseHTML(html: string, licenseType: string, examNumber: number): Question[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const questions: Question[] = [];
  
  const questionItems = doc.querySelectorAll('.list-question-item');
  
  questionItems.forEach((item) => {
    const questionId = item.id.replace('question-', '');
    
    const questionTextElem = item.querySelector('.question-name p');
    if (!questionTextElem) return;
    
    const questionText = questionTextElem.textContent?.trim() || '';
    
    const imgElem = item.querySelector('.question-name img');
    const imageUrl = imgElem?.getAttribute('src') || undefined;
    
    const correctAnswerInput = item.querySelector(`input#answer-correct-${questionId}`) as HTMLInputElement;
    const correctAnswerValue = correctAnswerInput?.value || null;
    
    const options: string[] = [];
    let correctIndex = 0;
    
    const optionItems = item.querySelectorAll('.option-item');
    optionItems.forEach((optionDiv) => {
      if (optionDiv.tagName === 'INPUT') return;
      
      const label = optionDiv.querySelector('label');
      if (!label) return;
      
      const optionText = label.textContent?.trim() || '';
      options.push(optionText);
      
      const optionInput = label.querySelector('input[type="radio"]') as HTMLInputElement;
      if (optionInput?.value === correctAnswerValue) {
        correctIndex = options.length - 1;
      }
      
      if (optionDiv.classList.contains('correct-option')) {
        correctIndex = options.length - 1;
      }
    });
    
    if (questionText && options.length > 0) {
      questions.push({
        id: parseInt(questionId),
        question: questionText,
        image: imageUrl,
        options,
        correctAnswer: correctIndex,
        isCritical: false,
      });
    }
  });
  
  return questions;
}

export default function GetData() {
  const [licenseType, setLicenseType] = useState('');
  const [examInputs, setExamInputs] = useState<ExamInput[]>([{ examNumber: 1, html: '' }]);
  const [status, setStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const addExamInput = () => {
    const nextExamNumber = Math.max(...examInputs.map(e => e.examNumber)) + 1;
    if (nextExamNumber <= 20) {
      setExamInputs([...examInputs, { examNumber: nextExamNumber, html: '' }]);
    }
  };

  const removeExamInput = (index: number) => {
    if (examInputs.length > 1) {
      setExamInputs(examInputs.filter((_, i) => i !== index));
    }
  };

  const updateExamInput = (index: number, field: keyof ExamInput, value: string | number) => {
    const updated = [...examInputs];
    updated[index] = { ...updated[index], [field]: value };
    setExamInputs(updated);
  };

  const handleSubmit = async () => {
    if (!licenseType) {
      setStatus('❌ Vui lòng chọn hạng bằng lái');
      return;
    }

    const validInputs = examInputs.filter(input => input.html.trim());
    if (validInputs.length === 0) {
      setStatus('❌ Vui lòng nhập ít nhất một HTML');
      return;
    }

    setIsProcessing(true);
    setStatus('⏳ Đang xử lý...');

    try {
      const fileName = `dethi${licenseType.toLowerCase()}.json`;
      const questionBank: Record<string, Question[]> = {};
      
      let totalNewQuestions = 0;
      const results: string[] = [];
      
      for (const input of validInputs) {
        const newQuestions = parseHTML(input.html, licenseType, input.examNumber);
        
        if (newQuestions.length === 0) {
          results.push(`❌ Đề ${input.examNumber}: Không parse được câu hỏi`);
          continue;
        }
        
        const examKey = `de${input.examNumber}`;
        questionBank[examKey] = newQuestions;
        totalNewQuestions += newQuestions.length;
        results.push(`✅ Đề ${input.examNumber}: ${newQuestions.length} câu`);
      }
      
      if (Object.keys(questionBank).length === 0) {
        setStatus('❌ Không parse được câu hỏi nào');
        setIsProcessing(false);
        return;
      }
      
      // Download as JSON file
      const blob = new Blob([JSON.stringify(questionBank, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      
      const totalExams = Object.keys(questionBank).length;
      const totalQuestions = Object.values(questionBank).reduce((sum, questions) => sum + questions.length, 0);
      
      setStatus(`✅ Thành công! File ${fileName} đã được tạo và tải xuống.\n\n${results.join('\n')}\n\n📊 Tổng: ${totalExams} đề, ${totalQuestions} câu`);
      
      // Clear inputs
      setExamInputs([{ examNumber: 1, html: '' }]);
      
    } catch (error) {
      setStatus(`❌ Lỗi: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Card variant="elevated" padding="lg">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            📥 Import Câu Hỏi Thi Bằng Lái
          </h1>

          <div className="space-y-6">
            {/* License Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Hạng bằng lái
              </label>
              <select
                value={licenseType}
                onChange={(e) => setLicenseType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                <option value="">-- Chọn hạng bằng lái --</option>
                <option value="A1">Đề thi hạng A1</option>
                <option value="A">Đề thi hạng A</option>
                <option value="B1">Đề thi hạng B1</option>
                <option value="B">Đề thi hạng B</option>
                <option value="C">Đề thi hạng C</option>
                <option value="C1">Đề thi hạng C1</option>
                <option value="D">Đề thi hạng D</option>
                <option value="D1">Đề thi hạng D1</option>
                <option value="D2">Đề thi hạng D2</option>
                <option value="BE">Đề thi hạng BE</option>
                <option value="C1E">Đề thi hạng C1E</option>
                <option value="CE">Đề thi hạng CE</option>
                <option value="D1E">Đề thi hạng D1E</option>
                <option value="D2E">Đề thi hạng D2E</option>
                <option value="DE">Đề thi hạng DE</option>
              </select>
            </div>

            {/* Exam Inputs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">
                  Câu hỏi theo đề
                </label>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addExamInput}
                  disabled={examInputs.length >= 20}
                >
                  ➕ Thêm đề
                </Button>
              </div>

              {examInputs.map((input, index) => (
                <Card key={index} variant="bordered" padding="md" className="bg-white">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-24">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Đề số
                      </label>
                      <select
                        value={input.examNumber}
                        onChange={(e) => updateExamInput(index, 'examNumber', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                      >
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        HTML câu hỏi
                      </label>
                      <textarea
                        value={input.html}
                        onChange={(e) => updateExamInput(index, 'html', e.target.value)}
                        placeholder='Paste HTML: <div class="list-question">...</div>'
                        className="w-full h-32 px-3 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none font-mono text-xs"
                      />
                    </div>

                    {examInputs.length > 1 && (
                      <button
                        onClick={() => removeExamInput(index)}
                        className="flex-shrink-0 mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa đề này"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Submit Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? '⏳ Đang xử lý...' : '🚀 Tạo File JSON'}
            </Button>

            {/* Status */}
            {status && (
              <div className={`p-4 rounded-xl ${
                status.startsWith('✅') 
                  ? 'bg-green-50 border-2 border-green-200 text-green-800' 
                  : status.startsWith('❌')
                  ? 'bg-red-50 border-2 border-red-200 text-red-800'
                  : 'bg-blue-50 border-2 border-blue-200 text-blue-800'
              }`}>
                <pre className="font-semibold whitespace-pre-wrap text-sm">{status}</pre>
              </div>
            )}

            {/* Instructions */}
            <Card variant="bordered" padding="md" className="bg-slate-50">
              <h3 className="font-bold text-slate-900 mb-3">📋 Hướng dẫn:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
                <li>Chọn hạng bằng lái (A1, B1, C, ...)</li>
                <li>Bấm "➕ Thêm đề" để thêm nhiều đề cùng lúc</li>
                <li>Mỗi đề có một ô textarea riêng</li>
                <li>Mở website thi thử → Bấm F12 → Tab Elements</li>
                <li>Tìm thẻ <code className="bg-slate-200 px-1 rounded">&lt;div class="list-question"&gt;</code></li>
                <li>Click chuột phải → Copy → Copy element</li>
                <li>Paste vào ô textarea tương ứng</li>
                <li>Bấm "Tạo File JSON" → File tự động tải xuống</li>
                <li>Copy file vào <code className="bg-slate-200 px-1 rounded">app/data/</code></li>
              </ol>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-1">💡 Mẹo:</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Có thể thêm tối đa 20 đề cùng lúc</li>
                  <li>• Mỗi đề paste HTML riêng biệt</li>
                  <li>• File tải về: <code className="bg-blue-100 px-1 rounded">dethia1.json</code>, <code className="bg-blue-100 px-1 rounded">dethib1.json</code>, ...</li>
                  <li>• Chỉ các đề có HTML mới được xử lý</li>
                </ul>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
