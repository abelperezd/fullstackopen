const Sum = ({ parts }) => {

    return (
        <>
            <p><b>Total of exercises: </b>
                {
                    parts.reduce((sum, item) => sum + item.exercises, 0)
                }</p>
        </>
    )
}

export default Sum