const express = require("express");
const Comments = require("./posts-model");

const router = express.Router();

// get all comments: ------
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Comments.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      const comments = await Comments.findPostComments(req.params.id);
      if (comments.length === 0) {
        res
          .status(404)
          .json({ message: "There are no comments for this post" });
      } else {
        res.json(comments);
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "The comments information could not be found",
      error: error.message,
      stack: error.stack,
    });
  }
});
// get comment by id: -----

router.get("/:postID/commments/:commentID", async (req, res) => {
  try {
    const post = await Comments.findById(req.params.postID);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      const comment = await Comments.findCommentById(req.params.commentID);
      if (comment.length === 0) {
        res.status(404).json({ message: "There are no comment for this post" });
      } else {
        return res.json(comment);
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "The comment information could not be found",
      error: error.message,
      stack: error.stack,
    });
  }
});

// insert new comment: -----

module.exports = router;
