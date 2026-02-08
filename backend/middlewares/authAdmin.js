const verifyToken = require("../utils/verifyToken");

const authAdmin = (req) => {
  const admin = verifyToken(req);
  if (admin.role !== "admin") {
    throw new Error("Admin access only");
  }
  return admin;
};

module.exports = authAdmin;
