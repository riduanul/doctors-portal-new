const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//SignUp User
const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    user.save();
     // Generate Token
     const token = jwt.sign(
      {
        userId: user._id,
        username:user.username,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Signup was Successfull!",
      access_token: token,
      user: user,
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
            userId: user._id,
            username: user[0].username,
            email: user[0].email,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        currentUser = user[0]
        
        res.status(200).json({
          currentUser,
          access_token: token,
          message: "Login Successfull!",
        });
      } else {
        res.status(401).json({
          error: "Authentication Failed! Password not valid!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication Failed! User not Found!",
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
  // create jw token
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({
    access_token: token,
    result,
  });
};

// Get All User
const getUsers = async(req, res) => {
  const users = await User.find({})
  res.status(200).json({
    users,
  })
}

// Get A Single User
const getUser = async(req, res) => {
  const id = req.params.id
  const user = await User.findById({_id:id })
  res.status(200).json({
    user,
  })
}

// Get an Admin
const makeAdmin = async(req, res) => {
  const id = req.params.id;
  const filter = {_id : id}
  const options = {upsert: true};
  const updateDoc = {
    $set: {
      role: "admin",
    }
  }

const result = await User.updateOne(filter, updateDoc, options);

res.status(200).json({result, message:"Role Successfully Updated as an Admin"})
}

module.exports = { signup, loginUser, updateOrCreate, getUsers, getUser, makeAdmin };
