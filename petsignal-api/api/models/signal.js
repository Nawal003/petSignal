const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema({
  creationDate: { type: Date, required: true, default: Date },
  idUser: { type: String, required: true },
  username: { type: String, required: true },
  userEmail: { type: String, required: true },
  telephone: { type: String, required: false },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  signal: {
    signalType: { type: String },
    animalType: { type: String },
    photo: {
      type: String,
      default: "../public/uploads/default_photo.png",
    },
    animalName: { type: String, default: "Nom inconnu" },
    age: { type: Date, default: Date.now() },
    gender: { type: String, default: "Genre inconnu" },
    chip: { type: Boolean, default: false },
    identificationNumber: { type: Number },
    gpsCoordinates: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    description: { type: String, required: false },
  },
  classified: {
    creationDate: { type: Date, required: false, default: Date.now() },
    userId: { type: String, required: false },
    username: { type: String, required: false },
    gpsCoordinates: {
      lat: { type: Number, required: false },
      long: { type: Number, required: false },
    },
    photo: {
      type: String,
      required: false,
      default: "../public/uploads/default_photo.png",
    },
    comment: { type: String, required: false },
  },
});

module.exports = mongoose.model("Signal", signalSchema);
