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

// Material Icon
import AddIcon from "@mui/icons-material/Add";
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

function NewFactoryModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
    handleClose();
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
                Add new factory
              </Typography>
              <CancelIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
            </Box>
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
                <br />
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
                  <Button variant="contained" type="submit" color="success">
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

export default NewFactoryModal;
