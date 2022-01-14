const express = require("express");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({ extended: true, limit: "20mb", parameterLimit: 20000 })
);
app.use("/api", express.static("public"));

/**API HEADERS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PUT, DELETE");
  next();
});
/**ROUTES */
// app.use("/api", require("./routes/signals"));
// app.use("/api", require("./routes/users"));

/**Route to test if API is online */

app.get("/", (req, res, next) => {
  res.send("<h1>HELLO WORLD!</h1>");
  console.log("HELLO");
});
module.exports = app;
