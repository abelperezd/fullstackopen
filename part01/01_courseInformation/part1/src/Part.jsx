
const Part = (props) => {
    const element = props.element;
    return (
        <>
            <p>
                {element.part} {element.exercises}
            </p>
        </>
    )
}

export default Part