const verifyToken = require("../utils/verifyToken");

const authUser = (req) => {
  const user = verifyToken(req);
  if (user.role !== "user" && user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
};

module.exports = authUser;
