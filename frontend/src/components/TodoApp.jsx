import TodoShow from "./TodoShow";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import { deleteTodo, getTodos } from "../api/todoApi.js";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);

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

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setEditingTodoId(todo.id);
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
    setEditingTodoId(null);
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
        setEditingTodoId={setEditingTodoId}
        cancelEdit={handleCancelEdit}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        onDelete={handleDelete}
        onEdit={handleEdit}
        editingTodoId={editingTodoId}
      />
    </div>
  );
};
export default TodoApp;
