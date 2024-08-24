import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function PaymentModeForm() {
  const [paymentModes, setPaymentModes] = useState([]);
  const [paymentModeData, setPaymentModeData] = useState({
    code: "",
    name: "",
  });
  const [editingPaymentMode, setEditingPaymentMode] = useState(null);

  useEffect(() => {
    fetchPaymentModes();
  }, []);

  const fetchPaymentModes = () => {
    axios
      .get("http://localhost:8000/api/payment_modes/")
      .then((response) => setPaymentModes(response.data))
      .catch((error) => console.error("Error fetching paymentModes:", error));
  };

  const handleChange = (e) => {
    setPaymentModeData({ ...paymentModeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPaymentMode) {
      axios
        .put(
          `http://localhost:8000/api/payment_modes/${editingPaymentMode.id}/`,
          paymentModeData
        )
        .then(() => {
          fetchPaymentModes();
          resetForm();
        })
        .catch((error) => console.error("Error updating paymentMode:", error));
    } else {
      axios
        .post("http://localhost:8000/api/payment_modes/", paymentModeData)
        .then(() => {
          fetchPaymentModes();
          resetForm();
        })
        .catch((error) => console.error("Error saving paymentMode:", error));
    }
  };

  const handleEdit = (paymentMode) => {
    setPaymentModeData(paymentMode);
    setEditingPaymentMode(paymentMode);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/payment_modes/${id}/`)
      .then(() => fetchPaymentModes())
      .catch((error) => console.error("Error deleting paymentMode:", error));
  };

  const resetForm = () => {
    setPaymentModeData({ code: "", name: "" });
    setEditingPaymentMode(null);
  };

  return (
    <div>
      <h2>Manage PaymentModes</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="PaymentMode Code"
          name="code"
          value={paymentModeData.code}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="PaymentMode Name"
          name="name"
          value={paymentModeData.name}
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
          {editingPaymentMode ? "Update PaymentMode" : "Add PaymentMode"}
        </Button>
      </form>

      <List>
        {paymentModes.map((paymentMode) => (
          <ListItem key={paymentMode.id}>
            {paymentMode.name} ({paymentMode.code})
            <IconButton edge="end" onClick={() => handleEdit(paymentMode)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(paymentMode.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default PaymentModeForm;
