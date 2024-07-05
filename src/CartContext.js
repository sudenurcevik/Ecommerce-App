import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    brand: [],
    model: [],
    sortOrder: "",
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter, products, searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://5fc9346b2af77700165ae514.mockapi.io/products"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter.brand.length > 0) {
      filtered = filtered.filter((product) =>
        filter.brand.includes(product.brand)
      );
    }

    if (filter.model.length > 0) {
      filtered = filtered.filter((product) =>
        filter.model.includes(product.model)
      );
    }

    switch (filter.sortOrder) {
      case "New to old":
        filtered.sort((a, b) => (a.id < b.id ? 1 : -1));
        break;
      case "Price high to low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Price low to high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      default:
        filtered.sort((a, b) => (a.id > b.id ? 1 : -1));
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems((prevCartItems) => {
      if (quantity === 0) {
        return prevCartItems.filter((item) => item.id !== productId);
      } else {
        return prevCartItems.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        );
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        filter,
        setFilter,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
