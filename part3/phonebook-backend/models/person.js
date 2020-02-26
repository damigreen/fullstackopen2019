const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser : true, useUnifiedTopology: true})
    .then(result => {
        console.log('connected to mongoDB');
    })
    .catch(error => {
        console.log(`Error connecting to mongoDB: ${error.message}`);
    });

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// }, { collection: 'people' });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8,
        unique: true
    }
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);