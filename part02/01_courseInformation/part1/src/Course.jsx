const Course = ({ parts }) => {
    return (
        <>
            <ul>
                {
                    parts.map(item => (
                        <li key={item.id}>{item.name} {item.exercises}</li>
                    ))}
            </ul>
        </>
    )
}

export default Course