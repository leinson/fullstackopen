import { useState } from "react"

const Blog = ({ blog, updateLikes, removeBlog, loggedUser }) => {
  const [showDetails, setShowDetails] = useState(false)
  const hideWhenShowDetails = { display: showDetails ? 'none' : '' }
  const showWhenShowDetails = { display: showDetails ? '' : 'none' }
  const showWhenCreatedByUser = { 
    display: loggedUser === blog.user.name ? '' : 'none'
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 3,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 3
  }


  return (
    <div style={blogStyle}>
      <div style={hideWhenShowDetails}>
       {blog.title} - {blog.author}
       <button onClick={ () => setShowDetails(true)}>view</button>
      </div>
      <div style={showWhenShowDetails}>
        {blog.title} - {blog.author}
        <button onClick={ () => setShowDetails(false)}>hide</button>
        <br/>
        {blog.url}
        <br/>
        likes {blog.likes} <button onClick={ () => updateLikes(blog)}>Like</button>
        <br/>
        {blog.user.name}
        <div style={showWhenCreatedByUser}>
        <button onClick={ () => removeBlog(blog)}>remove</button>        
        </div>
      </div>
    </div>  
  )
  }

export default Blog