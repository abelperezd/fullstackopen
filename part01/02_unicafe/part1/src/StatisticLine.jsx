
const StatisticLine = ({ text, val }) => {

    return (
        <>
            <tr>
                <td className="statisticText">{text}</td>
                <td className="statisticSpan">{val}</td>
            </tr>
        </>
    )
}

export default StatisticLine