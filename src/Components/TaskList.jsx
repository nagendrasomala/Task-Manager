import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskStatus, editTask } from "../redux/tasksSlice";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField as MuiTextField,
  Box
} from "@mui/material";
import { Delete, CheckCircle, Edit } from "@mui/icons-material";

function TaskList({ tasks, filter }) {
  const dispatch = useDispatch();

  // State for editing tasks
  const [editTaskState, setEditTaskState] = React.useState(null);
  const [updatedTitle, setUpdatedTitle] = React.useState("");
  const [updatedDescription, setUpdatedDescription] = React.useState("");
  const [updatedDueDate, setUpdatedDueDate] = React.useState("");

  // Modal state for delete confirmation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);
  const [taskToDelete, setTaskToDelete] = React.useState(null);

  // Open the edit dialog
  const handleEditClick = (task) => {
    setEditTaskState(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedDueDate(task.dueDate);
  };

  // Close the edit dialog
  const handleClose = () => {
    setEditTaskState(null);
  };

  // Save the updated task
  const handleSave = () => {
    dispatch(
      editTask({
        id: editTaskState.id,
        title: updatedTitle,
        description: updatedDescription,
        dueDate: updatedDueDate,
      })
    );
    handleClose();
  };

  // Handle delete task confirmation
  const handleDeleteConfirm = () => {
    dispatch(deleteTask(taskToDelete.id));
    setShowDeleteConfirmation(false);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed && new Date(task.dueDate) >= new Date();
    if (filter === "overdue") return new Date(task.dueDate) < new Date();
    return true; // For "all", return all tasks
  });

  return (
    <div>
      {/* Task Title (Updated based on filter) */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem", textAlign: "start" }}>
        {filter === "completed"
          ? "Completed Tasks"
          : filter === "pending"
          ? "Pending Tasks"
          : filter === "overdue"
          ? "Overdue Tasks"
          : "All Tasks"}
      </Typography>

      {/* Render each task */}
      {filteredTasks.map((task) => (
        <Card
          key={task.id}
          style={{
            marginBottom: "1rem",
            backgroundColor: "#FAFAFA",
            position: "relative",
            paddingLeft: "1rem",
          }}
        >
          <CardContent>
            {/* Title */}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {task.title}
            </Typography>
            <Typography>{task.description}</Typography>
          </CardContent>

          {/* Bottom of the Card: Due Date and Icons */}
          <Grid container justifyContent="space-between" sx={{ padding: "8px" }}>
            {/* Due Date: Left Bottom */}
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography color="textSecondary" variant="body2">
                Due: {task.dueDate}
              </Typography>
            </Grid>

            {/* Action Icons: Right Bottom */}
            <Grid item>
              <Grid container spacing={1}>
                {/* Toggle Task Status */}
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      color={task.completed ? "success" : "default"}
                      onClick={() => dispatch(toggleTaskStatus(task.id))}
                    >
                      <CheckCircle />
                    </IconButton>
                    {task.completed && (
                      <Typography variant="body2" color="success.main" sx={{ marginLeft: "8px" }}>
                        Completed
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {/* Edit Task */}
                <Grid item>
                  <IconButton color="primary" onClick={() => handleEditClick(task)}>
                    <Edit />
                  </IconButton>
                </Grid>

                {/* Delete Task */}
                <Grid item>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setTaskToDelete(task);
                      setShowDeleteConfirmation(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      ))}

      {/* Edit Task Dialog */}
      {editTaskState && (
        <Dialog open={Boolean(editTaskState)} onClose={handleClose}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <MuiTextField
              fullWidth
              label="Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              margin="normal"
            />
            <MuiTextField
              fullWidth
              label="Description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              margin="normal"
            />
            <MuiTextField
              fullWidth
              label="Due Date"
              type="date"
              value={updatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <Dialog open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setShowDeleteConfirmation(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default TaskList;
