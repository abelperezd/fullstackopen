import Person from "./Person"

const People = ({ persons, filter }) => {

  const getFilteredPeople = () => persons.filter(item => item.name.toLowerCase().startsWith(filter));

  console.log(persons)
  return (
    <div>
      <ul>
        {
          getFilteredPeople().map(item => (
            <Person key={item.id} item={item} />
          ))
        }
      </ul>
    </div>
  )
}

export default People