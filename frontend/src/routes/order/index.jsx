import { Box, Grid, Typography, Container, Card, CardContent, TextField, Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useEffect} from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





export const OrderPage = () => {

  const dummyData = [
    {
      id: 1,
      name: "Aussie Sunrise",
      description: "Two buttermilk pancakes with whipped butter, bacon, an egg and grilled banana and pineapple.",
      price: 16.95
    },
    {
      id: 2,
      name: "The Dawn",
      description: "Hash brown with scrambled eggs, bacon and grilled pineapple.",
      price: 15.95
    },
    {
      id: 3,
      name: "Tandoori Pizza",
      description: "Tender pieces of chicken breast marinated tandoori style.",
      price: 19.95
    }
  ]

  const [quantity, setQuantity] = React.useState(1);
  const [data, setData] = useState(dummyData);
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState()

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleDelete = (menuItem) => {
    setData((prevState) => prevState.filter((item) => item.id !== menuItem));
    setOpen(false);
  }

  const handleClickOpen = (item) => {
    setOpen(true);
    setDeleteID(item);
  };

  const handleClose = () => {
    setOpen(false);
  };


  

  return <Container>
   <Grid item mt={10} textAlign="center">
    <Box
          component="img"
          sx={{
            borderRadius: 5,
            height: { xs: 120, md: 225 },
          }}
          alt="Restaurant Logo"
          src="data:image/jpeg;base64,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"
      />
    </Grid>
    <Grid item mt={5} textAlign="center">
      <Typography fontSize={30} fontWeight={"bold"}>
        Your order
      </Typography>
    </Grid>
    {data.map((item, idx) => (
    <Grid item mt={10} ml={10} key={idx}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Quantity</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={quantity}
                  onChange={handleChange}
                  autoWidth
                  label="Quantity"
                >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item ml={5}>
            <Typography fontWeight={"bold"}>{item.name}</Typography>
            <Typography mt={0.5}>{item.description}</Typography>
          </Grid>
          <Grid item textAlign={"end"} justifyContent="end" alignContent={"end"} xs={100} my={-10}>
            <div onClick={() => handleClickOpen(item.id)}>
              <DeleteIcon/>
            </div>
            <Typography mt={1}>$ {item.price}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Grid>
    ))}
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete menu item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this menu item? This is an irreversible operation.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(deleteID)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item textAlign={"end"} mt={8} mb={10}>
      <Button variant="outlined">Place Order</Button>
      </Grid>
  </Container>
};
