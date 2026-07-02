const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, process.env.SECRET)

    if (!decoded.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    req.user = await User.findById(decoded.id)
    next()
  } catch (error) {
    res.status(401).json({ error: 'token missing or invalid' })
  }
}

module.exports = userExtractor