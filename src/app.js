const express = require("express");
const connectDB = require("./config/db.js");
const User = require("./models/user.js");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating the instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error in adding the user" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
