import React from "react";

const MetodeKirim = ({
  isFullscreen,
  pickupMethod,
  setPickupMethod,
  scheduleOption,
  setScheduleOption,
  packaging,
  setPackaging,
  packagingOptions,
}) => {
  return (
    <>
      <div
        className={`mb-10 px-3 border rounded-lg p-4 space-y-4 ${
          isFullscreen && "w-1/2 mx-auto"
        }`}
      >
        <p className="block text-sm font-medium mb-1 ">Pilih Metode Kirim</p>

        <div className="flex items-center space-x-4 ">
          <label className="flex items-center">
            <input
              type="radio"
              name="pickupMethod"
              value="drop_off"
              className="radio radio-sm radio-primary mr-2"
              onChange={(e) => setPickupMethod(e.target.value)}
            />
            <span className="text-sm">Drop Off</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="pickupMethod"
              value="pick_up"
              className="radio radio-sm radio-primary mr-2"
              onChange={(e) => setPickupMethod(e.target.value)}
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
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input
                type="text"
                className="input input-sm input-bordered w-full"
                placeholder="Masukkan nama pengirim"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alamat</label>
              <textarea
                className="textarea textarea-sm textarea-bordered w-full"
                rows="2"
                placeholder="Masukkan alamat lengkap pengirim"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">No. HP</label>
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
                    {/* <label className="block text-sm font-medium mb-1 ">
                Frekuensi
              </label>
              <select className="select select-sm select-bordered w-full">
                <option disabled selected value="">
                  Pilih Frekuensi
                </option>
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </select> */}

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
        <div className="mt-5 border rounded-lg p-4 space-y-3">
          <label className="block text-sm font-medium mb-1">
            Pilih Packaging (Optional)
          </label>
          <select
            className="select select-sm select-bordered w-full"
            value={packaging}
            onChange={(e) => setPackaging(e.target.value)}
          >
            <option disabled value="">
              Pilih Packaging (Optional)
            </option>
            <option value="">None</option>
            {packagingOptions.map((val, idx) => (
              <option key={idx} value={val.data}>
                {idx + 1}. {val.name}: Rp. {val.price.toLocaleString("id-ID")}
                /kg
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default MetodeKirim;
