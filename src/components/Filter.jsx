import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext";

const Filter = ({ products }) => {
  const { filter, setFilter, filteredProducts } = useContext(CartContext);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const uniqueBrands = [
        ...new Set(products.map((product) => product.brand)),
      ];
      setBrands(uniqueBrands);

      const uniqueModels = [
        ...new Set(products.map((product) => product.model)),
      ];
      setModels(uniqueModels);
    }
  }, [filteredProducts, products]);

  const handleBrandChange = (brand) => {
    const updatedBrands = [...filter.brand];
    if (updatedBrands.includes(brand)) {
      const index = updatedBrands.indexOf(brand);
      updatedBrands.splice(index, 1);
    } else {
      updatedBrands.push(brand);
    }
    setFilter((prev) => ({ ...prev, brand: updatedBrands }));
  };

  const handleModelChange = (model) => {
    const updatedModels = [...filter.model];
    if (updatedModels.includes(model)) {
      const index = updatedModels.indexOf(model);
      updatedModels.splice(index, 1);
    } else {
      updatedModels.push(model);
    }
    setFilter((prev) => ({ ...prev, model: updatedModels }));
  };

  return (
    <div className="space-y-6 xl:max-w-56 mx-auto">
      <div>
        <h3 className="text-gray-400 mb-4">Sort By</h3>
        <div className="bg-white p-6 rounded overflow-auto h-44 shadow-lg">
          <div className="flex flex-col space-y-2">
            {[
              "Old to new",
              "New to old",
              "Price high to low",
              "Price low to high",
            ].map((option) => (
              <label key={option} className="inline-flex items-center">
                <input
                  type="radio"
                  name="sortOrder"
                  value={option}
                  checked={filter.sortOrder === option}
                  onChange={() =>
                    setFilter((prev) => ({ ...prev, sortOrder: option }))
                  }
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 mb-4">Brands</h3>
        <div className="bg-white p-6 rounded overflow-auto h-44 shadow-lg">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search brand"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              className="p-2 w-full border rounded pl-10"
            />
            <svg
              className="w-5 h-5 absolute top-2 left-3 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.25 3.75a7.5 7.5 0 015.4 12.9z"
              />
            </svg>
          </div>
          <div className="flex flex-col space-y-2">
            {brands
              .filter((brand) =>
                brand.toLowerCase().includes(searchBrand.toLowerCase())
              )
              .map((brand) => (
                <label key={brand} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="brand"
                    value={brand}
                    checked={filter.brand.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{brand}</span>
                </label>
              ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 mb-4">Models</h3>
        <div className="bg-white p-6 rounded overflow-auto h-44 shadow-lg">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search model"
              value={searchModel}
              onChange={(e) => setSearchModel(e.target.value)}
              className="p-2 w-full border rounded pl-10"
            />
            <svg
              className="w-5 h-5 absolute top-2 left-3 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.25 3.75a7.5 7.5 0 015.4 12.9z"
              />
            </svg>
          </div>
          <div className="flex flex-col space-y-2">
            {models
              .filter((model) =>
                model.toLowerCase().includes(searchModel.toLowerCase())
              )
              .map((model) => (
                <label key={model} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="model"
                    value={model}
                    checked={filter.model.includes(model)}
                    onChange={() => handleModelChange(model)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{model}</span>
                </label>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
