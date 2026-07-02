const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  } else {
    req.token = null
  }

  next()
}

module.exports = tokenExtractor