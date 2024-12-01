import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faTruck,
  faList,
  faSun,
  faMoon,
  faComments,
  faClock,
  faMapMarkerAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const CustomerNavbar = ({
  selectedView,
  setNewOrderModal,
  isProfileDropdown,
  setProfileDropdown,
  toggleTheme,
  theme,
}) => {
  const [showNotifications, setShowNotifications] = useState(false); // Track visibility
  const [notifications, setNotifications] = useState([]);

  const listNotifications = [
    {
      timestamp: new Date().toLocaleTimeString(),
      icon: faClock,
      header: "Shipment Delayed",
      text: "Sorry, the shipment has been delayed due to unforeseen circumstances.",
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      icon: faMapMarkerAlt,
      header: "Shipment Arrived at Hub A",
      text: "Your shipment has successfully arrived at Hub A and is ready for the next leg of the journey.",
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      icon: faCheckCircle,
      header: "Shipment On Its Way",
      text: "The shipment is on its way and should arrive within the next few hours.",
    },
  ];

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(listNotifications);
    }
  };
  return (
    <>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{selectedView}</h1>
          <p className="text-sm text-gray-500">
            Welcome to your {selectedView}!
          </p>
        </div>

        <div className="flex">
          <button
            onClick={() => setNewOrderModal(true)}
            className="btn btn-primary mx-2"
          >
            + New Order
          </button>
          <div className="relative">
            <button
              className="btn btn-ghost btn-circle mx-2"
              onClick={handleNotificationClick}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item">
                  3
                </span>
              </div>
            </button>

            {/* Notifications display */}
            {showNotifications && (
              <div className="absolute top-12 right-0 w-96 z-[50]">
                <div className="space-y-4 bg-base-200 shadow-lg rounded-md p-4">
                  {notifications.map((notif, index) => (
                    <div
                      key={index}
                      className="card shadow-lg w-full bg-base-200 p-4 mb-4"
                    >
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={notif.icon}
                          className="text-blue-500 mr-3"
                        />
                        <div>
                          <h4 className="text-md font-semibold">
                            {notif.header}
                          </h4>
                          <p className="text-sm text-gray-600">{notif.text}</p>
                          <span className="text-xs text-gray-400">
                            {notif.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!isProfileDropdown)}
              className="btn btn-ghost flex"
            >
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>Admin</span>
            </button>

            {isProfileDropdown && (
              <div className="z-[50] absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-md">
                <div className="p-4">
                  <a href="#" className="btn btn-ghost w-full text-left">
                    Profile
                  </a>
                  <a href="#" className="btn btn-ghost w-full text-left">
                    Settings
                  </a>
                  <Link to="/">
                    <span className="btn btn-ghost w-full text-left">
                      Log Out
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <button
            className="btn btn-ghost mx-2"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
          </button>
        </div>
      </div>

      <hr />
    </>
  );
};

export default CustomerNavbar;
