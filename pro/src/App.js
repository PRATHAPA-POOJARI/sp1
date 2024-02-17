import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Pagenotfound from './pages/Pagenotfound';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // Add loggedIn state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setLoggedIn={setLoggedIn} />} /> {/* Pass setLoggedIn to LoginPage */}
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact cartItems={cartItems} />} />
        <Route path="/menu" element={<Menu setCartItems={setCartItems} />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </Router>
  );
}

export default App;
