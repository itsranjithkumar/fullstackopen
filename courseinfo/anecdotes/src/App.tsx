import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code...',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse tests.',
    'The only way to go fast, is to go well.'
  ]

  // index of current anecdote
  const [selected, setSelected] = useState(0)

  // votes array (one per anecdote)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // 🎯 random anecdote
  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  // 👍 vote current anecdote
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  // 🏆 most voted anecdote index
  const maxVotes = Math.max(...votes)
  const bestIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>Anecdotes</h1>

      {/* current anecdote */}
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      {/* buttons */}
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>

      {/* most voted */}
      <h2>Most voted</h2>

      {maxVotes === 0 ? (
        <p>No votes yet</p>
      ) : (
        <>
          <p>{anecdotes[bestIndex]}</p>
          <p>has {maxVotes} votes</p>
        </>
      )}
    </div>
  )
}

export default App