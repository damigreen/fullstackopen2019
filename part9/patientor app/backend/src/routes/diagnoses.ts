import express from 'express';
import diagnosesServices from '../services/diagnosesServices';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  // res.send('Getting all diagnoses----------------');
  res.send(diagnosesServices.getNonSensitiveDiagnosesEntry());
});

export default diagnosesRouter;
