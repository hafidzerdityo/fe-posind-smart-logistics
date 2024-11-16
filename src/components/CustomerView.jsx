import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faChartLine,
  faTruck,
  faCar,
  faBox,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const CustomerView = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen w-64 bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-6 text-center">Menu</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="btn btn-ghost w-full text-left ">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="btn btn-ghost w-full text-left ">
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              Analytics
            </a>
          </li>
          <li>
            <a href="#" className="btn btn-ghost w-full text-left ">
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              Real-Time Tracker
            </a>
          </li>
          <li>
            <a href="#" className="btn btn-ghost w-full text-left ">
              <FontAwesomeIcon icon={faCar} className="mr-2" />
              Transportasi
            </a>
          </li>
          <li>
            <a href="#" className="btn btn-ghost w-full text-left ">
              <FontAwesomeIcon icon={faBox} className="mr-2" />
              Inventory
            </a>
          </li>
          <li>
            <a href="#" className="btn btn-ghost w-full text-left ">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Jadwal
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="flex justify-between  mb-6">
          {/* New Order Button */}
          <button className="btn btn-primary">+ New Order</button>

          {/* Profile and Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="btn btn-ghost flex ">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>Name Here</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-md">
                <div className="p-4">
                  <a href="#" className="btn btn-ghost w-full text-left">
                    Profile
                  </a>
                  <a href="#" className="btn btn-ghost w-full text-left">
                    Settings
                  </a>
                  <a href="#" className="btn btn-ghost w-full text-left">
                    Log Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <hr />

        {/* Add your main content here */}
        <div className="mt-5">
          <h1 className="text-2xl font-semibold">Customer Dashboard</h1>
          {/* Other content */}
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
