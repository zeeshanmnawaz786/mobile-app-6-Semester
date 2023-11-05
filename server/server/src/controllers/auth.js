import jwt from "jsonwebtoken";
import { userSchema } from "../models/user.js";

const registerUser = (req, res) => {
  const { userName, userEmail, password } = req.body;
  const user = new userSchema({
    userName,
    userEmail,
    password,
  });
  user
    .save()
    .then((savedUser) => {
      console.log("user registered:", savedUser);
      res.json({ message: "user registered successfully", data: savedUser });
    })
    .catch((error) => {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user" });
    });
};

const loginUser = (req, res) => {
  const { userEmail, password } = req.body;

  if (!userEmail || !password) {
    return res
      .status(400)
      .json({ message: "Both 'user email' and 'password' are required" });
  }

  userSchema
    .findOne({ password, userEmail })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.userEmail,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );

      res.json({
        message: "Login successful",
        userId: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        token: token,
      });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ message: "Server error" });
    });
};

export { registerUser, loginUser };
