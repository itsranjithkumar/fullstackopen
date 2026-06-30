const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testing with SuperTest',
    author: 'Ranjith Kumar',
    url: 'https://fullstackopen.com',
    likes: 25
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length + 1
  )

  const titles = blogsAtEnd.map(blog => blog.title)

  assert(titles.includes('Testing with SuperTest'))
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Ranjith',
    url: 'https://example.com/blog'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Ranjith',
    url: 'https://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length
  )
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Missing URL',
    author: 'Ranjith',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length
  )
})

after(async () => {
  await mongoose.connection.close()
})