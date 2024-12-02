import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Typography, Box, Card, CardContent, Paper, TextField, Button } from "@mui/material";
import TaskFilters from "./TaskFilters.jsx";
import { addTask } from "../redux/tasksSlice.js";
import { Link } from "react-router-dom";
import TaskList from "./TaskList.jsx";

function Dashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const isCompleted = task.completed;
    const isPending = !task.completed && new Date(task.dueDate) >= new Date();
    const isOverdue = new Date(task.dueDate) < new Date();

    if (filter === "completed") return isCompleted && matchesSearch;
    if (filter === "pending") return isPending && matchesSearch;
    if (filter === "overdue") return isOverdue && matchesSearch;
    return matchesSearch; // Default: show all tasks
  });

  const handleToggleForm = () => setShowForm((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.dueDate) {
      dispatch(addTask({ ...newTask, id: Date.now(), completed: false }));
      setNewTask({ title: "", description: "", dueDate: "" });
      setShowForm(false);
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div >
      <Box
        sx={{
          padding: "1rem 2rem",
          backgroundColor: "#26263D",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, 
          justifyContent: { xs: "center", sm: "space-between" }, 
          alignItems: "center",
          gap: "1rem", 
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#F1B623",
            textTransform: "uppercase",
            textAlign: { xs: "center", sm: "left" }, 
          }}
        >
          Task Management Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row",md:"row" }, 
            justifyContent: { xs: "center", sm: "flex-end" }, 
            alignItems: "center",
            gap: "1rem",
            marginTop: { xs: "1rem", sm: 0 }, 
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleToggleForm}
            aria-label="Toggle Task Creation Form"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            {showForm ? "Close Form" : "Create Task"}
          </Button>

          <Link to="/tasks" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Tasks
            </Button>
          </Link>
        </Box>


      </Box>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Sidebar Menu */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#26263D",
                borderRadius: "12px",
                color: "#FFF",
                padding: "1rem",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  textAlign: "center",
                  color: "#F5A623",
                }}
              >
                Filters & Search
              </Typography>
              <TaskFilters setFilter={setFilter} />
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search Tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  mt: 2,
                  input: { color: "#FFF" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#F5A623",
                    },
                    "&:hover fieldset": {
                      borderColor: "#F5A623",
                    },
                  },
                }}
              />

              {/* Create Task Form */}
              {showForm && (
                <Box
                  component="form"
                  onSubmit={handleFormSubmit}
                  sx={{
                    marginTop: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "#FFFFFF", 
                    borderRadius: "8px",
                    color: "#000", 
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "1rem",
                      color: "#F5A623",
                    }}
                  >
                    Add New Task
                  </Typography>
                  <TextField
                    label="Task Title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Task Description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Create Task
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Main Dashboard Area */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              {/* Task Overview Cards */}
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    backgroundColor: "#2A9D8F",
                    borderRadius: "12px",
                    color: "#FFF",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Total Tasks
                    </Typography>
                    <Typography variant="h5">{tasks.length}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    backgroundColor: "#E76F51",
                    borderRadius: "12px",
                    color: "#FFF",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Pending Tasks
                    </Typography>
                    <Typography variant="h5">
                      {
                        tasks.filter(
                          (task) =>
                            !task.completed && new Date(task.dueDate) >= new Date()
                        ).length
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{
                    backgroundColor: "#F4A261",
                    borderRadius: "12px",
                    color: "#FFF",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Completed Tasks
                    </Typography>
                    <Typography variant="h5">
                      {tasks.filter((task) => task.completed).length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Task List Section */}
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    backgroundColor: "#264653",
                    borderRadius: "12px",
                    color: "#FFF",
                    padding: "1.5rem",
                  }}
                >
                  <TaskList tasks={filteredTasks} filter={filter} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
