const validator = require("validator");

const registerValidate = (data) => {
  let errors = {};
  let { userName, email, password, password2 } = data;

  //User Name check
  if (validator.isEmpty(userName)) {
    errors.userName = "Field is required";
  } else if (!validator.isLength(userName, { min: 3 })) {
    errors.userName = "Username must be atleast 3 charcters";
  }

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

  //Confirm password
  if (validator.isEmpty(password2)) {
    errors.password2 = "Field is required";
  } else if (!validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? false : true,
  };
};

module.exports = registerValidate;
