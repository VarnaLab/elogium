var util = require("util")

var DNA = require("organic").DNA
var Cell = require("organic").Cell
var Plasma = require("organic").Plasma

process.env.CELL_MODE = process.env.CELL_MODE || "development"

module.exports = function() {
  var dna = new DNA();
  var self = this;

  this.plasma = new Plasma()

  dna.loadDir(process.cwd()+"/dna", function(){

    if(dna[process.env.CELL_MODE])
      dna.mergeBranchInRoot(process.env.CELL_MODE);
    
    Cell.call(self, dna) // cell construction - plasma & nucleus
    
    self.emit({type: "build", branch: "membrane"}); // build membrane organelles
    self.emit({type: "build", branch: "plasma"}); // build plasma organelles
  });
}

util.inherits(module.exports, Cell);

module.exports.prototype.kill = function(){
  this.plasma.emit("kill");
}

// start the cell if this file is not required
if(!module.parent)
  new module.exports();