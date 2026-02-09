import React from 'react';

/* --------------------------------------------------
   Props interface for Header component
-------------------------------------------------- */
interface HeaderProps {
  title: string;                // Main heading text
  subtitle: string;             // Sub-heading text
  actions?: React.ReactNode;    // Optional action buttons (Add, Filter, etc.)
}

/* --------------------------------------------------
   Header Component
-------------------------------------------------- */
const Header = ({ title, subtitle, actions }: HeaderProps) => {
  return (
    /* Sticky top header bar */
    <header className="
      h-20 
      flex items-center justify-between 
      px-8 
      bg-white/80 backdrop-blur-md 
      dark:bg-slate-900/80 
      border-b border-slate-200 dark:border-slate-800 
      sticky top-0 z-10
    ">
      
      {/* Title and subtitle section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          {title}
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          {subtitle}
        </p>
      </div>

      {/* Right-side actions (buttons, icons, etc.) */}
      <div className="flex items-center gap-3">
        {actions}
      </div>
    </header>
  );
};

export default Header;
