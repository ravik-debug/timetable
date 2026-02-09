import React from 'react';

/**
 * Props for StatCard component
 */
interface StatCardProps {
  label: string;              // Card title (e.g., "Total Users")
  value: string | number;     // Main statistic value
  subText: string;            // Description below the value
  icon: string;               // Material icon name
  trendColor?: string;        // Optional left border color (e.g., border-emerald-500)
}

/**
 * StatCard Component
 * Used to display key statistics in dashboard cards
 */
const StatCard = ({
  label,
  value,
  subText,
  icon,
  trendColor,
}: StatCardProps) => {
  return (
    <div
      className={`
        glass-card p-6 rounded-3xl relative overflow-hidden group
        border-l-4 ${trendColor ?? 'border-transparent'}
      `}
    >
      {/* ===== Decorative Background Icon ===== */}
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <span
          className="material-symbols-outlined text-6xl"
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      {/* ===== Label ===== */}
      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
        {label}
      </p>

      {/* ===== Value ===== */}
      <div className="flex items-end gap-2">
        <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white">
          {value}
        </h3>
      </div>

      {/* ===== Sub text ===== */}
      <p className="text-xs text-slate-400 mt-2 font-medium">
        {subText}
      </p>
    </div>
  );
};

export default StatCard;
