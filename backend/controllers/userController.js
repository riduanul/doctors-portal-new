const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = reqire("jsonwebtoken");

//SignUp User
const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    newUser.save();
    res.status(200).json({
      message: "Signup was Successfull!",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Signup was failed!",
    });
  }
};

// Login User

const loginUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // Generate Token
        const token = jwt.sign(
          {
            userId: _id,
            username: user[0].username,
            email: user[0].email,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          access_token: token,
          message: "Login Successfull!",
        });
      } else {
        res.status(401).json({
          error: "Authentication Failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication Failed!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: "Authentication Failed!",
    });
  }
};

// updateOrCreate User
const updateOrCreate = async (req, res) => {
  const user = req.body;
  const email = req.params.email;
  const filter = { email: email };
  const options = { upsert: true };
  const updateDoc = {
    $set: user,
  };
  const result = await User.updateOne(filter, updateDoc, options);
  res.status(200).json({
    result,
  });
};

module.exports = { signup, loginUser, updateOrCreate };
