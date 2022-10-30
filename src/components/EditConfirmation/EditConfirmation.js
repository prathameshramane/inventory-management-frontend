import React, { useState } from "react";

// Material UI
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

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

function EditConfirmation({
  title,
  subtitle,
  show,
  setShow,
  onConfirmEdit,
  handleEdit,
  ...restProps
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClose = () => setShow(false);

  const handleConfirm = () => {
    setIsLoading(true);
    onConfirmEdit()
      .then(() => {
        handleEdit();
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
              {title ? { title } : "Are you sure you want to update?"}
            </Typography>
            <CancelIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          {isError && (
            <Alert severity="error">
              Something went wrong. Please try again later.
            </Alert>
          )}
          <Typography sx={{ mt: 2 }}>
            {subtitle ? { subtitle } : "This action in not reversible!"}
          </Typography>
          <Box mt="1rem">
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: "0.2rem" }}
              onClick={handleConfirm}
              endIcon={
                isLoading && <CircularProgress color="inherit" size="0.8rem" />
              }
              disabled={isLoading}
            >
              Update
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

export default EditConfirmation;
