import express from 'express';


const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send('Getting all diagnoses----------------');
});

export default diagnosesRouter;
