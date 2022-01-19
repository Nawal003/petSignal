const express = require("express");
const router = express.Router();
const User = require("../models/user");

/**GET ALL USERS */

router.get("/users", (req, res, netx) => {
  User.find().then((data) => {
    res.status(200).json({
      message: "Users Fetched Successfull!y",
      users: data,
    });
  });
});

/**GET ONE USER WITH ID */

router.get("/user/:id", (req, res, next) => {
  if (req.params.id == null || undefined) {
    return res.status(403).json({
      message: "Invalid ID",
    });
  }
  const userId = req.params.id;
  User.findById(userId)
    .then((document) => {
      res.status(200).json({
        message: "User fetched successfully",
        user: document,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

/**CREATE A NEW USER */

router.post("/users", async (req, res, next) => {
  const checkUser = await User.find({ email: req.body.emain }).exec();
  if (checkUser.length > 0) {
    return res.status(403).json({
      message: "This email already exists",
    });
  }
  const user = new User({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    group: req.body.group,
    active: req.body.active,
    gpsCoordinates: req.body.gpsCoordinates,
    creationDate: req.body.creationDate,
    validationDate: req.body.validationDate,
    telephone: req.body.telephone,
  });
  user
    .save()
    .then((createdUser) => {
      res.status(201).json({
        message: "New user successfully created!",
        userId: createdUser._id,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
});

/**EDIT A USER  */

router.put("/user/:id", (req, res) => {
  if (req.params.id == null || undefined) {
    return res.status(403).json({
      message: "Invalid ID",
    });
  }
  User.findById({ _id: req.params.id })
    .then((user) => {
      user._id = { _id: req.params.id };
      user.lastname = req.body.lastname;
      user.firstname = req.body.firstname;
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      user.group = req.body.group;
      user.active = req.body.active;
      user.gpsCoordinates = req.body.gpsCoordinates;
      user.creationDate = req.body.creationDate;
      user.validationDate = req.body.validationDate;
      user.telephone = req.body.telephone;
      return user.save();
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    })
    .then((result) => {
      res.status(200).json({
        message: "User Successfully updated",
        userUpdated: result._id,
        userLastname: result.lastname,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        message: error,
      });
    });
});

/**DELETE ONE SPECIFIC USER */

router.delete("/user/:id", (req, res) => {
  if (req.params.id == null || undefined) {
    return res.status(403).json({ message: "Invalid ID" });
  }
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "User Deleted",
        userId: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
});

module.exports = router;
