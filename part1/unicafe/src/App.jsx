import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Feedback = (props) => {
  return (
    <>
      <h2>Give feedback</h2>
      <Button onClick={props.setGood} text={props.good}>good</Button>
      <Button onClick={props.setNeutral} text={props.neutral}>neutral</Button>
      <Button onClick={props.setBad} text={props.bad}>bad</Button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if (props.good != 0 || props.neutral != 0 || props.bad != 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text={'good'} value={props.good} />
            <StatisticLine text={'neutral'} value={props.neutral} />
            <StatisticLine text={'bad'} value={props.bad} />
            <StatisticLine text={'all'} value={props.good + props.neutral + props.bad} />
            <StatisticLine text={'average'} value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
            <StatisticLine text={'positivo'} value={(props.good / (props.good + props.neutral + props.bad)) * 100} />
          </tbody>
        </table>

      </div>)
  }

  return (
    <div>
      <h2>Statistics</h2>
      <div>No feedback given</div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlerGood = () => {
    setGood(good + 1)
  }

  const handlerNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handlerBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Feedback setGood={handlerGood} good={'good'} setNeutral={handlerNeutral} neutral={'neutral'} setBad={handlerBad} bad={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App