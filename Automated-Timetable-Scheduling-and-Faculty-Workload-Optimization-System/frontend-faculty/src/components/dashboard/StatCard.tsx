import React from 'react';

// Props definition for StatCard component
interface StatCardProps {
  label: string;              // Title/heading of the stat (e.g., "Total Students")
  value: string | number;     // Main number/value to display
  subText: string;            // Supporting text below the value
  icon: string;               // Material icon name
  trendColor?: string;        // Optional left border color for highlighting (e.g., alerts, pending items)
}

// StatCard component
const StatCard = ({ label, value, subText, icon, trendColor }: StatCardProps) => {
  return (
    <div
      className={`glass-card p-6 rounded-3xl relative overflow-hidden group border-l-4 ${
        trendColor ? trendColor : 'border-transparent'
      }`}
    >
      {/* Decorative background icon (top-right, faded) */}
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-6xl">
          {icon}
        </span>
      </div>

      {/* Card label/title */}
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
        {label}
      </p>

      {/* Main value section */}
      <div className="flex items-end gap-2">
        <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white">
          {value}
        </h3>
      </div>

      {/* Supporting text below value */}
      <p className="text-xs text-slate-400 mt-2 font-medium">
        {subText}
      </p>
    </div>
  );
};

// Export component
export default StatCard;
