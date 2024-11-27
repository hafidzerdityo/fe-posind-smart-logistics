import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faTruck,
  faList,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../../assets/POSIND_2023.svg.png";

const Sidebar = ({ setSelectedView, selectedView }) => {
  const listSideBarItem = [
    { label: "List Order", icon: faList },
    { label: "Dashboard", icon: faTachometerAlt },
    { label: "Tracker", icon: faTruck },
  ];
  return (
    <>
      <div className="h-screen w-64 bg-base-100 mb-3">
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
          {listSideBarItem.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => setSelectedView(item.label)}
                className={`cursor-pointer w-full text-left font-semibold px-4 py-2 ${
                  selectedView === item.label
                    ? " bg-primary bg-opacity-10 text-primary"
                    : " hover:text-primary"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
