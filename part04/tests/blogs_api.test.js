const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
var assert = require('assert')
//if the server is not already listening for connections then it is 
//bound to an ephemeral port for you so there is no need to keep track of ports.
const api = supertest(app)

const Blog = require('../models/blog')

const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    /*
    const blogObjects = helper.initialNotes
      .map(blog => new Note(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    */

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 6)
})

after(async () => {
    await mongoose.connection.close()
})