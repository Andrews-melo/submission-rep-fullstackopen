import { useState } from 'react'
import personService from './services/persons.service'

const Filter = (props) => {
  const { newFilter, handleFilterChange } = props
  return (
    <div>filter shown with: <input value={newFilter} onChange={handleFilterChange} /></div>
  )
}

const PersonForm = (props) => {
  const { addPerson, newName, handleNameChange, newNumber, handleNumberChange } = props
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  const { personToShow, deletePerson } = props
  return (
    personToShow.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState(
    [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  )
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (!newName) {
      return
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const data = {
      name: newName,
      number: newNumber
    }

    personService
      .create(data)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(() => {
          alert('the person has already been deleted from the server')
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personToShow = newFilter ? persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App