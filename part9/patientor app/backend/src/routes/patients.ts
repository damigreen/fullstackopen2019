import express from 'express';
import patientServices from '../services/patientServices'
import toNewPatientEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  // res.send(patientServices.getPatientsEntry());
  // res.send(patientServices.getPatientsEntry());
  res.send(patientServices.getNonSensitivePatientsEntry());
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientServices.addPatient(newPatientEntry)
    
    res.json(addedPatient);
  } catch (e) {
    // console.log(object)
    res.status(400).send(e.message);
  }
});

export default patientRouter;
