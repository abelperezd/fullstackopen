import { useState } from 'react'
import Button from "./Button"
import Header from "./Header"
import Statistic from "./Statistic"

import './App.css'

const App = () => {

  const getDivisor = () => {
    let divisor = getAll();
    return divisor = divisor > 0 ? divisor : 1;
  }

  const getAll = () => good + neutral + bad;
  const getAverage = () => (good * 1 + neutral * 0 + bad * -1) / getDivisor();
  const getPositiveAverage = () => good / getDivisor();

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicked = () => setGood(good + 1)
  const handleNeutralClicked = () => setNeutral(neutral + 1)
  const handleBadClicked = () => setBad(bad + 1)


  return (
    <div>
      <Header text="Give feedback" />

      <div id="buttons">
        <Button id="goodBtn" handler={handleGoodClicked} text="Good" />
        <Button id="neutralBtn" handler={handleNeutralClicked} text="Neutral" />
        <Button id="badBtn" handler={handleBadClicked} text="Bad" />
      </div>

      <br /><br />
      <hr />

      <Header text="Statistics" />

      <div id="statistics">
        <Statistic text="Good" val={good} />
        <Statistic text="Neutral" val={neutral} />
        <Statistic text="Bad" val={bad} />

        <hr />
        <Statistic text="Total" val={getAll()} />
        <Statistic text="Average" val={getAverage()} />
        <Statistic text="Posit. avg" val={getPositiveAverage()} />

      </div>


    </div>
  )
}

export default App