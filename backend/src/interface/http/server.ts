import { loadControllers } from "awilix-express";
import cors from "cors";
import express from "express";
import "express-async-errors";
import path from "path";
import { isTestEnv } from "../../config/environment";
import "../../database/connection";
import errorHandler from "../../exceptions/handler";
import { loadContainer } from "../container";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

loadContainer(app);

app.use(loadControllers("controllers/*.ts", { cwd: __dirname }));

app.use(errorHandler);

if (!isTestEnv) {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

export { app };
