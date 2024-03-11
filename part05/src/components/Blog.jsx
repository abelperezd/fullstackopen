import './Blog.css'
import Togglable from './Togglable'
import { useRef } from 'react'

const Blog = ({ blog }) => {

  const toggleRef = useRef();

  return (
    <div id='blg'>
      {blog.title}
      <Togglable buttonLabel='Show' cancel='Hide' ref={toggleRef}>
        <ul id='list'>
          <li><span className='title'>Author:</span> <span className='content'>{blog.author}</span></li>
          <li><span className='title'>Url:</span> <span className='content'>{blog.url}</span></li>
          <li><span className='title'>User:</span> <span className='content'>{blog.user.username}</span></li>
          <li><span className='title'>Likes:</span> <span className='content'>{blog.likes}</span></li>
        </ul>
      </Togglable>
    </div>
  )
}

export default Blog