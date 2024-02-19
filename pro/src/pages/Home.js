// Home.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import Banner1 from '../images/banner1.avif'; // Importing banner images
import Banner2 from '../images/banner2.avif';
import Banner3 from '../images/banner3.avif';
import "../styles/HomeStyles.css";
const Home = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const banners = [Banner1, Banner2, Banner3]; // Array of banner images

  useEffect(() => {
    // Function to rotate banners
    const rotateBanners = () => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    // Rotate banners every 5 secondsbhjvhjbj
    const interval = setInterval(rotateBanners, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
    <Layout>
      {/* Display the current banner */}
      <div className='home' style={{backgroundImage:`url(${banners[currentBannerIndex]})`}}>
        <div className='headerContainer'>
          <h1>Online Book Store</h1>
          <p>Best books in India</p>
          <Link to="/menu">
            <button>
              ORDER NOW
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;