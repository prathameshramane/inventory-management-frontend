import React from "react";

// Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// Containers
import { FactoryTable, NewFactoryModal } from "../../containers";

function Factory() {
  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Factories</Typography>
        <NewFactoryModal />
      </Box>
      <FactoryTable sx={{ marginTop: "1rem" }} />
    </Container>
  );
}

export default Factory;
