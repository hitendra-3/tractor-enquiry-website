const { addRoute } = require("../utils/router");
const parseBody = require("../utils/parseBody");
const { generateToken } = require("../utils/jwt");

addRoute("POST", "/admin/login", async (req, res) => {
  try {
    const { email, password } = await parseBody(req);

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      throw new Error("Invalid admin credentials");
    }

    const token = generateToken({
      email,
      role: "admin"
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Admin login successful",
      token
    }));
  } catch (err) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});
