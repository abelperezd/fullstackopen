const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.test')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})


describe('total likes', () => {
    test('when list has no blogs, equals the likes of that', () => {
        const listWithBlogs = [] // Initialize inside the test block
        const result = listHelper.totalLikes(listWithBlogs)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const listWithBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }
        ]
        const result = listHelper.totalLikes(listWithBlogs)
        assert.strictEqual(result, 5)
    })

    test('when list has two blogs, equals the likes of that', () => {
        const listWithBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a676234d17f9',
                title: 'post 2',
                author: 'Jeorge Dummy',
                url: 'https://testpage.com',
                likes: 7,
                __v: 0
            }
        ]
        const result = listHelper.totalLikes(listWithBlogs)
        assert.strictEqual(result, 12)
    })
}) 