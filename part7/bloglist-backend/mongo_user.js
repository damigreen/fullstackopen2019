const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


const password = process.argv[2];

const url = `mongodb+srv://damigreen:${password}@cluster0-9junr.mongodb.net/bloglist-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => { console.log(`connected to ${url}`); })
  .catch(error => { console.log(`error connecting to the db ${error.message}`); });


const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
});
// userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

// const newUser = new User({
//   username: 'dr_Cortex',
//   name: 'Cortex Evel',
//   password: 'fiafiaif883828333r'
// });

const newUser = new User({
  username: 'damigreen',
  name: 'damilola faseun',
  password: 'fiafiaif883828333r'
});

newUser.save().then(result => {
  console.log('user saved');
  mongoose.connection.close();
})
  .catch(err => {
    console.log(err);
  });