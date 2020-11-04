import express from 'express';
const app = express();

app.use(express.static('build'));

app.get('/ping', (_req, res) => {
  res.send('PONG----------------------------------');
});

app.get('/diagnoses', (_req, res) => {
  res.send('Getting diagnoses-----------')
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log("God is great");
  console.log(`Server running at ${PORT}`);
});
