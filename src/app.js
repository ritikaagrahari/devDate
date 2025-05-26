const express = require("express");
const connectDB = require("./config/db.js");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

// Signup api
app.post("/signup", async (req, res) => {
  try {
    // Validation of the data coming from req.body
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    //creating the instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error in adding the user :  " + err.message);
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

// delete user api (Delete a user from the database)
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// update user api (Update data of the user)
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be greater than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: "true",
    });
    // console.log(user);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
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
