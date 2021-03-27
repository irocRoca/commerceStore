const jwt = require("jsonwebtoken");
const User = require("../models/User");
const registerValidate = require("../helpers/validate/registerValidate");

module.exports = {};

async function signUp(req, res) {
  // take req.body and validate the information
  const { errors, isValid } = registerValidate(req.body);

  // take req.body and validate the information
  if (!isValid) return res.status(500).json(errors);

  // Check if email is already used
  try {
    const doc = await User.findOne({ email: req.body.email });
    if (doc) return res.status(500).json({ error: "Account already exist" });
    const { userName, email, password } = req.body;
    const user = new User({ userName, email, password });
    await user.save();
    // Generate JWT
    const token = generateJWT(user);
    // return token;
    return res.json({ token });
  } catch (err) {
    return res.status(500).json(err);
  }
}

function generateJWT(user) {
  return jwt.sign({ user }, process.env.SECERT, { expiresIn: "2h" });
}

module.exports = userController;
