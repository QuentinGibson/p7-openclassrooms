const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("GET /api/auth", () => {
  it("should be able to sign up a new user", (done) => {
    request(app)
      .get("/api/auth/signup")
      .send({
        email: "personal@email.com",
        password: "secrectcode",
      })
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done;
      });
  });
  it("should be able to log a user in", (done) => {
    request(app)
      .get("/api/auth/login")
      .send({ email: "personal@email.com", password: "secretcode" })
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("token"));
        done;
      });
  });
});