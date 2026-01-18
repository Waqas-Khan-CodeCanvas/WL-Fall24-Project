exports.placeOrder = asyncHandler(async (req, res) => {
  const { bookId } = req.body;

  const order = await Order.create({
    user: req.user._id,
    book: bookId,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: { orders: order._id },
  });

  res.status(201).json({ success: true, data: order });
});

/* USER → their own orders */
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("book");
  res.json({ success: true, data: orders });
});

/* ADMIN → all orders */
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("book")
    .populate("user", "username email");

  res.json({ success: true, data: orders });
});
