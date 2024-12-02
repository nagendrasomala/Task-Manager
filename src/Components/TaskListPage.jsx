import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography,Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toggleTaskStatus, deleteTask } from "../redux/tasksSlice";

function ListPage() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <Box style={{
        marginBottom: "1rem",
        position: "relative",
        padding: "2rem",
      }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
        All Tasks
      </Typography>


      {tasks.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No tasks available.
        </Typography>
      ) : (
        tasks.map((task) => (
          <Card
            key={task.id}
            style={{
              marginBottom: "1rem",
              backgroundColor: "#f4f4f4",
              position: "relative",
              paddingLeft: "1rem",
            }}
          >
            <CardContent>
              {/* Task Title */}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {task.title}
              </Typography>
              <Typography>{task.description}</Typography>
            </CardContent>

            <Grid container justifyContent="space-between" sx={{ padding: "8px" }}>
              <Grid item sx={{ flexGrow: 1 }}>
                <Typography color="textSecondary" variant="body2">
                  Due: {task.dueDate}
                </Typography>
              </Grid>


              <Grid item>
                <Grid container spacing={1}>
                  {/* Toggle Task Status */}
                  <Grid item>
                    <Button
                      variant="outlined"
                      color={task.completed ? "success" : "default"}
                      onClick={() => dispatch(toggleTaskStatus(task.id))}
                    >
                      {task.completed ? "Completed" : "Mark as Complete"}
                    </Button>
                  </Grid>

                  {/* View Task Details */}
                  <Grid item>
                    <Link to={`/tasks/${task.id}`}>
                      <Button variant="outlined" color="primary">
                        View Details
                      </Button>
                    </Link>
                  </Grid>

                  {/* Delete Task */}
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(deleteTask(task.id))}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ))
      )}
    </Box>
  );
}

export default ListPage;
