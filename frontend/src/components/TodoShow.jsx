import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi.js";
const TodoShow = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodoCount = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };
    fetchTodoCount();
  }, []);

  const todoDoneCount = todos.filter((todo) => todo.done).length;

  return (
    <div className="todo-show">
      <div className="todo-text">
        <h1>Todo Done</h1>
        <h3>Keep it up</h3>
      </div>
      <div className="circle-count">
        <h1>
          {todoDoneCount}/{todos.length}
        </h1>
      </div>
    </div>
  );
};
export default TodoShow;
