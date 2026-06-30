const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) =>
    blog.likes > favorite.likes ? blog : favorite
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = {}

  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + 1
  })

  let topAuthor = ''
  let maxBlogs = 0

  for (const author in authors) {
    if (authors[author] > maxBlogs) {
      maxBlogs = authors[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = {}

  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes
  })

  let topAuthor = ''
  let maxLikes = 0

  for (const author in authors) {
    if (authors[author] > maxLikes) {
      maxLikes = authors[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}