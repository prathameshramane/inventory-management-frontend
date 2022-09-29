import React from "react";

// Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

function Page({ children, ...restProps }) {
  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Toolbar />
      {children}
    </Container>
  );
}

export default Page;
