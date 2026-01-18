const router = require("express").Router();
const controller = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// USER
router.post("/", auth, role("user", "admin"), controller.placeOrder);
router.get("/me", auth, role("user", "admin"), controller.getMyOrders);

// ADMIN
router.get("/", auth, role("admin"), controller.getAllOrders);

module.exports = router;
