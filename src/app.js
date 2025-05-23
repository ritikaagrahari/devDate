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

// GET: get user by email (let's make an api to find one user from the database)
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API: GET /feed api will get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// delete user api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something Went Wrong");
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
