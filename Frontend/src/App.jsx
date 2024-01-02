import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// importing Pages or Compponents.........................................
import Navbar from "./Components/Navbar";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Signup from "./Pages/Signup";
import Footer from "./Components/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import SavedCartList from "./Pages/SavedCartList";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/men"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/women"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kid"
            element={<ShopCategory banner={kids_banner} category="kid" />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Product />} />
          <Route path="/saved" element={<SavedCartList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster />
        <Footer />
      </Router>
    </>
  );
}

export default App;
