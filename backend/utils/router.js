const router = [];

const addRoute = (method, path, handler) => {
  router.push({ method, path, handler });
};

const matchRoute = (req, res) => {
  const matched = router.find(
    r => r.method === req.method && r.path === req.url
  );

  if (matched) {
    return matched.handler(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
};

module.exports = { addRoute, matchRoute };
