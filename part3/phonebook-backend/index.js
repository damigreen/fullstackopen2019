const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Person = require('./models/person');
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(express.static('build'));

// Morgan middleware token for displaying the body of the request to the onsole using morgan
morgan.token('body', function (req, res) { return JSON.stringify(req.body); });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req[content-length] :body '));
app.use(morgan('dev'));

const requestLogger = (request, response, next) => {
    console.log(`Method: ${request.method}`);
    console.log(`Path: ${request.path}`);
    console.log(`Body: ${request.body}`);

    next();
};

app.use(requestLogger);

let persons = [
    { 
        'name': 'damilola faseun',
        'number': '09074682209',
        'id': 1
    },
    {
        'name': 'lionel messi',
        'number': '10',
        'id': 2
    },
    {
        'name': 'batman and pigh',
        'number': '32030888392389',
        'id': 3
    },
    {
        'name': 'polldd and robn',
        'number': '399392930939930',
        'id': 4
    },
];

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()));
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON());
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.get('/', (request, response) => {
    response.send('<h1>Hello, world</h1>');
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    if (body.name == undefined) {
        return response.status(400).json({ error: 'name missing' });
    }

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson);
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response) => {
    const body = request.body;

    const personObj = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(request.params.id, personObj, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON());
        });
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({
            error: 'malformated id'
        });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

// PORT = 3001;
PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`);
});