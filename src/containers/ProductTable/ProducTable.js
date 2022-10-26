import React, { useState, useEffect } from "react";

// Material UI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";

// Components
import { ErrorScreen, LoadingScreen } from "../../components";

// Services
import { getProductsByFactory } from "../../services";

function ProducTable({ factoryId, ...restProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchProducts(factoryId);
  }, [factoryId]);

  const fetchProducts = (factoryId) => {
    setIsLoading(true);
    getProductsByFactory(factoryId)
      .then((res) => {
        setProducts(res.data);
        setIsError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (isLoading || !products) && !isError ? (
    <LoadingScreen />
  ) : isError ? (
    <ErrorScreen />
  ) : (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1rem" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: 80 }}>
                Id
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }}>
                Product Image
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }}>
                Product Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: 80 }}>
                Quantity
              </TableCell>
              <TableCell align="left" style={{ minWidth: 120 }}>
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                <TableCell align="left">{product.id}</TableCell>
                <TableCell align="left">
                  <Avatar
                    alt={product.name}
                    src={product.imageUrl}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="left">{product.quantity}</TableCell>
                <TableCell align="left">{product.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ProducTable;
