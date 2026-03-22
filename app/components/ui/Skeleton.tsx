import { forwardRef } from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    variant = 'rectangular', 
    width,
    height,
    className = '',
    style,
    ...props 
  }, ref) => {
    const baseStyles = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]';
    
    const variants = {
      text: 'rounded h-4',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    };
    
    return (
      <div
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${className}
        `}
        style={{
          width: width || '100%',
          height: height || (variant === 'text' ? '1rem' : '100%'),
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
