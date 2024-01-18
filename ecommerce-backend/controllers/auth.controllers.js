// import bcrypt from "bcrypt";
const bcrypt = require("bcrypt");
const Users = require("../models/users.model");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const payload = req.body;

    // {
    //     name: '',
    //     email: '',
    //     password: '',
    //     mobileNumber: '',
    //     role: 3,
    //     address: ''
    // }

    if (!payload.password) {
      return res.status(400).send({
        message: "Password is required.",
      });
    }

    // Hashing using bcrypt

    const hashedOutput = await bcrypt.hash(payload.password, 15);
    payload.hashedPassword = hashedOutput;
    // {
    //     name: '',
    //     email: '',
    //     password: '',
    //     hashedPassword: '',
    //     mobileNumber: '',
    //     role: 3,
    //     address: ''
    // }
    delete payload.password;

    // {
    //     name: '',
    //     email: '',
    //     hashedPassword: '',
    //     mobileNumber: '',
    //     role: 3,
    //     address: ''
    // }

    const newUser = new Users(payload);

    newUser
      .save()
      .then((data) => {
        res.status(201).send({
          message: "User has been registered successfully.",
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while registering the user.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    // get email or password
    const { email, password } = req.body;

    let existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      // Welcome123 -> hashedPassword
      let isValidUser = await bcrypt.compare(
        password,
        existingUser.hashedPassword
      ); // true or false

      if (isValidUser) {
        // Generate a token
        // jsonObj -> token;
        // {
        //   _id: existingUser._id;
        // }
        // Encryption
        const token = await jwt.sign(
          { _id: existingUser._id },
          process.env.SECRET_KEY
        );

        res.cookie("accessToken", token, {
          expire: new Date() + 86400000,
        });

        return res.status(200).send({
          message: "User signed-in successfully.",
        });
      }

      return res.status(400).send({
        message: "Invalid credentials.",
      });
    }

    return res.status(400).send({
      message: "User does not exist.",
    });
    // check whether email is existing in our db or not -> Whether this user is existing user or not.
    // if(userExists) checking the credentials -> if matching get the userData and generateToken using that.... else error;
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.signout = async (req, res) => {
  try {
    await res.clearCookie("accessToken");
    res.status(200).send({
      message: "User signed-out successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
