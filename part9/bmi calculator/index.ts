import express from 'express';
import {bmiCalculator} from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello World!');
});

app.get('/bmi', (req, res) => {
  // res.render('index');
  var queryParameter = req.query;
  if (!queryParameter.height || !queryParameter.weight) {
    res.send({error: "malformatted parameters"});
  }

  const bmiWeight = Number(queryParameter.weight)
  const bmiHeight = Number(queryParameter.height)
  const bmiValue = bmiCalculator(bmiWeight, bmiHeight);
  res.send({...queryParameter, bmi: bmiValue})
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
