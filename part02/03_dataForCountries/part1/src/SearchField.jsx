import { useState } from 'react'

const SearchField = ({ searchVal, handleValueChanged }) => {


  return (
    <div>
      <div>
        Country: <input
          value={searchVal}
          onChange={handleValueChanged}
          placeholder='Search...' />
      </div>
    </div>
  )
}

export default SearchField