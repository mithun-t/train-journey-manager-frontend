import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [formData, setFormData] = useState({
    journey_date: "",
    train_number: "",
    train_name: "",
    departure_station: "",
    arrival_station: "",
    pnr_number: "",
    status: "",
    notes: "",
    berth: "",
    price: "",
    booked_date: "",
    bill_date: "",
    payment_mode: "",
    journey_status: "",
    journey_status_checked: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/journeys/")
      .then((response) => setJourneys(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/journeys/", formData)
      .then((response) => {
        setJourneys([...journeys, response.data]);
        setFormData({
          journey_date: "",
          train_number: "",
          train_name: "",
          departure_station: "",
          arrival_station: "",
          pnr_number: "",
          status: "",
          notes: "",
          berth: "",
          price: "",
          booked_date: "",
          bill_date: "",
          payment_mode: "",
          journey_status: "",
          journey_status_checked: false,
        });
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/journeys/${id}/`)
      .then(() => {
        setJourneys(journeys.filter((journey) => journey.id !== id));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        Train Journey Manager
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
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

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Berth</InputLabel>
                <Select
                  name="berth"
                  value={formData.berth}
                  onChange={handleChange}
                >
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
                    checked={formData.journey_status_checked}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        journey_status: e.target.checked
                          ? "Completed"
                          : "Pending",
                        journey_status_checked: e.target.checked,
                      })
                    }
                    name="journey_status"
                  />
                }
                label={`Journey Status: ${
                  formData.journey_status || "Pending"
                }`}
              />
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
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Journey
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <List>
        {journeys.map((journey) => (
          <ListItem key={journey.id}>
            <ListItemText
              primary={`${journey.train_name} (${journey.train_number})`}
              secondary={`PNR: ${journey.pnr_number} - Status: ${journey.status} - Berth: ${journey.berth} - Price: ${journey.price} - Payment: ${journey.payment_mode}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(journey.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
