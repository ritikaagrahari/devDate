const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
// Request handler
app.use("/admin", adminAuth);
app.use("/user/data", userAuth, (req, res) => {
  res.send("User data sent");
});
app.use("/admin/getData", (req, res) => {
  res.send("Data sent");
});
app.use("/admin/deleteUser", (req, res) => {
  res.send("Deleted the user");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777...");
});
