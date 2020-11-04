import express from 'express';
import diagnosesRouter from './routes/diagnoses';

const app = express();

app.use(express.static('build'));

app.get('/ping', (_req, res) => {
  res.send('PONG----------------------------------');
});

app.use('/diagnoses', diagnosesRouter);

const PORT = 3002;

app.listen(PORT, () => {
  console.log("God is great");
  console.log(`Server running at ${PORT}`);
});
