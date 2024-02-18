import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Box, Typography, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, TextField, Button, Grid, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Contact = ({ cartItems: initialCartItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
        const items = response.data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          thumbnail: item.volumeInfo.imageLinks.thumbnail,
          price: item.saleInfo && item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : "N/A"
        }));
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setName('');
    setPhone('');
    setAddress('');
    setPaymentMethod('');
  };

  const handleAddToCart = () => {
    setSnackbarMessage('Your order has been successfully submitted!');
    setSnackbarOpen(true);
    handleCloseDialog();
  };

  const handleEditItem = (item) => {
    console.log('Edit item:', item);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
  };

  const handleDeleteItem = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
    setSnackbarMessage('Your cart item has been successfully deleted!');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Layout>
      <Box sx={{ my: 10, marginLeft: 'auto', marginRight: 'auto', maxWidth: 800 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Cart
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2, width: "100%" }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {cartItems.map(item => (
            <Card key={item.id} sx={{ width: 250, height: 400, marginBottom: 2, margin: 1 }}>
              <CardActionArea onClick={() => handleOpenDialog(item)}>
                <CardMedia
                  sx={{
                    marginTop: 4,
                    height: 100,
                    width: 150,
                    objectFit: 'contain',
                  }}
                  component="img"
                  height="140"
                  image={item.thumbnail}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`$${item.price}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                <Typography>{cartItems.filter(cartItem => cartItem.id === item.id).length}</Typography>
                <IconButton onClick={() => handleEditItem(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleViewItem(item)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteItem(item)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      <Dialog open={selectedItem !== null} onClose={handleCloseDialog}>
        <DialogTitle>{selectedItem && selectedItem.title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardMedia
                sx={{
                  marginTop: 4,
                  height: 300,
                  width: 250,
                  objectFit: 'contain',
                }}
                component="img"
                height="140"
                image={selectedItem && selectedItem.thumbnail}
                alt={selectedItem && selectedItem.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                />
                <TextField
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  label="Phone"
                />
                <TextField
                  variant="outlined"
                  value={address}
                  sx={{ marginTop: 2 }}
                  onChange={(e) => setAddress(e.target.value)}
                  label="Address"
                />
                <Typography variant="subtitle1">Payment Method</Typography>
                <FormControl variant="outlined">
                  <InputLabel id="payment-method-label">Payment Method</InputLabel>
                  <Select
                    labelId="payment-method-label"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    label="Payment Method"
                  >
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="Debit Card">Debit Card</MenuItem>
                    <MenuItem value="PayPal">PayPal</MenuItem>
                    <MenuItem value="Phonepay">Phonepay</MenuItem>
                    <MenuItem value="Gpay">Gpay</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ marginTop: 2 }}>
                  Order Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  )
}

export default Contact;
