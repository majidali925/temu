import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  if (mongoose.connection.readyState) return;
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB Connected!");
};

export default connectDB;
