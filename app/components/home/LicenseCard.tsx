import { Link } from 'react-router';
import { Card } from '../ui/Card';

interface LicenseCardProps {
  type: string;
  name: string;
  description: string;
  icon: string;
  totalQuestions: number;
  timeLimit: number;
  passingScore: number;
  gradient: string;
}

export function LicenseCard({
  type,
  name,
  description,
  icon,
  totalQuestions,
  timeLimit,
  passingScore,
  gradient,
}: LicenseCardProps) {
  return (
    <Link to={`/exam/${type}`} className="group block">
      <Card 
        variant="elevated" 
        padding="none" 
        hover
        className="overflow-hidden"
      >
        {/* Gradient Header */}
        <div className={`bg-gradient-to-br ${gradient} p-8 relative overflow-hidden`}>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative">
            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
            <p className="text-white/90 text-sm leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{totalQuestions}</div>
              <div className="text-xs text-slate-500 mt-1">Câu hỏi</div>
            </div>
            <div className="text-center border-x border-slate-200">
              <div className="text-2xl font-bold text-slate-900">{timeLimit}</div>
              <div className="text-xs text-slate-500 mt-1">Phút</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{passingScore}/{totalQuestions}</div>
              <div className="text-xs text-slate-500 mt-1">Điểm đạt</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center gap-2 py-3 px-6 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-colors">
            <span className="font-semibold text-slate-700">Bắt đầu thi</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
