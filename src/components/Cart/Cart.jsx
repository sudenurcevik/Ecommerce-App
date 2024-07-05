import React, { useContext } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { CartContext } from "../../CartContext";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="w-11/12 xl:w-1/4 mx-auto mt-10">
      <div className="bg-white shadow-lg rounded mb-4">
        {cartItems?.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
};

export default Cart;
