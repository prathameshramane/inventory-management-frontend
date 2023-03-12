import React, { useState, useEffect } from "react";

// Material UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

// Material Icon
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

// Form
import { useForm } from "react-hook-form";

// Services
import { getProductDetails, updateProduct } from "../../services";
import { Error, Loading } from "../../components";

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

function EditProductModal({
  show,
  setShow,
  productId,
  factoryId,
  handleEditProduct,
  ...restProps
}) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (productId) fetchProductDetails();
    // eslint-disable-next-line
  }, [productId]);

  const handleClose = () => setShow(false);

  const fetchProductDetails = () => {
    setLoading(true);
    getProductDetails(factoryId, productId)
      .then((res) => {
        reset();
        const data = res.data;
        setProduct(data);
        setError(false);
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  };

  const updateProductDetails = (newProductFormData) => {
    setLoading(true);
    updateProduct(factoryId, product.id, newProductFormData)
      .then((res) => {
        setProduct(res.data);
        handleEditProduct(res.data);
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  };

  const getFormData = (data) => {
    const formData = new FormData();
    for (var key in data) {
      if (key === "image") {
        const image = data[key][0];
        formData.append("image", image, image.name);
      } else {
        formData.append(key, data[key]);
      }
    }
    return formData;
  };

  const onEditClick = () => {
    const editImageInput = document.getElementById("updateImage");
    editImageInput.click();
  };

  const onChangeImage = (e) => {
    const data = { image: e.target.files };
    const formData = getFormData(data);
    updateProductDetails(formData);
  };

  const onSubmit = (data) => {
    const formData = getFormData(data);
    updateProductDetails(formData);
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
              Edit Product
            </Typography>
            <CancelIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <Box
            sx={{
              minHeight: "18rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "0.5rem",
            }}
          >
            {loading ? (
              <Box>
                <Loading />
              </Box>
            ) : error ? (
              <Box>
                <Error />
              </Box>
            ) : (
              product && (
                <Grid container spacing={1}>
                  <Grid item md={6} xs={12}>
                    <Box
                      sx={{
                        borderRadius: "1rem",
                        boxShadow: "0px 1px 9px #c7c7c7",
                        position: "relative",
                        maxWidth: "18rem",
                      }}
                    >
                      <img
                        src={product.imageUrl}
                        alt="product"
                        style={{
                          width: "18rem",
                          height: "14rem",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        color="primary"
                        onClick={() => onEditClick()}
                        sx={{ position: "absolute", right: 0, bottom: 0 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <input
                        type="file"
                        onChange={onChangeImage}
                        id="updateImage"
                        hidden
                      />
                    </Box>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Box>
                      {error && (
                        <Alert severity="error" sx={{ marginBottom: "0.5rem" }}>
                          Something went wrong. Please try again later.
                        </Alert>
                      )}
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                          label="Product Name"
                          defaultValue={product.name}
                          variant="outlined"
                          fullWidth
                          margin="dense"
                          name="name"
                          inputProps={{
                            ...register("name", { required: true }),
                          }}
                          error={!!errors.name}
                          helperText={
                            errors.name && errors.name?.type === "required"
                              ? "This field is required"
                              : ""
                          }
                        />
                        <TextField
                          label="Product Quantity"
                          defaultValue={product.quantity}
                          variant="outlined"
                          type="number"
                          fullWidth
                          margin="dense"
                          name="quantity"
                          inputProps={{
                            ...register("quantity", { required: true }),
                          }}
                          error={!!errors.quantity}
                          helperText={
                            errors.quantity &&
                            errors.quantity?.type === "required"
                              ? "This field is required"
                              : ""
                          }
                        />
                        <TextField
                          label="Product Price"
                          defaultValue={product.price}
                          variant="outlined"
                          type="number"
                          fullWidth
                          margin="dense"
                          name="price"
                          inputProps={{
                            ...register("price", { required: true }),
                          }}
                          error={!!errors.price}
                          helperText={
                            errors.price &&
                            errors.price?.type === "required"
                              ? "This field is required"
                              : ""
                          }
                        />
                        <TextField
                          label="Product Description"
                          defaultValue={product.description}
                          variant="outlined"
                          type="number"
                          fullWidth
                          margin="dense"
                          name="description"
                          inputProps={{
                            ...register("description", { required: true }),
                          }}
                          error={!!errors.description}
                          helperText={
                            errors.description &&
                            errors.description?.type === "required"
                              ? "This field is required"
                              : ""
                          }
                          multiline
                          rows={4}
                        />
                        <Box
                          sx={{ display: "flex", justifyContent: "end", mt: 1 }}
                        >
                          <Button
                            variant="outlined"
                            type="submit"
                            color="primary"
                            endIcon={
                              loading && (
                                <CircularProgress size="1rem" color="inherit" />
                              )
                            }
                            disabled={loading}
                          >
                            Update
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Grid>
                </Grid>
              )
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProductModal;
