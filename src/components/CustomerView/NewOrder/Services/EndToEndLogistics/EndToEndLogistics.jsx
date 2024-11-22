import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faTruck,
  faBoxOpen,
  faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";

const EndToEndLogistics = ({ isFullscreen }) => {
  const [progressStep, setProgressStep] = useState(1);
  const [pickupMethod, setPickupMethod] = useState("");
  const [scheduleOption, setScheduleOption] = useState("");

  const [selectedTransport, setSelectedTransport] = useState(""); // Default selection
  const [carouselIndex, setCarouselIndex] = useState(0); // Optional: to control carousel navigation
  const [isSelected, setIsSelected] = useState(false);
  const handleSelectedTransport = (e) => {
    e.preventDefault();
    setSelectedTransport(e.target.value);
  };

  const industriList = [
    {
      name: "Consumer Goods",
      icon: faWarehouse,
      data: "consumer_goods",
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

  const jenisAngkutan = [
    { name: "Angkutan Udara", data: "angkutan_udara" },
    { name: "Angkutan Laut", data: "angkutan_laut" },
    { name: "Angkutan Darat", data: "angkutan_darat" },
  ];
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
    {
      id: "van",
      name: "Van",
      image:
        "https://s.alicdn.com/@sc04/kf/H3ffd4115a1434c57913da54837cf38c1p.jpg_720x720q50.jpg",
      description:
        "Ideal untuk pengiriman banyak dan furnitur / 2,1 x 1,5 x 1,2 Meter hingga 600 kg",
      suitable_industries: ["Furniture", "Wholesale"],
    },
    {
      id: "pickupBak",
      name: "Pickup Bak",
      image:
        "https://www.astra-daihatsu.id/_next/image?url=https%3A%2F%2Fdsoodysseusstprod.blob.core.windows.net%2Fstrapi-media%2Fassets%2Fsys_master_media_h67_hb1_8816880844830_Gran_Max_1f89268cb2.jpg&w=3840&q=75",
      description:
        "Ideal untuk bahan berukuran khusus seperti bahan bangunan / 2 x 1,6 x 1,2 Meter hingga 800 kg",
      suitable_industries: ["Construction", "Agriculture"],
    },
    {
      id: "pickupBox",
      name: "Pickup Box",
      image:
        "https://daihatsupanam.com/wp-content/uploads/2021/03/pickup-box1.jpg",
      description:
        "Ideal untuk barang besar dengan penanganan khusus / 2,4 x 1,6 x 1,2 Meter hingga 1000 kg",
      suitable_industries: ["Logistics", "Manufacturing"],
    },
    {
      id: "engkelBox",
      name: "Engkel Box",
      image:
        "https://isuzu-online.com/wp-content/uploads/2024/01/Mobil-Box-isuzu-Engkel-Long-karoseri-box-besi-baru-scaled.jpg",
      description:
        "Ideal untuk barang besar dan banyak termasuk pindahan / 3,1 x 1,7 x 1,7 Meter hingga 2000 kg",
      suitable_industries: ["Household Moving", "Event Management"],
    },
    {
      id: "engkelBak",
      name: "Engkel Bak",
      image:
        "https://www.lalamove.com/hs-fs/hubfs/ID%20Fleet%202022/420x300_jkt_vehicle-CDD-Bak-new.png?width=500&height=324&name=420x300_jkt_vehicle-CDD-Bak-new.png",
      description:
        "Ideal untuk kiriman besar dan banyak termasuk pindahan rumah / 3,1 x 1,7 x 1,7 Meter hingga 2500 kg",
      suitable_industries: ["Heavy Equipment", "Farm Supplies"],
    },
    {
      id: "cddBak",
      name: "CDD Bak",
      image:
        "https://yosualogistik.co.id/wp-content/uploads/2022/06/5.-Jasa-Sewa-Truk-CDD-Bak-Muatan-Kapasitas-5-Ton-1.jpg",
      description:
        "Ideal untuk kiriman besar dan banyak serta material besar / 4,5 x 2 x 2 hingga 5000 kg",
      suitable_industries: ["Industrial Supplies", "Building Materials"],
    },
    {
      id: "cddBox",
      name: "CDD Box",
      image:
        "https://dpltranslogistics.com/wp-content/uploads/2020/09/Sewa-Truk-Box-Double.jpg",
      description:
        "Ideal untuk kiriman besar dan banyak serta material besar / 4,5 x 2 x 2 hingga 5000 kg",
      suitable_industries: ["Food Delivery", "Pharmaceuticals"],
    },
    {
      id: "heavyTruckOpen",
      name: "Heavy Truck Open",
      image: "https://www.lalamove.com/hubfs/fuso%20truk%20bak-1.png",
      description:
        "Ideal untuk kiriman besar dan barang berat / 5,7 x 2,5 x 2,5 Meter hingga 8000 kg",
      suitable_industries: ["Mining", "Energy"],
    },
  ];

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
            <div
              className={`mb-10 px-3 border rounded-lg p-4 space-y-4 ${
                isFullscreen && "w-1/2 mx-auto"
              }`}
            >
              <label className="block text-sm font-medium mb-5">
                Pilih Industri
              </label>
              <div className="mt-5 ">
                <select
                  className="select select-sm select-bordered w-1/2"
                  defaultValue=""
                >
                  <option disabled value="">
                    Pilih Industri yang tersedia
                  </option>
                  {industriList.map((solution, index) => (
                    <option key={index} value={solution.data}>
                      {solution.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {progressStep === 2 && (
            <div
              className={`mb-10 px-3 border rounded-lg p-4 space-y-4 ${
                isFullscreen && "w-1/2 mx-auto"
              }`}
            >
              <p className="block text-sm font-medium mb-1 ">
                Pilih Metode Kirim
              </p>

              <div className="flex items-center space-x-4 ">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="pickupMethod"
                    value="drop_off"
                    className="radio radio-sm radio-primary mr-2"
                    onChange={() => setPickupMethod("drop_off")}
                  />
                  <span className="text-sm">Drop Off</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="pickupMethod"
                    value="pick_up"
                    className="radio radio-sm radio-primary mr-2"
                    onChange={() => setPickupMethod("pick_up")}
                  />
                  <span className="text-sm">Pick Up</span>
                </label>
              </div>

              {pickupMethod === "drop_off" && (
                <div className="mt-5 border rounded-lg p-4 space-y-3">
                  <label className="block text-sm font-medium mb-1">
                    Pilih Kantor Drop Off
                  </label>
                  <select className="select select-sm select-bordered w-full">
                    <option disabled value="">
                      Pilih Kantor
                    </option>
                    <option value="kantor_1">Kantor 1</option>
                    <option value="kantor_2">Kantor 2</option>
                    <option value="kantor_3">Kantor 3</option>
                  </select>
                </div>
              )}

              {pickupMethod === "pick_up" && (
                <div className="mt-5 border rounded-lg p-4 space-y-4">
                  <p className="text-sm font-medium mb-3">
                    Lengkapi Data Pengirim untuk Pick Up
                  </p>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nama
                    </label>
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

                  {
                    <div className="mt-5">
                      {/* Sekarang or Terjadwal */}
                      <label className="block text-sm font-medium mb-1">
                        Pilih Jadwal
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="scheduleOption"
                            value="sekarang"
                            className="radio radio-sm radio-primary mr-2"
                            onChange={() => setScheduleOption("sekarang")}
                          />
                          <span className="text-sm">Sekarang</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="scheduleOption"
                            value="terjadwal"
                            className="radio radio-sm radio-primary mr-2"
                            onChange={() => setScheduleOption("terjadwal")}
                          />
                          <span className="text-sm">Terjadwal</span>
                        </label>
                      </div>

                      {/* Terjadwal Options */}
                      {scheduleOption === "terjadwal" && (
                        <div className="mt-4 space-y-4 w-1/2">
                          <label className="block text-sm font-medium mb-1 ">
                            Frekuensi
                          </label>
                          <select className="select select-sm select-bordered w-full">
                            <option disabled selected value="">
                              Pilih Frekuensi
                            </option>
                            <option value="daily">Harian</option>
                            <option value="weekly">Mingguan</option>
                            <option value="monthly">Bulanan</option>
                          </select>

                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Di Pick Up Mulai Tanggal:
                            </label>
                            <input
                              type="date"
                              className="input input-sm input-bordered w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Pilih Waktu:
                            </label>
                            <input
                              type="time"
                              className="input input-sm input-bordered w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  }
                </div>
              )}
            </div>
          )}

          {progressStep === 3 && (
            <div
              className={`mb-10 px-3 space-y-4 ${
                isFullscreen && "w-1/2 mx-auto"
              }`}
            >
              <label className="block text-sm font-medium mb-5">
                Detail Kiriman
              </label>

              <div className="mt-5 border rounded-lg p-4 space-y-3">
                {/* Tujuan Pengiriman */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tujuan Pengiriman
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    placeholder="Masukkan tujuan pengiriman"
                  />
                </div>

                {/* Nama Barang */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    className="input input-sm input-bordered w-full"
                    placeholder="Masukkan nama barang"
                  />
                </div>

                {/* Nilai Barang */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nilai Barang
                  </label>
                  <input
                    type="number"
                    className="input input-sm input-bordered w-full"
                    placeholder="Masukkan nilai barang"
                  />
                </div>

                {/* Berat Paket */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Berat Paket (kg)
                  </label>
                  <input
                    type="number"
                    className="input input-sm input-bordered w-full"
                    placeholder="Masukkan berat paket (kg)"
                  />
                </div>

                {/* Dimensi Paket */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1">
                    Dimensi Paket
                  </label>
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Panjang (cm)
                      </label>
                      <input
                        type="number"
                        className="input input-sm input-bordered w-full"
                        placeholder="Panjang"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Lebar (cm)
                      </label>
                      <input
                        type="number"
                        className="input input-sm input-bordered w-full"
                        placeholder="Lebar"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Tinggi (cm)
                      </label>
                      <input
                        type="number"
                        className="input input-sm input-bordered w-full"
                        placeholder="Tinggi"
                      />
                    </div>
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
                {/* Updated onChange for <select> */}
                <select
                  className="select select-sm select-bordered w-1/2 mb-5"
                  defaultValue=""
                  onChange={handleSelectedTransport} // Use onChange here
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

                {/* Vehicle cards with pagination */}
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
                          {/* Select Button */}
                          <button
                            type="button"
                            onClick={handleSelectVehicle}
                            value={data.id}
                            className={`btn mt-4 ${
                              isSelected === data.id
                                ? "bg-green-500 text-white"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {isSelected === data.id ? "Dipilih" : "Pilih"}
                          </button>{" "}
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
          {progressStep === 7 && (
            <div className={isFullscreen && "w-1/2 mx-auto"}>
              <h3 className="font-bold text-xl mb-6">
                Pilih Metode Pembayaran
              </h3>

              {/* Radio Buttons for Payment Type */}
              <div className="mt-5 border rounded-lg p-4 space-y-4">
                <div className="flex space-x-4 mb-6">
                  <label className="cursor-pointer flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentType"
                      value="cash"
                      className="radio radio-primary"
                      onChange={() => setSelectedPaymentType("cash")}
                    />
                    <span>Cash</span>
                  </label>
                  <label className="cursor-pointer flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentType"
                      value="credit"
                      className="radio radio-primary"
                      onChange={() => setSelectedPaymentType("credit")}
                    />
                    <span>Credit</span>
                  </label>
                </div>

                {/* Credit Payment */}
                {selectedPaymentType === "credit" && (
                  <div className="mt-4">
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
                  <div className="mt-4 space-y-4">
                    {/* Select Payment Method */}
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

                    {/* Pospay VA */}
                    {selectedCashOption === "pospay" && (
                      <div className="mt-2">
                        <p>
                          Pospay VA: <strong>1234567890</strong>
                        </p>
                      </div>
                    )}

                    {/* Virtual Account */}
                    {selectedCashOption === "va" && (
                      <div className="mt-2">
                        <p>
                          BCA VA: <strong>0987654321</strong>
                        </p>
                      </div>
                    )}

                    {/* Transfer Bank */}
                    {selectedCashOption === "transfer" && (
                      <div className="mt-2">
                        <select className="select select-bordered w-full">
                          <option value="bank1">Bank 1</option>
                          <option value="bank2">Bank 2</option>
                          <option value="bank3">Bank 3</option>
                        </select>
                      </div>
                    )}

                    {/* Credit Card */}
                    {selectedCashOption === "credit_card" && (
                      <div className="mt-4 space-y-2">
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
    </>
  );
};

export default EndToEndLogistics;
