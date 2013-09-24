var Elogium = require("../../index")

module.exports.apiendpoint = "http://localhost:1338/api"

module.exports.startCell = function(next){
  process.env.CELL_MODE = "test"
  instance = new Elogium()
  instance.plasma.on("Mongoose", function(){
    next()
  })
}

module.exports.stopCell = function(next){
  instance.kill()
  instance = null
  next()
}