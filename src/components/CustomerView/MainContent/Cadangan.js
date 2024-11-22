import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faTruck,
  faList,
  faSun,
  faMoon,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./CustomerView/Sidebar/Sidebar";
import Dashboard from "./CustomerView/MainContent/DBoard";
import Tracker from "./CustomerView/MainContent/Tracker";
import ListOrder from "./CustomerView/MainContent/ListOrder";
import NewOrderModal from "./CustomerView/NewOrder/NewOrderModal";

const CustomerView = ({ setTheme, theme }) => {
  const [isProfileDropdown, setProfileDropdown] = useState(false);
  const [isNewOrderModal, setNewOrderModal] = useState(false);
  const [selectedView, setSelectedView] = useState("Dashboard");

  // Chatbot states
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatBoxRef = useRef(null);

  const listSideBarItem = [
    { label: "List Order", icon: faList },
    { label: "Dashboard", icon: faTachometerAlt },
    { label: "Tracker", icon: faTruck },
  ];

  // Handle user input and bot response
  const handleUserMessage = (message) => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setUserInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      const botResponse = `Bot says: You said "${message}"`;
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsBotTyping(false);
    }, 1500); // Simulated bot delay
  };

  const toggleDropdown = () => {
    setProfileDropdown(!isProfileDropdown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      handleUserMessage(userInput);
    }
  };

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderView = () => {
    switch (selectedView) {
      case "Dashboard":
        return <Dashboard />;
      case "Tracker":
        return <Tracker />;
      case "List Order":
        return <ListOrder />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div>
        {isNewOrderModal && (
          <NewOrderModal setNewOrderModal={setNewOrderModal} />
        )}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            listSideBarItem={listSideBarItem}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />

          {/* Main Content Area */}
          <div className="flex-1 p-6 bg-base-200">
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
                <button className="btn btn-ghost btn-circle mx-2">
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
                      70
                    </span>
                  </div>
                </button>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="btn btn-ghost flex"
                  >
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>Name Here</span>
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
                        <a href="#" className="btn btn-ghost w-full text-left">
                          Log Out
                        </a>
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

            {/* Render the selected view */}
            {renderView()}
          </div>
        </div>
        {/* Chat Bot Icon */}
        <div
          onClick={() => setIsChatBoxOpen(!isChatBoxOpen)}
          className="fixed bottom-4 right-4 z-[60] cursor-pointer p-4 rounded-full bg-blue-600 text-white shadow-lg"
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </div>

        {/* Chat Box */}
        {isChatBoxOpen && (
          <div className="fixed bottom-16 right-4 z-[60] bg-white shadow-lg p-6 rounded-lg w-80 h-96 flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Chat with Us</h3>
              <button
                onClick={() => setIsChatBoxOpen(false)}
                className="btn btn-square btn-ghost"
              >
                ✕
              </button>
            </div>
            <div
              ref={chatBoxRef}
              className="flex-1 overflow-y-auto mt-4 space-y-4 px-2"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex justify-start items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse delay-400"></div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 border border-gray-300 rounded-l-lg"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-r-lg"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerView;
