import React from "react";

const ServicesCard = () => {
  return (
    <>
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-xl font-extrabold text-center text-dark">
          Specific Services and Capabilities
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Customizable Logistics */}
        <div className="card bg-base-100 w-full shadow-xl rounded-md">
          <div className="card-body">
            <div>
              <h2 className="card-title font-bold text-sm">
                Kostumisasi Logistik
              </h2>
            </div>
            <ul className="text-sm list-disc list-inside">
              <li>Pesan Sesuai Kebutuhan</li>
              <li>Real-Time Tracker</li>
              <li>Integrasi Logistik</li>
            </ul>
          </div>
        </div>

        {/* Fitur Operasional */}
        <div className="card bg-base-100 w-full shadow-xl rounded-md">
          <div className="card-body">
            <div>
              <h2 className="card-title font-bold text-sm">
                Fitur Operasional
              </h2>
            </div>
            <ul className="text-sm list-disc list-inside">
              <li>Penyimpanan, Pengambilan, Pengemasan, dan Pengiriman</li>
              <li>Pemrosesan Pesanan dan E-Fulfillment</li>
              <li>Manajemen Pengiriman dan Pengembalian Barang</li>
              <li>Dashboard Management System</li>
            </ul>
          </div>
        </div>

        {/* Keahlian dalam Manajemen Rantai Pasok */}
        <div className="card bg-base-100 w-full shadow-xl rounded-md">
          <div className="card-body">
            <div>
              <h2 className="card-title font-bold text-sm">
                Keahlian dalam Manajemen Rantai Pasok
              </h2>
            </div>
            <ul className="text-sm list-disc list-inside">
              <li>Implementasi Sistem OMS dan WMS</li>
              <li>Kontrol dan Visibilitas Real-Time</li>
              <li>Manajemen Inventori</li>
              <li>Pemrosesan Pesanan dan E-Fulfillment</li>
              <li>Manajemen Pembayaran Terintegrasi</li>
              <li>Dukungan Pelanggan 24/7</li>
              <li>Layanan Pengemasan Khusus</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesCard;
