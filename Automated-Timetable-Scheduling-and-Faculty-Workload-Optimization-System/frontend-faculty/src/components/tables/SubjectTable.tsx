import { Subject } from '@/types/timetable';
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
import { MoreHorizontal, BookOpen, FlaskConical, Users, Edit, Trash2, GraduationCap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Props definition for SubjectTable component
interface SubjectTableProps {
  subjects: Subject[];                        // List of subjects to display in table
  onEdit?: (subject: Subject) => void;        // Optional edit handler
  onDelete?: (subject: Subject) => void;      // Optional delete handler
  className?: string;                         // Optional custom styling class
}

// Subject table component
export function SubjectTable({
  subjects,
  onEdit,
  onDelete,
  className,
}: SubjectTableProps) {
  return (
    // Wrapper container with styling
    <div className={cn('rounded-xl border bg-card shadow-sm overflow-hidden', className)}>
      <Table>
        
        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[300px]">Subject</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-center">Credits</TableHead>
            <TableHead className="text-center">Weekly Hours</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Faculty</TableHead>
            <TableHead className="w-[70px]"></TableHead> {/* Action column */}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id} className="group">
              
              {/* Subject Name + Code */}
              <TableCell>
                <div className="flex items-center gap-3">
                  
                  {/* Subject icon box */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>

                  {/* Subject details */}
                  <div>
                    <p className="font-medium text-foreground">{subject.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {subject.code}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Department */}
              <TableCell>
                <span className="text-sm">{subject.department}</span>
              </TableCell>

              {/* Credits */}
              <TableCell className="text-center">
                <Badge variant="secondary" className="font-semibold">
                  {subject.credits}
                </Badge>
              </TableCell>

              {/* Weekly Hours Breakdown (Lecture, Tutorial, Practical) */}
              <TableCell>
                <div className="flex items-center justify-center gap-3 text-xs">
                  
                  {/* Lecture hours */}
                  <div className="flex items-center gap-1 text-blue-600">
                    <BookOpen className="h-3 w-3" />
                    <span>{subject.lectureHoursPerWeek}L</span>
                  </div>

                  {/* Tutorial hours */}
                  <div className="flex items-center gap-1 text-teal-600">
                    <Users className="h-3 w-3" />
                    <span>{subject.tutorialHoursPerWeek}T</span>
                  </div>

                  {/* Lab hours */}
                  <div className="flex items-center gap-1 text-violet-600">
                    <FlaskConical className="h-3 w-3" />
                    <span>{subject.labHoursPerWeek}P</span>
                  </div>
                </div>
              </TableCell>

              {/* Subject Type (Core/Elective) */}
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className={cn(
                    'font-medium',
                    subject.isElective
                      ? 'bg-warning/10 text-warning border-warning/30'
                      : 'bg-primary/10 text-primary border-primary/30'
                  )}
                >
                  {subject.isElective ? 'Elective' : 'Core'}
                </Badge>
              </TableCell>

              {/* Eligible Faculty Count */}
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{subject.eligibleFaculty.length}</span>
                </div>
              </TableCell>

              {/* Actions Dropdown (Edit/Delete) */}
              <TableCell>
                <DropdownMenu>
                  
                  {/* Trigger button (visible on row hover) */}
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
                    
                    {/* Edit option */}
                    <DropdownMenuItem onClick={() => onEdit?.(subject)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Subject
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Delete option */}
                    <DropdownMenuItem
                      onClick={() => onDelete?.(subject)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Subject
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
