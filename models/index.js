const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// this defines our relations between the models and sequelize will automatically create the tables for us
User.hasMany(Post, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// this exports our models so they can be used in other files
module.exports = { User, Post, Comment };