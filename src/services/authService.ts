import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { Types } from "mongoose";

interface CreateUserDTO {
  email: string;
  username: string;
  password: string;
}

export const createUser = async (userData: CreateUserDTO): Promise<IUser> => {
  const { email, username } = userData;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error(
      existingUser.email === email
        ? "User with this email already exists"
        : "User with this username already exists"
    );
  }

  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

export const findUserByCredentials = async (
  username: string,
  password: string
): Promise<IUser | null> => {
  const user = await User.findOne({ username });
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  return isMatch ? user : null;
};

export const generateAuthToken = (userId: string | Types.ObjectId): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in env");
  }

  const payloadId = typeof userId === "string" ? userId : userId.toString();
  return jwt.sign({ userId: payloadId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};
