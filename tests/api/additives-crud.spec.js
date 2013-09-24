var helpers = require("../helpers")
var request = require("request")

describe("additives crud", function(){

  var additiveData;

  it("starts", function(next){
    helpers.startCell(next)
  })

  it("creates new additive", function(next){
    request.post({
      uri: helpers.apiendpoint+"/additives/create",
      json: {
        "shortId": "E100",
        "name": "Curcumin",
        "description": "Yellow-orange"
      }
    }, function(err, res, body){
      expect(body._id).toBeDefined()
      expect(body.shortId).toBe("E100")
      additiveData = body
      next()
    })
  })

  it("list additives", function(next){
    request.get({
      uri: helpers.apiendpoint+"/additives/list",
      json: {}
    }, function(err, res, body){
      expect(body.length).toBe(1)
      expect(body[0]._id).toBe(additiveData._id)
      next()
    })
  })

  it("retrieve additive by id", function(next){
    request.get({
      uri: helpers.apiendpoint+"/additives/"+additiveData._id,
      json: {}
    }, function(err, res, body){
      expect(body._id).toBe(additiveData._id)
      expect(body.shortId).toBe(additiveData.shortId)
      next()
    })
  })

  it("delete additive by id", function(next){
    request.del({
      uri: helpers.apiendpoint+"/additives/"+additiveData._id,
      json: {}
    }, function(err, res, body){
      expect(body._id).toBe(additiveData._id)
      expect(body.shortId).toBe(additiveData.shortId)
      
      request.get({
        uri: helpers.apiendpoint+"/additives/list",
        json: {}
      }, function(err, res, body){
        expect(body.length).toBe(0)
        next()
      })
    })
  })

  it("stops", function(next){
    helpers.stopCell(next)
  })
})