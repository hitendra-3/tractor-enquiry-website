const { addRoute } = require("../utils/router");
const authAdmin = require("../middlewares/authAdmin");

addRoute("GET", "/admin/protected", (req, res) => {
  try {
    const admin = authAdmin(req);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Welcome Admin",
      admin
    }));
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});
