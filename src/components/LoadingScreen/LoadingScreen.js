import React from "react";

// Material UI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />{" "}
      <Typography variant="subtitle1" component="span" ml="1rem">
        Loading...
      </Typography>
    </Box>
  );
}

export default LoadingScreen;
