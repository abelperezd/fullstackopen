import Statistic from "./Statistic"


const Statistics = ({ good, neutral, bad }) => {

    const getDivisor = () => {
        let divisor = getAll();
        return divisor = divisor > 0 ? divisor : 1;
    }

    const getAll = () => good + neutral + bad;
    const getAverage = () => (good * 1 + neutral * 0 + bad * -1) / getDivisor();
    const getPositiveAverage = () => good / getDivisor();

    return (
        <>
            <Statistic text="Good" val={good} />
            <Statistic text="Neutral" val={neutral} />
            <Statistic text="Bad" val={bad} />

            <hr />
            <Statistic text="Total" val={getAll()} />
            <Statistic text="Average" val={getAverage()} />
            <Statistic text="Posit. avg" val={getPositiveAverage()} />

        </>

    )
}

export default Statistics