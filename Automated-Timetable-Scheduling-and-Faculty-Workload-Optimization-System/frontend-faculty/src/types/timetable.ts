// =======================================================
// Core Data Types for Academic Timetable Management System
// =======================================================

// Roles available in the system
export type UserRole = 'admin' | 'faculty';

// Basic system user (login-level entity)
export interface User {
  id: string;              // Unique user ID
  name: string;            // Full name
  email: string;           // Login email
  role: UserRole;          // Access role
  department?: string;     // Optional department
  avatarUrl?: string;      // Profile image URL
}

// Faculty member detailed profile
export interface Faculty {
  id: number;              // Unique numeric ID
  name: string;
  email: string;
  department: string;
  designation: string;     // Professor, Asst. Prof, Lecturer, etc.
  employeeId: string;      // Official employee code
  avatarUrl?: string;

  // Workload constraints
  maxHoursPerDay: number;
  maxHoursPerWeek: number;

  // Academic details
  qualifications: string[];
  specialization: string;
  eligibleSubjects: string[];

  // Metadata
  facultyCount: number;    // Used in some calculations/analytics
  isActive: boolean;       // Active/Inactive status
}

// Subject/course information
export interface Subject {
  id?: number;             // Optional (may not exist while drafting)
  code: string;            // Subject code (e.g., CS101)
  name: string;
  department: string;
  credits: number;

  // Weekly hour distribution
  lectureHoursPerWeek: number;
  tutorialHoursPerWeek: number;
  labHoursPerWeek: number;

  isElective: boolean;     // Elective or core
  eligibleFaculty: string[]; // Faculty IDs or names eligible to teach
}

// Room/Infrastructure details
export interface Room {
  id: number;
  name: string;
  code: string;
  building: string;
  floor: string;

  // Room category
  type: 'LECTURE' | 'LAB' | 'SEMINAR';

  capacity: number;
  active: boolean;
  wheelchairAccessible: boolean;
  equipment: string[];

  // Draft/publish workflow state
  status?: 'DRAFT' | 'PUBLISHED';
}

// Section (student batch/group)
export interface Section {
  id: string;
  name: string;            // Example: CSE-A
  department: string;
  semester: number;
  year: number;
  strength: number;        // Student count
  subjects: string[];      // Subject IDs assigned to section
}

// Time slot definition
export interface TimeSlot {
  id: string;
  startTime: string;       // "09:00"
  endTime: string;         // "10:00"
  duration: number;        // In minutes
  isBreak: boolean;

  // Optional break type
  breakType?: 'short' | 'lunch';
}

// One scheduled class session
export interface ScheduleSession {
  id: string;

  // Linked entities
  subjectId: string;
  facultyId: string;
  roomId: string;
  sectionId: string;

  dayOfWeek: number;       // 0–6 (Monday = 0)
  timeSlotId: string;

  // Type of class
  sessionType: 'lecture' | 'lab' | 'tutorial';

  duration: number;        // Number of continuous slots

  // Conflict tracking
  hasConflict?: boolean;
  conflictReason?: string;
}

// Full timetable object
export interface Timetable {
  id: string;
  name: string;
  semester: string;
  year: number;

  // Publication state
  status: 'draft' | 'published' | 'archived';

  sessions: ScheduleSession[];

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;

  version: number;         // For version control
}

// Scheduling constraints (rules)
export interface Constraint {
  id: string;
  type: 'institutional' | 'faculty' | 'room' | 'section';

  name: string;
  description: string;
  isActive: boolean;

  // Priority level
  priority: 'mandatory' | 'preferred' | 'optional';

  // Flexible parameters object
  parameters: Record<string, unknown>;
}

// Conflict detection result
export interface ConflictReport {
  id: string;
  sessionId: string;

  // Conflict category
  type:
    | 'faculty_overlap'
    | 'room_overlap'
    | 'section_overlap'
    | 'constraint_violation';

  severity: 'error' | 'warning';
  description: string;

  // Entities involved in conflict
  affectedEntities: string[];

  suggestedResolution?: string;
}

// Tracks changes made to timetable
export interface ScheduleChange {
  id: string;
  timetableId: string;

  changeType: 'create' | 'update' | 'delete';
  sessionId: string;

  previousState?: Partial<ScheduleSession>;
  newState?: Partial<ScheduleSession>;

  reason: string;
  changedBy: string;
  changedAt: Date;
  isApplied: boolean;
}

// Dashboard summary metrics
export interface DashboardMetrics {
  totalFaculty: number;
  totalSubjects: number;
  totalRooms: number;
  totalSections: number;

  scheduledSessions: number;
  conflictCount: number;
  utilizationRate: number;

  lastUpdated: Date;
}

// Constant list of working days
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

// Type derived from DAYS_OF_WEEK
export type DayOfWeek = typeof DAYS_OF_WEEK[number];
