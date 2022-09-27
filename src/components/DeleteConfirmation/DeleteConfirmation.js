import React from "react";

// Material UI
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";

// Material UI
import CancelIcon from "@mui/icons-material/Cancel";

const style = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  [theme.breakpoints.up("md")]: {
    width: 400,
  },
  bgcolor: "background.paper",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: 4,
});

function DeleteConfirmation({ show, setShow, onConfirmDelete, ...restProps }) {
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
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="h2">
              Are you sure you want to delete?
            </Typography>
            <CancelIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <Typography sx={{ mt: 2 }}>This action in not reversible!</Typography>
          <Box mt="1rem">
            <Button
              variant="contained"
              color="error"
              sx={{ margin: "0.2rem" }}
              onClick={onConfirmDelete}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ margin: "0.2rem" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DeleteConfirmation;
