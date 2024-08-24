import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";

import JourneyForm from "./components/JourneyForm";
import JourneyList from "./components/JourneyList";
import MasterDataForm from "./components/MasterDataForm"; // New import for master data management

function App() {
  const [journeys, setJourneys] = useState([]);
  const [formData, setFormData] = useState(getDefaultFormData());
  const [editingJourney, setEditingJourney] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openMasterDataDialog, setOpenMasterDataDialog] = useState(false); // New state for master data dialog

  useEffect(() => {
    fetchJourneys();
  }, []);

  function getDefaultFormData() {
    const today = new Date().toISOString().split("T")[0];
    return {
      journey_date: today,
      train_number: "",
      train_name: "",
      departure_station: "",
      arrival_station: "",
      pnr_number: "",
      status: "",
      notes: "",
      berth: "",
      price: "",
      booked_date: today,
      bill_date: today,
      payment_mode: "",
      journey_status: "",
      journey_status_checked: false,
    };
  }

  const fetchJourneys = () => {
    axios
      .get("http://localhost:8000/api/journeys/")
      .then((response) => setJourneys(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      journey_status:
        name === "journey_status_checked"
          ? checked
            ? "Completed"
            : "Pending"
          : prevData.journey_status,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/journeys/", formData)
      .then((response) => {
        setJourneys([...journeys, response.data]);
        resetForm();
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

  const handleEdit = (journey) => {
    setEditingJourney(journey);
    setFormData({
      ...journey,
      journey_status_checked: journey.journey_status === "Completed",
    });
    setOpenDialog(true);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8000/api/journeys/${editingJourney.id}/`, formData)
      .then((response) => {
        setJourneys(
          journeys.map((journey) =>
            journey.id === editingJourney.id ? response.data : journey
          )
        );
        setOpenDialog(false);
        resetForm();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const resetForm = () => {
    setFormData(getDefaultFormData());
    setEditingJourney(null);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        Train Journey Manager
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <JourneyForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitButtonText="Add Journey"
        />
      </Paper>

      <JourneyList
        journeys={journeys}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Master Data Management Button */}
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: 20 }}
        onClick={() => setOpenMasterDataDialog(true)}
      >
        Manage Master Data
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Journey</DialogTitle>
        <DialogContent>
          <JourneyForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            submitButtonText="Update Journey"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Master Data Management */}
      <Dialog
        open={openMasterDataDialog}
        onClose={() => setOpenMasterDataDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Manage Master Data</DialogTitle>
        <DialogContent>
          <MasterDataForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMasterDataDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
