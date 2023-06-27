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

export default PersonForm