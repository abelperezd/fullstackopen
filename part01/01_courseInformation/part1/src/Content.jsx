import Part from './Part'


const Content = (props) => {

    const parts = props.parts;

    return (
        <>
            <Part element={parts[0]} />
            <Part element={parts[1]} />
            <Part element={parts[2]} />
        </>
    )
}

export default Content