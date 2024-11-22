import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBolt,
  faHeartbeat,
  faStore,
  faWarehouse,
  faTruck,
  faBoxOpen,
  faNetworkWired,
  faSignInAlt,
  faUserPlus,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/POSIND_2023.svg.png";
import LoginModal from "./HomeView/Login/LoginModal";
import SignUpModal from "./HomeView/Signup/SignUpModal";

const Navbar = ({ setTheme, theme }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const title = "Smart Logistics";
  const industriesList = [
    { name: "Consumer Goods", icon: faShoppingCart },
    { name: "Energy, Chemicals, Engineering", icon: faBolt },
    { name: "Life Science Health Care", icon: faHeartbeat },
    { name: "Retail", icon: faStore },
  ];

  const solutionsList = [
    { name: "Warehousing Solutions", icon: faWarehouse },
    { name: "Transport Solutions", icon: faTruck },
    { name: "Packaging Solutions", icon: faBoxOpen },
    { name: "End to End Logistic Services", icon: faNetworkWired },
  ];

  return (
    <>
      {isLoginModalOpen && (
        <LoginModal
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        />
      )}

      <div
        className={`navbar bg-base-100 h-24 px-5 lg:px-28 fixed top-0 left-0 right-0 ${
          isLoginModalOpen || isSignUpModalOpen ? "z-[49]" : "z-[50]"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 shadow"
            >
              <li>
                <a>Industries</a>
                <ul className="p-2">
                  {industriesList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start whitespace-nowrap"
                    >
                      <a> {item.name}</a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <a>Solutions</a>
                <ul className="p-2">
                  {solutionsList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start whitespace-nowrap"
                    >
                      <a> {item.name}</a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <a>Insight and Trends</a>
              </li>
              <li>
                <a>About Us</a>
              </li>
            </ul>
          </div>
          <Link to="/">
            <img
              className="h-10 w-auto hidden md:block"
              src={logo}
              alt="Product Logo"
            />
          </Link>
          <Link to="/">
            <span className="btn btn-ghost text-xl hidden lg:flex">
              {title}
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex z-[1]">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Industries</summary>
                <ul className="p-2">
                  {industriesList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start whitespace-nowrap"
                    >
                      <span className="whitespace-nowrap">
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                        <span> {item.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Solutions</summary>
                <ul className="p-2">
                  {solutionsList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start whitespace-nowrap"
                    >
                      <span className="whitespace-nowrap">
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                        <span> {item.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <a>Insight and Trends</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <button
            className="btn mx-2"
            onClick={() => setIsLoginModalOpen(true)}
          >
            <FontAwesomeIcon
              icon={faSignInAlt}
              className="mr-2 hidden sm:block"
            />{" "}
            Login
          </button>
          <button onClick={() => setIsSignUpModalOpen(true)}>
            <a className="btn btn-primary mx-2 text-white">
              <FontAwesomeIcon
                icon={faUserPlus}
                className="mr-2 hidden sm:block"
              />{" "}
              Sign Up
            </a>
          </button>
          <button
            className="btn btn-ghost mx-2"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
