import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

function TaskForm() {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });

  const handleAddTask = () => {
    if (newTask.title && newTask.description && newTask.dueDate) {
      dispatch(addTask(newTask));
      setNewTask({ title: "", description: "", dueDate: "" });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Task
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddTask}
          style={{ marginTop: "1rem" }}
        >
          Add Task
        </Button>
      </CardContent>
    </Card>
  );
}

export default TaskForm;
