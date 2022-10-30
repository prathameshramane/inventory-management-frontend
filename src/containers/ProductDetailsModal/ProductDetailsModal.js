import React, { useState, useEffect } from "react";

// Material UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

// Material Icon
import CancelIcon from "@mui/icons-material/Cancel";

// Services
import { getProductDetails } from "../../services";

// Components
import { Loading, Error } from "../../components";

const modalStyle = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  [theme.breakpoints.up("md")]: {
    width: 700,
  },
  bgcolor: "background.paper",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: 4,
});

const modalCenterElemStyle = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
});

function ProductDetailsModal({
  show,
  setShow,
  productId,
  factoryId,
  ...restProps
}) {
  const handleClose = () => setShow(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (productId) fetchProductDetails();
    // eslint-disable-next-line
  }, [productId]);

  const fetchProductDetails = () => {
    setLoading(true);
    getProductDetails(factoryId, productId)
      .then((res) => {
        setProduct(res.data);
        setError(false);
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="h2">
              Product Information
            </Typography>
            <CancelIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          {loading ? (
            <Box sx={modalCenterElemStyle}>
              <Loading />
            </Box>
          ) : error ? (
            <Box sx={modalCenterElemStyle}>
              <Error />
            </Box>
          ) : (
            product && (
              <Box sx={{ marginTop: "1rem" }}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <Box
                      sx={{
                        borderRadius: "0.5rem",
                        boxShadow: "0px 2px 10px #d6d6d6",
                      }}
                    >
                      <img src={product.imageUrl} width="100%" alt="product" />
                    </Box>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h5" component="h5">
                        {product.name}
                      </Typography>
                      <Chip
                        label={`Quantity ${product.quantity}`}
                        color="primary"
                        size="small"
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1" component="p">
                        {product.description}
                      </Typography>
                    </Box>
                    <Box>
                      <hr />
                      <Typography variant="h6" component="h5">
                        Factory Information
                      </Typography>
                      <Typography variant="body1" component="p">
                        Factory name: {product.factory.name}
                      </Typography>
                      <Typography variant="body1" component="p">
                        Factory location: {product.factory.location}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

export default ProductDetailsModal;
