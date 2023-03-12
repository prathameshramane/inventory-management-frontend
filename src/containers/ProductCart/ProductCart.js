import React, { useState } from "react";

// Material UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

// Services
import { addOrderToQueue } from "../../services";

function ProductCart({ closeDrawer, product, onOrderPlaced }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity !== 0) setQuantity(quantity - 1);
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) setQuantity(0);
    else setQuantity(value);
  };

  const handleBuyProduct = () => {
    const data = {
      productId: product.id,
      factoryId: product.factory,
      quantity: quantity,
    };
    closeDrawer();
    onOrderPlaced();
    addOrderToQueue(data)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ width: 500, padding: 2 }} role="presentation">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 1,
          marginBottom: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography component="div" variant="h4">
          Buy Product
        </Typography>
        <IconButton aria-label="close" onClick={() => closeDrawer()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={product.imageUrl}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {product.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="p"
              className="reduce-description"
            >
              {product.description}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="remove" onClick={handleDecreaseQuantity}>
              <RemoveIcon />
            </IconButton>
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              sx={{ width: 100 }}
              value={quantity}
              onChange={handleInputChange}
              type="number"
            />
            <IconButton aria-label="add" onClick={handleIncreaseQuantity}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
      <Typography
        component="div"
        variant="h5"
        sx={{
          marginTop: "0.5rem",
          paddingTop: "0.5rem",
          display: "flex",
          justifyContent: "end",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        Total Price: {quantity * product.price}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 0rem",
        }}
      >
        <Button
          variant="outlined"
          size="large"
          sx={{ width: "100%", margin: "4px" }}
          onClick={closeDrawer}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ width: "100%", margin: "4px" }}
          onClick={handleBuyProduct}
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
}

export default ProductCart;
