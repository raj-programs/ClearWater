import express from "express";
import supabaseclient from "../database/supabaseConfig.js";

const router = express.Router();

// POST /api/register
router.post("/", async (req, res) => {
  try {
    const { user_id, full_name, email, phone, address, dob, password } = req.body;

    // Validate required fields
    if (!user_id || !full_name || !email || !phone || !address || !dob || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // TODO: Replace this section with your actual database insert.
    // The structure below is ready for Supabase integration.
    // Uncomment and adjust the table name when your DB is set up.

    /*
    const { data, error } = await supabaseclient
      .from("users")
      .insert([
        {
          user_id,
          full_name,
          email,
          phone,
          address,
          dob,
          password, // In production, hash this before storing!
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user: data[0],
    });
    */

    // Temporary success response (remove once DB is connected)
    return res.status(201).json({
      message: "User registered successfully",
      user: { user_id, full_name, email, phone, address, dob },
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
