import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { updateTodo } from "../api/todoApi.js";

const TodoList = ({ todos, onDelete, onEdit, setTodos, editingTodoId }) => {
  // Delete
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        onDelete(id);
      }
    });
  };

  // Edit
  const handleEditClick = (todo) => {
    onEdit(todo);
  };

  // Checked Done
  const handleToggleDone = async (todo) => {
    // อัปเดตทันที
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
    );

    try {
      const updatedTodo = await updateTodo({ id: todo.id, done: !todo.done });

      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, done: updatedTodo.done } : t
        )
      );
    } catch (err) {
      console.error("Error updating todo:", err);

      // ถ้า backend ล้มเหลว rollback
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? { ...t, done: todo.done } : t))
      );
    }
  };

  return (
    <div className="todo-list-container">
      {/* if no data */}
      {todos.length === 0 ? (
        <div
          className="todo-list"
          style={{ justifyContent: "center", color: "#555" }}
        >
          <p>No todos yet. Please add some!</p>
        </div>
      ) : (
        // if found data
        todos.map((todo) => (
          <div
            className={`todo-list ${
              todo.id === editingTodoId ? "editing" : ""
            }`}
            key={todo.id}
          >
            <div className="list-item">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggleDone(todo)}
              />
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
              <FiEdit
                className="btn-action"
                onClick={() => handleEditClick(todo)}
              />
              <MdOutlineDelete
                className="btn-action"
                onClick={() => handleDeleteClick(todo.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default TodoList;
