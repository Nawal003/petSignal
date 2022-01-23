const express = require("express");
const router = express.Router();
const Signal = require("../models/signal");

/**GET ALL SIGNALS REPORTS */

router.get("/signals/", (req, res, next) => {
  Signal.find().then((data) => {
    res.status(200).json({
      message: "Signals reports fetched successfully!",
      signals: data,
    });
  });
});

/**GET ALL SIGNALS BY USERID */

router.get("/signalsbyuser/:idUser", (req, res, next) => {
  if (req.params.idUser == null || undefined) {
    return res.status(404).json({
      message: "Invalid Id",
    });
  }
  Signal.find({ idUser: req.params.idUser })
    .then((doc) => {
      res.status(200).json({
        message: "Signals reports fetched successfully!",
        signals: doc,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

/**GET GPSCOORDINATES BY SIGNAL'S ID */
//À régler plus tard

router.get("/signal/:id/gpsCoordinates", (req, res, next) => {
  if (req.params.id == null || undefined) {
    return res.status(404).json({
      message: "Invalid Coordinates",
    });
  }
  Signal.findById({ _id: req.params.id })
    .then((coordinate) => {
      res.status(200).json({
        message: "Coordinates fetched successfully!",
        gpsCoordinates: coordinate.signal.gpsCoordinates,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

/**GET ONE SIGNAL REPORT WITH ID */

router.get("/signal/:id", (req, res, next) => {
  if (req.params.id == null || undefined) {
    return res.status(403).json({
      message: "Invalid ID",
    });
  }
  Signal.findById({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Signal report fetched successfuly!",
        signal: doc,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: err,
      });
    });
});

/**CREATE A NEW SIGNAL */
router.post("/signal", (req, res, next) => {
  const report = req.body.signal;
  let paths;
  if (req.body.photo) paths = req.body.photo;

  const signal = new Signal({
    creationDate: req.body.creationDate,
    idUser: req.body.idUser,
    username: req.body.username,
    userEmail: req.body.userEmail,
    telephone: req.body.telephone,
    location: req.body.location,
    signal: {
      signalType: report.signalType,
      animalType: report.animalType,
      photo: paths,
      animalName: report.animalName,
      age: report.age,
      gender: report.gender,
      chip: report.chip,
      identificationNumber: report.identificationNumber,
      gpsCoordinates: report.gpsCoordinates,
      description: report.description,
    },
  });
  signal
    .save()
    .then((createdSignal) => {
      res.status(201).json({
        message: "Signal added successfully!",
        signalId: createdSignal._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: err,
      });
    });
});

/**EDIT SIGNAL */
router.put("/signal/:id", (req, res, next) => {
  if (req.params.id == null || undefined) {
    return res.status(403).json({
      message: "Invalid ID",
    });
  }
  // console.log("req.body======>", req.body.classified);
  let paths;
  if (req.body.photo) paths = req.body.photo;

  let classified;
  Signal.findById({ _id: req.params.id })
    .then((signal) => {
      //fonctionne
      console.log(
        "signal===>"
        // (signal.classified = req.body.classified),
        // (signal = req.body.classified),
        // (classified = signal.classified),
        // (signal.classified = {
        //   comment: req.body.classified.comment,
        //   photo: paths,
        // })
      );
      signal._id = { _id: req.params.id };
      signal.classified = {
        comment: req.body.comment,
        photo: paths,
        gpsCoordinates: req.body.gpsCoordinates,
        userId: req.body.userId,
        username: req.body.username,
      };
      return signal.save();
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    })
    .then((result) => {
      res.status(200).json({
        message: "Signal successfully updated!",
        signalUpdated: result,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        message: error,
      });
    });
});

module.exports = router;
