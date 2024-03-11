const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog)
    response.json(blog);
  else
    response.status(404).end()
})

blogRouter.post('/', async (request, response) => {

  if (!request.hasOwnProperty("token") || !request.hasOwnProperty("user")) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(request.user)

  request.body["user"] = request.user;

  if (!request.hasOwnProperty("likes"))
    request.body["likes"] = 0;

  const blog = new Blog(request.body)

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {

  if (!request.hasOwnProperty("token") || !request.hasOwnProperty("user")) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(401).json({ error: 'blog not found' })
  }

  console.log("blg user", blog.user)

  if (request.user.toString() != blog.user.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
})

blogRouter.put('/:id', async (request, response) => {

  if (!request.hasOwnProperty("token")) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const body = request.body

  //TODO: should not we also add the user id?
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedblog)
})

module.exports = blogRouter