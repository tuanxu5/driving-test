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
      <div className="mb-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-900">
            Câu {questionNumber}:
          </h3>
          {question.isCritical && (
            <Badge variant="danger" size="sm">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              Điểm liệt
            </Badge>
          )}
        </div>
        
        <p className="text-sm md:text-base text-red-600 font-semibold leading-relaxed mb-2">
          {question.question}
        </p>
        
        {/* Question Image */}
        {question.image && (
          <div className="mb-4 rounded-lg overflow-hidden border border-slate-200">
            <img 
              src={question.image} 
              alt="Hình minh họa câu hỏi"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Answer Options - Display only as text */}
      <div className="space-y-2">
        {question.options.map((option, idx) => {
          const isCorrect = idx === question.correctAnswer;
          const isUserAnswer = showResult && userAnswer === idx;
          
          return (
            <div
              key={idx}
              className="flex items-start gap-2"
            >
              <span className="font-semibold text-slate-700 flex-shrink-0 text-sm md:text-base">
                {idx + 1}.
              </span>
              <span className={`flex-1 text-sm md:text-base ${
                showResult && isCorrect 
                  ? 'text-green-600 font-semibold' 
                  : showResult && isUserAnswer && !isCorrect
                  ? 'text-red-600 font-semibold'
                  : 'text-slate-800'
              }`}>
                {option}
              </span>
              
              {/* Result Indicators */}
              {showResult && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              )}
              {showResult && isUserAnswer && !isCorrect && (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation (only in result view) */}
      {showResult && question.explanation && (
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg animate-fadeIn">
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
