import { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    variant = 'default', 
    padding = 'md',
    hover = false,
    className = '',
    ...props 
  }, ref) => {
    const baseStyles = 'rounded-2xl transition-all duration-300';
    
    const variants = {
      default: 'bg-white shadow-sm',
      elevated: 'bg-white shadow-lg shadow-slate-200/50',
      bordered: 'bg-white border-2 border-slate-200',
    };
    
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-4',
      lg: 'p-4',
    };
    
    const hoverStyles = hover ? 'hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1' : '';
    
    return (
      <div
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${paddings[padding]}
          ${hoverStyles}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
