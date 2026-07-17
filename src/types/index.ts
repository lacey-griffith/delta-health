// Core domain types for Delta Health

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  facility: string;
  isVA: boolean; // true = VA provider, false = community care
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  date: string; // ISO date
  reasonForVisit: string;
  whatHappened?: string;
  nextActionItems: NextAction[];
  status: "scheduled" | "completed" | "rescheduled" | "cancelled" | "no-show";
  rescheduledFromId?: string; // links to the original appointment if this replaces one
  linkedVaAppointmentId?: string; // reference to VA.gov appointment, if synced
}

export interface NextAction {
  id: string;
  description: string;
  dueDate?: string;
  completed: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribingDoctorId: string;
  startDate: string;
  endDate?: string;
  active: boolean;
  notes?: string;
}

export interface VisitNote {
  id: string;
  appointmentId: string;
  content: string;
  createdAt: string;
}
