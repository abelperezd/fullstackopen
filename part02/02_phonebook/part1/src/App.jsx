import { useState } from 'react'
import Form from "./Form"
import People from "./People"
import Filter from "./Filter"

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

  const handleFilterChanged = (event) => {
    let filterVal = event.target.value;

    setFilter(filterVal);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Form persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons}
        setNewNumber={setNewNumber} setNewName={setNewName} handleFilterChanged={handleFilterChanged} />

      <h2>Numbers</h2>

      <Filter persons={persons} filter={filter} handleFilterChanged={handleFilterChanged} />
      <People persons={persons} filter={filter} />
    </div>
  )
}

export default App