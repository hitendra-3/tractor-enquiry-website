const { addRoute } = require("../utils/router");
const parseBody = require("../utils/parseBody");
const sendMail = require("../config/mail");
const supabase = require("../config/supabase");
const { saveOTP, verifyOTP } = require("../utils/otpStore");
const { generateToken } = require("../utils/jwt");

// SEND OTP
addRoute("POST", "/auth/send-otp", async (req, res) => {
  try {
    const { email } = await parseBody(req);
    if (!email) throw new Error("Email required");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    saveOTP(email, otp);

    await sendMail({
      to: email,
      subject: "Your OTP for Tractor Enquiry Login",
      html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 5 minutes.</p>`
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "OTP sent successfully" }));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

// VERIFY OTP
addRoute("POST", "/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = await parseBody(req);

    if (!verifyOTP(email, otp)) {
      throw new Error("Invalid or expired OTP");
    }

    // Check if user exists
    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError && userError.code !== 'PGRST116') { // PGRST116 is 'not found'
      console.error("Supabase User Fetch Error:", userError);
    }

    // Create user if not exists
    if (!user) {
      console.log("User not found in public.users, creating...");
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert([{ email }])
        .select()
        .single();

      if (createError) {
        console.error("Supabase User Create Error:", createError);
        throw new Error("Failed to create user record: " + createError.message);
      }
      user = newUser;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Login successful",
      token,
      user
    }));
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});
// ADMIN LOGIN (Email/Password)
addRoute("POST", "/auth/admin/login", async (req, res) => {
  try {
    const { email, password } = await parseBody(req);

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const user = data.user;

    // Strict check for the specific admin email provided by user
    if (user.email !== "vkcroppvtltd@gmail.com") {
      throw new Error("Unauthorized: Access restricted to Tractor Admin only.");
    }

    // Generate our own JWT for the backend to use (keeping existing logic consistent)
    // Or we could return the supabase session, but to minimize frontend changes, let's keep the token structure if possible,
    // OR better, just return the user and role.

    // For consistency with existing frontend which expects 'token' and 'user.role'
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: "admin" // Explicitly assign admin role for this specific user
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "Admin Login successful",
      token,
      user: { id: user.id, email: user.email, role: "admin" }
    }));

  } catch (err) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});
