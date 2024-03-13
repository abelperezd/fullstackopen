//import './BlogForm.css'
import { useState } from 'react'

const BlogForm = ({ addBlog, setNotificationMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const tryAddBlog = (event) => {
    event.preventDefault()

    if (!title || !author || !url) {
      setNotificationMessage('red', 'Some fields are empty.')
      return
    }

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    setAuthor('')
    setTitle('')
    setUrl('')

    addBlog(blogObject)
  }

  return (
    <form onSubmit={tryAddBlog}>
      <div className="inputContainer">
        <input
          type="text"
          value={title}
          name="Title"
          placeholder='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="inputContainer">
        <input
          type="text"
          value={author}
          name="Author"
          placeholder='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className="inputContainer">
        <input
          type="text"
          value={url}
          name="Url"
          placeholder='URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button className='greenBtn' type="submit">Add blog</button>

    </form>
  )
}
export default BlogForm