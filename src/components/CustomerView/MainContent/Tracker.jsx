import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faRoute,
  faTachometerAlt,
  faMapMarkerAlt,
  faClock,
  faTruck,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css"; // Leaflet CSS

const Tracker = () => {
  // Sample data for simulation
  const [shipment, setShipment] = useState({
    location: [-6.914744, 107.60981], // Bandung coordinates
    temperature: -18, // Frozen goods temperature
    status: "In Transit",
    ETA: "2024-11-22 18:00",
    speed: 50, // km/h
    route: "Route A",
    transportation: "Pickup Box",
  });

  const [temperatureHistory, setTemperatureHistory] = useState([
    { datetime: new Date().toLocaleTimeString(), temp: -18 },
  ]);

  const [journey, setJourney] = useState([
    { timestamp: new Date().toLocaleTimeString(), event: "Shipping picked up" },
  ]);

  const routes = ["Route A", "Route B", "Route C"];

  useEffect(() => {
    const updateShipmentData = () => {
      setShipment((prev) => {
        // Simulate speed fluctuation
        const newSpeed = Math.max(
          30,
          Math.min(80, prev.speed + (Math.random() - 0.5) * 10)
        );
        // Simulate route changes
        const newRoute = routes[Math.floor(Math.random() * routes.length)];
        const newTemperature = prev.temperature + (Math.random() - 0.5) * 2; // Random temp fluctuation
        return {
          ...prev,
          temperature: newTemperature,
          location: [
            prev.location[0] + (Math.random() - 0.5) * 0.001,
            prev.location[1] + (Math.random() - 0.5) * 0.001,
          ], // Simulate movement
          speed: newSpeed,
          route: newRoute,
        };
      });

      // Update temperature history
      setTemperatureHistory((prev) => {
        const updatedHistory = [
          ...prev,
          {
            datetime: new Date().toLocaleTimeString(),
            temp: shipment.temperature.toFixed(1),
          },
        ];
        return updatedHistory.length > 10
          ? updatedHistory.slice(1)
          : updatedHistory;
      });

      // Simulate journey updates
      setJourney((prevJourney) => {
        const newJourney = [...prevJourney];
        if (Math.random() < 0.1) {
          const event = {
            timestamp: new Date().toLocaleTimeString(),
            event: `Shipping at hub ${
              ["A", "B", "C"][Math.floor(Math.random() * 3)]
            } - Bandung`,
          };
          newJourney.push(event);
        }
        return newJourney;
      });
    };

    const intervalId = setInterval(() => {
      updateShipmentData();
    }, 1000); // Update every 5 seconds for better visualization

    return () => clearInterval(intervalId);
  }, [shipment, routes]);

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Map Section */}
        <div className="card shadow-lg z-[1]">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Shipment Location</h2>
            <MapContainer
              center={shipment.location}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={shipment.location}>
                <Popup>
                  <h3>Shipment Status: {shipment.status}</h3>
                  <p>ETA: {shipment.ETA}</p>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Shipment Status */}
        <div className="card shadow-lg">
          <div className="card-body space-y-4">
            <h3 className="text-lg font-semibold">Current Status</h3>
            {/* Shipment Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card shadow-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={faThermometerHalf}
                    size="2x"
                    className="text-blue-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">Temperature</h3>
                    <div className="text-xl font-medium">
                      {shipment.temperature.toFixed(1)}°C
                    </div>
                    <div className="text-sm text-gray-500">Frozen Goods</div>
                  </div>
                </div>
              </div>

              <div className="card shadow-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={faTachometerAlt}
                    size="2x"
                    className="text-green-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">Speed</h3>
                    <div className="text-xl font-medium">
                      {shipment.speed.toFixed(1)} km/h
                    </div>
                  </div>
                </div>
              </div>

              <div className="card shadow-lg p-4 border-l-4 border-yellow-500">
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={faRoute}
                    size="2x"
                    className="text-yellow-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">Route</h3>
                    <div className="text-xl font-medium">{shipment.route}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="card shadow-sm p-3 border-l-4 border-red-500">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-red-500"
                  />
                  <div>
                    <h4 className="text-sm font-semibold">Current Location</h4>
                    <p className="text-xs">{`Lat: ${shipment.location[0].toFixed(
                      4
                    )}, Lng: ${shipment.location[1].toFixed(4)}`}</p>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm p-3 border-l-4 border-purple-500">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} className="text-purple-500" />
                  <div>
                    <h4 className="text-sm font-semibold">
                      Estimated Time of Arrival (ETA)
                    </h4>
                    <p className="text-xs">{shipment.ETA}</p>
                  </div>
                </div>
              </div>
              <div className="card shadow-sm p-3 border-l-4 border-gray-500">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTruck} className="text-purple-500" />
                  <div>
                    <h4 className="text-sm font-semibold">
                      Transportation Used
                    </h4>
                    <p className="text-xs">{shipment.transportation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey of the Shipping */}
        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-4">Journey</h3>
            <div className="steps vertical space-y-4">
              {journey.map((item, index) => (
                <div
                  key={index}
                  className={`step ${
                    index === journey.length - 1
                      ? "step-primary"
                      : "step-neutral"
                  }`}
                >
                  <div className="step-title">{item.timestamp}</div>
                  <div className="step-content">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Temperature History Chart */}
        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="text-lg font-semibold">Temperature History</h3>
            <div
              className="overflow-y-auto max-h-40"
              style={{ scrollbarWidth: "thin" }}
            >
              <ul className="space-y-2">
                {temperatureHistory.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.datetime}</span>
                    <span>{item.temp}°C</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tracker;
