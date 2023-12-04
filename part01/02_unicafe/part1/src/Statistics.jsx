import Statistic from "./Statistic"

const Statistics = ({ good, neutral, bad }) => {

    return (
        <>
            <Statistic text="Good" val={good} />
            <Statistic text="Neutral" val={neutral} />
            <Statistic text="Bad" val={bad} />
        </>

    )
}

export default Statistics