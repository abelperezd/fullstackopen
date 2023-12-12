const People = ({ persons }) => {
  console.log(persons)
  return (
    <div>
      <ul>
        {
          persons.map(item => (
            <li key={item.id}>{item.name} - {item.number}</li>
          ))

        }
      </ul>

    </div>
  )
}

export default People