import { useEffect, useState } from "react";
import { createTodo, updateTodo } from "../api/todoApi.js";

const TodoForm = ({ todos, setTodos, editTodo, setEditTodo }) => {
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    if (editTodo) {
      setTodoInput(editTodo.text);
    }
  }, [editTodo]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (editTodo) {
        handleEditTodo();
      } else {
        handleAddTodo();
      }
    }
  };

  const handleAddTodo = async () => {
    if (!todoInput.trim()) return;
    try {
      const newTodo = await createTodo({ text: todoInput, done: false });
      console.log("Child ส่ง todo:", newTodo);
      setTodos([...todos, newTodo]);
      console.log("Parent state setTodos เรียกแล้ว");
      setTodoInput("");
    } catch (err) {
      console.error("Error create todo: ", err);
    }
  };

  const handleEditTodo = async () => {
    try {
      const updated = await updateTodo({ id: editTodo.id, text: todoInput });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: updated.text } : todo
        )
      );

      setEditTodo(null);
      setTodoInput("");
    } catch (err) {
      console.error("Error updating todo: ", err);
    }
  };

  const handleEditCancel = async () => {
    setTodoInput("");
    setEditTodo(null);
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        placeholder="write your task"
        value={todoInput}
        onChange={(e) => {
          setTodoInput(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className={editTodo ? "input-editing" : ""}
      />
      {editTodo ? (
        <div className="action-group">
          <button className="btn-edit" onClick={handleEditTodo}>
            Update
          </button>

          <button className="btn-cancel" onClick={handleEditCancel}>
            ✕
          </button>
        </div>
      ) : (
        <button className="btn-add" onClick={handleAddTodo}>
          +
        </button>
      )}
    </div>
  );
};
export default TodoForm;
