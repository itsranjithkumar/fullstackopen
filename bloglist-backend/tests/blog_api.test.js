const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)

  const user = new User({
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash
  })

  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: 'mluukkai',
      password: 'sekret'
    })
    .expect(200)

  token = loginResponse.body.token

  const blogsWithUser = helper.initialBlogs.map(b => ({
    ...b,
    user: user.id
  }))

  await Blog.insertMany(blogsWithUser)
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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Ranjith',
    url: 'https://example.com/blog'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

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
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Missing URL',
    author: 'Ranjith',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('likes of a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 100 })
    .expect(200)

  assert.strictEqual(response.body.likes, 100)
})

after(async () => {
  await mongoose.connection.close()
})