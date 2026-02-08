const { addRoute } = require("../utils/router");
const supabase = require("../config/supabase");

// Test DB connection
addRoute("GET", "/db/test", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    message: "Supabase connected successfully",
    data
  }));
});
