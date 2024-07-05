import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import "./App.css";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <div className="font-montserrat w-full bg-appBg h-full min-h-screen">
      <CartProvider>
        <Router>
          <Navbar />
          <div className="px-4 pb-4 xl:px-8 flex flex-col-reverse justify-around xl:flex-row">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <Cart />
          </div>
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;
