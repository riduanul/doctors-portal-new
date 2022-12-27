const express = require("express");
const dotenv = require("dotenv");
const servicesRoutes = require("./routes/servicesRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoute = require("./routes/userRoute");
const database = require("./database");
const cors = require("cors");
//express app
const app = express();
dotenv.config();
// Database
database();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/services", servicesRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoute);

//404 error handler
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next("Requested url was not found!");
});

// default middlware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    next("There was a problem!");
  } else {
    if (error.message) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("There was an error!");
    }
  }
});

// listen Port
app.listen(process.env.PORT, () => {
  console.log(`listening from http://localhost:${process.env.PORT}`);
});
