import pool from "../db.js";
import { json } from "express";

export const getTodos = async (req, res) => {
  try {
    const sql = "select * from todos";
    const result = await pool.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req, res) => {
  const { text, done } = req.body;
  try {
    const sql = "insert into todos (text, done) values ($1, $2) RETURNING *";
    const values = [text, done];
    const result = await pool.query(sql, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting todo:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "delete from todos where id = $1 RETURNING *";
    const result = await pool.query(sql, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error deleting todo: ", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id, text, done } = req.body;
  try {
    let result;

    // ถ้ามีค่า done (รวมทั้ง false)
    if (done !== undefined) {
      const sql = "UPDATE todos SET done = $1 WHERE id = $2 RETURNING *";
      result = await pool.query(sql, [done, id]);
    } else if (text !== undefined) {
      const sql = "UPDATE todos SET text = $1 WHERE id = $2 RETURNING *";
      result = await pool.query(sql, [text, id]);
    }

    if (!result || result.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating todo: ", err);
    res.status(500).json({ error: err.message });
  }
};
