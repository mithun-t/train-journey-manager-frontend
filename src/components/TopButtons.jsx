import React from "react";
import { Button, IconButton, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const TopButtons = ({
  theme,
  colorMode,
  handleLogout,
  setOpenMasterDataDialog,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      <Box>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => setOpenMasterDataDialog(true)}
          style={{ marginRight: 10 }}
        >
          Master Data
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default TopButtons;
