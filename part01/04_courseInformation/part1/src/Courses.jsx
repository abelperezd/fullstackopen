import Course from "./Course"
import Sum from "./Sum"

const Courses = ({ courses }) => {

    return (
        <>
            <hr />
            {courses.map(item => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <ul>
                        <Course parts={item.parts} />
                    </ul>
                    <Sum parts={item.parts} />
                    <hr />
                </div>
            ))}
        </>
    )
}

export default Courses