const Header = ({ header }) => 
  <h2>
    {header}
  </h2>

const Total = ({ sum }) => 
  <p>
    <b>Total of {sum} exercises</b>
  </p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const sum_reduce = exercises.reduce((total, item) => total + item)
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )} 
      <Total sum={sum_reduce} /> 
    </>
  )
}

const Course = ({course}) =>
  <>
    <Header header={course.name} />
    <Content parts={course.parts} />
  </>

export default Course