import Person from "./Person"

const Persons = (props) => {
    if (props.newFilter === "") {
      const names = props.persons.map(person => 
        <Person key={person.name} 
          name={person.name} 
          number={person.number} 
          deleting={() => props.deleting(person.id)}
        />
      )
      return (
        <ul>{names}</ul>
      )
    } else {
      const filteredPersons = props.persons.filter(person =>
        person.name.includes(props.newFilter)
      )
      const filteredNames = filteredPersons.map(person => 
        <Person key={person.name} 
          name={person.name} 
          number={person.number} 
          deleting={() => props.deleting(person.id)}
        />
      )
      return (
        <ul>{filteredNames}</ul>
      )
    }
}

export default Persons
