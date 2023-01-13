const express = require("express");
const dotenv = require("dotenv");
const servicesRoutes = require("./routes/servicesRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoute = require("./routes/userRoute");
const database = require("./database");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
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
app.use(errorHandler);

// listen Port
app.listen(process.env.PORT, () => {
  console.log(`listening from http://localhost:${process.env.PORT}`);
});
