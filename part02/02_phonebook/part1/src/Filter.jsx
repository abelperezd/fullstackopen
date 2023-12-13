import { useState } from 'react'

const Filter = ({ persons, filter, handleFilterChanged }) => {

  return (
    <div>
      <div>
        Filter: <input
          value={filter}
          onChange={handleFilterChanged}
          placeholder='Name' />
      </div>
    </div>
  )
}

export default Filter