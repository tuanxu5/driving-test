import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, AlertCircle } from 'lucide-react';

interface ExamHeaderProps {
  licenseType: string;
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  timeLeft: number;
}

export function ExamHeader({
  licenseType,
  currentQuestion,
  totalQuestions,
  answeredCount,
  timeLeft,
}: ExamHeaderProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 60;
  const isCriticalTime = timeLeft < 30;
  
  return (
    <Card variant="elevated" padding="lg" className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Đề Thi Bằng {licenseType}
          </h1>
          <p className="text-slate-600">
            Câu <span className="font-semibold text-blue-600">{currentQuestion + 1}</span> / {totalQuestions}
          </p>
        </div>

        {/* Right Section - Stats */}
        <div className="flex gap-4">
          {/* Answered Count */}
          <div className="flex flex-col items-center px-6 py-3 bg-blue-50 rounded-xl border-2 border-blue-200">
            <span className="text-sm text-blue-600 font-medium mb-1">Đã làm</span>
            <span className="text-2xl font-bold text-blue-700">
              {answeredCount}<span className="text-lg text-blue-500">/{totalQuestions}</span>
            </span>
          </div>

          {/* Timer */}
          <div className={`
            flex flex-col items-center px-6 py-3 rounded-xl border-2 transition-all duration-300
            ${isCriticalTime 
              ? 'bg-red-50 border-red-500 animate-pulse' 
              : isLowTime 
              ? 'bg-amber-50 border-amber-400' 
              : 'bg-green-50 border-green-200'
            }
          `}>
            <span className={`
              text-sm font-medium mb-1
              ${isCriticalTime ? 'text-red-600' : isLowTime ? 'text-amber-600' : 'text-green-600'}
            `}>
              Thời gian
            </span>
            <span className={`
              text-2xl font-bold tabular-nums
              ${isCriticalTime ? 'text-red-700' : isLowTime ? 'text-amber-700' : 'text-green-700'}
            `}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
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
