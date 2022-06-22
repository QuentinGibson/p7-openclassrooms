const Post = require("../models/Post");
module.exports = {
  getRecentPosts: async (req, res, next) => {
    await Post.findAll({})
      .then((posts) => {
        res.status(200).json({
          message: "Successfully retrieved posts",
          posts,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed to retrieve posts",
          error,
        });
      });
  },
  getPostById: async (req, res, next) => {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.status(200).json({
        message: "Successfully retrieved post!",
        post: post.toJSON(),
      });
    } else {
      res.status(500).json({
        message: "No post found!",
      });
    }
  },
  createPost: async (req, res, next) => {
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      const { title } = req.body.post;
      const imageUrl = url + "/images/" + req.file.filename;
      const post = await Post.create({ title, image: imageUrl }).catch(
        (error) => {
          res.status(500).json({
            message: "Failed to create post",
            error,
          });
        }
      );
      res.status(200).json({
        message: "Post successfully created",
        post: post.toJSON(),
      });
    } else {
      res.status(500).json({
        message: "No image found. Please add an image",
      });
    }
  },
  updatePost: async (req, res, next) => {
    if (req.file) {
      req.body.post = JSON.parse(req.body.post);
      const url = req.protocol + "://" + req.get("host");
      const { title } = req.body.post;
      const imageUrl = url + "/images/" + req.file.filename;
      const post = await Post.findByPk(req.params.id);
      post.image = imageUrl;
      post.title = title;
      post
        .save()
        .then(() => {
          res.status(200).json({
            message: "Post saved successfully",
            post: post.toJSON(),
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Failed to save post",
            error,
          });
        });
    } else {
      const { title } = req.body;
      const post = await Post.findByPk(req.params.id);
      post.title = title;
      post.save();
      res.status(200).json({
        message: "Post saved successfully!",
        post: post.toJSON(),
      });
    }
  },
  deletePost: async (req, res, next) => {
    const post = await Post.findByPk(req.params.id);
    await post
      .destroy()
      .then(() => {
        res.status(200).json({
          message: "Successfully deleted post!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed to delete post!",
          error,
        });
      });
  },
};
