const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("GET /api/auth", () => {
  it("should be able to sign up a new user", (done) => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "personal@email.com",
        password: "secretcode",
      })
      .set("Accept", "application/json")
      .expect((response) => {
        console.log(response.body);
      })
      .expect(202, done);
  });
  it("should be able to log a user in", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "personal@email.com", password: "secretcode" })
      .set("Accept", "application/json")
      .expect((response) => {
        console.log(response.body);
      })
      .expect(200, done);
  });
});
