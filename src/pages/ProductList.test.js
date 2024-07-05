import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../CartContext";
import ProductList from "./ProductList";

const products = [
  {
    id: "1",
    name: "Product 1",
    price: "100.00",
    brand: "Brand A",
    model: "Model X",
    image: "image1.jpg",
    description: "desc A",
    createdAt: "2023-07-17T07:21:02.529Z",
  },
  {
    id: "2",
    name: "Product 2",
    price: "200.00",
    brand: "Brand B",
    model: "Model Y",
    image: "image2.jpg",
    description: "desc B",
    createdAt: "2023-07-17T02:49:46.692Z",
  },
];

const mockFilter = {
  brand: [],
  model: [],
  sortOrder: "",
};

describe("ProductList", () => {
  const addToCart = jest.fn();
  const setFilter = jest.fn();

  beforeEach(() => {
    addToCart.mockClear();
    setFilter.mockClear();
  });

  test("renders product list", () => {
    render(
      <CartContext.Provider
        value={{
          addToCart,
          products,
          filteredProducts: products,
          filter: mockFilter,
          setFilter,
        }}
      >
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </CartContext.Provider>
    );

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`${product.price}₺`)).toBeInTheDocument();
    });
  });

  test("adds product to cart", () => {
    render(
      <CartContext.Provider
        value={{
          addToCart,
          products,
          filteredProducts: products,
          filter: mockFilter,
          setFilter,
        }}
      >
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </CartContext.Provider>
    );

    const addButton = screen.getAllByText(/Add to Cart/i)[0];
    fireEvent.click(addButton);

    expect(addToCart).toHaveBeenCalledWith(products[0]);
  });

  test("paginates products", () => {
    render(
      <CartContext.Provider
        value={{
          addToCart,
          products,
          filteredProducts: products,
          filter: mockFilter,
          setFilter,
        }}
      >
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </CartContext.Provider>
    );

    const page2Button = screen.getByText("1");
    fireEvent.click(page2Button);

    expect(screen.getByText(products[1].name)).toBeInTheDocument();
  });
});
