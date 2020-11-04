import express from 'express';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send('Getting patients data::================');
});

export default patientRouter;
