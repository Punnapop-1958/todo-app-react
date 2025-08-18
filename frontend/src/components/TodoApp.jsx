import TodoShow from "./TodoShow";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import { deleteTodo, getTodos } from "../api/todoApi.js";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log("Error deleting todo:", err);
    }
  };

  console.log(editTodo);

  return (
    <div>
      <TodoShow todos={todos} setTodos={setTodos} />
      <TodoForm
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
      <TodoList todos={todos} onDelete={handleDelete} onEdit={setEditTodo} />
    </div>
  );
};
export default TodoApp;
