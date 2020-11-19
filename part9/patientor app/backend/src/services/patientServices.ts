import { PatientsEntry, NonSensitivePatientsEntry, NewPatientsEntry, } from '../types';
import patientsData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<PatientsEntry> = patientsData;

const getPatientsEntry = (): Array<PatientsEntry> => {
  return patients;
};


const getNonSensitivePatientsEntry = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientsEntry): PatientsEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientsEntry,
  addPatient,
  getNonSensitivePatientsEntry,
};
