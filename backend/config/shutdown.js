const mongoose = require("mongoose")

const shutdown = async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);   // Manual Ctrl+C
process.on("SIGTERM", shutdown);  // Container / system shutdown


module.exports = shutdown;