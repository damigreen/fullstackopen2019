// import express from 'express';

import diagnosesData from '../../data/diagnoses';
import { DiagnosesEntry, NonSensitiveDiagnosesEntry } from '../types';

const diagnoses: Array<DiagnosesEntry> = diagnosesData;

const getDiagnosesEntries = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

const addDiagnosesEntry = () => {
  return null;
};

const getNonSensitiveDiagnosesEntry = (): NonSensitiveDiagnosesEntry[] => {
  return diagnoses.map(({ name, code }) => ({
    name,
    code,
  }));
};

export default {
  getDiagnosesEntries,
  addDiagnosesEntry,
  getNonSensitiveDiagnosesEntry,
};
