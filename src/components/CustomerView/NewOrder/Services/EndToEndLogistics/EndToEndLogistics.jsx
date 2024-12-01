import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faTruck,
  faBoxOpen,
  faNetworkWired,
  faIceCream,
} from "@fortawesome/free-solid-svg-icons";

import Industri from "./Items/Industri";
import MetodeKirim from "./Items/MetodeKirim";

const EndToEndLogistics = ({ isFullscreen, setNewOrderModal }) => {
  // Industry
  const industriList = [
    {
      name: "Consumer Goods",
      icon: faWarehouse,
      data: "consumer_goods",
    },
    {
      name: "Frozen Goods",
      icon: faIceCream,
      data: "frozen_goods",
    },
    {
      name: "Energy Chemicals and Engineering",
      icon: faTruck,
      data: "energy_chemicals",
    },
    {
      name: "Life Science & Health Care",
      icon: faBoxOpen,
      data: "life_science_healthcare",
    },
    {
      name: "Retail",
      icon: faNetworkWired,
      data: "retail",
    },
  ];
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const selectedIndustryName =
    industriList.find((item) => item.data === selectedIndustry)?.name || "None";
  // End of Industry

  // Metode Kirim
  const [pickupMethod, setPickupMethod] = useState("");
  const [scheduleOption, setScheduleOption] = useState("");
  const [packaging, setPackaging] = useState("");
  const packagingOptions = [
    { data: "kardus", name: "Kardus (Carton Box)", price: 5000 },
    { data: "polybag", name: "Polybag/Plastik", price: 3000 },
    { data: "bubblewrap", name: "Bubble Wrap", price: 8000 },
    { data: "parcelbok", name: "Parcel Box", price: 10000 },
    { data: "petikayu", name: "Peti Kayu", price: 20000 },
    { data: "khusus", name: "Kemasan Khusus (Barang Fragile)", price: 25000 },
    { data: "thermalbox", name: "Thermal Box", price: 30000 },
  ];

  // End of Metode Kirim

  // Transportasi
  const [multiSelectedVehicles, setMultiSelectedVehicles] = useState([]);
  const handleMultiSelect = (id) => {
    setMultiSelectedVehicles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // End of Transportasi

  const [price, setPrice] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [packageDetails, setPackageDetails] = useState({
    destination: "",
    itemName: "",
    jenisIndustri: "",

    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  });

  const handlePackageDetailsChange = (e) => {
    const { name, value } = e.target;
    setPackageDetails((prev) => ({
      ...prev,
      [name]:
        name === "weight" ||
        name === "length" ||
        name === "width" ||
        name === "height"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  useEffect(() => {
    const weightPrice = packageDetails.weight * 5000;
    const dimensionPrice =
      packageDetails.length *
      packageDetails.width *
      packageDetails.height *
      0.01;
    const totalPrice = weightPrice + dimensionPrice;

    setPrice(totalPrice);
  }, [packageDetails]);

  const [progressStep, setProgressStep] = useState(1);

  const [selectedTransport, setSelectedTransport] = useState(""); // Default selection
  const [carouselIndex, setCarouselIndex] = useState(0); // Optional: to control carousel navigation
  const [isSelected, setIsSelected] = useState(false);
  const handleSelectedTransport = (e) => {
    e.preventDefault();
    setSelectedTransport(e.target.value);
  };

  const jenisAngkutan = [
    { name: "Angkutan Udara", data: "angkutan_udara" },
    { name: "Angkutan Laut", data: "angkutan_laut" },
    { name: "Angkutan Darat", data: "angkutan_darat" },
    { name: "Custom", data: "gabungan" },
  ];
  const selectedTransportName =
    jenisAngkutan.find((item) => item.data === selectedTransport)?.name ||
    "None";

  const vehicles = [
    {
      id: "sedan",
      name: "Sedan",
      image:
        "https://astradigitaldigiroomuat.blob.core.windows.net/storage-uat-001/all-new-vios.jpg",
      description:
        "Ideal untuk barang kecil hingga sedang dan rentan/ 1,5 x 0,8 x 0,8 meter hingga 100 kg",
      suitable_industries: ["E-commerce", "Electronics"],
    },
    {
      id: "mpv",
      name: "Mobil MPV",
      image:
        "https://thumb.viva.id/vivabandung/665x374/2024/08/04/66afa6f243bde-mitsubishi-l100-ev_bandung.jpg",
      description:
        "Ideal untuk barang dengan penanganan khusus dan elektronik / 1,7 x 1 x 0,8 Meter hingga 200 kg",
      suitable_industries: ["Healthcare", "Retail"],
    },
    // (Other vehicles omitted for brevity)
  ];

  // Dummy items for pesawat and kapal laut
  const additionalItems = [
    {
      id: "airplane_cargo_small",
      name: "Pesawat Kargo Kecil",
      image: "https://cdn.jetphotos.com/full/3/777.jpg",
      description:
        "Ideal untuk pengiriman udara skala kecil hingga 1.5 ton dengan dimensi 4 x 2 x 1.5 meter.",
      suitable_industries: ["E-commerce", "Electronics"],
    },
    {
      id: "airplane_cargo_large",
      name: "Pesawat Kargo Besar",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Antonov_AN-124.jpg",
      description:
        "Ideal untuk pengiriman udara skala besar hingga 10 ton dengan dimensi 12 x 3.5 x 3 meter.",
      suitable_industries: ["Industrial Supplies", "Heavy Equipment"],
    },
    {
      id: "cargo_ship_small",
      name: "Kapal Kargo Kecil",
      image: "https://www.fleetmon.com/media/images/vessels/default-image.jpg",
      description:
        "Ideal untuk pengiriman laut skala kecil hingga 20 ton dengan dimensi 6 x 3 x 2.5 meter.",
      suitable_industries: ["Agriculture", "Retail"],
    },
    {
      id: "cargo_ship_large",
      name: "Kapal Kargo Besar",
      image:
        "https://cdn.fleetmon.com/media/images/vessels/largest-cargo-vessel.jpg",
      description:
        "Ideal untuk pengiriman laut skala besar hingga 200 ton dengan dimensi 20 x 8 x 6 meter.",
      suitable_industries: ["Logistics", "Manufacturing"],
    },
  ];

  // Combine vehicles and additionalItems for "gabungan"
  const gabungan = [...vehicles, ...additionalItems];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(vehicles.length / itemsPerPage);

  const paginatedVehicles = vehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelectVehicle = (e) => {
    e.preventDefault();
    setIsSelected(e.target.value);
  };

  // Handles the next button click
  const handleNext = (e) => {
    e.preventDefault();
    if (progressStep < 7) {
      setProgressStep(progressStep + 1);
    } else {
      // Close current modal and show success modal
      setNewOrderModal(false);
      setShowSuccessModal(true);
    }
  };

  const [selectedPaymentType, setSelectedPaymentType] = useState(null);

  // State for selected cash option (e.g., Pospay, VA, Transfer, Credit Card)
  const [selectedCashOption, setSelectedCashOption] = useState(null);

  // State for credit card inputs
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardVCC, setCreditCardVCC] = useState("");

  // Handles the previous button click
  const handleBack = (e) => {
    e.preventDefault();
    if (progressStep > 1) {
      setProgressStep(progressStep - 1);
    }
  };
  return (
    <>
      {" "}
      <div>
        <div className="flex justify-center mb-6">
          <ul className="steps w-full max-w-3xl text-xs">
            <li className={`step ${progressStep >= 1 ? "step-primary" : ""}`}>
              Industri
            </li>
            <li className={`step ${progressStep >= 2 ? "step-primary" : ""}`}>
              Pick Off
            </li>
            <li className={`step ${progressStep >= 3 ? "step-primary" : ""}`}>
              Detail Kiriman
            </li>
            <li className={`step ${progressStep >= 4 ? "step-primary" : ""}`}>
              Alamat
            </li>
            <li className={`step ${progressStep >= 5 ? "step-primary" : ""}`}>
              Detail Jenis Transportasi
            </li>
            <li className={`step ${progressStep >= 6 ? "step-primary" : ""}`}>
              Kalkulasi Biaya
            </li>
            <li className={`step ${progressStep >= 7 ? "step-primary" : ""}`}>
              Metode Pembayaran
            </li>
          </ul>
        </div>

        {/* Dynamic Form Content */}
        <form className="space-y-3 px-4 py-2">
          {progressStep === 1 && (
            <Industri
              isFullscreen={isFullscreen}
              industriList={industriList}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
            />
          )}
          {progressStep === 2 && (
            <MetodeKirim
              isFullscreen={isFullscreen}
              pickupMethod={pickupMethod}
              setPickupMethod={setPickupMethod}
              scheduleOption={scheduleOption}
              setScheduleOption={setScheduleOption}
              packaging={packaging}
              setPackaging={setPackaging}
              packagingOptions={packagingOptions}
            />
          )}

          {progressStep === 3 && (
            <div className={isFullscreen && "w-1/2 mx-auto"}>
              <h3 className="font-bold text-lg mb-6">Detail Kiriman</h3>
              <div className="mt-5 border rounded-lg p-4 space-y-4">
                {/* Destination */}
                <div className="form-control">
                  <label className="label font-semibold">Tujuan</label>
                  <input
                    type="text"
                    name="destination"
                    value={packageDetails.destination}
                    onChange={handlePackageDetailsChange}
                    className="input input-sm input-bordered"
                    placeholder="Masukkan tujuan pengiriman"
                  />
                </div>

                {/* Item Name */}
                <div className="form-control">
                  <label className="label font-semibold">Nama Barang</label>
                  <input
                    type="text"
                    name="itemName"
                    value={packageDetails.itemName}
                    onChange={handlePackageDetailsChange}
                    className="input input-sm input-bordered"
                    placeholder="Masukkan nama barang"
                  />
                </div>

                {/* Weight */}
                <div className="form-control">
                  <label className="label font-semibold">Berat (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={
                      packageDetails.weight === 0 ? "" : packageDetails.weight
                    }
                    onChange={handlePackageDetailsChange}
                    className="input input-sm input-bordered"
                    placeholder="Masukkan berat barang"
                  />
                </div>

                {/* Dimensions */}
                <div className="form-control">
                  <label className="label font-semibold">Dimensi</label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Length */}
                    <input
                      type="number"
                      name="length"
                      value={
                        packageDetails.length === 0 ? "" : packageDetails.length
                      }
                      onChange={handlePackageDetailsChange}
                      className="input input-sm input-bordered"
                      placeholder="Panjang (cm)"
                    />
                    {/* Width */}
                    <input
                      type="number"
                      name="width"
                      value={
                        packageDetails.width === 0 ? "" : packageDetails.width
                      }
                      onChange={handlePackageDetailsChange}
                      className="input input-sm input-bordered"
                      placeholder="Lebar (cm)"
                    />
                    {/* Height */}
                    <input
                      type="number"
                      name="height"
                      value={
                        packageDetails.height === 0 ? "" : packageDetails.height
                      }
                      onChange={handlePackageDetailsChange}
                      className="input  input-sm input-bordered"
                      placeholder="Tinggi (cm)"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {progressStep === 4 && (
            <div className={isFullscreen && "w-1/2 mx-auto"}>
              <div className="mt-5 border rounded-lg p-4 space-y-4">
                <p className="text-lg font-bold  mb-3">
                  Lengkapi Data Pengirim
                </p>
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    placeholder="Masukkan nama pengirim"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Alamat
                  </label>
                  <textarea
                    className="textarea textarea-sm textarea-bordered w-full"
                    rows="2"
                    placeholder="Masukkan alamat lengkap pengirim"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    No. HP
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    placeholder="Masukkan nomor HP pengirim"
                  />
                </div>
              </div>
              <div className="mt-5 border rounded-lg p-4 space-y-4">
                <p className="text-lg font-bold  mb-3">
                  Lengkapi Data Penerima
                </p>
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    placeholder="Masukkan nama penerima"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Alamat
                  </label>
                  <textarea
                    className="textarea textarea-sm textarea-bordered w-full"
                    rows="2"
                    placeholder="Masukkan alamat lengkap penerima"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    No. HP
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    placeholder="Masukkan nomor HP penerima"
                  />
                </div>
              </div>
            </div>
          )}
          {progressStep === 5 && (
            <div className="p-4">
              <h3 className="font-bold text-xl mb-6">
                Pilih Jenis Transportasi
              </h3>

              <div className="mt-5 border rounded-lg p-4 space-y-3">
                {/* Dropdown to select transport type */}
                <select
                  className="select select-sm select-bordered w-1/2 mb-5"
                  value={selectedTransport} // Bind the state
                  onChange={(e) => setSelectedTransport(e.target.value)} // Update state on change
                >
                  <option disabled value="">
                    Pilih Jenis Angkutan
                  </option>
                  {jenisAngkutan.map((data, index) => (
                    <option key={index} value={data.data}>
                      {data.name}
                    </option>
                  ))}
                </select>

                {/* Angkutan Darat Content */}
                {selectedTransport === "angkutan_darat" && (
                  <div className="flex flex-wrap justify-around gap-4">
                    {paginatedVehicles.map((data) => (
                      <div
                        className="card bg-base-100 w-96 shadow-xl"
                        key={data.id}
                      >
                        <figure>
                          <img
                            src={data.image}
                            alt={data.name}
                            className="w-full h-48 object-contain"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">
                            {data.name}
                            <div className="badge badge-secondary">NEW</div>
                          </h2>
                          <p>{data.description}</p>
                          <div className="card-actions justify-end">
                            {data.suitable_industries.map((industry, index) => (
                              <div key={index} className="badge badge-outline">
                                {industry}
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSelectVehicle(data.id)}
                            className={`btn mt-4 ${
                              isSelected === data.id
                                ? "bg-green-500 text-white"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {isSelected === data.id ? "Dipilih" : "Pilih"}
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* Pagination controls */}
                    <div className="flex justify-center pt-10">
                      <div className="join">
                        <button
                          type="button"
                          className="join-item btn"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            type="button"
                            key={index}
                            className={`join-item btn ${
                              currentPage === index + 1 ? "btn-active" : ""
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          type="button"
                          className="join-item btn"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Gabungan Content */}
                {selectedTransport === "gabungan" && (
                  <div className="flex flex-wrap justify-around gap-4">
                    {paginatedVehicles.map((data) => (
                      <div
                        className="card bg-base-100 w-96 shadow-xl"
                        key={data.id}
                      >
                        <figure>
                          <img
                            src={data.image}
                            alt={data.name}
                            className="w-full h-48 object-contain"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">
                            {data.name}
                            <div className="badge badge-secondary">NEW</div>
                          </h2>
                          <p>{data.description}</p>
                          <div className="card-actions justify-end">
                            {data.suitable_industries.map((industry, index) => (
                              <div key={index} className="badge badge-outline">
                                {industry}
                              </div>
                            ))}
                          </div>
                          <label className="flex items-center space-x-2 mt-4">
                            <input
                              type="checkbox"
                              checked={multiSelectedVehicles.includes(data.id)}
                              onChange={() => handleMultiSelect(data.id)}
                              className="checkbox"
                            />
                            <span
                              className={`${
                                multiSelectedVehicles.includes(data.id)
                                  ? "text-green-500 font-bold"
                                  : "text-gray-700"
                              }`}
                            >
                              {multiSelectedVehicles.includes(data.id)
                                ? "Dipilih"
                                : "Pilih"}
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                    {/* Pagination controls */}
                    <div className="flex justify-center pt-10">
                      <div className="join">
                        <button
                          type="button"
                          className="join-item btn"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            type="button"
                            key={index}
                            className={`join-item btn ${
                              currentPage === index + 1 ? "btn-active" : ""
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          type="button"
                          className="join-item btn"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {progressStep === 6 && (
            <div className={isFullscreen && "w-1/2 mx-auto"}>
              <h3 className="font-bold text-xl mb-6">Receipt</h3>
              <div className="mt-5 border rounded-lg p-4 space-y-4">
                {/* Display Details */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Industri:</span>
                  <span>{selectedIndustryName || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Metode Pick-Up:</span>
                  <span>
                    {pickupMethod
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()) || "N/A"}
                  </span>
                </div>
                {packaging && (
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Packaging:</span>
                    <span>
                      {packaging
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                        "N/A" ||
                        "N/A"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tujuan:</span>
                  <span>{packageDetails.destination || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Nama Barang:</span>
                  <span>{packageDetails.itemName || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Berat:</span>
                  <span>{packageDetails.weight || 0} kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Dimensi (P x L x T):</span>
                  <span>
                    {packageDetails.length || 0} cm x{" "}
                    {packageDetails.width || 0} cm x{" "}
                    {packageDetails.height || 0} cm
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Jenis Transportasi:</span>
                  <span>{selectedTransportName || "N/A"}</span>
                </div>

                {/* Price Calculation */}
                <div className="divider"></div>
                <h4 className="font-bold text-lg">Perhitungan Harga</h4>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Berat (kg):</span>
                  <span>
                    Rp {(packageDetails.weight * 5000).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Dimensi (cm³):</span>
                  <span>
                    Rp{" "}
                    {(
                      packageDetails.length *
                      packageDetails.width *
                      packageDetails.height *
                      0.01
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-primary">
                    Rp {price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-end mt-4">
                <button onClick={handleNext} className="btn btn-primary">
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
          {progressStep === 7 && (
            <div
              className={`${
                isFullscreen ? "w-1/2 mx-auto" : "w-full"
              } space-y-6`}
            >
              <h3 className="font-bold text-2xl mb-6 text-center">
                Pilih Metode Pembayaran
              </h3>

              {/* Price Display */}
              <div className="p-4 bg-gray-100 rounded-lg border">
                <h4 className="text-lg font-semibold">Ringkasan Pembayaran</h4>
                <div className="flex justify-between items-center mt-3">
                  <span>Total Harga:</span>
                  <span className="text-xl font-bold text-green-600">
                    Rp {price.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Payment Type Selection */}
              <div className="mt-5 border rounded-lg p-6 bg-white space-y-6 shadow">
                <div className="flex justify-around">
                  <label className="cursor-pointer flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentType"
                      value="cash"
                      className="radio radio-primary"
                      onChange={() => setSelectedPaymentType("cash")}
                    />
                    <span className="font-semibold">Cash</span>
                  </label>
                  <label className="cursor-pointer flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentType"
                      value="credit"
                      className="radio radio-primary"
                      onChange={() => setSelectedPaymentType("credit")}
                    />
                    <span className="font-semibold">Credit</span>
                  </label>
                </div>

                {/* Credit Payment */}
                {selectedPaymentType === "credit" && (
                  <div className="mt-4 space-y-4">
                    <h4 className="font-semibold">Detail Pembayaran Credit</h4>
                    <p>
                      Silakan unduh invoice untuk menyelesaikan pembayaran
                      melalui metode kredit.
                    </p>
                    <button className="btn btn-primary flex items-center space-x-2">
                      <span>Download Invoice</span>
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
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Cash Payment */}
                {selectedPaymentType === "cash" && (
                  <div className="mt-4 space-y-6">
                    <h4 className="font-semibold">Metode Pembayaran Cash</h4>
                    <select
                      className="select select-bordered w-full"
                      defaultValue=""
                      onChange={(e) => setSelectedCashOption(e.target.value)}
                    >
                      <option value="" disabled>
                        Pilih Metode Pembayaran
                      </option>
                      <option value="pospay">Pospay</option>
                      <option value="va">Virtual Account</option>
                      <option value="transfer">Transfer Bank</option>
                      <option value="credit_card">Kartu Kredit</option>
                    </select>

                    {/* Conditional Payment Options */}
                    {selectedCashOption === "pospay" && (
                      <div className="p-4 bg-gray-50 border rounded-lg">
                        <p>
                          <span className="font-semibold">Pospay VA:</span>{" "}
                          <strong>1234567890</strong>
                        </p>
                      </div>
                    )}

                    {selectedCashOption === "va" && (
                      <div className="p-4 bg-gray-50 border rounded-lg">
                        <p>
                          <span className="font-semibold">BCA VA:</span>{" "}
                          <strong>0987654321</strong>
                        </p>
                      </div>
                    )}

                    {selectedCashOption === "transfer" && (
                      <div className="space-y-3">
                        <p>Pilih Bank untuk Transfer:</p>
                        <select className="select select-bordered w-full">
                          <option value="bank1">Bank 1</option>
                          <option value="bank2">Bank 2</option>
                          <option value="bank3">Bank 3</option>
                        </select>
                        <p>
                          <span className="font-semibold">
                            Transfer Total: Rp {price.toLocaleString("id-ID")}
                          </span>{" "}
                        </p>
                      </div>
                    )}

                    {selectedCashOption === "credit_card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block font-bold mb-1">
                            Nomor Kartu Kredit
                          </label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Masukkan nomor kartu kredit"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">VCC</label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Masukkan VCC"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button type="button" className="btn btn-success w-full">
                  Konfirmasi Pembayaran
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-2">
            {progressStep > 1 && (
              <button onClick={handleBack} className="btn btn-sm btn-neutral">
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="btn btn-sm btn-primary ml-auto"
            >
              {progressStep < 7 ? "Next" : "Finish"}
            </button>
          </div>
        </form>
      </div>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal modal-open">
          <div className="modal-box flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12a9.75 9.75 0 1117.82 5.757L22.031 21a.75.75 0 01-1.061 1.061l-2.427-2.426a9.75 9.75 0 01-16.293-7.635zm9.5 3.751l4.784-4.784a.75.75 0 011.061 1.06l-5.314 5.314a.75.75 0 01-1.061 0l-2.272-2.272a.75.75 0 111.061-1.06l1.742 1.742z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-bold text-lg mt-3">Order Success</h3>
            <p className="mt-2">Your order has been successfully processed!</p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EndToEndLogistics;
