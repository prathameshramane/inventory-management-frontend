import React, { useState, useEffect } from "react";

// Material UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

// Material Icon
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

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
  const handleClose = () => setShow(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (productId) fetchProductDetails();
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
    console.log(formData);
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
              minHeight: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                <Box
                  sx={{
                    borderRadius: "1rem",
                    boxShadow: "0px 1px 9px #c7c7c7",
                    position: "relative",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt="Image Icon"
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
              )
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProductModal;
