import express from 'express';
import patientServices from '../services/patientServices'

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  // res.send(patientServices.getPatientsEntry());
  // res.send(patientServices.getPatientsEntry());
  res.send(patientServices.getNonSensitivePatientsEntry());
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = patientServices.addPatient(req.body)
    res.json(newPatientEntry);
  } catch (e) {
    // console.log(object)
    res.status(400).send(e.message);
  }
});

export default patientRouter;
