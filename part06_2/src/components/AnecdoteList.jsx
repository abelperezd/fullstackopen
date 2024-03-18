import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from '../reducers/anecdoteReducer.js'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        console.log("st", state);
        return !state.filter
            ? state.anecdotes
            : state.anecdotes.filter(item => item.content.toLowerCase().includes(state.filter.toLowerCase()))

    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(increaseVotes(id))
        console.log('vote', id)
    }

    return (
        <div>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList;