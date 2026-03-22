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
        <div className="grid grid-cols-9 sm:grid-cols-6 lg:grid-cols-5 gap-1.5">
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
                  relative aspect-square rounded-md font-semibold text-[10px] transition-all duration-200
                  ${isCurrent 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/40 scale-105 ring-2 ring-blue-300' 
                    : isAnswered
                    ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:scale-105'
                    : isViewed
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105'
                  }
                  ${isCritical && !isCurrent ? 'ring-1 ring-red-400' : ''}
                `}
              >
                {idx + 1}
                {isCritical && !isCurrent && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        variant="success" 
        size="md"
        fullWidth
        onClick={onFinish}
        className="font-bold md:text-base"
      >
        <FileCheck className="w-4 h-4 md:w-5 md:h-5 mr-2" />
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
