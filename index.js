var util = require("util")

var DNA = require("organic").DNA
var Cell = require("organic").Cell
var mongoose = require("mongoose")

process.env.CELL_MODE = process.env.CELL_MODE || "development"

module.exports = function() {
  var dna = new DNA();
  var self = this;

  dna.loadDir(process.cwd()+"/dna", function(){

    if(dna[process.env.CELL_MODE])
      dna.mergeBranchInRoot(process.env.CELL_MODE);
    
    Cell.call(self, dna) // cell construction - plasma & nucleus

    mongoose.connect('localhost', dna.database.name); // connect to MongoDB

    self.emit({type: "build", branch: "membrane"}); // build membrane organelles
    self.emit({type: "build", branch: "plasma"}); // build plasma organelles
    console.info("started")
  });
}

util.inherits(module.exports, Cell);

module.exports.prototype.kill = function(){
  mongoose.disconnect();
  this.plasma.emit("kill");
}

// start the cell if this file is not required
if(!module.parent)
  new module.exports();