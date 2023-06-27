const Person = ({name, number, deleting}) =>
  <li> 
    {name} {number}
    <button onClick={deleting}>delete</button>
  </li>

export default Person