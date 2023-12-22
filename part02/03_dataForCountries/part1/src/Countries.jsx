import { useState } from 'react'
import Country from './Country';

const Countries = ({ db, searchVal }) => {

  const findCountries = () => db == null || searchVal.length == 0 ? null : db.filter(c => c.name.common.toLowerCase().startsWith(searchVal));

  let countriesFound = findCountries();


  if (countriesFound == null || countriesFound.length == 0)
    return (
      <div>
      </div>
    )

  if (countriesFound.length > 10)
    return (
      <div>
        <p>Too many countries were found.</p>
      </div>
    )

  console.log(countriesFound)

  if (countriesFound.length > 1)

    return (
      <div>
        {
          countriesFound.map(element => {
            let name = element.name.common;
            return <p key={name}>{name}</p>
          })
        }
      </div>
    )

  console.log(countriesFound[0])

  //countries found = 1
  return (
    <div>
      <Country item={countriesFound[0]} />
    </div>
  )

}

export default Countries