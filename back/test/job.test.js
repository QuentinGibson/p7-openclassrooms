const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("GET /api/job", () => {
  it("should be able to get all jobs for all departments", (done) => {
    request(app)
      .post("/api/job/")
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("jobs"));
        done;
      });
  });
  describe("GET /api/job/:department_id", () => {
    it("should be able to get all jobs for a department by id", (done) => {
      request(app)
        .get("/api/job/department/1")
        .expect(200, (err, res) => {
          if (err) throw err;
          assert(res.body.hasownproperty("message"));
          assert(res.body.hasownproperty("jobs"));
          done;
        });
    });
  });
  describe("GET /api/job/:job_id", () => {
    it("should be able to get a job from its id", (done) => {
      request(app)
        .get("/api/job/1")
        .expect(200, (err, res) => {
          if (err) throw err;
          assert(res.body.hasownproperty("message"));
          assert(res.body.hasownproperty("job"));
          done;
        });
    });
  });
});

describe("POST /api/job/:department_id", () => {
  it("should be able to create a job for department by department_id", (done) => {
    request(app)
      .post("/api/job/1")
      .send({ title: "foo" })
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done;
      });
  });
});

describe("PUT /api/job/:job_id", () => {
  it("should be able to update a job by its id", (done) => {
    request(app)
      .put("/api/job/1")
      .send({ title: "bar" })
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done;
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
        done;
      });
  });
});
