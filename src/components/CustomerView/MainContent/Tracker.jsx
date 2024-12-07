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
} from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";
import Alert from "../../utils/Alert";

const Tracker = () => {
  const [shipment, setShipment] = useState({
    location: [-6.914744, 107.60981],
    temperature: -18,
    status: "In Transit",
    ETA: "2024-11-22 18:00",
    speed: 50,
    route: "Route A",
    transportation: "Pickup Box",
  });

  const [temperatureHistory, setTemperatureHistory] = useState([
    { datetime: new Date().toLocaleTimeString(), temp: -18 },
  ]);

  const [journey, setJourney] = useState([
    { timestamp: new Date().toLocaleTimeString(), event: "Shipping picked up" },
  ]);

  const [etaHistory, setEtaHistory] = useState([
    { datetime: new Date().toLocaleTimeString(), eta: "2024-11-22 18:00" },
  ]);

  const routes = ["Route A", "Route B", "Route C"];

  const [idOrder, setIdOrder] = useState("0");
  const [trackOrderClicked, setTrackOrderClicked] = useState(false); // New state to track button click

  useEffect(() => {
    const updateShipmentData = () => {
      setShipment((prev) => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        location: [
          prev.location[0] + (Math.random() - 0.5) * 0.001,
          prev.location[1] + (Math.random() - 0.5) * 0.001,
        ],
        speed: Math.max(
          30,
          Math.min(80, prev.speed + (Math.random() - 0.5) * 10)
        ),
        route: routes[Math.floor(Math.random() * routes.length)],
      }));

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

      setJourney((prevJourney) => {
        if (prevJourney.length > 6) return prevJourney;

        if (Math.random() < 0.1) {
          return [
            ...prevJourney,
            {
              timestamp: new Date().toLocaleTimeString(),
              event: `Shipping at hub ${
                ["A", "B", "C"][Math.floor(Math.random() * 3)]
              } - Bandung`,
            },
          ];
        }
        return prevJourney;
      });
    };

    const intervalId = setInterval(updateShipmentData, 1000);
    return () => clearInterval(intervalId);
  }, [shipment, routes]);

  const [error, setError] = useState(false);

  // Handle the click event of the button
  const handleTrackOrderClick = () => {
    if (idOrder === "1") {
      setTrackOrderClicked(true);
    } else {
      setTrackOrderClicked(false);
      setError(true);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-base-100 min-h-screen ">
      <div className="flex gap-3 items-end">
        <div className="w-1/4">
          <label className="block text-sm font-medium mb-2 ">
            Input ID Order
          </label>
          <input
            type="text"
            value={idOrder === "0" ? "" : idOrder}
            onChange={(e) => setIdOrder(e.target.value)}
            className="input input-sm input-bordered w-full"
            placeholder="Masukkan ID Order contoh: 1"
          />
        </div>
        <button
          className="btn btn-sm btn-primary"
          onClick={handleTrackOrderClick} // Set state on button click
        >
          Track Order
        </button>
      </div>
      {trackOrderClicked && ( // Only show content if trackOrderClicked is true
        <div>
          {/* Map Section */}
          <div className="bg-base-100 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-base-700 mb-4 ">
              Shipment Location
            </h2>
            <MapContainer
              center={shipment.location}
              zoom={13}
              style={{ height: "300px", borderRadius: "8px", zIndex: "10" }}
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
          {/* Shipment Status */}
          <div className="bg-base-100 rounded-lg shadow-md p-6 space-y-6">
            <h3 className="text-2xl font-bold text-base-700">Current Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatusCard
                icon={faThermometerHalf}
                color="blue-500"
                title="Temperature"
                value={`${shipment.temperature.toFixed(1)}°C`}
                subtitle="Frozen Goods"
              />
              <StatusCard
                icon={faTachometerAlt}
                color="green-500"
                title="Speed"
                value={`${shipment.speed.toFixed(1)} km/h`}
              />
              <StatusCard
                icon={faRoute}
                color="yellow-500"
                title="Route"
                value={shipment.route}
              />
              <StatusCard
                icon={faMapMarkerAlt}
                color="red-500"
                title="Location"
                value={`Lat: ${shipment.location[0].toFixed(
                  4
                )}, Lng: ${shipment.location[1].toFixed(4)}`}
              />
              <StatusCard
                icon={faClock}
                color="purple-500"
                title="ETA"
                value={shipment.ETA}
              />
              <StatusCard
                icon={faTruck}
                color="gray-500"
                title="Transportation"
                value={shipment.transportation}
              />
            </div>
          </div>
          {/* Journey Section */}
          <div className="bg-base-100 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-base-700 mb-4">Journey</h3>
            <div className="space-y-4 border-l-4 border-blue-500 pl-4">
              {journey.map((item, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <span className="text-sm text-base-500">
                    {item.timestamp}
                  </span>
                  <span className="text-lg text-base-700 font-medium">
                    {item.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* History */}
          {/* Temperature History */}
          <div className="flex gap-4">
            <div className="bg-base-100 rounded-lg shadow-md p-6 flex-1">
              <h3 className="text-2xl font-bold text-base-700 mb-4">
                Temperature History
              </h3>
              <div className="overflow-y-auto max-h-40 border rounded-md p-4 bg-gray-50">
                <ul className="space-y-2">
                  {temperatureHistory.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span className="text-base-600">{item.datetime}</span>
                      <span className="text-base-800 font-medium">
                        {item.temp}°C
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow-md p-6 flex-1">
              <h3 className="text-2xl font-bold text-base-700 mb-4">
                Weekly History
              </h3>
              <div className="overflow-y-auto max-h-40 border rounded-md p-4 bg-gray-50">
                <ul className="space-y-2">
                  {temperatureHistory.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span className="text-base-600">{item.datetime}</span>
                      <span className="text-base-800 font-medium">
                        {item.temp}°C
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <Alert
          type={"error"}
          text={"Order Tidak Ditemukan"}
          setError={setError}
        />
      )}
    </div>
  );
};

// Reusable Status Card Component
const StatusCard = ({ icon, color, title, value, subtitle }) => (
  <div className={`card shadow-lg p-4 border-l-4 border-${color}`}>
    <div className="flex items-center space-x-4">
      <FontAwesomeIcon icon={icon} size="2x" className={`text-${color}`} />
      <div>
        <h3 className="text-lg font-semibold text-base-700">{title}</h3>
        <div className="text-xl font-bold text-base-900">{value}</div>
        {subtitle && <div className="text-sm text-base-500">{subtitle}</div>}
      </div>
    </div>
  </div>
);

export default Tracker;
