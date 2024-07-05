import React, { useContext } from 'react';
import { CartContext } from '../../CartContext';

const CartItem = ({ product }) => {
  const { addToCart, updateCartItemQuantity } = useContext(CartContext);

  const increaseQuantity = () => {
    addToCart(product);
  };

  const decreaseQuantity = () => {
    if (product.quantity > 0) {
      updateCartItemQuantity(product.id, product.quantity - 1);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex flex-col items-start">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-blue-500">{product.price * product.quantity}₺</p>
      </div>
      <div className="flex items-center mt-2 sm:mt-0 border bg-blue-600 rounded">
        <button onClick={decreaseQuantity} className="bg-gray-200 p-2">-</button>
        <span className="mx-2 text-white">{product.quantity}</span>
        <button onClick={increaseQuantity} className="bg-gray-200 p-2">+</button>
      </div>
    </div>
  );
};

export default CartItem;
