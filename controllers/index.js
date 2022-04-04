const router = require("express").Router();
// this is the apicontroller
const apiRoutes = require("./api");
// this is the htmlcontroller
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;