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
const { CLIENT_RENEG_WINDOW } = require('tls')

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

test("id present but not _id", async () => {
    const response = await api.get(`/api/blogs/${helper.initialBlogs[0]._id}`)
    //console.log("result", response.body);
    assert.ok(!('_id' in response.body));
    assert.ok('id' in response.body);
})

test.only("add new blog", async () => {
    const newBlog =
    {
        title: "NewBlogTest",
        author: "Test user",
        url: "https://thisisatest.com",
        likes: 0,
    }

    await api.post(`/api/blogs`)
        .send(newBlog)
        .expect(201);

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

after(async () => {
    await mongoose.connection.close()
})