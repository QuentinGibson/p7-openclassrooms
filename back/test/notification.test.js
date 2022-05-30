const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("POST /api/notification/", () => {
  it("should be able to get all notifications for a user", (done) => {
    request(app)
      .post("/api/notification/1")
      .send({user_id: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("notifications"));
        done
      })
  })
})
describe("POST /api/notification/create", () => {
  it("should be able to get all messages for a room", (done) => {
    request(app)
      .post("/api/job/1")
      .send({user_id: 1, body: "foobar was created"})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("notifications"));
        done
      })
  })
})

describe("POST /api/notification/seen", () => {
  it("should be able to set notifications to seen for a user", (done) => {
    request(app)
      .post("/api/notification/seen")
      .send({user_id: 1, notification: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})

describe("DELETE /api/notification/hide", () => {
  it("should be able to hide notifications for a user", (done) => {
    request(app)
      .post("/api/notification/hide")
      .send({user_id: 1, notification: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        done
      })
  })
})
