const request = require("supertest");
const Post = require("../models/Post");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const app = require("../app");

const superrequest = request(app);
describe("API POST", () => {
  const jwtSpy = sinon.stub(jwt, "verify");
  jwtSpy.returns({ user_id: 1 });
  before(async () => {
    await Post.bulkCreate([
      { title: "Jack Sparrow", image: "fake.com" },
      { title: "Davy Jones", image: "reallyfake.com" },
    ]);
  });
  describe("GET /api/post", () => {
    it("should return a list of posts", (done) => {
      superrequest
        .get("/api/post/")
        .expect((response) => {
          console.log(response.body);
        })
        .expect(200, done);
    });
    describe("GET /api/post/:post_id", () => {
      it("should return the data for ${post_id}", (done) => {
        superrequest
          .get("/api/post/1")
          .auth("personal@email.com", "secretcode")
          .expect((response) => {
            console.log(response.body);
          })
          .expect(200, done);
      });
    });
  });
  describe("POST /api/post", () => {
    it("should create a new post", (done) => {
      superrequest
        .post("/api/post")
        .auth("personal@email.com", "secretcode")
        .field("post[user_id]", 1)
        .field("post[title]", "foo")
        .attach("image", `${__dirname}/image/test.png`)
        .expect((response) => {
          console.log(response.body);
        })
        .expect(200, done);
    });
    it("should update a post by id", (done) => {
      superrequest
        .put("/api/post/1")
        .auth("personal@email.com", "secretcode")
        .send({ title: "bar", user_id: 1 })
        .set("Accept", "application/json")
        .expect((response) => {
          console.log(response.body);
        })
        .expect(200, done);
    });
    it("should update a post by id, including image", (done) => {
      superrequest
        .put("/api/post/1")
        .auth("personal@email.com", "secretcode")
        .field("post[title]", "foobar")
        .field("post[user_id]", 1)
        .attach("image", `${__dirname}/image/test2.png`)
        .set("Accept", "application/json")
        .expect((response) => {
          console.log(response.body);
        })
        .expect(200, done);
    });
  });
  describe("DELETE /api/post", () => {
    it("should delete post by id", (done) => {
      superrequest
        .delete("/api/post/1")
        .auth("personal@email.com", "secretcode")
        .expect((response) => {
          console.log(response.body);
        })
        .expect(200, done);
    });
  });
});
