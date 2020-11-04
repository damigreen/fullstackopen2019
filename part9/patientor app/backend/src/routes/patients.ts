import express from 'express';
import patientServices from '../services/patientServices'

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  // res.send('Getting patients data::================');
  res.send(patientServices.getPatientsEntry());
});

export default patientRouter;
