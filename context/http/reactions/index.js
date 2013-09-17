var url_parser = require("url");

module.exports = function(c, next){
  if(url_parser.parse(c.req.url).pathname != "/") return next();
  
  c.res.end("Hello from elogium "+JSON.stringify(c.req.body));
}