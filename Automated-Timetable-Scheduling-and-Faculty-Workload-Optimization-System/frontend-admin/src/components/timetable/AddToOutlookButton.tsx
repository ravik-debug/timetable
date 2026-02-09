import React from 'react';
import { Calendar } from 'lucide-react';
import { generateICS, CalendarEvent } from '../../lib/icsUtils';

/* --------------------------------------------------
   Props interface for AddToOutlookButton
-------------------------------------------------- */
interface AddToOutlookButtonProps {
  event: CalendarEvent; // Calendar event data (title, start, end, etc.)
}

/* --------------------------------------------------
   AddToOutlookButton Component
-------------------------------------------------- */
export const AddToOutlookButton: React.FC<AddToOutlookButtonProps> = ({ event }) => {

  // Function to generate and download .ics file
  const handleDownload = () => {
    // Generate ICS file content from event data
    const icsContent = generateICS(event);

    // Create a Blob with calendar MIME type
    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });

    // Create a temporary download URL
    const url = window.URL.createObjectURL(blob);

    // Create an invisible anchor element
    const link = document.createElement('a');
    link.href = url;

    // File name based on event title
    link.setAttribute(
      'download',
      `${event.title.replace(/\s+/g, '_')}.ics`
    );

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    /* Download button */
    <button
      onClick={handleDownload}
      className="
        flex items-center gap-2 px-3 py-2 
        text-sm font-medium text-white 
        transition-colors 
        bg-blue-600 rounded-md 
        hover:bg-blue-700 
        focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2
      "
      title="Add to Outlook Calendar"
    >
      <Calendar className="w-4 h-4" />
      Add to Outlook
    </button>
  );
};
