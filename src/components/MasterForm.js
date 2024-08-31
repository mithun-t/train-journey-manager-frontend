import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import BASE_URL from "../urls";

const MasterForm = (props) => {
  const [masters, setMasters] = useState([]);
  const [masterData, setMasterData] = useState({ code: "", name: "" });
  const [editingMaster, setEditingMaster] = useState(null);

  useEffect(() => {
    fetchMasters();
  }, []);

  const fetchMasters = () => {
    axios
      .get(BASE_URL + props.endpoint + "/")
      .then((response) => setMasters(response.data))
      .catch((error) => console.error(`Error fetching ${props.name}s:`, error));
  };

  const handleChange = (e) => {
    setMasterData({ ...masterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMaster) {
      axios
        .put(`${BASE_URL}${props.endpoint}/${editingMaster.id}/`, masterData)
        .then(() => {
          fetchMasters();
          resetForm();
        })
        .catch((error) =>
          console.error(`Error updating ${props.name}:`, error)
        );
    } else {
      axios
        .post(`${BASE_URL}${props.endpoint}/`, masterData)
        .then(() => {
          fetchMasters();
          resetForm();
        })
        .catch((error) => console.error(`Error saving ${props.name}:`, error));
    }
  };

  const handleEdit = (data) => {
    setMasterData(data);
    setEditingMaster(data);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}${props.endpoint}/${editingMaster.id}/`)
      .then(() => fetchMasters())
      .catch((error) => console.error(`Error deleting ${props.name}:`, error));
  };

  const resetForm = () => {
    setMasterData({ code: "", name: "" });
    setEditingMaster(null);
  };

  return (
    <div>
      <h2>{props.name}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          label={`${props.name} Code`}
          name="code"
          value={masterData.code}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          size="small"
          label={`${props.name} Name`}
          name="name"
          value={masterData.name}
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
          {editingMaster ? `Update ${props.name}` : `Add ${props.name}`}
        </Button>
      </form>

      <List>
        {masters.map((data) => (
          <ListItem key={data.id}>
            {data.name} ({data.code})
            <IconButton edge="end" onClick={() => handleEdit(data)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(data.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MasterForm;
