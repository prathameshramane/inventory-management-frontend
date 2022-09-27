import React, { useEffect, useState } from "react";

// Material UI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// Material Icon
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Services
import { getAllFactory } from "../../services";

// Containers
import {
  ErrorScreen,
  LoadingScreen,
  DeleteConfirmation,
} from "../../components";

function FactoryTable(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [factories, setFactories] = useState(null);

  const [showDelete, setShowDelete] = useState(false);

  const [factoryDeleteId, setFactoryDeleteId] = useState(null);

  useEffect(() => {
    handleGetAllFactory();
  }, []);

  const handleGetAllFactory = () => {
    setIsLoading(true);
    getAllFactory()
      .then((res) => {
        console.log(res);
        setFactories(res.data);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDeleteClick = (factoryId) => {
    setFactoryDeleteId(factoryId);
    setShowDelete(true);
  };

  const handleDelete = () => {
    console.log("Deleting factory with Id: ", factoryDeleteId);
    setFactoryDeleteId(null);
    setShowDelete(false);
  };

  return (isLoading || factories == null) && !isError ? (
    <LoadingScreen />
  ) : isError ? (
    <ErrorScreen />
  ) : (
    <>
      <Box {...props}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 50 }}>Id</TableCell>
                  <TableCell style={{ minWidth: 80 }}>Name</TableCell>
                  <TableCell style={{ minWidth: 80 }}>Location</TableCell>
                  <TableCell style={{ minWidth: 40 }}>Edit</TableCell>
                  <TableCell style={{ minWidth: 40 }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {factories.map((factory) => {
                  return (
                    <TableRow hover key={factory.id}>
                      <TableCell>{factory.id}</TableCell>
                      <TableCell>{factory.name}</TableCell>
                      <TableCell>{factory.location}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => onDeleteClick(factory.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <DeleteConfirmation
        show={showDelete}
        setShow={setShowDelete}
        onConfirmDelete={handleDelete}
      />
    </>
  );
}

export default FactoryTable;
