var mongoose = require("mongoose")
var error = require("organic-alchemy").http.error

var schema = mongoose.Schema({
  shortId: String,
  name: String,
  description: String
})

module.exports = mongoose.model("Additive", schema)

var oldCreate = module.exports.create
module.exports.create = function(data, next) {
  var self = this
  module.exports.findOne({shortId: data.shortId}, function(err, found){
    if(found) return next(error("duplicate shortId", 400), null);
    oldCreate.call(self, data, next)
  })
}