import React from "react";

import { useParams } from "react-router-dom";

function Product() {
  const { factoryId } = useParams();
  return <div>Product {factoryId}</div>;
}

export default Product;
