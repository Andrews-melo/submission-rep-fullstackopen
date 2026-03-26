const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (<>
    <p>
      {props.parts[0]} {props.exercises[0]}
    </p>
    <p>
      {props.parts[1]} {props.exercises[1]}
    </p>
    <p>
      {props.parts[2]} {props.exercises[2]}
    </p>
  </>)
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises}</p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
      <Total exercises={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </>
  )
}

export default App