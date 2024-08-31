import React, { useState } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";

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
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        {isRegistering ? "Register" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
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
};

export default Login;
