import React from "react";
import { Button, Grid } from "@mui/material";

function TaskFilters({ setFilter }) {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="outlined" onClick={() => setFilter("all")}>
          All
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={() => setFilter("completed")}>
          Completed
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={() => setFilter("pending")}>
          Pending
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={() => setFilter("overdue")}>
          Overdue
        </Button>
      </Grid>
    </Grid>
  );
}

export default TaskFilters;
