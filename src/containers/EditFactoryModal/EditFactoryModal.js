import React from "react";

// Material UI
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Material UI
import CancelIcon from "@mui/icons-material/Cancel";

// Form
import { Controller, useForm } from "react-hook-form";

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

function EditFactoryModal({
  show,
  setShow,
  onConfirmUpdate,
  factory,
  ...restProps
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = (data) => {
    onConfirmUpdate(data);
    reset();
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
              Update factory details
            </Typography>
            <CancelIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>
          <Box mt="1rem">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Factory Name"
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
              <Controller
                name="location"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Factory Location"
                    variant="outlined"
                    error={!!errors.location}
                    helperText={
                      errors.location && errors.location?.type === "required"
                        ? "This field is required"
                        : ""
                    }
                    fullWidth
                    margin="dense"
                  />
                )}
              />
              <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                <Button variant="outlined" type="submit" color="primary">
                  Update
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditFactoryModal;
