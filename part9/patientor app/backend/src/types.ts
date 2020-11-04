// export type Diagnose = 'code' | 'name' | 'latin';

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
};

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type NonSensitiveDiagnosesEntry  = Omit<DiagnosesEntry, 'latin'>;