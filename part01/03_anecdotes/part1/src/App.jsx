import { useState } from 'react'
import MostVoted from './MostVoted'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const handleVote = () => {
    if (votesCopy[selected] == null)
      votesCopy[selected] = 0;

    votesCopy[selected] += 1
    setVotes(votesCopy)
  };

  const getVotes = () => votes[selected] == null ? 0 : votes[selected];

  const getRandVal = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const votesCopy = { ...votes };

  //chatGPT
  const getIndexFromMostVoted = () => {
    if (Object.keys(votesCopy).length === 0)
      return null;

    return Object.keys(votesCopy).reduce((a, b) => votesCopy[a] > votesCopy[b] ? a : b)
  };


  return (
    <div>
      {anecdotes[selected]}

      <br /><br />

      <button onClick={getRandVal}>Get new</button>

      <hr />
      <button onClick={handleVote}>Vote</button>

      <h3>Votes: {getVotes()}</h3>

      <hr />

      <MostVoted anecdote={anecdotes[getIndexFromMostVoted()]} votes={votes[getIndexFromMostVoted()]} />



    </div>
  )
}

export default App