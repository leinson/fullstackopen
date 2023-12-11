

const BlogForm = ({onSubmit, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => {

return (
    <>
    <h3>Save new blog</h3>
      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        
        <button type="submit">save</button>
      </form>  
    </>
  )
}
export default BlogForm