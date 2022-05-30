const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("POST /api/message/:room_id", () => {
  it("should be able to get all messages for a room", (done) => {
    request(app)
      .post("/api/message/1")
      .send({user_id: 1})
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
        assert(res.body.hasownproperty("messages"));
        done
      })
  })
})

describe("POST User actions", () => {
  it("should be able to mark a message as seen", (done) => {
    request(app)
      .post("/api/message/1/seen")
      .send({user_id: 1 })
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasownproperty("message"));
      })
  })
  describe("POST /api/message/:room_id/report", () => {
    it("should be able to mark a message as reported", (done) => {
      request(app)
        .post("/api/message/1/report")
        .send({user_id: 1 })
        .expect(200, (err, res) => {
          if (err) throw err;
          assert(res.body.hasownproperty("message"));
        })
    })
  })
  describe("DELETE /api/message/:room_id/delete", () => {
    it("should be able to delete a message from a room", (done) => {
      request(app)
        .post("/api/message/1/delete")
        .send({ user_id: 1})
        .expect(200, (err, res) => {
          if (err) throw err;
          assert(res.body.hasownproperty("message"));
          done
        })
    })
  })
  describe("POST /api/message/:room_id/create", () => {
    it("should be able to create a new message for a room", (done) => {
      request(app)
        .post("/api/message/1/create")
        .send({body: "foobar", user_id: 1})
        .expect(200, (err, res) => {
          if (err) throw err;
          assert(res.body.hasownproperty("message"));
          done
        })
    })
  })
})
