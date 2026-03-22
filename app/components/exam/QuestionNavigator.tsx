import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import type { Question } from '../../data/questions';
import { FileCheck, AlertTriangle } from 'lucide-react';

interface QuestionNavigatorProps {
  questions: Question[];
  currentQuestion: number;
  answers: (number | null)[];
  viewedQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
  onFinish: () => void;
}

export function QuestionNavigator({
  questions,
  currentQuestion,
  answers,
  viewedQuestions,
  onQuestionSelect,
  onFinish,
}: QuestionNavigatorProps) {
  const answeredCount = answers.filter(a => a !== null).length;
  const progress = (answeredCount / questions.length) * 100;
  
  return (
    <Card variant="elevated" padding="lg" className="sticky top-6">
      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-900">Tiến độ</h3>
          <span className="text-sm font-semibold text-slate-600">
            {answeredCount}/{questions.length}
          </span>
        </div>
        <Progress 
          value={answeredCount} 
          max={questions.length} 
          variant={progress === 100 ? 'success' : 'default'}
        />
      </div>

      {/* Question Grid */}
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 mb-3">Danh sách câu hỏi</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const isAnswered = answers[idx] !== null;
            const isCurrent = currentQuestion === idx;
            const isCritical = q.isCritical;
            const isViewed = viewedQuestions.has(idx);
            
            return (
              <button
                key={idx}
                onClick={() => onQuestionSelect(idx)}
                className={`
                  relative aspect-square rounded-lg font-bold text-sm transition-all duration-200
                  ${isCurrent 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110 ring-2 ring-blue-300' 
                    : isAnswered
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:scale-105'
                    : isViewed
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105'
                  }
                  ${isCritical && !isCurrent ? 'ring-2 ring-red-300' : ''}
                `}
              >
                {idx + 1}
                {isCritical && !isCurrent && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 mb-6 p-4 bg-slate-50 rounded-xl">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 bg-green-100 rounded-lg"></div>
          <span className="text-slate-600">Đã trả lời</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 bg-amber-100 rounded-lg"></div>
          <span className="text-slate-600">Đã xem</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 bg-slate-100 rounded-lg"></div>
          <span className="text-slate-600">Chưa xem</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="relative w-6 h-6 bg-white border-2 border-red-300 rounded-lg">
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <span className="text-slate-600">Câu điểm liệt</span>
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        variant="success" 
        size="lg" 
        fullWidth
        onClick={onFinish}
        className="font-bold"
      >
        <FileCheck className="w-5 h-5 mr-2" />
        Nộp bài
      </Button>
      
      {answeredCount < questions.length && (
        <p className="text-xs text-center text-slate-500 mt-3">
          Còn {questions.length - answeredCount} câu chưa trả lời
        </p>
      )}
    </Card>
  );
}
