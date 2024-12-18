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

  // Tutorial
  const [isTutorOrderButton, setIsTutorOrderButton] = useState(false);
  const [isTutorTracking, setIsTutorTracking] = useState(false);
  const [isTutorListOrder, setIsTutorListOrder] = useState(false);
  const [isDelayOrder, setIsDelayOrder] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderMainContent = () => {
    switch (selectedView) {
      case "Dashboard":
        return <Dashboard />;
      case "Tracker":
        return (
          <Tracker
            isTutorTracking={isTutorTracking}
            isDelayOrder={isDelayOrder}
          />
        );
      case "List Order":
        return <ListOrder isTutorListOrder={isTutorListOrder} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div>
        {/* Dimmed Content */}
        {isNewOrderModal && (
          <NewOrderModal
            setNewOrderModal={setNewOrderModal}
            isTutorOrderButton={isTutorOrderButton}
            setIsTutorOrderButton={setIsTutorOrderButton}
          />
        )}
        <div className="flex ">
          {/* Sidebar */}
          <Sidebar
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            isTutorTracking={isTutorTracking}
            isTutorListOrder={isTutorListOrder}
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
              isTutorOrderButton={isTutorOrderButton}
            />

            {/* Main Content */}
            {renderMainContent()}
          </div>
        </div>
        <ChatBot
          setIsTutorOrderButton={setIsTutorOrderButton}
          setIsTutorTracking={setIsTutorTracking}
          setIsTutorListOrder={setIsTutorListOrder}
          setIsDelayOrder={setIsDelayOrder}
        />
      </div>
    </>
  );
};

export default CustomerView;
