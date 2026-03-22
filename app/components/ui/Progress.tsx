import { forwardRef } from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    value, 
    max = 100, 
    variant = 'default',
    size = 'md',
    showLabel = false,
    className = '',
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };
    
    const variants = {
      default: 'bg-blue-600',
      success: 'bg-green-600',
      warning: 'bg-amber-600',
      danger: 'bg-red-600',
    };
    
    return (
      <div ref={ref} className={className} {...props}>
        <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizes[size]}`}>
          <div
            className={`${variants[variant]} ${sizes[size]} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <div className="mt-1 text-xs text-slate-600 text-right">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
