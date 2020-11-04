import { PatientsEntry } from '../types';
import patientsData from '../../data/patients';
import { NonSensitivePatientsEntry } from '../types';

const patients: Array<PatientsEntry> = patientsData;

const getPatientsEntry = (): Array<PatientsEntry> => {
  return patients;
};

const addEntry = () => {
  return null;
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

export default {
  getPatientsEntry,
  addEntry,
  getNonSensitivePatientsEntry,
};
