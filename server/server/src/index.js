import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import router from "./routes/router.js";

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (_req, res) => {
  return res.status(200).json({
    massege: "⚡️[server]: Server is running",
  });
});

app.use("/api", router);

const port = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(port, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
