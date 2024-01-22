import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h3>Save new blog</h3>
      <form onSubmit={addBlog}>
        <div>
            title
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={event => setTitle(event.target.value)}
            placeholder='title of the blog'
          />
        </div>
        <div>
            author
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={event => setAuthor(event.target.value)}
            placeholder='blog author'
          />
        </div>
        <div>
            url
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={event => setUrl(event.target.value)}
            placeholder='link to blog'
          />
        </div>
        <button id='save-button' type="submit">save</button>
      </form>
    </>
  )
}
export default BlogForm