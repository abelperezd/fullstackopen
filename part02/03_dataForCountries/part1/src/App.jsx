import { useState, useEffect } from 'react'
import SearchField from "./SearchField"
import countryService from './services/countryService'
import Countries from './Countries'

const App = () => {

  //get the data from the local db
  const getDbHook = () => {
    countryService.getAll()
      .then(data => setDb(data))
      .catch(error => console.log(error))
  }

  useEffect(getDbHook, [])

  const [searchVal, setSearchVal] = useState('')
  const [db, setDb] = useState(null)
  const [countrySelected, setCountrySelected] = useState('')

  const handleValueChanged = (event) => {
    setSearchVal(event.target.value);
    setCountrySelected(event.target.value);
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <SearchField searchVal={searchVal} handleValueChanged={handleValueChanged} />
      <br />
      <Countries db={db} countrySelected={countrySelected} setCountrySelected={setCountrySelected} />
    </div>
  )
}

export default App