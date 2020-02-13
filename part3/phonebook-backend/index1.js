const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person')

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'))

// creating a token for displaying the body of the request to the onsole using morgan
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req[content-length] :body '));
app.use(morgan('dev'));


let persons = [
  { 
    "name": "damilola faseun",
    "number": "09074682209",
    "id": 1
  },
  {
    "name": "lionel messi",
    "number": "10",
    "id": 2
  },
  {
    "name": "batman and pigh",
    "number": "32030888392389",
    "id": 3
  },
  {
    "name": "polldd and robn",
    "number": "399392930939930",
    "id": 4
  },
];

// app.get('/', function (req, res) {
//   res.send('hello, world!');
// });

const generateId = (idSize) => {
  const characters = '0123456789';
  let result = ''; //create a random 3 charcter id;
  for (let i=0; i<idSize; i+=1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const person  = {
    name: body.name,
    number: body.number,
    id: generateId(3)
  };
  const existingName = persons.find(pes => pes.name == body.name);

  if (body.name == '' || body.number == '') {
    return res.status(400).json({
      error: "specify missing field"
    });
  } else if (existingName) {
    return res.status(400).json({
      error: "name must be unique"
    });
  }

  persons = persons.concat(person);
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(pers => pers.id !== id);

  res.status(202).end();
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const person = persons.find(p => p.id == id);
  if (person) {
    // console.log(person);
    res.json(person);
  } else {
    res.status(404).end()
  }
});

app.get('/info', (req, res) => {
  res.send(`<p>phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/', (req, res) => {
  res.send("<h1>Hello, world</h1>");
});

// PORT = 3001;
PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});