const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//SignUp User
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists!",
      });
    }

    const user = new User({
      username,
      email,
      password,
    });

    // CRITICAL FIX: await the save so MongoDB actually persists the document
    await user.save();

    // Generate Token
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
      message: "Signup was Successful!",
      access_token: token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json({
      message: err.message || "Signup failed! Please try again.",
    });
  }
};

// Login User

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({ email });
  
    if (user) {
      const isValidPassword = await bcrypt.compare(
        password,
        user.password
      );
      
      if (isValidPassword) {
        // Ensure admin role for admin email
        if (email === "admin@dportal.com" && user.role !== "admin") {
          user.role = "admin";
          await user.save();
        }

        // Generate Token
        const token = jwt.sign(
          {
            userId: user._id,
            username: user.username,
            email: user.email,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "24h" }
        );
        
        res.status(200).json({
          currentUser: user,
          access_token: token,
          message: "Login Successful!",
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
    res.status(500).json({
      error: "Server Error, Please try again later!",
    });
  }
};

// updateOrCreate User
const updateOrCreate = async (req, res) => {
  const user = req.body;
  const email = req.params.email;
  const filter = { email: email };
  const options = { upsert: true };
  
  if (email === "admin@dportal.com") {
    user.role = "admin";
  }

  const updateDoc = {
    $set: user,
  };
  const result = await User.updateOne(filter, updateDoc, options);
  const dbUser = await User.findOne(filter);
  
  // create jw token
  const token = jwt.sign(
    {
      userId: dbUser?._id,
      username: dbUser?.username || user.username,
      email: email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
  res.status(200).json({
    access_token: token,
    result,
    user: dbUser
  });
};

// Get All User
const getUsers = async(req, res) => {
  const decodedEmail = req.decoded?.email;
  const query = {email: decodedEmail};
  const user = await User.findOne(query)
  
  if(user?.role !== "admin" && decodedEmail !== "admin@dportal.com"){
    return res.status(403).json({users: [], message: "forbidden access!, You are not an admin!"})
  }
  const users = await User.find({})
  res.status(200).json({
    users,
  })
}

// Get A Single User by ID
const getUser = async(req, res) => {
  const id = req.params.id
  const user = await User.findById({_id:id })
  res.status(200).json({
    user,
  })
}

// Get A Single User by Email
const getUserByEmail = async(req, res) => {
  try {
    const email = req.params.email;
    let user = await User.findOne({ email });
    if (!user) {
      // Auto create a user profile document if it doesn't exist in MongoDB yet
      const defaultUsername = email.split('@')[0];
      const role = email === 'admin@dportal.com' ? 'admin' : 'user';
      user = new User({ email, username: defaultUsername, role });
      await user.save();
    }
    res.status(200).json({ success: true, user });
  } catch(err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// make an Admin
const makeAdmin = async(req, res) => {
  const decodedEmail= req.decoded.email
  const query = {email: decodedEmail}
  const user = await User.findOne(query)
  if(user.role !== 'admin'){
    return res.status(403).json({message: "forbiden access!"})
  }
  const id = req.params.id;
  const filter = {_id : id}
  const options = {upsert: true};
  const updateDoc = {
    $set: {
      role: "admin",
    }
  }

const result = await User.updateOne(filter, updateDoc, options);

if(result){
  res.status(200).json({result, message:"Role Successfully Updated as an Admin"})
} else {
  res.statu(403).json({error:"Something wrong!"})
}

}

const isAdmin = async(req, res) => {
  const email = req.params.email;
  const query = {email};
  const user = await User.findOne(query);
  res.status(200).json({
    isAdmin: user?.role === 'admin'
  })
}

const deleteUser = async(req, res) => {
  const id = req.params.id
  const query = {_id: id};
  const result = await User.deleteOne(query)
  res.status(200).json({
    message: "deleted Successfully!",
    result
  })
  
}

// updateUser
const updateUser = async(req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    
    // Make sure we don't accidentally update sensitive fields
    delete updates.password;
    delete updates.role;
    
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    
    if(user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch(err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { 
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
};
