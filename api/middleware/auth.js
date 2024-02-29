const { StatusCodes } = require("http-status-codes");
const { UnAuthorizedError } = require("../error");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("authorization", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnAuthorizedError("access denied"));
  }

  const token = authorization.split(" ")[1];
  
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded", decoded);
  req.user = decoded;
  next();
};

module.exports={auth}