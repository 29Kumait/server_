import express from "express";
import { handleSignUp, handleSignIn, handleSignOut } from "../controllers/auth";

const routerAuth = express.Router();

routerAuth.post("/signup", handleSignUp);
routerAuth.post("/signin", handleSignIn);
routerAuth.post("/signout", handleSignOut);


export default routerAuth;
