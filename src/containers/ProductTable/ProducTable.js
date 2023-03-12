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
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

// Material Icon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Components
import {
  ErrorScreen,
  LoadingScreen,
  DeleteConfirmation,
} from "../../components";

// Containers
import { EditProductModal, ProductDetailsModal } from "../../containers";

// Services
import { getProductsByFactory, deleteProduct } from "../../services";
import ProductCart from "../ProductCart/ProductCart";

function ProducTable({ factoryId, ...restProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [productDeleteId, setProductDeleteId] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [activeEditProductId, setActiveEditProductId] = useState(null);

  const [showInfo, setShowInfo] = useState(false);
  const [activeInfoProductId, setActiveInfoProductId] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showAlert, setShowAlert] = useState(false);

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

  const onDeleteClick = (productId) => {
    setProductDeleteId(productId);
    setShowDelete(true);
  };

  const onConfirmDelete = () => {
    return deleteProduct(factoryId, productDeleteId);
  };

  const getProductIndexById = (productId) => {
    const index = products.findIndex((product) => product.id === productId);
    return index;
  };

  const handleDelete = () => {
    const indexOfDeletedData = getProductIndexById(productDeleteId);
    const newProducts = products.slice();
    newProducts.splice(indexOfDeletedData, 1);
    setProducts(newProducts);
    setProductDeleteId(null);
    setShowDelete(false);
  };

  const handleEditProduct = (editProductData) => {
    const indexOfEditedData = getProductIndexById(editProductData.id);
    const newProducts = products.slice();
    newProducts[indexOfEditedData] = editProductData;
    setProducts(newProducts);
  };

  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const onEditClick = (productId) => {
    setActiveEditProductId(productId);
    setShowEdit(true);
  };

  const handleProductInformation = (productId) => {
    setActiveInfoProductId(productId);
    setShowInfo(true);
  };

  const onCloseProductDetails = () => {
    setActiveInfoProductId(null);
  };

  const showOrderAlertAndHide = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (isLoading || !products) && !isError ? (
    <LoadingScreen />
  ) : isError ? (
    <ErrorScreen />
  ) : (
    <>
      {showAlert && (
        <Fade in={showAlert}>
          <Alert severity="success" sx={{ margin: "1rem 0rem" }}>
            Order successfully added to queue!
          </Alert>
        </Fade>
      )}
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
                  Price
                </TableCell>
                <TableCell align="left" style={{ minWidth: 120 }}>
                  Edit
                </TableCell>
                <TableCell align="left" style={{ minWidth: 120 }}>
                  Delete
                </TableCell>
                <TableCell align="left" style={{ minWidth: 120 }}>
                  Buy Product
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                  <TableCell
                    align="left"
                    onClick={() => handleProductInformation(product.id)}
                  >
                    {product.id}
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => handleProductInformation(product.id)}
                  >
                    <Avatar
                      alt={product.name}
                      src={product.imageUrl}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => handleProductInformation(product.id)}
                  >
                    {product.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => handleProductInformation(product.id)}
                  >
                    {product.price}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => onEditClick(product.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => onDeleteClick(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<ShoppingCartIcon />}
                      variant="contained"
                      color="success"
                      onClick={() => handleBuyProduct(product)}
                    >
                      Buy Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DeleteConfirmation
        show={showDelete}
        setShow={setShowDelete}
        onConfirmDelete={onConfirmDelete}
        handleDelete={handleDelete}
      />
      <EditProductModal
        show={showEdit}
        setShow={setShowEdit}
        productId={activeEditProductId}
        factoryId={factoryId}
        handleEditProduct={handleEditProduct}
      />
      <ProductDetailsModal
        show={showInfo}
        setShow={setShowInfo}
        productId={activeInfoProductId}
        factoryId={factoryId}
        onClose={onCloseProductDetails}
      />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <ProductCart
          closeDrawer={() => setIsDrawerOpen(false)}
          product={selectedProduct}
          onOrderPlaced={showOrderAlertAndHide}
        />
      </Drawer>
    </>
  );
}

export default ProducTable;
