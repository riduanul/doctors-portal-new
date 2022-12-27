const mongoose = require("mongoose");

const database = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected succesfully!"))
    .catch((err) => console.log(err));
};

module.exports = database;
