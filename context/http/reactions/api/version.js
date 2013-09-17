var version = require(process.cwd()+"/package.json").version;

module.exports = function(req, res, next){
  res.end(version);
}