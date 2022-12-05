import React, { useEffect, useState } from "react";

// Material UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as MaterialLink } from "@mui/material";

// Router
import { useParams, Link } from "react-router-dom";

// Containers
import { NewProductModal, ProductTable } from "../../containers";

// Components
import { Page, LoadingScreen, ErrorScreen } from "../../components";

// Services
import { getFactoryById } from "../../services";
import ROUTES from "../../constants/routes";

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
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{ marginBottom: "1rem" }}
      >
        <MaterialLink underline="hover" color="inherit">
          <Link to={ROUTES.FACTORIES}>Factories</Link>
        </MaterialLink>
        <Typography color="text.primary">Product</Typography>
      </Breadcrumbs>
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
