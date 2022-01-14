const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/petsignal";

let connect = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to database!");
  } catch (e) {
    console.log("Connection failed!" + e);
  }
};

let disconnect = () => {
  return mongoose.disconnect();
};

module.exports = { connect, disconnect };
