//import section
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
//DB connection
mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connection.on("connected", () => {
	console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
	console.log("mongodb failed with", err);
});
//import routes
const routerAuth = require("./routes/auth.routes");
const routerUser = require("./routes/user.routes");
const routerBlog = require("./routes/blog.routes");
const routerTag = require("./routes/tag.routes");
const routerStory = require("./routes/story.routes");
const routerReaction = require("./routes/reaction.routes");
const routerFollow = require("./routes/follow.routes");
const routerComment = require("./routes/comment.routes");
const routerFeed = require("./routes/feed.routes");
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//routes middleware
app.use("/api/feed", routerFeed);
app.use("/api/auth", routerAuth);
app.use("/api/users", routerUser);
app.use("/api/blogs", routerBlog);
app.use("/api/tags", routerTag);
app.use("/api/stories", routerStory);
app.use("/api/reactions", routerReaction);
app.use("/api/follows", routerFollow);
app.use("/api/comments", routerComment);
//server listening
const port = 8000;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
