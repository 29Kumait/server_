import express from "express";
import { handleSignUp, handleSignIn, handleSignOut } from "../controllers/auth";

const routerAuth = express.Router();

routerAuth.post('/auth/signup', handleSignUp);
routerAuth.post('/auth/signin', handleSignIn);
routerAuth.post('/auth/signout', handleSignOut);


export default routerAuth;
