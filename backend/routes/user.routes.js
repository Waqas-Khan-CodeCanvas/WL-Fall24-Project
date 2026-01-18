const router = require("express").Router();
const controller = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

// USER → only their own profile
router.get("/me", auth, controller.getMyProfile);

module.exports = router;
