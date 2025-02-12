import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
  const db = process.env.DB || 'apps';
  const mongoUrl = process.env.MONGODB_URL!;

  const url = mongoUrl.includes('/?')
    ? mongoUrl.replace('/?', `/${db}?`)
    : `${mongoUrl}/${db}`;

  return mongoose.connect(url);
};

export default connectDB;