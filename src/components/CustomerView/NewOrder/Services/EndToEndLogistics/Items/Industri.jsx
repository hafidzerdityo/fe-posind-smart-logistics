import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faTruck,
  faBoxOpen,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";

const Industri = ({
  industriList,
  isFullscreen,
  selectedIndustry,
  setSelectedIndustry,
}) => {
  return (
    <>
      {" "}
      <div
        className={`mb-10 px-3 border rounded-lg p-4 space-y-4 ${
          isFullscreen && "w-1/2 mx-auto"
        }`}
      >
        <label className="block text-sm font-medium mb-5">Pilih Industri</label>
        <div className="mt-5 ">
          <select
            className="select select-sm select-bordered w-1/2"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option disabled value="">
              Pilih Industri yang tersedia
            </option>
            {industriList.map((val, idx) => (
              <option key={idx} value={val.data}>
                {val.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Industri;
