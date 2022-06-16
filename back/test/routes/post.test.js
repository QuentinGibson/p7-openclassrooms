const request = require("supertest");
const assert = require("assert");
const app = require("../app");

describe("GET /api/post", () => {
  it("should return a list of posts", (done) => {
    request(app)
      .get("/api/post")
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasOwnProperty("message"));
        assert(res.body.hasOwnProperty("posts"));
        done;
      });
  });
  describe("GET /api/post/:post_id", () => {
    it("should return the data for {post_id}", (done) => {
      request(app)
        .get("/api/post/1")
        .expect(200, (err, res) => {
          if (err) throw err;
          assert(res.body.hasOwnProperty("message"));
          assert(res.body.hasOwnProperty("post"));
          done;
        });
    });
  });
});
describe("POST /api/post", () => {
  it("should create a new post", (done) => {
    request(app)
      .post("/api/post")
      .send({ title: "foo", image: "fakeurl.com", topic: [1, 2, 3] })
      .set("Accept", "application/json")
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasOwnProperty("message"));
        assert(res.body.hasOwnProperty("post_id"));
        done;
      });
  });
  it("should update a post by id", (done) => {
    request(app)
      .post("/api/post/1")
      .send({ title: "bar", topic: [3] })
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert(res.body.hasOwnProperty("message"));
        done;
      });
  });
});

describe("PUT /api/post", () => {
  it("should update post by id", (done) => {
    request(app)
      .put("/api/post/1")
      .field("title", "change test")
      .set("Accept", "application/json")
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasOwnProperty("message"));
        done;
      });
  });
});
describe("DELETE /api/post", () => {
  it("should delete post by id", (done) => {
    request(app)
      .delete("api/post/1")
      .expect(200, (err, res) => {
        if (err) throw err;
        assert(res.body.hasOwnProperty("message"));
        done;
      });
  });
});
