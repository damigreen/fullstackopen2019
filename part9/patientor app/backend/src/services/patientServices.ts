import { PatientsEntry } from '../types';
import patientsData from '../../data/patients.json'

const patients: Array<PatientsEntry> = patientsData;

const getPatientsEntry = (): Array<PatientsEntry> => {
  return patients;
};

const addEntry = () => {
  return null;
};

export default {
  getPatientsEntry,
  addEntry,
};
