import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { Question } from '../../data/questions';
import { CheckCircle2, XCircle, Lightbulb, AlertTriangle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  showResult?: boolean;
  userAnswer?: number | null;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
  showResult = false,
  userAnswer,
}: QuestionCardProps) {
  return (
    <Card variant="elevated" padding="lg" className="animate-fadeIn">
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
            {questionNumber}
          </div>
          <div className="flex-1">
            {question.isCritical && (
              <Badge variant="danger" size="sm" className="mb-2">
                <AlertTriangle className="w-3 h-3 inline mr-1" />
                Câu điểm liệt
              </Badge>
            )}
          </div>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 leading-relaxed mb-4">
          {question.question}
        </h2>
        
        {/* Question Image */}
        {question.image && (
          <div className="mb-4 rounded-xl overflow-hidden border-2 border-slate-200">
            <img 
              src={question.image} 
              alt="Hình minh họa câu hỏi"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correctAnswer;
          const isUserAnswer = showResult && userAnswer === idx;
          
          let optionStyles = 'bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50';
          
          if (showResult) {
            if (isCorrect) {
              optionStyles = 'bg-green-50 border-2 border-green-500';
            } else if (isUserAnswer && !isCorrect) {
              optionStyles = 'bg-red-50 border-2 border-red-500';
            } else {
              optionStyles = 'bg-slate-50 border-2 border-slate-200';
            }
          } else if (isSelected) {
            optionStyles = 'bg-blue-50 border-2 border-blue-500 shadow-md shadow-blue-500/20';
          }
          
          return (
            <button
              key={idx}
              onClick={() => !showResult && onSelectAnswer(idx)}
              disabled={showResult}
              className={`
                w-full text-left p-4 rounded-xl transition-all duration-200
                ${optionStyles}
                ${!showResult ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]' : 'cursor-default'}
                group
              `}
            >
              <div className="flex items-center gap-3">
                {/* Option Letter */}
                <div className={`
                  flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                  transition-all duration-200
                  ${showResult && isCorrect 
                    ? 'bg-green-500 text-white' 
                    : showResult && isUserAnswer && !isCorrect
                    ? 'bg-red-500 text-white'
                    : isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                  }
                `}>
                  {String.fromCharCode(65 + idx)}
                </div>
                
                {/* Option Text */}
                <span className="flex-1 text-slate-800 font-medium">
                  {option}
                </span>
                
                {/* Result Indicators */}
                {showResult && isCorrect && (
                  <span className="flex-shrink-0 text-green-600 font-semibold text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Đúng
                  </span>
                )}
                {showResult && isUserAnswer && !isCorrect && (
                  <span className="flex-shrink-0 text-red-600 font-semibold text-sm flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    Sai
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation (only in result view) */}
      {showResult && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl animate-fadeIn">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Giải thích:</p>
              <p className="text-sm text-blue-800">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
