import './Blog.css'
import Togglable from './Togglable'
import { useRef } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ myUser, blog, handleLikeBtnPressed, handleRemoveBtnPressed }) => {

  const toggleRef = useRef()

  return (
    <div id='blg'>
      {blog.title}
      <Togglable buttonLabel='Show' cancel='Hide' ref={toggleRef}>
        <ul id='list'>
          <li><span className='title'>Author:</span> <span className='content'>{blog.author}</span></li>
          <li><span className='title'>Url:</span> <span className='content'>{blog.url}</span></li>
          <li><span className='title'>User:</span> <span className='content'>{blog.user.username}</span></li>
          <li><span className='title'>Likes:</span> <span className='content'>{blog.likes} </span>
            <button id='likeBtn' onClick={() => handleLikeBtnPressed(blog)}>&#128077;</button></li>
        </ul>
        {myUser !== null && blog.user.username === myUser.username ?
          <div><button id='deleteBtn' onClick={() => handleRemoveBtnPressed(blog)}>&#x1F5D1;</button></div>
          : <></>
        }
        <br />
      </Togglable>
    </div>
  )
}

//myUser, blog, handleLikeBtnPressed, handleRemoveBtnPressed }

Blog.propTypes = {
  myUser: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  handleLikeBtnPressed: PropTypes.func.isRequired,
  handleRemoveBtnPressed: PropTypes.func.isRequired,
}

export default Blog