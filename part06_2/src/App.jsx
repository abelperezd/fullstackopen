import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from './reducers/anecdoteReducer.js'
import NewAnecdote from './components/newAnecdote.jsx'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseVotes(id))
    console.log('vote', id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <NewAnecdote />

    </div>
  )
}

export default App