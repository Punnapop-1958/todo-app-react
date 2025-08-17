import TodoShow from "./components/TodoShow";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

const App = () => {
  return (
    <div className="wrapper">
      <TodoShow />
      <TodoForm />
      <TodoList />
    </div>
  );
};
export default App;
