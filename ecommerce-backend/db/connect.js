const mongoose = require("mongoose"); // Node.js ORM for MongoDB

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection established.");
  } catch (error) {
    console.log("Error while connecting DB: ", error);
  }
};

module.exports = db;
