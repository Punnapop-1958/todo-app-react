import pool from "../db.js";
import { json } from "express";

export const getTodos = async (req, res) => {
  try {
    const sql = "select * from todos";
    const result = await pool.query(sql);
    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
