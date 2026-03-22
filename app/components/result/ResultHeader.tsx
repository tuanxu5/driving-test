import { Card } from '../ui/Card';
import { PartyPopper, Frown } from 'lucide-react';

interface ResultHeaderProps {
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
  criticalErrors: number;
  passingScore: number;
  licenseType: string;
}

export function ResultHeader({
  passed,
  correctCount,
  totalQuestions,
  criticalErrors,
  passingScore,
  licenseType,
}: ResultHeaderProps) {
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  
  return (
    <Card 
      variant="elevated" 
      padding="md"
      className={`
        relative overflow-hidden
        ${passed 
          ? 'bg-gradient-to-br from-green-500 to-green-600' 
          : 'bg-gradient-to-br from-red-500 to-red-600'
        }
      `}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full -mr-24 md:-mr-32 -mt-24 md:-mt-32"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full -ml-16 md:-ml-24 -mb-16 md:-mb-24"></div>
      
      <div className="relative text-white text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full mb-3 md:mb-4 animate-bounce">
          {passed ? (
            <PartyPopper className="w-8 h-8 md:w-12 md:h-12" />
          ) : (
            <Frown className="w-8 h-8 md:w-12 md:h-12" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
          {passed ? 'Chúc mừng! Bạn đã đạt' : 'Rất tiếc! Bạn chưa đạt'}
        </h1>
        <p className="text-base md:text-xl lg:text-2xl mb-4 md:mb-8 text-white/90">
          Kỳ thi bằng {licenseType}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-3xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-2xl p-3 md:p-6 border border-white/30">
            <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{correctCount}/{totalQuestions}</div>
            <div className="text-xs md:text-sm text-white/90">Câu đúng</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-2xl p-3 md:p-6 border border-white/30">
            <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{percentage}%</div>
            <div className="text-xs md:text-sm text-white/90">Tỷ lệ đúng</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-2xl p-3 md:p-6 border border-white/30">
            <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{criticalErrors}</div>
            <div className="text-xs md:text-sm text-white/90">Sai điểm liệt</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-2xl p-3 md:p-6 border border-white/30">
            <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{passingScore}</div>
            <div className="text-xs md:text-sm text-white/90">Điểm cần đạt</div>
          </div>
        </div>

        {/* Failure Reason */}
        {!passed && (
          <div className="mt-4 md:mt-8 max-w-2xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-white/30">
              <p className="font-semibold text-sm md:text-lg">
                {criticalErrors > 1 
                  ? `⚠️ Bạn đã sai ${criticalErrors} câu điểm liệt (tối đa 1 câu)`
                  : `Bạn cần đúng ít nhất ${passingScore}/${totalQuestions} câu để đạt`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
