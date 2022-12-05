import React, { useState, useEffect } from "react";

// Material UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";

// Containers
import { FactoryTable, NewFactoryModal } from "../../containers";

// Services
import { getAllFactory } from "../../services";

// Components
import { Page } from "../../components";

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
    <Page>
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{ marginBottom: "1rem" }}
      >
        <Typography color="text.primary">Factories</Typography>
      </Breadcrumbs>
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
    </Page>
  );
}

export default Factory;
