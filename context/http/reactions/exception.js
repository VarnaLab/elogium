module.exports = function(err, req, res, next) {
  if(!err.code) return next()
  res.writeHead(err.code)
  res.end(err.message)
}