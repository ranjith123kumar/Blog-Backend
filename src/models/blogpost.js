const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  title: {type: String},
  slug: {type: String},
  content:{type: String},
  author:{type: String},
  tag:{type: String},
  image:{type: String}
},{collation:"BlogPost" });

const BlogPostModel = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPostModel;