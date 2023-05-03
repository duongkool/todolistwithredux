import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import todoReducer from "./slices/todoSlice";

const saveTodoListMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type === "todoList/addNewTodo" ||
    action.type === "todoList/removeTodo" ||
    action.type === "todoList/editTodo"
  ) {
    const todoList = store.getState().todo.todoList;
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
  return result;
};

export default configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveTodoListMiddleware),
});
