import { useState } from 'react'

const Country = ({ item }) => {

  let name = item.name.common;
  return (
    <div>


      <h2>{name}</h2>

      <img src={item.flags.png} />

      <br />

      {/* target and rel to open in a new tab*/}
      <a href={item.maps.googleMaps} target="_blank" rel="noopener noreferrer">Map</a>

      <p><b>Capital: </b> {item.capital[0]}</p>
      <p><b>Region: </b> {item.region}</p>
      <p><b>Area: </b> {item.area}</p>

      <h4>Languages</h4>
      <ul>
        {
          Object.entries(item.languages).map(([key, value]) => <li key={name + key}>{value}</li>)
        }
      </ul>

    </div>
  )

}

export default Country