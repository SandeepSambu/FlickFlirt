const validator = require("validator");

const validation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Invalid name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const editValidation = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skills",
    "photoURL",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  const { firstName, lastName, age, gender, about, skills, photoURL } =
    req.body;

  if (
    (firstName && firstName?.length < 1) ||
    (lastName && lastName?.length < 1) ||
    (age && age < 18) ||
    (gender && gender.length > 4) ||
    (about && about?.length < 10) ||
    (skills && skills?.length > 10) ||
    (photoURL && !validator.isURL(photoURL))
  ) {
    throw new Error("Invalid edit request");
  }

  return isEditAllowed;
};

module.exports = { validation, editValidation };
