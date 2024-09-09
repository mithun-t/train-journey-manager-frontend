import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App"; // Make sure this path is correct

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function ToggleColorMode() {
  // Initialize state from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "light";
  });

  useEffect(() => {
    // Update localStorage whenever mode changes
    localStorage.setItem("themeMode", mode);
  }, [mode]);

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
