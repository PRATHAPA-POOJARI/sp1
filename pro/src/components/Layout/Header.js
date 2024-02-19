// Header.js
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Logo from "../../images/Logo.svg";

import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    setOpenLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setOpenLogoutDialog(false);
    navigate('/'); // Redirect to the root path, which renders the LoginPage
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
        <img src={Logo} alt="logo" height={"70"} width="200" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeClassName="active" to={"/home"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/menu"}>All Books</NavLink>
        </li>

        <li>
          <NavLink to={"/contact"}>Carts</NavLink>
        </li>
        <li>
          <Button onClick={handleLogout}>Logout</Button>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={Logo} alt="logo" height={"50"} width="250" />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink activeClassName="active" to={"/home"}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/menu"}>All Books</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"}>Carts</NavLink>
                </li>
                <li>
                  <Button onClick={handleLogout}>Logout</Button>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>

      <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog}>No</Button>
          <Button onClick={handleConfirmLogout}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
