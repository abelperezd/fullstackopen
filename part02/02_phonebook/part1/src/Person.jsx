import phonebookService from './services/phonebook'


const Person = ({ item, persons, setPersons }) => {

    const removePerson = () => {
        if (!window.confirm(`Remove ${item.name}?`))
            return;
        phonebookService.remove(item.id)
            .then(response => setPersons(persons.filter(p => p.id !== item.id)))
    }

    return (
        <div>
            <li>{item.name} - {item.number}</li>
            <button onClick={removePerson}>Delete</button>
        </div>
    )
}

export default Person