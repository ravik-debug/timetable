import { Faculty } from '@/types/timetable';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Mail, Clock, BookOpen, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Props definition for FacultyTable component
interface FacultyTableProps {
  faculty: Faculty[];                              // List of faculty members
  onEdit?: (faculty: Faculty) => void;             // Optional edit handler
  onDelete?: (faculty: Faculty) => void;           // Optional delete handler
  onViewSchedule?: (faculty: Faculty) => void;     // Optional schedule view handler
  className?: string;                              // Optional custom styling class
}

export function FacultyTable({
  faculty,
  onEdit,
  onDelete,
  onViewSchedule,
  className,
}: FacultyTableProps) {

  // Helper function to generate initials from faculty name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])   // Take first letter of each word
      .join('')
      .toUpperCase()
      .slice(0, 2);       // Limit to 2 characters
  };

  return (
    // Wrapper container with border, background, and shadow
    <div className={cn('rounded-xl border bg-card shadow-sm overflow-hidden', className)}>
      <Table>
        
        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[300px]">Faculty</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead className="text-center">Max Hours/Day</TableHead>
            <TableHead className="text-center">Subjects</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="w-[70px]"></TableHead> {/* Actions column */}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {faculty.map((member) => (
            <TableRow key={member.id} className="group">
              
              {/* Faculty Info: Avatar + Name + Email */}
              <TableCell>
                <div className="flex items-center gap-3">
                  
                  {/* Avatar with fallback initials */}
                  <Avatar className="h-10 w-10 border-2 border-muted">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name and Email */}
                  <div>
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Department */}
              <TableCell>
                <span className="text-sm">{member.department}</span>
              </TableCell>

              {/* Designation */}
              <TableCell>
                <span className="text-sm font-medium">{member.designation}</span>
              </TableCell>

              {/* Maximum teaching hours per day */}
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{member.maxHoursPerDay}h</span>
                </div>
              </TableCell>

              {/* Number of eligible subjects */}
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{member.eligibleSubjects?.length || 0}</span>
                </div>
              </TableCell>

              {/* Active/Inactive status */}
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={cn(
                    'font-medium',
                    member.isActive
                      ? 'status-active'
                      : 'status-inactive'
                  )}
                >
                  {member.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>

              {/* Actions Dropdown */}
              <TableCell>
                <DropdownMenu>
                  
                  {/* Trigger button (visible on hover) */}
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  {/* Dropdown menu content */}
                  <DropdownMenuContent align="end" className="w-48">
                    
                    {/* View schedule option */}
                    <DropdownMenuItem onClick={() => onViewSchedule?.(member)}>
                      <Clock className="mr-2 h-4 w-4" />
                      View Schedule
                    </DropdownMenuItem>

                    {/* Edit details option */}
                    <DropdownMenuItem onClick={() => onEdit?.(member)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Details
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Delete faculty option */}
                    <DropdownMenuItem
                      onClick={() => onDelete?.(member)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Faculty
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
