import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faTruck,
  faList,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../../assets/POSIND_2023.svg.png";

const Sidebar = ({
  setSelectedView,
  selectedView,
  isTutorTracking,
  isTutorListOrder,
}) => {
  const listSideBarItem = [
    { label: "List Order", icon: faList },
    { label: "Dashboard", icon: faTachometerAlt },
    { label: "Tracker", icon: faTruck },
  ];
  return (
    <>
      <div className="h-screen w-64 bg-base-100 mb-3 ">
        <div className=" h-20 mb-4">
          <Link to="/customer">
            <img
              className="h-10 mt-2 w-auto hidden md:block mx-auto"
              src={logo}
              alt="Product Logo"
            />
          </Link>
          <Link to="/customer">
            <span className="btn btn-ghost text-xl hidden lg:flex">
              Admin Page
            </span>
          </Link>
        </div>
        <ul className="space-y-4">
          <li key={"List Order"}>
            <button
              onClick={() => setSelectedView("List Order")}
              className={`cursor-pointer w-full text-left font-semibold px-4 py-2 ${
                selectedView === "List Order"
                  ? " bg-primary bg-opacity-10 text-primary"
                  : " hover:text-primary"
              }`}
              style={
                isTutorListOrder
                  ? {
                      border: "4px solid red",
                      animation: "blinking 1s infinite",
                    }
                  : {}
              }
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              {"List Order"}
            </button>
          </li>
          <li key={"Dashboard"}>
            <button
              onClick={() => setSelectedView("Dashboard")}
              className={`cursor-pointer w-full text-left font-semibold px-4 py-2 ${
                selectedView === "Dashboard"
                  ? " bg-primary bg-opacity-10 text-primary"
                  : " hover:text-primary"
              }`}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              {"Dashboard"}
            </button>
          </li>
          <li key={"Tracker"}>
            <button
              onClick={() => setSelectedView("Tracker")}
              className={`cursor-pointer w-full text-left font-semibold px-4 py-2 ${
                selectedView === "Tracker"
                  ? " bg-primary bg-opacity-10 text-primary"
                  : " hover:text-primary"
              }`}
              style={
                isTutorTracking
                  ? {
                      border: "4px solid red",
                      animation: "blinking 1s infinite",
                    }
                  : {}
              }
            >
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              {"Tracker"}
            </button>
          </li>
        </ul>
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

export default Sidebar;
