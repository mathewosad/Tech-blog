const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET /api/users
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with users
    const postData = await Post.findAll({
      attributes: ["id", "post_title", "post_body", "date_created"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // this is the data we want to send back
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// this is the route for the login page
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "post_title", "post_body", "date_created"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_body",
            "post_id",
            "user_id",
            "date_created",
          ],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("single-post", { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// this is the route for dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // this finds all posts and joins with users
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// this is the route for the create post page and the post route for the create post page and edit 
router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "comment_body",
            "post_id",
            "user_id",
            "date_created",
          ],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("edit-post", {
      post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//this lets you loggin in 
router.get("/login", (req, res) => {
  // this is the data we want to send back if the user is logged in and already has a session
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
