import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import { CartContext } from "../CartContext";
import { IoFilterOutline } from "react-icons/io5";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const { addToCart, products, filteredProducts } = useContext(CartContext);
  const [showFilters, setShowFilters] = useState(false);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container w-full min-h-fullScreen h-full mx-auto mt-10">
      <div className="flex justify-between items-start">
        <div className="hidden xl:block">
          <Filter products={products} />
        </div>
        <div className="w-full xl:w-3/4 justify-between min-h-fullScreen h-full flex flex-col items-center mx-auto">
          <IoFilterOutline
            className="xl:hidden size-8 mb-8 cursor-pointer text-blue-600"
            onClick={() => setShowFilters(!showFilters)}
          />
          {showFilters && (
            <div className="w-full mb-4 xl:hidden">
              <Filter products={products} />
            </div>
          )}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
