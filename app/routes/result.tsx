import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import type { Route } from "./+types/result";
import type { Question } from "../data/questions";
import { ResultHeader } from "../components/result/ResultHeader";
import { ResultActions } from "../components/result/ResultActions";
import { QuestionCard } from "../components/exam/QuestionCard";
import { Card } from "../components/ui/Card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kết Quả Thi - Bằng Lái Xe" },
  ];
}

interface ResultState {
  licenseType: string;
  questions: Question[];
  answers: (number | null)[];
  correctCount: number;
  criticalErrors: number;
  passed: boolean;
  totalQuestions: number;
  passingScore: number;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState;

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { licenseType, questions, answers, correctCount, criticalErrors, passed, totalQuestions, passingScore } = state;

  // Calculate statistics
  const wrongAnswers = questions.filter((q, idx) => answers[idx] !== null && answers[idx] !== q.correctAnswer);
  const unanswered = questions.filter((_, idx) => answers[idx] === null);
  const criticalWrong = wrongAnswers.filter(q => q.isCritical);

  return (
    <div className="min-h-screen py-5 md:py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Result Header */}
        <div className="mb-8 animate-fadeIn">
          <ResultHeader
            passed={passed}
            correctCount={correctCount}
            totalQuestions={totalQuestions}
            criticalErrors={criticalErrors}
            passingScore={passingScore}
            licenseType={licenseType}
          />
        </div>

        {/* Action Buttons */}
        <div className="mb-12 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <ResultActions licenseType={licenseType} />
        </div>

        {/* Statistics Summary */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <Card variant="elevated" padding="lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">📊 Thống kê chi tiết</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="text-4xl font-bold text-green-700 mb-2">{correctCount}</div>
                <div className="text-sm text-green-600 font-medium">Câu trả lời đúng</div>
              </div>
              
              <div className="text-center p-6 bg-red-50 rounded-xl border-2 border-red-200">
                <div className="text-4xl font-bold text-red-700 mb-2">{wrongAnswers.length}</div>
                <div className="text-sm text-red-600 font-medium">Câu trả lời sai</div>
                {criticalWrong.length > 0 && (
                  <div className="text-xs text-red-500 mt-1">
                    (Trong đó {criticalWrong.length} câu điểm liệt)
                  </div>
                )}
              </div>
              
              <div className="text-center p-6 bg-slate-50 rounded-xl border-2 border-slate-200">
                <div className="text-4xl font-bold text-slate-700 mb-2">{unanswered.length}</div>
                <div className="text-sm text-slate-600 font-medium">Câu chưa trả lời</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <Card variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">📝 Chi tiết đáp án</h2>
              
              {/* Filter buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const element = document.querySelector('.wrong-answer');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                >
                  Xem câu sai
                </button>
                <button 
                  onClick={() => {
                    const element = document.querySelector('.critical-question');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-200 transition-colors"
                >
                  Xem điểm liệt
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {questions.map((question, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === question.correctAnswer;
                const isWrong = userAnswer !== null && !isCorrect;
                
                return (
                  <div
                    key={question.id}
                    className={`
                      ${isWrong ? 'wrong-answer' : ''}
                      ${question.isCritical ? 'critical-question' : ''}
                    `}
                  >
                    <QuestionCard
                      question={question}
                      questionNumber={idx + 1}
                      selectedAnswer={userAnswer}
                      onSelectAnswer={() => {}}
                      showResult={true}
                      userAnswer={userAnswer}
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <ResultActions licenseType={licenseType} />
        </div>

        {/* Motivational Message */}
        <div className="mt-8 text-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <Card variant="bordered" padding="lg" className="bg-gradient-to-br from-blue-50 to-purple-50">
            <p className="text-lg text-slate-700">
              {passed 
                ? '🎉 Xuất sắc! Bạn đã sẵn sàng cho kỳ thi thật. Chúc bạn may mắn!' 
                : '💪 Đừng nản chí! Hãy xem lại các câu sai và thử lại. Bạn sẽ làm được!'}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
