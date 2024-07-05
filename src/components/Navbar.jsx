import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaUser, FaBars } from "react-icons/fa";
import { CartContext } from "../CartContext";

const Navbar = () => {
  const { cartItems, searchQuery, setSearchQuery } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const userName = "Sude";

  useEffect(() => {
    const price = cartItems?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(price);
  }, [cartItems]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button className="md:hidden mr-4" onClick={toggleMenu}>
            <FaBars />
          </button>
          <Link to="/" className="text-2xl font-bold">
            Eteration
          </Link>
        </div>
        <div className="hidden md:flex relative w-1/3 max-w-md">
          <FaSearch className="absolute top-3 left-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4 py-2 rounded bg-white text-gray-800 w-full"
          />
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center">
            <FaShoppingBag size={20} />
            <span className="ml-1">{totalPrice?.toFixed(2)}₺</span>
          </div>
          <div className="flex items-center">
            <FaUser size={20} />
            <span className="ml-1">{userName}</span>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-2">
          <div className="relative flex items-center mb-2">
            <FaSearch className="absolute top-2 left-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 rounded bg-white text-gray-800 w-full"
            />
          </div>
          <div className="flex items-center mb-2">
            <FaShoppingBag />
            <span className="ml-2">{totalPrice?.toFixed(2)}₺</span>
          </div>
          <div className="flex items-center mb-2">
            <FaUser />
            <span className="ml-2">{userName}</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
