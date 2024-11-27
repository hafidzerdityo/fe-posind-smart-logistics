import React, { useState } from "react";

import Sidebar from "./CustomerView/Sidebar/Sidebar";
import CustomerNavbar from "./CustomerView/Navbar/CustomerNavbar";
import Dashboard from "./CustomerView/MainContent/DBoard";
import Tracker from "./CustomerView/MainContent/Tracker";
import ListOrder from "./CustomerView/MainContent/ListOrder";
import NewOrderModal from "./CustomerView/NewOrder/NewOrderModal";
import ChatBot from "./CustomerView/ChatBot/ChatBot";

const CustomerView = ({ setTheme, theme }) => {
  const [isProfileDropdown, setProfileDropdown] = useState(false);
  const [isNewOrderModal, setNewOrderModal] = useState(false);
  const [selectedView, setSelectedView] = useState("Dashboard");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderMainContent = () => {
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
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />
          <div className="flex-1 p-6 bg-base-200">
            {/* Navbar */}
            <CustomerNavbar
              selectedView={selectedView}
              setNewOrderModal={setNewOrderModal}
              isProfileDropdown={isProfileDropdown}
              setProfileDropdown={setProfileDropdown}
              toggleTheme={toggleTheme}
              theme={theme}
            />

            {/* Main Content */}
            {renderMainContent()}
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default CustomerView;
