const TodoShow = ({ todos, setTodos }) => {
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
