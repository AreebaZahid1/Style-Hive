import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";

import NavbarWrapper from "./Components/NavbarWrapper";
import { Toaster } from "react-hot-toast";

// App component
function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* user can only access these routes */}
        <Route path="/"element={<NavbarWrapper><Home /></NavbarWrapper>}/>
        <Route path="/products"element={<NavbarWrapper><Products /></NavbarWrapper>}/>
        <Route path="/products/add" element={<NavbarWrapper><AddProduct /></NavbarWrapper>} />
        <Route path="/products/edit/:id" element={<NavbarWrapper><EditProduct /></NavbarWrapper>} />
        <Route path="/category"element={<NavbarWrapper><Category /></NavbarWrapper>}/>

        <Route path="/products/:id" element={<NavbarWrapper><ProductDetails /></NavbarWrapper>} />
        {/* Login Required */}
        <Route path="/cart"element={<NavbarWrapper><Cart /></NavbarWrapper>}/>
        <Route path="/checkout"element={<NavbarWrapper><Checkout /></NavbarWrapper>}/>
        <Route path="/profile" element={<NavbarWrapper><Profile /></NavbarWrapper>} />
      </Routes>
      <Toaster />

    </BrowserRouter>
  );
}


// IMPORTANT: Render App into index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

