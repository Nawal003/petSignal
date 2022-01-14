const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema({
  creationDate: { type: Date, required: true, default: Date },
  idUser: { type: String, required: true },
  username: { type: String, required: true },
  userEmail: { type: String, required: true },
  telephone: { type: Number, required: false },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  signal: {
    signalType: { type: String, required: true },
    animalType: { type: String, required: true },
    photo: {
      type: String,
      required: false,
      default: "../public/uploads/default_photo.png",
    },
    animalName: { type: String, required: true, default: "Nom inconnu" },
    age: { type: Date, required: true, default: "Age inconnu" },
    gender: { type: String, required: true, default: "Genre inconnu" },
    chip: { type: Boolean, required: true, default: false },
    identificationNumber: { type: Number, required: false },
    gpsCoordinates: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
    },
    description: { type: String, required: false },
    classified: {
      creationDate: { type: Date, required: true, default: Date.now() },
      userId: { type: String, required: false },
      username: { type: String, required: true },
      gpsCoordinates: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
      },
      photo: {
        type: String,
        required: false,
        default: "../public/uploads/default_photo.png",
      },
      comment: { type: String, required: false },
    },
  },
});

module.exports = mongoose.model("Signal", signalSchema);
