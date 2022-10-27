import React, { useEffect, useState } from "react";

// Material UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Router
import { useParams } from "react-router-dom";

// Containers
import { NewProductModal, ProductTable } from "../../containers";

// Components
import { Page, LoadingScreen, ErrorScreen } from "../../components";

// Services
import { getFactoryById } from "../../services";

function Product() {
  const { factoryId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [factory, setFactory] = useState(null);

  useEffect(() => {
    fetchFactory(factoryId);
  }, [factoryId]);

  const fetchFactory = (factoryId) => {
    setLoading(true);
    getFactoryById(factoryId)
      .then((res) => {
        setFactory(res.data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNewProduct = (newProduct) => {
    console.log(newProduct);
    window.location.reload();
  };

  return loading ? (
    <LoadingScreen />
  ) : error ? (
    <ErrorScreen />
  ) : (
    <Page>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">{factory && factory.name} Products</Typography>
        <NewProductModal
          factoryId={factoryId}
          handleAddNewProduct={handleNewProduct}
        />
      </Box>
      <ProductTable factoryId={factoryId} />
    </Page>
  );
}

export default Product;
