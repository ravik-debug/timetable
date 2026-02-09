// Interface used while creating/editing a faculty member (draft state)
// All fields are optional because the form may be partially filled.
export interface FacultyDraft {
  // Basic personal details
  name?: string;            // Full name of the faculty member
  email?: string;           // Official email address
  department?: string;      // Department (e.g., CSE, ECE, MECH)
  designation?: string;     // Role (Professor, Assistant Professor, Lecturer, etc.)
  employeeId?: string;      // Unique employee/staff ID
  isActive?: boolean;       // Whether the faculty is currently active

  // Academic information
  qualifications?: string[];  // Degrees/certifications (e.g., ["PhD", "M.Tech"])
  specialization?: string;    // Area of expertise (e.g., AI, Networks)
  eligibleSubjects?: string[]; // Subjects they are allowed to teach

  // Workload constraints (used in timetable generation)
  maxHoursPerDay?: number;   // Maximum teaching hours allowed per day
  maxHoursPerWeek?: number;  // Maximum teaching hours allowed per week
}
