import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import BASE_URL from "../urls";
import DropDownField from "./Fields/DropDownField";

function JourneyForm({
  formData,
  handleChange,
  handleSubmit,
  handleClearForm,
  submitButtonText,
}) {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [berths, setBerths] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);

  useEffect(() => {
    fetchMasters();
  }, []);

  const fetchMasters = () => {
    axios
      .get(BASE_URL + "trains/")
      .then((response) => setTrains(response.data))
      .catch((error) => console.error("Error fetching trains:", error));

    axios
      .get(BASE_URL + "stations/")
      .then((response) => setStations(response.data))
      .catch((error) => console.error("Error fetching stations:", error));

    axios
      .get(BASE_URL + "statuses/")
      .then((response) => setStatuses(response.data))
      .catch((error) => console.error("Error fetching statuses:", error));

    axios
      .get(BASE_URL + "berths/")
      .then((response) => setBerths(response.data))
      .catch((error) => console.error("Error fetching berths:", error));

    axios
      .get(BASE_URL + "payment_modes/")
      .then((response) => setPaymentModes(response.data))
      .catch((error) => console.error("Error fetching payment modes:", error));
  };

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
          <DropDownField
            label="Train"
            value={formData.train_number}
            name="train_number"
            handleChange={handleChange}
            datas={trains}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Departure Station"
            value={formData.departure_station}
            name="departure_station"
            handleChange={handleChange}
            datas={stations}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Arrival Station"
            value={formData.arrival_station}
            name="arrival_station"
            handleChange={handleChange}
            datas={stations}
          />
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
          <DropDownField
            label="Booking Status"
            value={formData.status}
            name="status"
            handleChange={handleChange}
            datas={statuses}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Berth"
            value={formData.berth}
            name="berth"
            handleChange={handleChange}
            datas={berths}
          />
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
          <DropDownField
            label="Payment Mode"
            value={formData.payment_mode}
            name="payment_mode"
            handleChange={handleChange}
            datas={paymentModes}
          />
        </Grid>
        {formData.payment_mode === "Credit" && (
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
        )}

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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            size="small"
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "20px" }}
          >
            {submitButtonText}
          </Button>

          <Button
            size="small"
            type="submit"
            variant="contained"
            color="error"
            style={{ margin: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              handleClearForm();
            }}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default JourneyForm;
