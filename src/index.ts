import dotenv from "dotenv";
import express from 'express';
import cors from "cors";

import connectDB from "./db/connectDB.js";
import routerRoot from "./routes/root.js";
import routerAuth from "./routes/auth"

import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

app.use("/", routerRoot);
app.use("/api", routerAuth);
app.use(errorMiddleware);

const startServer = async () => {
  try {

    await connectDB();
    app.listen(port, () => console.log(`Server started on port ${port}`));

  } catch (error) {

    console.error(error);
    process.exit(1);

  }
};

startServer();