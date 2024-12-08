import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const ListOrder = ({ isTutorListOrder }) => {
  const industries = [
    {
      id: 1,
      industri: "Frozen Goods",
      solusi: "Courier and Cargo Solutions",
      jadwal: "Weekly",
      status: "On Going",
    },
    {
      id: 2,
      industri: "Healthcare",
      solusi: "Courier and Cargo Solutions",
      jadwal: "Daily",
      status: "Pending",
    },
    {
      id: 3,
      industri: "Energy",
      solusi: "Courier and Cargo Solutions",
      jadwal: "Monthly",
      status: "Completed",
    },
    {
      id: 4,
      industri: "Retail",
      solusi: "Warehousing",
      jadwal: "Weekly",
      status: "Completed",
    },
    {
      id: 5,
      industri: "Retail",
      solusi: "Warehousing",
      jadwal: "Weekly",
      status: "Completed",
    },
    {
      id: 6,
      industri: "Frozen Goods",
      solusi: "Transporting",
      jadwal: "Monthly",
      status: "Completed",
    },
    {
      id: 7,
      industri: "Frozen Goods",
      solusi: "Transporting",
      jadwal: "Weekly",
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
              <th
                style={
                  isTutorListOrder
                    ? {
                        border: "4px solid red",
                        animation: "blinking 1s infinite",
                      }
                    : {}
                }
              >
                ID
              </th>
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
      <style jsx>{`
        @keyframes blinking {
          0% {
            border-color: red;
          }
          50% {
            border-color: transparent;
          }
          100% {
            border-color: red;
          }
        }
      `}</style>
    </>
  );
};

export default ListOrder;
