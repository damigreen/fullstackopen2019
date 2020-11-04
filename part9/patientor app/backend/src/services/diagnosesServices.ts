// import express from 'express';

import diagnosesData from '../../data/diagnoses.json';
import { DiagnosesEntry } from '../types';

const diagnoses: Array<DiagnosesEntry> = diagnosesData;

const getDiagnosesEntries = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

const addDiagnosesEntry = () => {
  return null;
};

export default {
  getDiagnosesEntries,
  addDiagnosesEntry,
};
