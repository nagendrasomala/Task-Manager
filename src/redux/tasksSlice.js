import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],  
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: Date.now(), completed: false };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          title: action.payload.title,
          description: action.payload.description,
          dueDate: action.payload.dueDate,
        };
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
      }
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    }
  },
});

export const { addTask, editTask, deleteTask, toggleTaskStatus, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
