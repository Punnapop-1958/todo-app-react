import express from "express";
import { getTodos } from "../controllers/todoController.js";

const router = express();

router.use("/getTodos", getTodos);

export default router;
