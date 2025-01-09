const jwt = require("jsonwebtoken");

const signUser = (checkUser) => {
  const token = jwt.sign(checkUser, process.env.JWT_SECRET);
  return token;
};

const verifyUser = (token) => {
  const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
  return verifytoken;
};

module.exports.signUser = signUser;
module.exports.verifyUser = verifyUser;
