import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import StationForm from "./StationForm";
import StatusForm from "./StatusForm";
import BerthForm from "./BerthForm";
import PaymentModeForm from "./PaymentModeForm";

function MasterDataForm() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <StationForm />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <StatusForm />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <BerthForm />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <PaymentModeForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MasterDataForm;
