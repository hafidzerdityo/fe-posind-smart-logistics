import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faTruck,
  faBoxOpen,
  faNetworkWired,
  faBuilding,
  faShoppingCart,
  faTools,
  faExpandAlt,
  faCompressAlt,
} from "@fortawesome/free-solid-svg-icons";

import EndToEndLogistics from "./Services/EndToEndLogistics/EndToEndLogistics";

const NewOrderModal = ({ setNewOrderModal }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const services = [
    {
      name: "Courier & Cargo Solutions",
      icon: faNetworkWired,
      key: "courier_and_cargo_solutions",
    },
    {
      name: "Warehousing Solutions",
      icon: faWarehouse,
      key: "warehousing_solutions",
    },
    {
      name: "Transport Solutions",
      icon: faTruck,
      key: "transport_solutions",
    },
    {
      name: "Real Estate Solutions",
      icon: faBuilding,
      key: "real_estate_solutions",
    },
    {
      name: "Packaging Solutions",
      icon: faBoxOpen,
      key: "packaging_solutions",
    },
    {
      name: "Service Logistics",
      icon: faTools,
      key: "service_logistics",
    },
    {
      name: "E-commerce Fulfillment Solutions",
      icon: faShoppingCart,
      key: "ecommerce_fulfillment_solutions",
    },
  ];

  const handleServiceSelection = (serviceKey) => {
    if (serviceKey === "courier_and_cargo_solutions") {
      setSelectedService(serviceKey);
    } else {
      alert("Service belum dibuat");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[51]">
        {/* Modal */}
        <div
          className={`fixed z-[52] bg-base-100 shadow-xl rounded-md ${
            isFullscreen
              ? "inset-0 w-full h-full p-4"
              : "max-w-3xl w-full max-h-[75vh] rounded-md p-6"
          } overflow-auto`}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="font-bold text-2xl">
              {!selectedService
                ? "Pilih Service"
                : `${
                    services.find((service) => service.key === selectedService)
                      ?.name
                  } New Order`}
            </h3>
            <div className="flex items-center space-x-2">
              {/* Enlarge Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="btn btn-square btn-ghost"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <FontAwesomeIcon
                  icon={isFullscreen ? faCompressAlt : faExpandAlt}
                />
              </button>
              {/* Close Button */}
              <button
                onClick={() => setNewOrderModal(false)}
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Service Selection */}
          {!selectedService && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              {services.map((service) => (
                <button
                  key={service.key}
                  className="btn btn-primary flex flex-col items-center p-4 space-y-2 hover:btn-primary"
                  onClick={() => handleServiceSelection(service.key)}
                >
                  <FontAwesomeIcon icon={service.icon} size="2x" />
                  <span>{service.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Steps */}
          {selectedService === "courier_and_cargo_solutions" && (
            <EndToEndLogistics
              isFullscreen={isFullscreen}
              setNewOrderModal={setNewOrderModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NewOrderModal;
