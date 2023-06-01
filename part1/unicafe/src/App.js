import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const Statistics = ({good, neutral, bad}) => {
  console.log("statistics", good, neutral, bad)

  const allReviews = () => (
      good+bad+neutral
  )
  const averageScore = () => (
    (good+(-bad))/allReviews()
  )
  const goodPercentage = () => {
    const percent = (good/allReviews())*100
    return(
      percent + " %"
    )
  }
  if (allReviews() === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={allReviews()} />
          <StatisticLine text="Average" value={averageScore()} />
          <StatisticLine text="Positive" value={goodPercentage()} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const App = () => {
  // own states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // To get print statements
  const setToGood = newValue => {
    console.log('value good now', newValue)
    setGood(newValue)
  }
  const setToNeutral = newValue => {
    console.log('value neutral now', newValue)
    setNeutral(newValue)
  }
  const setToBad = newValue => {
    console.log('value bad now', newValue)
    setBad(newValue)
  }

  return (
    <div>
      <h1>Give feedback</h1>
        <Button handleClick={() => setToGood(good + 1)} text="good"/>
        <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral"/>
        <Button handleClick={() => setToBad(bad + 1)} text="bad"/>
      <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App