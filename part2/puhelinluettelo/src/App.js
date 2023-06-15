import { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = (props) =>
  <form onSubmit={props.addPerson}>
    <div>
      name: <input 
        value={props.newName}
        onChange={props.handlePersonChange}
        name='name'
      />
      <br/>
      number: <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
        name='number'
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Person = ({name, number}) =>
  <li> 
    {name} {number}
  </li>

const Persons = (props) => {
  if (props.newFilter === "") {
    const names = props.persons.map(person => 
      <Person key={person.name} name={person.name} number={person.number} />
    )
    return (
      <ul>{names}</ul>
    )
  } else {
    const filteredPersons = props.persons.filter(person =>
      person.name.includes(props.newFilter)
    )
    const filteredNames = filteredPersons.map(person => 
      <Person key={person.name} name={person.name} number={person.number} />
    )
    return (
      <ul>{filteredNames}</ul>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = { 
        name: newName, 
        number: newNumber 
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange = (event) => {
    console.log("FilterChange", event.target.value)
    setNewFilter(event.target.value)
  }
  const handlePersonChange = (event) => {
    console.log("PersonChange", event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log("NumberChange", event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input
          value={newFilter}
          onChange={handleFilterChange}
          name='filter'
        />
      </div>
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        newNumber={newNumber} 
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
        <Persons 
          persons={persons} 
          newFilter={newFilter}
        />
    </div>
  )
}

export default App