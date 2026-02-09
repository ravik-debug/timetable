import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Props definition for AdminLayout component
interface AdminLayoutProps {
  children: ReactNode;   // Main page content to be rendered inside the layout
  title: string;         // Page title shown in the header
  subtitle?: string;     // Optional subtitle under the title
  actions?: ReactNode;   // Optional action buttons (e.g., Add, Export)
}

// Main layout wrapper for admin pages
export function AdminLayout({ children, title, subtitle, actions }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Left sidebar navigation */}
      <AdminSidebar />
      
      {/* Right side content area (shifted right to accommodate sidebar) */}
      <div className="pl-64 transition-all duration-300">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          
          {/* Title and subtitle section */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>

              {/* Subtitle shown only if provided */}
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right-side controls: search, notifications, extra actions */}
          <div className="flex items-center gap-4">
            
            {/* Search box */}
            <div className="relative w-64">
              {/* Search icon inside input */}
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              
              {/* Search input field */}
              <Input
                placeholder="Search..."
                className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>

            {/* Notification bell button */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />

              {/* Notification count badge */}
              <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Optional actions passed from parent (e.g., Add User button) */}
            {actions}
          </div>
        </header>

        {/* Main page content area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
