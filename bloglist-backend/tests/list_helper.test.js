const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const emptyList = []

  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
  ]

  const listWithManyBlogs = [
    {
      title: 'Blog 1',
      author: 'Author A',
      likes: 5
    },
    {
      title: 'Blog 2',
      author: 'Author B',
      likes: 10
    },
    {
      title: 'Blog 3',
      author: 'Author C',
      likes: 15
    }
  ]

  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes(emptyList), 0)
  })

  test('when list has one blog equals its likes', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('of bigger list equals sum of likes', () => {
    assert.strictEqual(listHelper.totalLikes(listWithManyBlogs), 30)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'Blog A',
      author: 'Author A',
      url: 'http://a.com',
      likes: 5
    },
    {
      title: 'Blog B',
      author: 'Author B',
      url: 'http://b.com',
      likes: 20
    },
    {
      title: 'Blog C',
      author: 'Author C',
      url: 'http://c.com',
      likes: 10
    }
  ]

  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, {
      title: 'Blog B',
      author: 'Author B',
      url: 'http://b.com',
      likes: 20
    })
  })
})