import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage('Login successful')
      setTimeout(() => {setMessage(null)}, 5000)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('wrong credentials')
      setErrorMessage(error.response.data.error)
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogUser')
      setUser(null)
      setMessage('Logout successful')
      setTimeout(() => {setMessage(null)}, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log('returnedblog', returnedBlog)
        setMessage(`${returnedBlog.title} by ${returnedBlog.author} added`)
        blogFormRef.current.toggleVisibility()
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        console.log('error', error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
  }

  const updateLikes = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(updatedBlog)
      setBlogs(blogs => blogs
        .map(b => (b.id === returnedBlog.id ? returnedBlog : b))
        .sort((a, b) => b.likes - a.likes)
      )
      setMessage(`${returnedBlog.title} by ${returnedBlog.author} liked`)
      setTimeout(() => {setMessage(null)}, 5000)
    } catch (error) {
      console.log('error', error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) {
      const filteredBlogs = blogs.filter((b) => (b.id !== blog.id))
      try {
        await blogService.remove(blog.id)
        setBlogs(filteredBlogs)
        console.log('removed')
        setMessage('Blog removed.')
        setTimeout(() => {setMessage(null)}, 5000)
      } catch (error) {
        setErrorMessage('error in deleting')
        setTimeout(() => {setErrorMessage(null)}, 5000)
      }
    }
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <Notification
        message={message}
        errorMessage={errorMessage}
      />
      {!user && loginForm()}
      {user && <div>
        <p>Logged in as {user.name}</p>
        <button id='logout-button' onClick={handleLogout}>Log Out</button>
        {blogForm()}
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
            loggedUser={user.name}
          />
        )}
      </div>
      }
    </div>
  )
}

export default App