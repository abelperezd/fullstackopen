const { describe, test, after, beforeEach } = require('node:test')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
var assert = require('assert')
//if the server is not already listening for connections then it is 
//bound to an ephemeral port for you so there is no need to keep track of ports.
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

describe('get the blogs in multiple ways', () => {
    test('all blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
})

describe('format checks', () => {
    test("id present but not _id", async () => {
        const response = await api.get(`/api/blogs/${helper.initialBlogs[0]._id}`)
        //console.log("result", response.body);
        assert.ok(!('_id' in response.body));
        assert.ok('id' in response.body);
    })
})

describe.only('format checks', () => {
    test.only("add new blog", async () => {
        const newBlog =
        {
            title: "NewBlogTest",
            author: "anyAuthor",
            url: "https://thisisatest.com",
            likes: 0,
        }

        await api.post(`/api/blogs`)
            .send(newBlog)
            .expect(201);

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    })
})

describe('update blogs', () => {
    test("update a blog", async () => {
        const blogToUpdate = helper.initialBlogs[0];
        blogToUpdate.author = "Michael Jordan";
        blogToUpdate.likes = 9

        const response = await api.put(`/api/blogs/${blogToUpdate._id}`) // Include the blog post ID in the URL
            .send(blogToUpdate);

        console.log("result: ", response.body);

        // Assert that the response body contains the updated properties
        assert.strictEqual(response.body.id, blogToUpdate._id);
        assert.strictEqual(response.body.author, blogToUpdate.author);
        assert.strictEqual(response.body.likes, blogToUpdate.likes);
    })
})

describe('deleting blogs', () => {
    test("delete a blog", async () => {
        const blogToDelete = helper.initialBlogs[0];

        await api.delete(`/api/blogs/${blogToDelete._id}`) // Include the blog post ID in the URL
            .send()
            .expect(204);
    })
})

describe('user creation', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('passsHash00', 10)
        const user = new User({ username: 'user1', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'imTheUsername',
            name: 'imTheName',
            password: 'imThepwd',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'user1',
            name: 'usserNAme',
            password: 'papaswordord',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is not valid', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'us',
            name: 'usserNAme',
            password: 'papaswordord',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('Invalid password or username'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is not valid', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'userrrrr',
            name: 'usserNAme',
            password: 'pa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('Invalid password or username'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})