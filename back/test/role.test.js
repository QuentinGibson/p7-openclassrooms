const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("POST /api/role/", () => {
  it("should be able to get all roles", (done) => {
    request(app)
      .post("/api/role/")
      .send({user_id: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("roles"));
        done
      })
  })
})


describe("POST /api/role/:role_id", () => {
  it("should be able to get a role by id", (done) => {
    request(app)
      .post("/api/role/1")
      .send({user_id: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("roles"));
        done
      })
  })
})


describe("POST /api/role/create", () => {
  it("should be able to create a new role", (done) => {
    request(app)
      .post("/api/role/create")
      .send({user_id: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})


describe("PUT /api/role/:role_id", () => {
  it("should be able to update role by id", (done) => {
    request(app)
      .post("/api/role/1")
      .send({user_id: 1, title: 'bar'})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})


describe("DELETE /api/role/:role_id", () => {
  it("should be able to delete a role by id", (done) => {
    request(app)
      .delete("/api/role/1")
      .send({user_id: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})


describe("POST /api/role/:role_id/add", () => {
  it("should be able to get all messages for a room", (done) => {
    request(app)
      .post("/api/role/1/add")
      .send({user_id: 1, permission_id: 2})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})


describe("POST /api/role/:role_id/remove", () => {
  it("should be able to remove permission from a role", (done) => {
    request(app)
      .post("/api/role/1/remove")
      .send({user_id: 1, permission_id: 2})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})

