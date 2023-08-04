// implement your posts router here
const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

// Posts Endpoints

// get All posts: --------------------------
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      if (!posts) {
        res.status(404);
      }
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        error: error.message,
        stack: error.stack,
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
          message: "The post with the specified ID does not exist",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "The post information could not be retrieved",
        error: error.message,
        stack: error.stack,
      });
    });
});

// post insert: ------------------------------------    works
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({ message: "Please provide title and contents" });
  } else {
    Posts.insert({ title, contents })
      .then(({ id }) => {
        return Posts.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
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

// post update by id: -------------------------------- works
router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.findById(req.params.id)
      .then((stuff) => {
        if (!stuff) {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        } else {
          return Posts.update(req.params.id, req.body);
        }
      })
      .then((updated) => {
        if (updated) {
          return Posts.findById(req.params.id);
        }
      })
      .then((post) => {
        res.json(post);
      })
      .catch((error) => {
        res.status(500).json({
          message: "The post information could not be modified",
          error: error.message,
          stack: error.stack,
        });
      });
  }
});

// post delete by id: -----------------------------------

router.delete("/:id", async (req, res) => {
  const post_id = req.params.id;
  const post = await Posts.findById(post_id);
  if (!post) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  } else {
    await Posts.remove(post_id);
    res.json(post);
  }
  try {
    Posts.remove(post_id);
  } catch (error) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

module.exports = router;
