import React from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

function JourneyForm({
  formData,
  handleChange,
  handleSubmit,
  submitButtonText,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="journey_date"
            label="Journey Date"
            value={formData.journey_date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="train_number"
            label="Train Number"
            value={formData.train_number}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="train_name"
            label="Train Name"
            value={formData.train_name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Departure Station</InputLabel>
            <Select
              name="departure_station"
              value={formData.departure_station}
              onChange={handleChange}
            >
              <MenuItem value="">Select Departure Station</MenuItem>
              <MenuItem value="YPR">Yesvantpur</MenuItem>
              <MenuItem value="CLT">Cochin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Arrival Station</InputLabel>
            <Select
              name="arrival_station"
              value={formData.arrival_station}
              onChange={handleChange}
            >
              <MenuItem value="">Select Arrival Station</MenuItem>
              <MenuItem value="YPR">Yesvantpur</MenuItem>
              <MenuItem value="CLT">Cochin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="pnr_number"
            label="PNR Number"
            value={formData.pnr_number}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="WL">Waiting List</MenuItem>
              <MenuItem value="CNF">Confirmed</MenuItem>
              <MenuItem value="RAC">RAC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="notes"
            label="Notes"
            multiline
            rows={4}
            value={formData.notes}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Berth</InputLabel>
            <Select name="berth" value={formData.berth} onChange={handleChange}>
              <MenuItem value="">Select Berth</MenuItem>
              <MenuItem value="UB">Upper Berth</MenuItem>
              <MenuItem value="SL">Side Lower Berth</MenuItem>
              <MenuItem value="SU">Side Upper Berth</MenuItem>
              <MenuItem value="MB">Middle Berth</MenuItem>
              <MenuItem value="LB">Lower Berth</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            name="price"
            label="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="booked_date"
            label="Booked Date"
            value={formData.booked_date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="bill_date"
            label="Bill Date"
            value={formData.bill_date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Payment Mode</InputLabel>
            <Select
              name="payment_mode"
              value={formData.payment_mode}
              onChange={handleChange}
            >
              <MenuItem value="">Select Payment Mode</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Debit Card">Debit Card</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="journey_status_checked"
                checked={formData.journey_status_checked}
                onChange={handleChange}
              />
            }
            label={`Journey Status: ${formData.journey_status || "Pending"}`}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        {submitButtonText}
      </Button>
    </form>
  );
}

export default JourneyForm;
