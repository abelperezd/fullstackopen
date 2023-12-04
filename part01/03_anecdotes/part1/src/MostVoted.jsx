const MostVoted = ({ anecdote, votes }) => {
  if (anecdote == null) {
    return (
      <>
        <p>Vote your favorite anecdotes.</p>
      </>

    )
  }

  return (
    <div>

      <h2>Most voted anecdote:</h2>
      <p>{anecdote}</p>
      <h3>Votes: </h3>
      <p>{votes}</p>
    </div>
  )
}

export default MostVoted