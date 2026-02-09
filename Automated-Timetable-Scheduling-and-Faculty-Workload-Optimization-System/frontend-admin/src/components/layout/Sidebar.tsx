import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

/* --------------------------------------------------
   SIDEBAR COMPONENT (Faculty Portal)
-------------------------------------------------- */
const Sidebar = () => {
  // Get logged-in user details and logout function from context
  const { user, logout } = useUser();

  // Navigation menu items for faculty
  const navItems = [
    { icon: 'dashboard', label: 'My Dashboard', path: '/faculty/dashboard' },
    { icon: 'event_available', label: 'My Schedule', path: '/faculty/schedule' },
    { icon: 'history_edu', label: 'Leave Status', path: '/faculty/leave' },
    { icon: 'group', label: 'Department', path: '/faculty/department' },
    { icon: 'campaign', label: 'Announcements', path: '/faculty/announcements' },
  ];

  return (
    /* Sidebar container */
    <aside className="w-64 bg-[#111827] text-white flex flex-shrink-0 flex-col border-r border-slate-800 hidden lg:flex sticky top-0 h-screen">

      {/* Logo / App Title */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#10b981] p-2 rounded-xl shadow-lg">
          <span className="material-symbols-outlined text-white">
            calendar_today
          </span>
        </div>
        <h1 className="font-bold text-xl tracking-tight">AcadSchedule</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-4">
          Portal
        </p>

        {/* Render menu items */}
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}

            /* Apply active styles when route matches */
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                isActive
                  ? 'bg-gradient-to-r from-[#10b981]/20 to-transparent text-[#10b981] border-l-4 border-[#10b981] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 mb-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>

      {/* Logged-in Faculty Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/40">
        <div className="flex items-center gap-3 p-2 bg-slate-800/30 rounded-xl">

          {/* User initials avatar */}
          <div className="w-10 h-10 rounded-lg bg-[#10b981]/20 flex items-center justify-center text-[#10b981] font-bold">
            {user?.name?.split(' ').map(n => n[0]).join('') || '??'}
          </div>

          {/* User name & designation */}
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">
              {user?.name || 'Loading...'}
            </p>
            <p className="text-[10px] text-slate-500 truncate uppercase font-bold tracking-tight">
              {user?.designation || 'Faculty'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
