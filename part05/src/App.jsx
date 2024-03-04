import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

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
    if (user !== null) {
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => setBlogs(blogs));
    }
  }, [user]);

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

    const blogObject = {
      content: newBlog,
    }

    /*
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      */
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logOut = () => (
    <div>
      <button
        type="submit" onClick={handleLogOut}>Logout</button>
    </div>

  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )

  const formsAndButtons = () => {
    if (user === null) {
      return loginForm() //:
    }
    else {
      //blogForm()
      return logOut()
    }
  }

  return (
    <div>
      {formsAndButtons()}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App