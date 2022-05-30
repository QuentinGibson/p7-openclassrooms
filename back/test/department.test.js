const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("GET /api/department", () => {
  it("should get all departments", (done) => {
    request(app)
      .get("/api/department")
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("department"));
        done;
      });
  });
  it("should be able to get department by id", (done) => {
    request(app)
      .get("/api/department/1")
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("department"));
        done;
      });
  });
});
describe("POST /api/department", () => {
  it("should be able to create a department", (done) => {
    request(app)
      .post("/api/deparment/")
      .send({ user_id: 1, title: "foo" })
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
      });
  });
});

describe("PUT /api/department", () => {
  it("should be able to update a department by id", (done) => {
    request(app)
      .post("/api/deparment/1")
      .send({ user_id: 1, title: "foo" })
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
      });
  });
});

describe("DELETE /api/department", () => {
  it("should be able to delete a department by id", (done) => {
    request(app)
      .delete("/api/deparment/1")
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
      });
  });
});
