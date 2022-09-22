import React from "react";

// Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";

// Containers
import { FactoryTable } from "../../containers";

function Factory() {
  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Factories</Typography>
        <Button color="success" variant="contained" endIcon={<AddIcon />}>
          Add
        </Button>
      </Box>
      <FactoryTable sx={{ marginTop: "1rem" }} />
    </Container>
  );
}

export default Factory;
