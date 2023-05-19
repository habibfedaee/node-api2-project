// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

// Posts Endpoints

// get All posts: --------------------------
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

// get post by id: --------------------------
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post information could not be retrieved",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the post" });
    });
});

// post insert: ------------------------------------
router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res.status(400).json({ message: "Please provide title and contents" });
  } else {
    Posts.insert(post)
      .then((createdPost) => {
        res.status(201).json(createdPost);
      })
      .catch((error) => {
        res.status(500).json({
          message: "There was an error while saving the post",
          error: error.message,
          stack: error.stack,
        });
      });
  }
});

// post update by id: --------------------------------
router.put("/:id", async (req, res) => {
  try {
    const possiblePost = await Posts.findById(req.params.id);
    const post = req.body;
    if (!possiblePost) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else if (!post.title || !post.contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const updatedPost = await Posts.update(req.params.id, post);
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res.status(500).json({
      message: "The post information could not be modified",
      error: error.message,
      stack: error.stack,
    });
  }
});

// post delete by id: -----------------------------------

router.delete("/:id", async (req, res) => {
  Posts.remove(req.params.id).then((count) => {
    if (count > 0) {
      res.status(200).json({ message: "deleted" });
    } else {
      res
        .status(404)
        .json({ message: "the post with the specified ID does not exist" });
    }
  });
});

module.exports = router;
