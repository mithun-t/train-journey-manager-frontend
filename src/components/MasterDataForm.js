import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import MasterForm from "./MasterForm";

function MasterDataForm() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <MasterForm endpoint="stations" name="Station" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <MasterForm endpoint="statuses" name="Status" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <MasterForm endpoint="berths" name="Berth" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <MasterForm endpoint="payment_modes" name="Payment Mode" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MasterDataForm;
