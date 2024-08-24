import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function StatusForm() {
  const [statuses, setStatuss] = useState([]);
  const [statusData, setStatusData] = useState({ code: "", name: "" });
  const [editingStatus, setEditingStatus] = useState(null);

  useEffect(() => {
    fetchStatuss();
  }, []);

  const fetchStatuss = () => {
    axios
      .get("http://localhost:8000/api/statuses/")
      .then((response) => setStatuss(response.data))
      .catch((error) => console.error("Error fetching statuses:", error));
  };

  const handleChange = (e) => {
    setStatusData({ ...statusData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStatus) {
      axios
        .put(
          `http://localhost:8000/api/statuses/${editingStatus.id}/`,
          statusData
        )
        .then(() => {
          fetchStatuss();
          resetForm();
        })
        .catch((error) => console.error("Error updating status:", error));
    } else {
      axios
        .post("http://localhost:8000/api/statuses/", statusData)
        .then(() => {
          fetchStatuss();
          resetForm();
        })
        .catch((error) => console.error("Error saving status:", error));
    }
  };

  const handleEdit = (status) => {
    setStatusData(status);
    setEditingStatus(status);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/statuses/${id}/`)
      .then(() => fetchStatuss())
      .catch((error) => console.error("Error deleting status:", error));
  };

  const resetForm = () => {
    setStatusData({ code: "", name: "" });
    setEditingStatus(null);
  };

  return (
    <div>
      <h2>Manage Statuss</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Status Code"
          name="code"
          value={statusData.code}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Status Name"
          name="name"
          value={statusData.name}
          onChange={handleChange}
          required
          fullWidth
          style={{ marginTop: 10 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          {editingStatus ? "Update Status" : "Add Status"}
        </Button>
      </form>

      <List>
        {statuses.map((status) => (
          <ListItem key={status.id}>
            {status.name} ({status.code})
            <IconButton edge="end" onClick={() => handleEdit(status)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(status.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default StatusForm;
