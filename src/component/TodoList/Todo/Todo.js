import "./Todo.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./listTodo";
import { SearchTerm } from "../../../redux/slices/todoSlice";

const Todo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todo.todoList);
  const handleRender = () => {
    if (data && data.length > 0) {
      return (
        <>
          {data.map((item, i) => {
            return <TodoItem key={i} item={item} />;
          })}
        </>
      );
    } else {
      return (
        <>
          <h3>There is no task</h3>
        </>
      );
    }
  };
  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <form className="todo-form">
          <input
            onChange={(e) => dispatch(SearchTerm(e.target.value))}
            type="text"
            placeholder="Search"
          />
          <button onClick={() => navigate("/create")} type="submit">
            Add New
          </button>
        </form>
        {handleRender()}
      </div>
    </>
  );
};
export default Todo;
