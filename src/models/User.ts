import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();

export const DB_NAME = process.env.DB || "apps";
export const COLLECTION = process.env.COLLECTION || "users";
export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
        message:
          "Password must be at least 8 characters long and contain both numbers and letters",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
  },
  {
    collection: COLLECTION,
  }
);

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`Hashing password for user: ${this.username}`);
    this.password = await bcrypt.hash(this.password, 12);
    console.log(`Password hashing completed for user: ${this.username}`);
  }
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  console.log(`Comparing password for user: ${this.username}`);
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password when converting to JSON
userSchema.methods.toJSON = function (this: IUser) {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default model<IUser>("User", userSchema, COLLECTION);
