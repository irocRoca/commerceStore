const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
});

User.pre("save", function (next) {
  // Hash password before saving to DB
  const user = this;
  if (!user.isModified("password")) return next();
  b;
});

User.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("users", User);
