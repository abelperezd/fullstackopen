import './Blog.css'

const Blog = ({ blog }) => (
  <div id='blg'>
    {blog.title} <span id='author'> - {blog.author}</span>
  </div>
)

export default Blog