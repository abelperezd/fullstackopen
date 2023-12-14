import { useState, useEffect } from 'react'
import Form from "./Form"
import People from "./People"
import Filter from "./Filter"
import axios from 'axios'


const App = () => {

  //get the data from the local db
  const getDbHook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(getDbHook, [])

  const [persons, setPersons] = useState([])
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