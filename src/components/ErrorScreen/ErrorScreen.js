import React from "react";

// Material UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Material Icon
import ErrorIcon from "@mui/icons-material/Error";

function ErrorScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ErrorIcon sx={{ fontSize: "5rem" }} color="error" />
        <Typography
          variant="subtitle1"
          component="span"
          mt="1rem"
          textAlign="center"
        >
          Something went wrong. <br />
          Please try again.
        </Typography>
      </Box>
    </Box>
  );
}

export default ErrorScreen;
