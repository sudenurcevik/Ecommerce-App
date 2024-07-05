import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="rounded p-2 flex flex-col items-start gap-2 bg-white">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto xl:h-64 object-cover mb-4"
        />
        <div className="text-blue-500 font-semibold">{product.price}₺</div>
        <div className="text-lg font-semibold">{product.name}</div>
      </Link>

      <button
        className="bg-blue-600 w-full text-white px-4 py-2 rounded mt-2"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
