import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const ListOrder = () => {
  const industries = [
    {
      id: 1,
      industri: "Frozen Goods",
      solusi: "End to End Logistics",
      jadwal: "Daily",
      status: "On Going",
    },
    {
      id: 2,
      industri: "Healthcare",
      solusi: "Secure Shipping",
      jadwal: "Weekly",
      status: "Pending",
    },
    {
      id: 3,
      industri: "Pharmaceuticals",
      solusi: "Secure Shipping",
      jadwal: "Monthly",
      status: "Completed",
    },
    {
      id: 4,
      industri: "Electronics",
      solusi: "Last Mile Delivery",
      jadwal: "Weekly",
      status: "Completed",
    },
    {
      id: 5,
      industri: "Textiles",
      solusi: "Warehousing",
      jadwal: "Weekly",
      status: "Completed",
    },
    {
      id: 6,
      industri: "Automotive",
      solusi: "Bulk Logistics",
      jadwal: "Monthly",
      status: "Completed",
    },
    {
      id: 7,
      industri: "Furniture",
      solusi: "Last Mile Delivery",
      jadwal: "Weekly",
      status: "Completed",
    },
    {
      id: 8,
      industri: "Frozen Goods",
      solusi: "Cold Chain Solution",
      jadwal: "Daily",
      status: "Completed",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Pagination logic
  const totalPages = Math.ceil(industries.length / itemsPerPage);
  const currentItems = industries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="overflow-x-auto my-5">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-primary text-base-300">
            <tr>
              <th>ID</th>
              <th>Industri</th>
              <th>Solusi</th>
              <th>Jadwal</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{item.industri}</td>
                <td>{item.solusi}</td>
                <td>{item.jadwal}</td>
                <td>{item.status}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-5">
          <div className="join">
            <button
              className="join-item btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((_, i) => (
              <button
                key={i + 1}
                className={`join-item btn ${
                  currentPage === i + 1 ? "btn-active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOrder;
