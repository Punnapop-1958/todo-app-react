import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import todoRoute from "./routes/todo.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "https://frontend.vercel.app",
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", todoRoute);

app.listen(port, (e) => {
  if (e) console.log("Error in server setup", e);
  console.log(`Server is running on port: ${port} >> http://localhost:${port}`);
});
