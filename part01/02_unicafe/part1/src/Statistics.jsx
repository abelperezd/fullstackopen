import StatisticLine from "./StatisticLine"


const Statistics = ({ good, neutral, bad }) => {

    const getDivisor = () => {
        let divisor = getAll();
        return divisor = divisor > 0 ? divisor : 1;
    }

    const getAll = () => good + neutral + bad;
    const getAverage = () => (good * 1 + neutral * 0 + bad * -1) / getDivisor();
    const getPositiveAverage = () => good / getDivisor();

    if (getAll() === 0) {
        return (
            <>
                <p>No feedback given yet.</p>
            </>
        )
    }

    return (
        <>

            <table>
                <StatisticLine text="Good" val={good} />
                <StatisticLine text="Neutral" val={neutral} />
                <StatisticLine text="Bad" val={bad} />
            </table>

            <br />

            <table>
                <StatisticLine text="Total" val={getAll()} />
                <StatisticLine text="Average" val={getAverage()} />
                <StatisticLine text="Posit. avg" val={getPositiveAverage()} />
            </table>

        </>

    )
}

export default Statistics