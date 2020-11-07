import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients'
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (_req, res) => {
  res.send('PONG----------------------------------');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log("God is great");
  console.log(`Server running at ${PORT}`);
});
