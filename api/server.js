// implement your server here
// require your posts router and connect it here

const express = require("express");

const postsRouter = require("./posts/posts-routers");
const commentsRouter = require("./posts/comments-routers");

const server = express();
server.use(express.json());
server.use("/api/posts", postsRouter);
server.use("/api/comments", commentsRouter);

// end points
server.get("/", (req, res) => {
  res.send(`HOME PAGE`);
});

module.exports = server;
