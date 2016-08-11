module.exports = (req, res, next) => {
  req.flash = (type, content) => {
    if (req.session.flash === undefined) {
      req.session.flash = {}
    }
    req.session.flash[type] = content
  }

  if (req.session.flash) {
    res.locals.flash = req.session.flash
    req.session.flash = undefined
  }

  next()
}
