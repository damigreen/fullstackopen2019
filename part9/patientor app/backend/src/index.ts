import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients'

const app = express();

app.use(express.static('build'));

app.get('/ping', (_req, res) => {
  res.send('PONG----------------------------------');
});

app.use('/diagnoses', diagnosesRouter);
app.use('/patients', patientRouter);

const PORT = 3002;

app.listen(PORT, () => {
  console.log("God is great");
  console.log(`Server running at ${PORT}`);
});
