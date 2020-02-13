const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('enter your password as an argument');
  process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://damigreen:${password}@cluster0-9junr.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser : true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model('Person', personSchema);


if (process.argv.length < 5) {
  Person.find({})
        .then(result => {
          console.log(`phonebook`);
          result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          });
          mongoose.connection.close();
        })
        .catch(err => {
          console.log(err);
        });
} else {
    const personName = process.argv[3];
    const personNumber = process.argv[4];
    
    const person = new Person({
      name: personName,
      number: personNumber
    });

    person.save().then(result => {
      console.log(`person savesd`);
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
    });
};