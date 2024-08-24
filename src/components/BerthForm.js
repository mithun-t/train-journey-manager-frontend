import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function BerthForm() {
  const [berths, setBerths] = useState([]);
  const [berthData, setBerthData] = useState({ code: "", name: "" });
  const [editingBerth, setEditingBerth] = useState(null);

  useEffect(() => {
    fetchBerths();
  }, []);

  const fetchBerths = () => {
    axios
      .get("http://localhost:8000/api/berths/")
      .then((response) => setBerths(response.data))
      .catch((error) => console.error("Error fetching berths:", error));
  };

  const handleChange = (e) => {
    setBerthData({ ...berthData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBerth) {
      axios
        .put(`http://localhost:8000/api/berths/${editingBerth.id}/`, berthData)
        .then(() => {
          fetchBerths();
          resetForm();
        })
        .catch((error) => console.error("Error updating berth:", error));
    } else {
      axios
        .post("http://localhost:8000/api/berths/", berthData)
        .then(() => {
          fetchBerths();
          resetForm();
        })
        .catch((error) => console.error("Error saving berth:", error));
    }
  };

  const handleEdit = (berth) => {
    setBerthData(berth);
    setEditingBerth(berth);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/berths/${id}/`)
      .then(() => fetchBerths())
      .catch((error) => console.error("Error deleting berth:", error));
  };

  const resetForm = () => {
    setBerthData({ code: "", name: "" });
    setEditingBerth(null);
  };

  return (
    <div>
      <h2>Manage Berths</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Berth Code"
          name="code"
          value={berthData.code}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Berth Name"
          name="name"
          value={berthData.name}
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
          {editingBerth ? "Update Berth" : "Add Berth"}
        </Button>
      </form>

      <List>
        {berths.map((berth) => (
          <ListItem key={berth.id}>
            {berth.name} ({berth.code})
            <IconButton edge="end" onClick={() => handleEdit(berth)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(berth.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default BerthForm;
