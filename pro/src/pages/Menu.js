import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TextField
} from "@mui/material";

const Menu = ({ setCartItems }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
        const items = response.data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          thumbnail: item.volumeInfo.imageLinks.thumbnail,
          price: item.saleInfo && item.saleInfo.listPrice ? item.saleInfo.listPrice.amount : "N/A"
        }));
        setMenuItems(items);
        setFilteredMenuItems(items); // Set filtered menu items initially to all menu items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  // Filter menu items based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMenuItems(menuItems); // If search query is empty, show all menu items
    } else {
      const filteredItems = menuItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMenuItems(filteredItems);
    }
  }, [searchQuery, menuItems]);

  const handleOpenDialog = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedMenuItem(null);
    setOpenDialog(false);
  };

  const handleAddToCart = () => {
    setCartItems(prevItems => [...prevItems, selectedMenuItem]);
    setOpenSnackbar(true);
    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TextField
          label="Please search here"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{  marginTop : 2, marginBottom: 2, width: "50%" }}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {loading ? (
            <div>...Loading</div>
          ) : (
            filteredMenuItems.map((menu, index) => (
              <Box key={index} sx={{ position: "relative", width: 250, height: 350, margin: 1 }}>
                <Card sx={{ width: "100%", height: "100%" }}>
                  <CardActionArea
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                    }}
                    onClick={() => handleOpenDialog(menu)}
                  >
                    <CardMedia
                      sx={{
                        height: "80%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                      component={"img"}
                      src={menu.thumbnail}
                      alt={menu.title}
                    />
                    <CardContent>
                      <Typography variant="body1" component={"div"} align="center" sx={{ fontSize: 14 }}>
                        {menu.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Box sx={{ position: "absolute", bottom: 0, width: "100%", textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.7)" }}>
                  <Typography variant="body1" sx={{ fontSize: 14 }}>{`$${menu.price}`}</Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedMenuItem?.title}</DialogTitle>
        <DialogContent>
          <CardMedia
            sx={{
              height: 300,
              width: '100%',
              objectFit: 'contain',
              
            }}
            component={"img"}
            src={selectedMenuItem?.thumbnail}
            alt={selectedMenuItem?.title}
          />
          <Typography variant="body1">{selectedMenuItem?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Product successfully added to the cart!
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Menu;
