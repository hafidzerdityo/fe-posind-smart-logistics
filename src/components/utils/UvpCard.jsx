import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faEye,
  faRobot,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";

const UvpCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Customizable Logistics */}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <div>
              <FontAwesomeIcon
                icon={faCogs}
                className="text-primary text-2xl mb-2"
              />
              <h2 className="card-title font-bold text-lg">
                Kostumisasi Logistik
              </h2>
            </div>
            <p className="text-sm text-justify">
              PSL menawarkan layanan logistik yang sepenuhnya dapat disesuaikan
              dengan kebutuhan bisnis Anda, mulai dari jadwal pengiriman hingga
              pengemasan khusus. Kami hadir untuk mendukung dinamika bisnis Anda
              dengan fleksibilitas tinggi dan nilai tambah di setiap pengiriman.
            </p>
          </div>
        </div>

        {/* Full Visibility */}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <div>
              <FontAwesomeIcon
                icon={faEye}
                className="text-primary text-2xl mb-2"
              />
              <h2 className="card-title font-bold text-lg">
                Visibilitas Penuh Terhadap Pesanan Anda
              </h2>
            </div>
            <p className="text-sm text-justify">
              PLASTIK memberikan transparansi penuh dengan fitur pelacakan
              real-time, memastikan Anda selalu tahu posisi barang Anda kapan
              pun, di mana pun.
            </p>
          </div>
        </div>

        {/* LLM-Based Support */}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <div>
              <FontAwesomeIcon
                icon={faRobot}
                className="text-primary text-2xl mb-2"
              />
              <h2 className="card-title font-bold text-lg">
                LLM Based Logistics
              </h2>
            </div>
            <p className="text-sm text-justify">
              PLASTIK menyediakan BOT pintar berbasis LLM untuk membantu dalam
              pengecekan tarif dan pemesanan, membuat layanan logistik lebih
              efisien dan mudah diakses kapan saja.
            </p>
          </div>
        </div>

        {/* AI-Based Logistics */}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <div>
              <FontAwesomeIcon
                icon={faBrain}
                className="text-primary text-2xl mb-2"
              />
              <h2 className="card-title font-bold text-lg">
                Artificial Intelligence Based Logistics
              </h2>
            </div>
            <p className="text-sm text-justify">
              PLASTIK mengintegrasikan AI dan big data untuk meningkatkan
              efisiensi logistik, menghadirkan solusi yang responsif terhadap
              kebutuhan bisnis Anda yang dinamis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UvpCard;
