import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isNaN(id)) {
        try {
          const response = await fetch(
            `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProduct(data);
        } catch (err) {
          setError("Failed to fetch product data");
          console.error("Failed to fetch product data", err);
        }
      } else {
        setError("Invalid product ID");
        console.log("Invalid product ID");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex justify-center w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 mt-10">
      <div className="flex flex-col md:flex-row xl:w-full bg-white shadow-lg rounded overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover"
        />
        <div className="flex flex-col justify-between w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 gap-6">
          <section>
            <div className="text-2xl font-semibold">{product.name}</div>
            <div className="text-xl text-blue-600">{product.price}₺</div>
          </section>
          <section>
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded mb-4"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <div className="text-gray-600">{product.description}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
