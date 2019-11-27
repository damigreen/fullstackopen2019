import React, { useState, useEffect } from 'react';
import personServices from './services/persons';
// import Axios from 'axios';

const Notification = ({message}) => {
  if (message === null) return null;
  // const notficationStyle = {
  //   color
  // }

  return (
    <div className={message.type}>
      {message.text}
    </div>
  )
}

const SearchBox = ({filtere, handleFiltereChange}) => {

  return (
    <div>
      filter shown with 
      <input 
        type="text"
        value={filtere}
        onChange={handleFiltereChange}/>
    </div>
  );
};

const FormField = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  
  return (
    <div>
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
                    onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
  );
};

const PhonebookDisplay = ({ person, handleDelete}) => {
  
  return (
    <div>
      <li>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></li>
      
    </div>
  );
};

function App() {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ filtere, setFiltere ] = useState('');
  const [ message, setMessage ] = useState({ text: " ", type: ""});

  const hook = (() => {
    personServices
      .getPersons()
      .then(returnedPersons => {
        setPersons(returnedPersons);
        console.log(persons)
      });
  });
  useEffect(hook, []);

  // delete a person info from the database
  // confirm deletion of the person before removing from the server
  // udate the persons in the server with its state in the app.

  const handleDelete = person => {
    ;
    if (window.confirm(`are you sure you want to delete ${person.name}?`)) {
      personServices
        .deletePerson(person.id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter(pes => pes.id !== person.id));
          setMessage({
            text: `${person.name} has been successfully deleted from phonebook`,
            type: "deleted"
          });
        })
        .catch(() => {
          setPersons(persons.filter(pes => pes.id !== person.id))
          setMessage({
            text: `${person.name} could not be found in the server`,
            type: "fail"
          });
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    };
  };

  const handleFiltereChange = (event) => {
    setFiltere(event.target.value);
  };

  // console.log(persons);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(
      event.target.value);
  };

  // TODO
  // fix this
  const addPerson = (event) => {
    event.preventDefault();

    const personObj = { name: newName, number: newNumber };
    const sameName = persons.find(person => person.name === newName);

      if (!sameName) {
        personServices

          .createPerson(personObj)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setNewNumber('')
          })
          .then(() => {
            setNewName('');
            setMessage({
              text: `Added ${newName} successfully to phonebook`,
              type: "success"
            });
          })
          .catch((err) => {
            console.log(err.response.data);
            setMessage({ 
              text: `Fail: ${newName} not added to phonebook`,
              type: "fail"})
          });
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
          const newPersonObj = { name: newName, number: newNumber }
          newPersonObj.id = sameName.id;
          personServices
            .replacePerson(sameName.id, newPersonObj)
            .then((replacedPerson) => {
              setPersons(persons.filter(p => p.id !== sameName.id).concat(replacedPerson));
              setNewName('');
              setNewNumber('');
              setMessage({
                text: `Success: ${newName} number has been successfully updated to ${newNumber}`,
                type: "updated"
              });
            })
            .catch(err => {
              console.log(err.response.data)
              setMessage({ 
                text: `${newName} has been deleted from the server`,
                type: "fail"})
            });
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        };
      };
      setTimeout(() => {
        setMessage(null)
      }, 5000);
  };

  const useFilter = () => {
    if ( filtere !== '') {
      return true;
    };
  };

  const personsList = () => 
    persons.map(person => (
      <PhonebookDisplay 
        key={person.id}
        person={person}
        handleDelete={handleDelete} /> 
    )
  );

  const filteredList = () => {
    const personsMatch = persons.filter(likelyMatches => likelyMatches.name.includes(filtere));

    return personsMatch.map(matches => 
      <PhonebookDisplay
        key={matches.id}
        person={matches}
        handleDelete={handleDelete} />
    );
  };

  
  const personsListDisp =  useFilter() ? filteredList() : personsList();

  useEffect(() => {
    personServices
      .getPersons()
      .then(returnedPersons => {
        setPersons(returnedPersons);
      });
  }, [setPersons])



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message} /><br />
      <SearchBox  
        filtere={filtere}
        handleFiltereChange={handleFiltereChange} />

      <h1>add a new</h1>
      <FormField  
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />

      <h1>Name and Numbers</h1>
      <ul>
        {personsListDisp}
      </ul>
    </div>
  );
};

export default App;