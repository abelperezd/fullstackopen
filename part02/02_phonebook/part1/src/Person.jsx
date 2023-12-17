import phonebookService from './services/phonebook'
import Notification from './Notification';

const Person = ({ item, persons, setPersons, setNotificationMessage }) => {

    const removePerson = () => {
        if (!window.confirm(`Remove ${item.name}?`))
            return;
        phonebookService.remove(item.id)
            .catch(error => setNotificationMessage("red", `${item.name} wasn't found in the server.`))
            .finally(response => setPersons(persons.filter(p => p.id !== item.id)))
    }

    return (
        <div>
            <li>{item.name} - {item.number}</li>
            <button onClick={removePerson}>Delete</button>
        </div>
    )
}

export default Person