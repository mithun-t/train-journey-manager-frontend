import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [stations, setStations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [berths, setBerths] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/stations/")
      .then((response) => setStations(response.data))
      .catch((error) => console.error("Error fetching stations:", error));

    axios
      .get("http://localhost:8000/api/statuses/")
      .then((response) => setStatuses(response.data))
      .catch((error) => console.error("Error fetching statuses:", error));

    axios
      .get("http://localhost:8000/api/berths/")
      .then((response) => setBerths(response.data))
      .catch((error) => console.error("Error fetching berths:", error));

    axios
      .get("http://localhost:8000/api/payment_modes/")
      .then((response) => setPaymentModes(response.data))
      .catch((error) => console.error("Error fetching payment modes:", error));
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
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
            size="small"
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
            size="small"
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
              size="small"
              name="departure_station"
              value={formData.departure_station}
              onChange={handleChange}
            >
              <MenuItem value="">Select Departure Station</MenuItem>
              {stations.map((station) => (
                <MenuItem key={station.id} value={station.code}>
                  {station.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Arrival Station</InputLabel>
            <Select
              size="small"
              name="arrival_station"
              value={formData.arrival_station}
              onChange={handleChange}
            >
              <MenuItem value="">Select Arrival Station</MenuItem>
              {stations.map((station) => (
                <MenuItem key={station.id} value={station.code}>
                  {station.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
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
              size="small"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="">Select Status</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status.id} value={status.code}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Berth</InputLabel>
            <Select
              name="berth"
              value={formData.berth}
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="">Select Berth</MenuItem>
              {berths.map((berth) => (
                <MenuItem key={berth.id} value={berth.code}>
                  {berth.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
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
            size="small"
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
            size="small"
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
              size="small"
              name="payment_mode"
              value={formData.payment_mode}
              onChange={handleChange}
            >
              <MenuItem value="">Select Payment Mode</MenuItem>
              {paymentModes.map((paymentMode) => (
                <MenuItem key={paymentMode.id} value={paymentMode.code}>
                  {paymentMode.name}
                </MenuItem>
              ))}
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
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="notes"
            label="Notes"
            multiline
            rows={1}
            value={formData.notes}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        size="small"
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
