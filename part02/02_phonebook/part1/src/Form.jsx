import { useState } from 'react'
import phonebookService from './services/phonebook'

const Form = ({ persons, newName, newNumber, setPersons, setNewNumber, setNewName, handleFilterChanged, setNotificationMessage }) => {

  const checkIfNameExists = () => persons.some(item => item.name === newName)

  const areFieldsValid = () => newName.length > 0 && newNumber.length > 0;

  const addContact = (event) => {
    event.preventDefault()

    if (!areFieldsValid()) {
      setNotificationMessage("red", `Some fields are empty.`);
      return;
    }

    const item = {
      name: newName,
      number: newNumber
    }

    //update if exists
    if (checkIfNameExists() && window.confirm(`${newName} already exists. Update?`)) {
      let person = persons.filter(p => p.name == newName)[0];

      phonebookService.update(person.id, item)
        .then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response))
          setNewName('');
          setNewNumber('');
          setNotificationMessage("green", `${person.name} updated.`)
        })
        .catch(error => console.log(error))
      return;
    }

    phonebookService.create(item)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');

        setNotificationMessage("green", `${response.name} added.`)
      })
      .catch(error => console.log(error))
  }

  const handleNameInputChanged = (event) => {
    setNewName(event.target.value);
    console.log("Name changed: " + event.target.value);
  }

  const handleNumberInputChanged = (event) => {
    setNewNumber(event.target.value);
    console.log("Number changed: " + event.target.value);
  }

  return (
    <div>
      <form onSubmit={addContact}>
        <div>
          Name: <input
            value={newName}
            onChange={handleNameInputChanged} />
        </div>

        <div>
          Number: <input
            /*type='number'*/
            value={newNumber}
            onChange={handleNumberInputChanged} />
        </div>

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default Form