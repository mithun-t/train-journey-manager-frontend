import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function StationForm() {
  const [stations, setStations] = useState([]);
  const [stationData, setStationData] = useState({ code: "", name: "" });
  const [editingStation, setEditingStation] = useState(null);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = () => {
    axios
      .get("http://localhost:8000/api/stations/")
      .then((response) => setStations(response.data))
      .catch((error) => console.error("Error fetching stations:", error));
  };

  const handleChange = (e) => {
    setStationData({ ...stationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStation) {
      axios
        .put(
          `http://localhost:8000/api/stations/${editingStation.id}/`,
          stationData
        )
        .then(() => {
          fetchStations();
          resetForm();
        })
        .catch((error) => console.error("Error updating station:", error));
    } else {
      axios
        .post("http://localhost:8000/api/stations/", stationData)
        .then(() => {
          fetchStations();
          resetForm();
        })
        .catch((error) => console.error("Error saving station:", error));
    }
  };

  const handleEdit = (station) => {
    setStationData(station);
    setEditingStation(station);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/stations/${id}/`)
      .then(() => fetchStations())
      .catch((error) => console.error("Error deleting station:", error));
  };

  const resetForm = () => {
    setStationData({ code: "", name: "" });
    setEditingStation(null);
  };

  return (
    <div>
      <h2>Manage Stations</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          label="Station Code"
          name="code"
          value={stationData.code}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          size="small"
          label="Station Name"
          name="name"
          value={stationData.name}
          onChange={handleChange}
          required
          fullWidth
          style={{ marginTop: 10 }}
        />
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          {editingStation ? "Update Station" : "Add Station"}
        </Button>
      </form>

      <List>
        {stations.map((station) => (
          <ListItem key={station.id}>
            {station.name} ({station.code})
            <IconButton edge="end" onClick={() => handleEdit(station)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(station.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default StationForm;
