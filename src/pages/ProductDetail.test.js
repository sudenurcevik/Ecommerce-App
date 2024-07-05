import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartContext } from "../CartContext";
import ProductDetail from "./ProductDetail";

global.fetch = jest.fn();

describe("ProductDetail", () => {
  const addToCart = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
    addToCart.mockClear();
  });

  it("should handle fetch error", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );

    render(
      <CartContext.Provider value={{ addToCart }}>
        <MemoryRouter initialEntries={["/product/invalid-id"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Invalid product ID/i)).toBeInTheDocument();
    });
  });

  it("should return expected data", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: "1",
            name: "Test Product",
            price: "100",
            image: "test.jpg",
            description: "Test Description",
          }),
      })
    );

    render(
      <CartContext.Provider value={{ addToCart }}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </CartContext.Provider>
    );

    const productName = await screen.findByText(/Test Product/i);
    expect(productName).toBeInTheDocument();

    const productPrice = await screen.findByText(/100₺/i);
    expect(productPrice).toBeInTheDocument();

    const productDescription = await screen.findByText(/Test Description/i);
    expect(productDescription).toBeInTheDocument();

    const addButton = await screen.findByText(/Add to Cart/i);
    fireEvent.click(addButton);

    expect(addToCart).toHaveBeenCalledWith({
      id: "1",
      name: "Test Product",
      price: "100",
      image: "test.jpg",
      description: "Test Description",
    });
  });
});
