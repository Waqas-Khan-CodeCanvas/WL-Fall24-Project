const express = require("express");
const connectDB = require("./config/db_connection");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/books", require("./routes/book.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/users", require("./routes/user.routes"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on ${PORT}`))
);
