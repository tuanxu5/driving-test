import { Card } from '../ui/Card';
import { Clock, AlertCircle, Home } from 'lucide-react';
import { Link } from 'react-router';

interface ExamHeaderProps {
  licenseType: string;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  timeLeft: number;
  examSet?: string;
  onExitClick?: () => void;
}

export function ExamHeader({
  licenseType,
  currentQuestion,
  totalQuestions,
  answeredCount,
  timeLeft,
  examSet,
  onExitClick,
}: ExamHeaderProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 60;
  const isCriticalTime = timeLeft < 30;
  
  return (
    <Card variant="elevated" padding="lg" className="mb-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitClick}
            className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            title="Về trang chủ"
          >
            <Home className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div>
            <h1 className="text-base md:text-2xl font-bold text-slate-900 mb-0.5 md:mb-1">
              {examSet && examSet !== 'random' ? `Đề số ${examSet}` : 'Đề ngẫu nhiên'} - Hạng {licenseType}
            </h1>
            <p className="text-xs md:text-base text-slate-600">
              Câu <span className="font-semibold text-blue-600">{currentQuestion + 1}</span> / {totalQuestions}
            </p>
          </div>
        </div>

        {/* Right Section - Timer */}
        <div className={`
          flex items-center gap-1 px-2 py-1 rounded-md border transition-all duration-300
          ${isCriticalTime 
            ? 'bg-red-50 border-red-500 animate-pulse' 
            : isLowTime 
            ? 'bg-amber-50 border-amber-400' 
            : 'bg-green-50 border-green-200'
          }
        `}>
          <Clock className={`
            w-3.5 h-3.5 flex-shrink-0
            ${isCriticalTime ? 'text-red-600' : isLowTime ? 'text-amber-600' : 'text-green-600'}
          `} />
          <span className={`
            text-sm md:text-base font-bold tabular-nums
            ${isCriticalTime ? 'text-red-700' : isLowTime ? 'text-amber-700' : 'text-green-700'}
          `}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Warning for low time */}
      {isLowTime && !isCriticalTime && (
        <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <p className="text-sm text-amber-800 font-medium">
              Thời gian sắp hết! Hãy kiểm tra lại các câu trả lời.
            </p>
          </div>
        </div>
      )}
      
      {isCriticalTime && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-800 font-bold">
              Chỉ còn dưới 30 giây! Nộp bài ngay!
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
