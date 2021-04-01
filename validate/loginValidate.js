const validator = require("validator");

const loginValidate = (data) => {
  let errors = {};
  let { email, password } = data;

  //Email
  if (validator.isEmpty(email)) {
    errors.email = "Field is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  //Password
  if (validator.isEmpty(password)) {
    errors.password = "Field is required";
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.password = "Password must be greater than 6 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? false : true,
  };
};

module.exports = loginValidate;
