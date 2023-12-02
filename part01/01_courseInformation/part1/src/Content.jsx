
const Content = (props) => {

    const parts = props.parts;

    return (
        <>
            <p>
                {parts[0].part} {parts[0].exercises}
            </p>
            <p>
                {parts[1].part} {parts[1].exercises}
            </p>
            <p>
                {parts[2].part} {parts[2].exercises}
            </p>
        </>
    )
}

export default Content