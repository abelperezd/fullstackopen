
import NewAnecdote from './components/NewAnecdote.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App