const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Ranjith',
    url: 'https://example.com/html',
    likes: 5
  },
  {
    title: 'Node.js Basics',
    author: 'John',
    url: 'https://example.com/node',
    likes: 10
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}