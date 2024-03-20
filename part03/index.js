require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Person = require('./models/person');

//https://github.com/expressjs/morgan
const morgan = require('morgan');

const app = express();

app.use(cors());

//make it understand json format for POST
app.use(express.json());

//middleware to log requests
app.use(morgan(':method :url :status :res[content-length] :response-time ms :person'));

//allow to use the frontend static scripts (html - javascript)
app.use(express.static('front'));

morgan.token('person', function (req) {
  if (req.method !== 'POST')
    return '';
  return JSON.stringify(req.body);
});

//#region  Get data

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(error => next(error));
});

app.get('/api/info', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.send(
        `<p>Phonebook has info for ${persons.length} people.</p>
                <p>${new Date()}</p>`
      );
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      }
      else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});
//#endregion

//#region Delete data

//when we remove the data we always return a 204 since it didn't exist or it doesn't exist anymore
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});
//#endregion

//#region  Add and update data

const person = (name, number) => new Person({
  name: name,
  number: number
});

app.post('/api/persons', (request, response, next) => {

  const p = request.body;

  if (!p.hasOwnProperty('name') || !p.hasOwnProperty('number')) {
    return response.status(400).json({
      error: 'missing fields in json'
    });
  }

  if (p.name.length < 1) {
    return response.status(400).json({
      error: 'name is missing'
    });
  }

  if (p.number.length < 1) {
    return response.status(400).json({
      error: 'number is missing'
    });
  }

  Person.find({}).then(persons => {
    if (persons.find(item => item.name === p.name)) {
      return response.status(400).json({
        error: 'contact alreay exists'
      });
    }
    person(p.name, p.number)
      .save()
      .then(result => {
        console.log(`added ${result.name}, ${result.number} to phonebook`);
        response.json(result);
      })
      .catch(error => next(error));
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  //https://mongoosejs.com/docs/validation.html#update-validators
  //by default, in updatedPerson we receive the original element without the new modification. The { new: true }
  //forces it to send it with the new changes applied.
  //by findByIdAndUpdate doesn't run the validations set in person.js. We foce them.
  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

//#endregion

//#region Error handling

//it is called from the .catch of all the previous functions.
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  //if it is a Cast Error...
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  else if (error.name === 'ValidationError') {
    console.log('error msg: ', error.message);
    return response.status(400).json({ error: error.message });
  }

  //else passes the error forward to the default Express error handler.
  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

//#endregion

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});