import React from "react";

// Material UI
import Typography from "@mui/material/Typography";

// Router
import { useParams } from "react-router-dom";

// Components
import { Page } from "../../components";

function Product() {
  const { factoryId } = useParams();
  return <Page>Factory ID : {factoryId}</Page>;
}

export default Product;
