const express = require("express");
const {
  signup,
  loginUser,
  updateOrCreate,
  getUsers,
  getUser,
  getAdmin,
  makeAdmin,
} = require("../controllers/userController");
const router = express.Router();

//signup
router.post("/signup", signup);

//Login User
router.post("/login", loginUser);

//Update or Create User
router.post("/:email", updateOrCreate);

// Get All Users
router.get("/", getUsers);

// Get a User
router.get("/:id", getUser);

// Get an admin
router.get("/admin/:id", makeAdmin);

module.exports = router;
