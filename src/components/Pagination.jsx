import React from "react";

const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4 bg-none">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            disabled={currentPage <= 1}
            onClick={() => paginate(currentPage - 1)}
            className={`px-3 py-2 ml-0 leading-tight text-gray-500 rounded-l-lg ${
              currentPage <= 1 ? "disabled" : ""
            } ${currentPage <= 1 ? "" : "hover:bg-gray-100 hover:text-gray-700"}`}
          >
            {"<"}
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight ${
                currentPage === number
                  ? "bg-white text-blue-600"
                  : "text-gray-500"
              }  hover:bg-gray-100 hover:text-gray-700`}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => paginate(currentPage + 1)}
            className={`px-3 py-2 leading-tight text-gray-500 rounded-r-lg ${
              currentPage >= totalPages ? "disabled" : ""
            } ${currentPage >= totalPages ? "" : "hover:bg-gray-100 hover:text-gray-700"}`}
          >
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
