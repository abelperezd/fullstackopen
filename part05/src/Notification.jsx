import './Notification.css'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div id='error' className={message.color}>
            {message.text}
        </div>
    )
}

export default Notification;