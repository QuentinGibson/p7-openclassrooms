const Post = require("../models/Post");
module.exports = {
  getRecentPosts: async (res, req, next) => {
    await Post.findAndCountAll({
      groupedLimit: "20",
    })
      .then(([count, group]) => {
        const posts = group.map((post_group) =>
          post_group.map((post) => post.toJson())
        );
        res.status(200).json({
          message: "Successfully retrieved posts",
          posts,
          count,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed to retrieve posts",
          error,
        });
      });
  },
  getPostById: async (res, req, next) => {
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
  createPost: async (res, req, next) => {
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      req.body.post = JSON.parse(req.body.post);
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
  updatePost: async (res, req, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { user_id } = decodedToken;
    if (req.file) {
      if (!user_id !== req.body.post.user_id) {
        return res.status(400).json({
          message: "Failed to update post",
        });
      }
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
      if (!user_id !== req.body.user_id) {
        return res.status(400).json({
          message: "Failed to update post",
        });
      }
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
  deletePost: async (res, req, next) => {
    const post = Post.findByPk(req.params.id);
    await post.destroy().then(() => {
      res
        .status(200)
        .json({
          message: "Successfully deleted post!",
        })
        .catch((error) => {
          res.status(500).json({
            message: "Failed to delete post!",
            error,
          });
        });
    });
  },
};
