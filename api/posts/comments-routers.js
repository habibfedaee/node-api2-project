const express = require("express");
const Comments = require("./posts-model");

const router = express.Router();

// get all comments: ------
router.get("/:id/comments", (req, res) => {
  //const possibleCommentID = await req.params.id;
  Comments.findPostComments(req.query)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "Post information could not be retrieved" });
      } else {
        return Comments.findPostComments(req.params.id);
      }
    })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "The post with the specified ID does not exist" });
    });
});
// get comment by id: -----
// insert new comment: -----

module.exports = router;
