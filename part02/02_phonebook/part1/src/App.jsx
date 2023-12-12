import { useState } from 'react'
import People from "./People"

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1,
      number: 673984098
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const checkIfNameExists = () => persons.some(item => item.name === newName)

  const areFieldsValid = () => newName.length > 0 && newNumber.length > 0;

  const addContact = (event) => {

    if (!areFieldsValid()) {
      alert("Some fields are empty.")
      return;
    }

    event.preventDefault()

    if (checkIfNameExists()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const item = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(item));
    setNewName('');
    setNewNumber('');

    handleFilterChanged();
  }

  const handleNameInputChanged = (event) => {
    setNewName(event.target.value);
    console.log("Name changed: " + event.target.value);
  }

  const handleNumberInputChanged = (event) => {
    setNewNumber(event.target.value);
    console.log("Number changed: " + event.target.value);
  }

  const handleFilterChanged = (event) => {
    let filterVal = event.target.value;

    setFilter(filterVal);
  }

  const getFilteredPeople = () => persons.filter(item => item.name.toLowerCase().startsWith(filter));


  return (
    <div>
      <h2>Phonebook</h2>
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


      <h2>Numbers</h2>

      <div>
        Filter: <input
          value={filter}
          onChange={handleFilterChanged}
          placeholder='Name' />
      </div>

      <People persons={getFilteredPeople()} />
    </div>
  )
}

export default App