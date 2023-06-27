import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          console.log('promise fulfilled')
        })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )
      const samePerson = persons.find(person => person.name === newName)
      const changedPerson = { ...samePerson, number: newNumber}
      personService
        .update(changedPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : updatedPerson))
          setMessage(`${newName} number updated`)
          setTimeout(() => {setMessage(null)}, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Information of ${changedPerson.name} has already been removed from the server`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
          setPersons(persons.filter(person => person.id !== changedPerson.id))
          setNewName('')
          setNewNumber('')
          console.log('error', {changedPerson})
        })      
    } else {
      const personObject = { 
        name: newName, 
        number: newNumber 
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {setMessage(null)}, 5000)
          setNewName('')
          setNewNumber('')
        })      
    }
  }
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`) === true) {
      personService
        .remove(id)
      setMessage(`Deleted ${person.name}`)
      setTimeout(() => {setMessage(null)}, 5000)
      setPersons(persons.filter(person => person.id !== id))
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
        <Notification 
          message={message} 
          errorMessage={errorMessage} 
        />
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
          deleting={deletePerson}
        />
    </div>
  )
}

export default App