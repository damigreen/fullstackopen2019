import express from 'express';
import bodyParser from 'body-parser';
import { exerciseCalculator } from './exerciseCalculator';
import { isArray } from 'util';

const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello, world!');
});

app.post('/exercises', async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = req.body;
  // console.log(typeof(body.target))
  // console.log(req.headers)

  try {
    if (!body.daily_exercises || !body.target) {
      await res.send({ error: 'parameters missing' });
    } else if (isNaN(body.target) || !isArray(body.daily_exercises)) {
      res.json({error: 'parameters missing'});
    }
    
    const result = exerciseCalculator(body.target, body.daily_exercises);
    await res.json(result);

  } catch(e) {
    console.log('error', e.message);
  }
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
