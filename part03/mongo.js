const mongoose = require('mongoose');

console.log('args length: ' + process.argv.length);

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url =
  `mongodb+srv://abp:${password}@cluster0.4yhvi1d.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

//https://mongoosejs.com/docs/schematypes.html
const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(result => {
    console.log(`added ${result.name}, ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
else {
  Person.find({}).then(result => {
    console.log('\nphonebook');
    result.forEach(person => {
      console.log(`${person.name}, ${person.number}`);
    });
    mongoose.connection.close();
  });
}
