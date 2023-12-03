
const Statistic = ({ text, val }) => {

    return (
        <p>
            <div ><span className="statisticText"> {text}:</span> <span className="statisticSpan">{val}</span></div>
        </p>
    )
}

export default Statistic