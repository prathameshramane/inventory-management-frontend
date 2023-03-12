import React, { useState } from "react";

// Form
import { Controller, useForm } from "react-hook-form";

// Material UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";

// Material Icon
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

// Services
import { addNewProduct } from "../../services";

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

function NewProductModal({ factoryId, handleAddNewProduct, ...restProps }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    const formData = getFormData(data);
    setIsLoading(true);
    addNewProduct(factoryId, formData)
      .then((res) => {
        handleAddNewProduct(res.data);
        reset();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Button
        color="success"
        variant="contained"
        endIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" component="h2">
                Add new product
              </Typography>
              <CancelIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
            </Box>
            {isError && (
              <Alert severity="error">
                Something went wrong. Please try again later.
              </Alert>
            )}
            <Box mt="1rem">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Product Name"
                      variant="outlined"
                      error={!!errors.name}
                      helperText={
                        errors.name && errors.name?.type === "required"
                          ? "This field is required"
                          : ""
                      }
                      fullWidth
                      margin="dense"
                    />
                  )}
                />
                <br />
                <Controller
                  name="quantity"
                  control={control}
                  rules={{ required: true, pattern: /^[0-9]*$/ }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Product Quantity"
                      variant="outlined"
                      error={!!errors.quantity}
                      helperText={
                        errors.quantity &&
                        (errors.quantity?.type === "required"
                          ? "This field is required"
                          : errors.quantity?.type === "pattern"
                          ? "Quantity should be a number."
                          : "")
                      }
                      fullWidth
                      margin="dense"
                    />
                  )}
                />
                <br />
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: true, pattern: /^[0-9]*$/ }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Product Price"
                      variant="outlined"
                      error={!!errors.price}
                      helperText={
                        errors.price &&
                        (errors.price?.type === "required"
                          ? "This field is required"
                          : errors.price?.type === "pattern"
                          ? "Quantity should be a number."
                          : "")
                      }
                      fullWidth
                      margin="dense"
                    />
                  )}
                />
                <br />
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true, pattern: "^[0-9]*$" }}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Product Description"
                      variant="outlined"
                      error={!!errors.description}
                      helperText={
                        errors.description &&
                        (errors.description?.type === "required"
                          ? "This field is required"
                          : "")
                      }
                      fullWidth
                      multiline
                      rows={4}
                      margin="dense"
                    />
                  )}
                />
                <br />
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <Grid container sx={{ marginTop: "1rem" }}>
                        <Grid md={4}>
                          <p>Upload Image</p>
                        </Grid>
                        <Grid md={8}>
                          <FormControl>
                            <input
                              type="file"
                              name="image"
                              onChange={(e) => {
                                field.onChange(e.target.files);
                              }}
                            />
                            {errors.image &&
                              errors.image?.type === "required" && (
                                <FormHelperText sx={{ color: "red" }}>
                                  Image is required.
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </>
                  )}
                />
                <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    disabled={isLoading}
                    endIcon={
                      isLoading ? (
                        <CircularProgress size="1rem" color="inherit" />
                      ) : null
                    }
                  >
                    Add
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default NewProductModal;
