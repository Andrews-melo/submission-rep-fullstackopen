const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part => (
                    <li key={part.id}>
                        {part.name} {part.exercises}
                    </li>
                ))}
            </ul>
            <p><b>Total of {course.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</b></p>
        </div>
    )
}

export default Course