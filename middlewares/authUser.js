module.exports = (req, res, next) => {
  if (req.session.user !== undefined) {
    res.locals.user = req.session.user
  }

  // console.log(res.locals.user)
  next()
}
