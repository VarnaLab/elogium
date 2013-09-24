var crud = require("organic-reactions-mongoose-crud").crud
var Additive = require("../../../models/Additive")

module.exports.init = function(plasma, config, url) {
  return crud(url, Additive)
}