require("dotenv").config();
const http = require("http");
const { matchRoute } = require("./utils/router");

// IMPORT ROUTES (important!)

require("./routes/auth.routes");
require("./routes/auth.routes");
require("./routes/dbTest.routes");
require("./routes/mailTest.routes");
require("./routes/admin.routes");
require("./routes/protectedTest.routes");
require("./routes/tractor.routes");
require("./routes/service.routes");
require("./routes/enquiry.routes");



const PORT = 5000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Backend running 🚜" }));
    return;
  }

  // Route handling
  matchRoute(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
