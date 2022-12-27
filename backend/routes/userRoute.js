const express = require("express");
const {
  signup,
  loginUser,
  updateOrCreate,
} = require("../controllers/userController");
const router = express.Router();

//signup
router.post("/signup", signup);

//Login User
router.post("/login", loginUser);

//Update or Create User
router.post("/:email", updateOrCreate);

module.exports = router;
