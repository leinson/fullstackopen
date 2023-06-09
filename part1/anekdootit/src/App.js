import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const MostVotes = (props) => {
  const maxIndex = props.allVotes.indexOf(Math.max(...props.allVotes))
  return (
    <div>
      <h2>Anecdote with most votes</h2>
        {props.anecdotes[maxIndex]}
        <p>Has {Math.max(...props.allVotes)} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(new Uint8Array(8))
  
  const randomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 8);
    setSelected(randomNumber)
  }
  const vote = () => {
    const copy = [...allVotes]
    copy[selected] += 1
    setAllVotes(copy)
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>Has {allVotes[selected]} votes</p>
        <Button handleClick={() => vote()} text="Vote" />
        <Button handleClick={() => randomAnecdote()} text="Next anecdote" />
      <MostVotes allVotes={allVotes} anecdotes={anecdotes} />
    </div>
  )
}

export default App