const { addRoute } = require("../utils/router");
const parseBody = require("../utils/parseBody");
const supabase = require("../config/supabase");
const authUser = require("../middlewares/authUser");
const sendMail = require("../config/mail");

//
// 👤 USER: CREATE ENQUIRY
//
addRoute("POST", "/enquiries", async (req, res) => {
  try {
    const user = authUser(req);
    const { type, item_id, message } = await parseBody(req);

    if (!type || !item_id) {
      throw new Error("Type and Item ID required");
    }

    const { data, error } = await supabase
      .from("enquiries")
      .insert([{
        user_id: user.id,
        type,
        item_id,
        message
      }])
      .select()
      .single();

    if (error) throw error;

    // Send email to admin
    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Tractor Enquiry 🚜",
      html: `
        <h3>New Enquiry Received</h3>
        <p><strong>User:</strong> ${user.email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Message:</strong> ${message || "No message"}</p>
      `
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Enquiry submitted successfully",
      enquiry: data
    }));
  } catch (err) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

//
// 👑 ADMIN: VIEW ALL ENQUIRIES
//
addRoute("GET", "/admin/enquiries", async (req, res) => {
  try {
    authUser(req); // admin also allowed via role

    const { data, error } = await supabase
      .from("enquiries")
      .select(`
        *,
        users(email)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (err) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});
