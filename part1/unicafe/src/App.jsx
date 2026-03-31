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

const Statistics = (props) => {
  return (
    <>
      <h2>Statistics</h2>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.good + props.neutral + props.bad}</div>
      <div>average {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</div>
      <div>positivo {(props.good / (props.good + props.neutral + props.bad)) * 100} %</div>
    </>
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