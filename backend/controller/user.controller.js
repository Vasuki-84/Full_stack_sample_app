const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerAPI = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailCheck = await userModel.findOne({ email });

    if (emailCheck) {
      return res.status(500).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // create

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "user registered" });
    console.log(newUser);
  } catch (err) {
    res.status(500).json({ message: "user not registered" });
    console.log(err);
  }
};

const loginAPI = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User account not found, please register first" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Password Mismatch" });
  }

  // JWT Generation
  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
  res.status(200).json({ message: "Login Successful", token: token });
};

module.exports = { registerAPI, loginAPI };
