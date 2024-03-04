const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.user.username}
  </div>
)

export default Blog