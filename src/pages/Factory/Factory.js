import React, { useState, useEffect } from "react";

// Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// Containers
import { FactoryTable, NewFactoryModal } from "../../containers";

// Services
import { getAllFactory } from "../../services";

function Factory() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [factories, setFactories] = useState(null);

  useEffect(() => {
    handleGetAllFactory();
  }, []);

  const handleGetAllFactory = () => {
    setIsLoading(true);
    getAllFactory()
      .then((res) => {
        setFactories(res.data);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddNewFactory = (factoryData) => {
    const newFactories = factories.slice();
    newFactories.push(factoryData);
    setFactories(newFactories);
  };

  return (
    <Container sx={{ marginTop: "1.5rem" }}>
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Factories</Typography>
        <NewFactoryModal handleAddNewFactory={handleAddNewFactory} />
      </Box>
      <FactoryTable
        sx={{ marginTop: "1rem" }}
        isLoading={isLoading}
        isError={isError}
        factories={factories}
        setFactories={setFactories}
      />
    </Container>
  );
}

export default Factory;
