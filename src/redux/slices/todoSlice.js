import { createSlice } from "@reduxjs/toolkit";
export const todoListSlice = createSlice({
  name: "todoList",
  initialState: {
    todoList: JSON.parse(localStorage.getItem("todoList")) ?? [],
    searchList: "",
  },
  reducers: {
    addNewTodo: (state, action) => {
      const newList = action.payload;
      return { ...state, todoList: [...state.todoList, newList] };
    },
    editTodo: (state, action) => {
      const { id, name, description, dueDate, priority } = action.payload;
      const todoIndex = state.todoList.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const updatedTodo = {
          ...state.todoList[todoIndex],
          name,
          description,
          dueDate,
          priority,
        };
        const updatedList = [...state.todoList];
        updatedList[todoIndex] = updatedTodo;
        return { ...state, todoList: updatedList };
      }
      return state;
    },
    removeTodo: (state, action) => {
      const newList = state.todoList.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        todoList: newList,
      };
    },
    SearchTerm: (state, action) => {
      const searchTeam = action.payload.toLowerCase();
      if (!searchTeam) {
        return {
          ...state,
          todoList: JSON.parse(localStorage.getItem("todoList")) ?? [],
        };
      } else {
        const filteredList = state.todoList.filter((item) =>
          item.name.toLowerCase().includes(searchTeam.toLowerCase())
        );
        return {
          ...state,
          todoList: filteredList,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewTodo, editTodo, removeTodo, SearchTerm } =
  todoListSlice.actions;

export default todoListSlice.reducer;
