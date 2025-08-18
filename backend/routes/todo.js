import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.use("/getTodos", getTodos);
router.use("/createTodo", createTodo);
router.use("/deleteTodo/:id", deleteTodo);
router.use("/updateTodo", updateTodo);

export default router;
