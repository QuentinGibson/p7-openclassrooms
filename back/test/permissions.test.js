const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("POST /api/permission/", () => {
  it("should be able to get all permissions" , (done) => {
    request(app)
      .post("/api/permission/")
      .send({user_id: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("permissions"));
        done
      })
  })
})

describe("POST /api/permission/create", () => {
  it("should be able to create a permission", (done) => {
    request(app)
      .post("/api/permission/1")
      .send({user_id: 1, title: "foobar"})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})
describe("POST /api/permission/update", () => {
  it("should be able to update a permission by id", (done) => {
    request(app)
      .post("/api/permission/update")
      .send({user_id: 1, permission_id: 2})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})
describe("DELETE /api/permission/delete", () => {
  it("should be able to remove a permission by id", (done) => {
    request(app)
      .post("/api/permission/delete")
      .send({user_id: 1, permission_id: 2})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})
