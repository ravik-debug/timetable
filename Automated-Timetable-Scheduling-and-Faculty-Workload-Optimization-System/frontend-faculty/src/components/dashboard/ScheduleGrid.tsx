import React from 'react';

// Main timetable grid component
const ScheduleGrid = () => {
  // Days of the week shown as columns
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  return (
    <div className="overflow-x-auto">
      {/* Wrapper to allow horizontal scroll on small screens */}
      <div className="min-w-[800px]">
        
        {/* Header Row: Time + Days */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          {/* Time column title */}
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">
            Time
          </div>

          {/* Day titles */}
          {days.map(day => (
            <div
              key={day}
              className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 09:00 AM – 10:30 AM Time Slot Row */}
        <div className="grid grid-cols-6 gap-4 mb-4 h-28">
          
          {/* Time label column */}
          <div className="flex flex-col justify-center text-[10px] font-bold text-slate-500 pl-2">
            <span>09:00 AM</span>
            <span className="text-slate-300">to</span>
            <span>10:30 AM</span>
          </div>

          {/* Monday class */}
          <ClassCard code="CS301" title="Data Structures" room="LH-102" type="theory" />

          {/* Tuesday empty */}
          <EmptySlot />

          {/* Wednesday class */}
          <ClassCard code="CS301" title="Data Structures" room="LH-102" type="theory" />

          {/* Thursday empty */}
          <EmptySlot />

          {/* Friday lab */}
          <ClassCard code="CS301L" title="DS Lab - B" room="Lab-402" type="lab" />
        </div>

        {/* Break Row */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          {/* Break spans across all day columns */}
          <div className="col-start-2 col-span-5 py-2 bg-slate-50 rounded-xl flex items-center justify-center gap-2">
            
            {/* Coffee icon */}
            <span className="material-symbols-outlined text-sm text-slate-400">
              coffee
            </span>

            {/* Break text */}
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Short Break (10:30 - 10:45)
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

// Component to display a class card (theory/lab)
const ClassCard = ({ code, title, room, type }: any) => {

  // Different color styles based on class type
  const styles =
    type === 'theory'
      ? 'bg-sky-50 border-sky-100 text-sky-700'
      : 'bg-purple-50 border-purple-100 text-purple-700';

  return (
    <div
      className={`${styles} rounded-2xl p-4 border flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
    >
      <div>
        {/* Top row: subject code + icon */}
        <div className="flex justify-between items-start">
          <p className="text-[10px] font-extrabold tracking-tighter uppercase">
            {code}
          </p>

          {/* Icon changes based on theory/lab */}
          <span className="material-symbols-outlined text-sm opacity-60">
            {type === 'theory' ? 'auto_stories' : 'biotech'}
          </span>
        </div>

        {/* Subject title */}
        <p className="text-xs font-bold text-slate-800 leading-tight">
          {title}
        </p>
      </div>

      {/* Room information */}
      <p className="text-[9px] font-semibold opacity-80">
        Room {room}
      </p>
    </div>
  );
};

// Component for empty timetable slots
const EmptySlot = () => (
  <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100"></div>
);

// Export main component
export default ScheduleGrid;
