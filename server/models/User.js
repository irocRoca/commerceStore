const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

const User = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

User.pre("save", function (next) {
  // Hash password before saving to DB
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});

// User.set("toJSON", {
//   transform: function (doc, ret) {
//     delete ret.password;
//     return ret;
//   },
// });

module.exports = mongoose.model("users", User);
