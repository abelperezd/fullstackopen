import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./Notification"
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (user === null) {
      let u = window.localStorage.getItem('loggedNoteappUser');
      if (u) {
        u = JSON.parse(u);
        blogService.setToken(u.token)
        setUser(u);
      }
    }
  })

  useEffect(() => {
    // Check if the user is not null before fetching blogs
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [user]);

  const setNotificationMessage = (color, message) => {
    setNotification({
      color: color,
      text: message
    })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage("red", "Wrong user o password")
      console.log("exception", exception)
    }
  }

  const handleLogOut = () => {
    setUser(null);
    setBlogs([])
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const addBlog = (event) => {
    event.preventDefault()

    if (!title || !author || !url) {
      setNotificationMessage("red", "Some fields are empty.")
      return;
    }

    const blogObject = {
      title: title,
      author: author,
      url: url
    }


    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage("green", `New blog ${title} added`)
        setAuthor('')
        setTitle('')
        setUrl('')
      })

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div className="inputContainer">
        Username
        <br />
        <input
          type="text"
          value={username}
          name="Username"
          placeholder='User name'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="inputContainer">
        Password
        <br />
        <input
          type="Password"
          value={password}
          name="Password"
          placeholder='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className='greenBtn' type="submit">Login</button>
    </form>
  )

  const logOut = () => (
    <div>
      <button
        type="submit" id='logoutButton' onClick={handleLogOut}>Logout</button>
    </div>

  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
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

  const formsAndButtons = () => {
    if (user === null) {
      return loginForm() //:
    }
    else {
      return (
        <>
          {logOut()}
          <br />
          <br />
          {blogForm()}
          <br />
        </>
      );
    }
  }

  return (
    <div>
      <Notification message={notification} />
      {formsAndButtons()}

      <h2>BLOGS</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App