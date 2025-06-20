import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import principleroutes from "./routes/principeroutes.js";
import studentroutes from "./routes/studentroutes.js";

const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hiiiiiiiii");
});
app.use("/admin", principleroutes);
app.use("/", studentroutes);
connectDB();
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
