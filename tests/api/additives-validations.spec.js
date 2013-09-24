var helpers = require("../helpers")
var request = require("request")

describe("additives crud validations", function(){

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
      next()
    })
  })

  it("creates new additive with same shortId", function(next){
    request.post({
      uri: helpers.apiendpoint+"/additives/create",
      json: {
        "shortId": "E100",
        "name": "Curcumin",
        "description": "Yellow-orange"
      }
    }, function(err, res, body){
      expect(res.statusCode).toBe(400)
      expect(body).toContain("duplicate shortId")
      next()
    })
  })

  it("stops", function(next){
    helpers.stopCell(next)
  })
})