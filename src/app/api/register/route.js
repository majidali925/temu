import connectDB from "@/lib/db"
import { User } from "@/models/userModel"
import bcrypt from "bcrypt";


export const POST = async (req) => {
    try {
        await connectDB()
        const { data } = await req.json()
        const hash_password = bcrypt.hashSync(data.password, 10)
        const new_data = {
            ...data,
            password: hash_password
        }
        const UserCreated = await User.create(new_data)
        return new Response(JSON.stringify({ message: "User created successfully", user: UserCreated }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: "Error creating user", error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}    