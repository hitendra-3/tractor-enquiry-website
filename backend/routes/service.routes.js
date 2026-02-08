const { addRoute } = require("../utils/router");
const parseBody = require("../utils/parseBody");
const supabase = require("../config/supabase");
const authAdmin = require("../middlewares/authAdmin");

//
// 👉 ADMIN: ADD SERVICE
//
addRoute("POST", "/admin/services", async (req, res) => {
  try {
    authAdmin(req);

    const { title, description } = await parseBody(req);
    if (!title) throw new Error("Service title required");

    const { data, error } = await supabase
      .from("services")
      .insert([{ title, description }])
      .select()
      .single();

    if (error) throw error;

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Service added successfully",
      service: data
    }));
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

//
// 👉 ADMIN: UPDATE SERVICE
//
addRoute("PUT", "/admin/services", async (req, res) => {
  try {
    authAdmin(req);

    const { id, ...updates } = await parseBody(req);
    if (!id) throw new Error("Service ID required");

    const { data, error } = await supabase
      .from("services")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Service updated successfully",
      service: data
    }));
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

//
// 👉 ADMIN: DELETE SERVICE
//
addRoute("DELETE", "/admin/services", async (req, res) => {
  try {
    authAdmin(req);

    const { id } = await parseBody(req);
    if (!id) throw new Error("Service ID required");

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Service deleted successfully"
    }));
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

//
// 🌍 PUBLIC: GET ALL SERVICES
//
addRoute("GET", "/services", async (req, res) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
});
