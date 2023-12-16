import { useState } from 'react'
import phonebookService from './services/phonebook'

const Form = ({ persons, newName, newNumber, setPersons, setNewNumber, setNewName, handleFilterChanged }) => {

  const checkIfNameExists = () => persons.some(item => item.name === newName)

  const areFieldsValid = () => newName.length > 0 && newNumber.length > 0;

  const addContact = (event) => {
    event.preventDefault()

    if (!areFieldsValid()) {
      alert(`Some fields are empty.`)
      return;
    }

    if (checkIfNameExists()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const item = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    phonebookService.create(item)
      .then(response => {
        console.log("object created! ", response);
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      })

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
            type='number'
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