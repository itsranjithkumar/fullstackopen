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
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has one blog equals its likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of bigger list equals sum of likes', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 30)
  })
})