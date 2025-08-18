import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";

const TodoList = ({ todos, onDelete, onEdit }) => {
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
