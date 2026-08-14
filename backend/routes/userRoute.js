const express = require("express");
const {
  signup,
  loginUser,
  updateOrCreate,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  makeAdmin,
  isAdmin,
  deleteUser,
} = require("../controllers/userController");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyJWT = require('../middlewares/verifyJWT')
const router = express.Router();

//signup
router.post("/signup", signup);

//Login User
router.post("/login", loginUser);

//Update or Create User
router.post("/:email", updateOrCreate);

// Get All Users
router.get("/", verifyJWT, verifyAdmin, getUsers);

// Get a User by Email
router.get("/email/:email", verifyJWT, getUserByEmail);

// Get a User
router.get("/:id", verifyJWT, getUser);

// Update a User Profile
router.patch("/:id", verifyJWT, updateUser);

// Get an admin
router.put("/admin/:id", verifyJWT, verifyAdmin, makeAdmin);

// Checking isAdmin
router.get("/admin/:email", isAdmin);

// Delete User
router.delete('/:id', verifyJWT, verifyAdmin, deleteUser )


module.exports = router;
