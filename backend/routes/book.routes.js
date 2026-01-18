const router = require("express").Router();
const controller = require("../controllers/book.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// PUBLIC
router.get("/", controller.getAllBooks);
router.get("/:id", controller.getBookById);

// ADMIN ONLY
router.post("/", auth, role("admin"), controller.createBook);
router.delete("/:id", auth, role("admin"), controller.deleteBook);

module.exports = router;
