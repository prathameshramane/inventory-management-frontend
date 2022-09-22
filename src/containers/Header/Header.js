import * as React from "react";
import PropTypes from "prop-types";

// Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Material Icon
import FactoryIcon from "@mui/icons-material/Factory";

function Header() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FactoryIcon sx={{ marginRight: "1rem" }} /> Inventory Management
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
