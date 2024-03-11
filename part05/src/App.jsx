import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./Notification"
import './App.css'
import './components/BlogForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  const blogToggleRef = useRef();
  const loginToggleRef = useRef();

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
      loginToggleRef.current.toggleVisibility()
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
    loginToggleRef.current.toggleVisibility()
  }

  const addBlog = (blogObject) => {
    blogToggleRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage("green", `New blog '${returnedBlog.title}' added`)
      })
  }

  return (
    <div>
      <Notification message={notification} />
      {user == null ?
        <Togglable buttonLabel='Login' ref={loginToggleRef}>
          <LoginForm
            handleLogin={handleLogin} username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
          />
        </Togglable>
        :
        <div>
          <button
            type="submit" id='logoutButton' onClick={handleLogOut}>Logout</button>
          <br />
          <br />
        </div>}

      {user != null &&
        <Togglable buttonLabel='New blog' ref={blogToggleRef}>
          <BlogForm
            addBlog={addBlog} setNotificationMessage={setNotificationMessage}
          />
        </Togglable>
      }

      <h2>BLOGS</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Blog blog={blog} />
          <br />
        </div>
      )}
    </div>
  )
}

export default App