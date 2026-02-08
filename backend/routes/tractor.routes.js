const { addRoute } = require("../utils/router");
const parseBody = require("../utils/parseBody");
const supabase = require("../config/supabase");
const authAdmin = require("../middlewares/authAdmin");

//
// 👉 ADMIN: ADD TRACTOR
//
addRoute("POST", "/admin/tractors", async (req, res) => {
  try {
    authAdmin(req);

    const body = await parseBody(req);

    const { name, brand, hp, price_range, image_url, description } = body;

    if (!name) throw new Error("Tractor name is required");

    const { data, error } = await supabase
      .from("tractors")
      .insert([
        { name, brand, hp, price_range, image_url, description }
      ])
      .select()
      .single();

    if (error) throw error;

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Tractor added successfully",
      tractor: data
    }));
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

//
// 👉 ADMIN: UPDATE TRACTOR
//
addRoute("PUT", "/admin/tractors", async (req, res) => {
  try {
    authAdmin(req);

    const body = await parseBody(req);
    const { id, ...updates } = body;

    if (!id) throw new Error("Tractor ID required");

    const { data, error } = await supabase
      .from("tractors")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Tractor updated successfully",
      tractor: data
    }));
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

//
// 👉 ADMIN: DELETE TRACTOR
//
addRoute("DELETE", "/admin/tractors", async (req, res) => {
  try {
    authAdmin(req);

    const body = await parseBody(req);
    const { id } = body;

    if (!id) throw new Error("Tractor ID required");

    const { error } = await supabase
      .from("tractors")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Tractor deleted successfully"
    }));
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

//
// 🌍 PUBLIC: GET ALL TRACTORS
//
addRoute("GET", "/tractors", async (req, res) => {
  const { data, error } = await supabase
    .from("tractors")
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
