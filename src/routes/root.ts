import express from "express";

const routerRoot = express.Router();

routerRoot.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Server!");
  });

export default routerRoot;