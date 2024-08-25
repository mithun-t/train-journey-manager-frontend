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
  ThemeProvider,
  createTheme,
  CssBaseline,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TopButtons from "./components/TopButtons";
import JourneyForm from "./components/JourneyForm";
import JourneyList from "./components/JourneyList";
import MasterDataForm from "./components/MasterDataForm";
import BASE_URL from "./urls";
import { register, login, setAuthToken } from "./auth";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [journeys, setJourneys] = useState([]);
  const [formData, setFormData] = useState(getDefaultFormData());
  const [editingJourney, setEditingJourney] = useState(null);
  const [openMasterDataDialog, setOpenMasterDataDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      fetchJourneys();
    }
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
      journey_status: "Pending",
      journey_status_checked: false,
    };
  }

  const fetchJourneys = () => {
    axios
      .get(`${BASE_URL}journeys/`)
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
      .post(BASE_URL + "journeys/", formData)
      .then((response) => {
        setJourneys([...journeys, response.data]);
        resetForm();
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}journeys/${id}/`)
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
  };

  const handleUpdate = () => {
    axios
      .put(`${BASE_URL}journeys/${editingJourney.id}/`, formData)
      .then((response) => {
        setJourneys(
          journeys.map((journey) =>
            journey.id === editingJourney.id ? response.data : journey
          )
        );
        resetForm();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const resetForm = () => {
    setFormData(getDefaultFormData());
    setEditingJourney(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setAuthToken(response.data.token);
        setIsAuthenticated(true);
        fetchJourneys();
      })
      .catch((error) => console.error("Login error:", error));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(username, email, password)
      .then(() => {
        setIsRegistering(false);
      })
      .catch((error) => console.error("Registration error:", error));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsAuthenticated(false);
    setJourneys([]);
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="xs">
        <Typography variant="h4" gutterBottom>
          {isRegistering ? "Register" : "Login"}
        </Typography>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isRegistering && (
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isRegistering ? "Register" : "Login"}
          </Button>
        </form>
        <Button
          onClick={() => setIsRegistering(!isRegistering)}
          fullWidth
          style={{ marginTop: 10 }}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <TopButtons
        theme={theme}
        colorMode={colorMode}
        handleLogout={handleLogout}
        setOpenMasterDataDialog={setOpenMasterDataDialog}
      />

      <Typography variant="h5" gutterBottom>
        Train Journey Manager
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <JourneyForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={editingJourney ? handleUpdate : handleSubmit}
          submitButtonText={editingJourney ? "Update Journey" : "Add Journey"}
        />
      </Paper>

      <JourneyList
        journeys={journeys}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

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

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
