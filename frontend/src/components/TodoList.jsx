import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { getTodos } from "../api/todoApi.js";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <div
          className="todo-list"
          style={{ justifyContent: "center", color: "#555" }}
        >
          <p>No todos yet. Please add some!</p>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="todo-list" key={todo.id}>
            <div className="list-item">
              <input type="checkbox" checked={todo.done} readOnly />
              <h2
                style={{
                  textDecoration: todo.done ? "line-through" : "none",
                  color: todo.done ? "#555" : "#000",
                }}
              >
                {todo.text}
              </h2>
            </div>
            <div className="list-action">
              <FiEdit />
              <MdOutlineDelete />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default TodoList;
