const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  group: { type: String, required: true, default: "user" },
  active: { type: Boolean, required: true, default: false },
  gpsCoordinates: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  creationDate: { type: Date, required: true, default: Date },
  validationDate: { type: Date },
  telephone: { type: Number, required: false },
});

module.exports = mongoose.model("User", userSchema);
