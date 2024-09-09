import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";

const Login = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      onRegister(username, email, password);
    } else {
      onLogin(username, password);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "15px" }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          {isRegistering ? "Register" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isRegistering && (
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              {isRegistering ? "Register" : "Login"}
            </Button>
          </Box>
        </form>
        <Button
          onClick={() => setIsRegistering(!isRegistering)}
          fullWidth
          style={{ marginTop: "15px", textTransform: "none" }}
          color="secondary"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
