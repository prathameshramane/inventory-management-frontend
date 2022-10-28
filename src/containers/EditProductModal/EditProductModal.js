import React from "react";

// Material UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";

// Material Icon
import CancelIcon from "@mui/icons-material/Cancel";

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

function EditProductModal({ show, setShow, productId, ...restProps }) {
  const handleClose = () => setShow(false);

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
          <h1>Product Information - {productId}</h1>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProductModal;
