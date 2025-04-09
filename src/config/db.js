const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ritikaagrahari9450:QL8Pp7zb8lFWmkjA@cluster0.llghmyj.mongodb.net/devDate"
  );
};

module.exports = connectDB;
