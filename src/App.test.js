import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './components/Cart/Cart';

describe('App', () => {
  test('renders navbar and routes', () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/']}>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
          <Cart />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/Sort By/i)).toBeInTheDocument();
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  });
});
