import { Request, Response, NextFunction } from "express";
import {
  createUser,
  findUserByCredentials,
  generateAuthToken,
} from "../services/authService";
import { IUser } from "../models/User";

/**
 * POST /api/signup
 */
export const handleSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password } = req.body;

  try {
    const user: IUser = await createUser({ email, username, password });
    const token = generateAuthToken(user._id);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(`Sign-up error: ${error}`);
    next(error);
  }
};

/**
 * POST /api/signin
 */
export const handleSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = generateAuthToken(user._id);
    return res.json({ token });
  } catch (error) {
    console.error(`Sign-in error: ${error}`);
    next(error);
  }
};

/**
 * POST /api/signout (Optional)
 */
export const handleSignOut = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    return res.json({ message: "Signed out successfully" });
  } catch (error) {
    console.error("Sign-out error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
