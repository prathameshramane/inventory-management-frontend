import React, { useState, useEffect } from "react";

// Material UI
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// Material UI
import CancelIcon from "@mui/icons-material/Cancel";

// Form
import { useForm } from "react-hook-form";

// Services
import { getFactoryById, updateFactory } from "../../services";

// Components
import { LoadingScreen, ErrorScreen } from "../../components";

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
  factoryId,
  ...restProps
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);

  const [factoryData, setFactoryData] = useState(null);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (factoryId) {
      setIsLoading(true);
      getFactoryById(factoryId)
        .then((res) => {
          reset();
          const data = res.data;
          setFactoryData(data);
          setIsError(false);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [factoryId]);

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = (updatedData) => {
    setIsUpdatingData(true);
    updateFactory(factoryId, updatedData)
      .then((res) => {
        onConfirmUpdate(res.data);
        reset();
      })
      .catch((err) => {
        console.log(err);
        setIsUpdateError(true);
        setTimeout(() => {
          setIsUpdateError(false);
        }, 5000);
      })
      .finally(() => {
        setIsUpdatingData(false);
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
          {(isLoading || !factoryData) && !isError ? (
            <LoadingScreen />
          ) : isError ? (
            <ErrorScreen />
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" component="h2">
                  Update factory details
                </Typography>
                <CancelIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
              </Box>
              <Box mt="1rem">
                {isUpdateError && (
                  <Alert severity="error" sx={{ marginBottom: "0.5rem" }}>
                    Something went wrong. Please try again later.
                  </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    label="Factory Name"
                    defaultValue={factoryData.name}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    name="name"
                    inputProps={{ ...register("name", { required: true }) }}
                    error={!!errors.name}
                    helperText={
                      errors.name && errors.name?.type === "required"
                        ? "This field is required"
                        : ""
                    }
                  />
                  <TextField
                    label="Factory Location"
                    defaultValue={factoryData.location}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    name="location"
                    inputProps={{ ...register("location", { required: true }) }}
                    error={!!errors.location}
                    helperText={
                      errors.location && errors.location?.type === "required"
                        ? "This field is required"
                        : ""
                    }
                  />
                  <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                    <Button
                      variant="outlined"
                      type="submit"
                      color="primary"
                      endIcon={
                        isUpdatingData && (
                          <CircularProgress size="1rem" color="inherit" />
                        )
                      }
                      disabled={isUpdatingData}
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditFactoryModal;
