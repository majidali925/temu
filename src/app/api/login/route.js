import connectDB from "@/lib/db";
import { User } from "@/models/userModel";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    await connectDB();
    const { credentials } = await req.json();
    const user = await User.findOne({ email: credentials.email });
    const matched = await bcrypt.compareSync(
      credentials.password,
      user.password
    ); // true
    if (matched) {
      // Proceed with the logic if the password is correct
      return new Response(
        JSON.stringify({ message: "Login successful", user }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error creating user", error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
