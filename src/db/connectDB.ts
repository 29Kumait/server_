import mongoose from "mongoose";

const connectDB = () => {
  return mongoose.connect(process.env.MONGODB_URL!);
};

export default connectDB;
