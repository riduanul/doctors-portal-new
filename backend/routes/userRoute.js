const express = require("express");
const {
  signup,
  loginUser,
  updateOrCreate,
  getUsers,
  getUser,
makeAdmin,
isAdmin,
} = require("../controllers/userController");
const verifyJWT = require('../middlewares/verifyJWT')
const router = express.Router();

//signup
router.post("/signup", signup);

//Login User
router.post("/login", loginUser);

//Update or Create User
router.post("/:email", updateOrCreate);

// Get All Users
router.get("/", verifyJWT, getUsers);

// Get a User
router.get("/:id", getUser);

// Get an admin
router.put("/admin/:id", verifyJWT, makeAdmin);

// Checking isAdmin
router.get("/admin/:email", isAdmin);

module.exports = router;
