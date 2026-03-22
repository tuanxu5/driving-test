import { Card } from '../ui/Card';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card variant="bordered" padding="lg" hover className="group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}
