import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import { escapeExpression } from 'handlebars';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'damilola faseun', number: '07061935742' },
    { name: 'lionel messi', number: '993038741' },
    { name: 'zinadene zidane', number: '77383828328'},
    { name: 'a', number: '23833' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ filtere, setFiltere ] = useState('damilola faseun');
  // const [ submit, setSubmit ] = useState(false);

  const addPerson = (event) => {
    event.preventDefault();

    const personObj = {
      name: newName,
      number: newNumber
    };
    const result = () => {
      persons.filter(person => {
        if(newName !== person.name) {
          setPersons(persons.concat(personObj));
          setNewNumber('');
          setNewName('');
        } else {
          setPersons(persons);
          alert(`${newName} is already added to phonebook`);
          setNewName('');
          console.log(persons);
        }
      });
    };
    return result();
  };
  
  
  // const addPersonsCheck = (event) => {
  //   for (var i=0; i<persons.length; i++) {
    //     if (newName !== persons.name) {
  //       addPer6son(event);
  //       setAdded(true);
  //     } else {
  //       alert('whats happening yo');
  //       setAdded(false);
  //     }
  //   }
  // };
  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumerChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFiltereChange = (event) => {
    setFiltere(event.target.value);
  }
  
  
  const personsList = () => persons.map(person => <p key={person.name}>{person.name} {person.number}</p>);  

  const useFilter = () => {
    for (let i=0; i< persons.length; i++) {
      if (filtere === persons[i].name) {
        return true
      };
    };
  };

  const filteredList = () => {
    for (let i=0; i< persons.length; i++) {
      if (filtere === persons[i].name) {
        return (
          <p>{persons[i].name} {persons[i].number}</p>
          )
        };
      };
      
    }
  

    const personsListFiltered =  useFilter() ? filteredList() : personsList()

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with 
          <input 
            type="text"
            value={filtere}
            onChange={handleFiltereChange}/>
      </div>

      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  type="text"
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
                    type="text"
                    value={newNumber}
                    onChange={handleNumerChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {/* {personsList()} */}
        {personsListFiltered}
      </div>
    </div>
  )
};
ReactDOM.render(<App />, document.getElementById('root'));
