export type LanguageCode = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'ar';

export type DoctorStatus = 
  | 'available_now' 
  | 'in_consultation' 
  | 'in_surgery' 
  | 'on_break' 
  | 'next_slot_soon';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  department: string;
  specialty: string;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  languagesSpoken: string[];
  roomNo: string;
  block: string;
  currentStatus: DoctorStatus;
  currentToken: number;
  estimatedWaitMins: number;
  nextAvailableSlot: string;
  opdFee: number;
  teleconsultFee: number;
  availableDays: string[];
  bio: string;
  availableForTeleconsult: boolean;
}

export type ConsultType = 'in_person' | 'teleconsult';

export interface AppointmentBooking {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  uhid: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  timeSlot: string;
  consultType: ConsultType;
  reason: string;
  tokenNumber: number;
  roomNo: string;
  block: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface PatientProfile {
  uhid: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  primaryDoctor: string;
  pinHash: string; // for simulated biometric/PIN lock
}

export interface TestResultItem {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'borderline' | 'abnormal';
}

export interface HealthRecord {
  id: string;
  uhid: string;
  date: string;
  type: 'lab_report' | 'prescription' | 'radiology' | 'discharge_summary' | 'cardiac_ecg';
  title: string;
  doctor: string;
  department: string;
  summary: string;
  statusBadge: 'Normal' | 'Under Review' | 'Follow-up Needed';
  results?: TestResultItem[];
  medicationsPrescribed?: { name: string; dosage: string; frequency: string; duration: string }[];
  fileDownloadName: string;
}

export interface VitalsLog {
  id: string;
  uhid: string;
  timestamp: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  bloodGlucose: number;
  spO2: number;
  weightKg: number;
  note?: string;
}

export interface MedicationReminder {
  id: string;
  uhid: string;
  medicineName: string;
  dosage: string;
  type: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'inhaler';
  instruction: 'before_food' | 'after_food' | 'with_food' | 'empty_stomach';
  scheduleTime: string; // e.g. "08:30"
  timeSlotLabel: 'morning' | 'afternoon' | 'evening' | 'night';
  prescribedBy: string;
  startDate: string;
  daysRemaining: number;
  totalPillsRemaining: number;
  refillNeeded: boolean;
  takenToday: boolean;
  status: 'pending' | 'taken' | 'snoozed' | 'skipped';
  lastTakenAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'patient' | 'doctor' | 'coordinator' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  encrypted: boolean;
  attachment?: {
    type: 'prescription' | 'vitals_card' | 'lab_report';
    title: string;
    details: string;
  };
}

export interface SymptomAssessment {
  id: string;
  name: string;
  category: string;
  urgency: 'emergency' | 'urgent_opd' | 'teleconsult' | 'routine';
  recommendedSpecialty: string;
  actionText: string;
  redFlags: string[];
}
