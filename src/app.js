const express = require("express");

const app = express();

// Request handler
app.use("/", (req, res) => {
  res.send("Hello from dashboard");
});
app.use("/hello", (req, res) => {
  res.send("Hello hello");
});
app.use("/test", (req, res) => {
  res.send("Hello Test");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
