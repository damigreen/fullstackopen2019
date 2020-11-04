import express from 'express';
import patientServices from '../services/patientServices'

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  // res.send(patientServices.getPatientsEntry());
  // res.send(patientServices.getPatientsEntry());
  res.send(patientServices.getNonSensitivePatientsEntry());
});

export default patientRouter;
