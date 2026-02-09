import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Props definition for MetricCard component
 */
interface MetricCardProps {
  title: string;                     // Title of the metric (e.g., Revenue)
  value: string | number;            // Main metric value
  subtitle?: string;                 // Optional subtitle below the value
  icon: ReactNode;                   // Icon displayed on the right
  trend?: {                          // Optional trend indicator
    value: number;                   // Percentage value
    isPositive: boolean;             // Determines arrow direction & color
  };
  variant?: 'default' | 'success' | 'warning' | 'info'; // Card theme
  className?: string;                // Extra custom styles
}

/**
 * Background + text styles for different variants
 */
const variantStyles = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  info: 'bg-info/10 text-info',
};

/**
 * MetricCard Component
 * Displays a metric with title, value, optional trend, and icon
 */
export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        // Base card styling + animation
        'relative metric-card group animate-fade-in',
        className
      )}
    >
      {/* Main content */}
      <div className="flex items-start justify-between">
        {/* Left section: text content */}
        <div className="space-y-2">
          {/* Metric title */}
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          {/* Metric value + trend */}
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>

            {/* Trend indicator */}
            {trend && (
              <span
                className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  trend.isPositive ? 'text-success' : 'text-destructive'
                )}
                aria-label="trend-indicator"
              >
                {trend.isPositive ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {trend.value}%
              </span>
            )}
          </div>

          {/* Optional subtitle */}
          {subtitle && (
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right section: icon */}
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            'transition-transform duration-200 group-hover:scale-110',
            variantStyles[variant]
          )}
        >
          {/* Icon rendered here */}
          <span className="h-6 w-6">{icon}</span>
        </div>
      </div>

      {/* Decorative gradient line shown on hover */}
      <div
        className={cn(
          'absolute bottom-0 left-0 h-1 w-full rounded-b-xl',
          'opacity-0 transition-opacity duration-200 group-hover:opacity-100',
          variant === 'default' && 'bg-gradient-to-r from-primary to-primary/50',
          variant === 'success' && 'bg-gradient-to-r from-success to-success/50',
          variant === 'warning' && 'bg-gradient-to-r from-warning to-warning/50',
          variant === 'info' && 'bg-gradient-to-r from-info to-info/50'
        )}
      />
    </div>
  );
}
