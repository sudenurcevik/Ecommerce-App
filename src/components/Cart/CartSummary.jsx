import React, { useContext } from "react";
import { CartContext } from "../../CartContext";

const CartSummary = () => {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 border-t mt-4 bg-white shadow-lg rounded">
      <h2 className="text-lg font-bold">
        Total Price:{"\u00A0"}
        <span className="text-blue-600 font-semibold">
          {totalPrice?.toLocaleString()}₺
        </span>
      </h2>
      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-2">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
