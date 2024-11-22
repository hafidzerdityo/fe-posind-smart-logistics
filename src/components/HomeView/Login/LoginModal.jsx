import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setIsLoginModalOpen, setIsSignUpModalOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === "admin" && formData.password === "admin") {
      navigate("/customer");
    } else {
      console.log("Kredensial tidak valid");
    }
  };

  const handleDaftar = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Modal */}
        <dialog open className="modal z-2">
          <div className="modal-box p-10">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Masuk</h3>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="btn btn-square"
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
            <p className="py-4">
              Silakan masukkan kredensial Anda untuk masuk.
            </p>

            {/* Form Start */}
            <form onSubmit={handleSubmit}>
              {/* Username Input */}
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  name="username"
                  className="grow"
                  placeholder="Nama Pengguna"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </label>

              {/* Password Input */}
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="password"
                  className="grow"
                  placeholder="Kata Sandi"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>

              {/* Sign up prompt */}
              <div className="label">
                <span className="label-text-alt">
                  Belum punya akun?{" "}
                  <a
                    className="text-primary cursor-pointer"
                    onClick={handleDaftar}
                  >
                    Daftar
                  </a>
                </span>
              </div>

              {/* Submit Button */}
              <div className="flex mt-4">
                <button type="submit" className="btn btn-primary ml-auto">
                  Masuk
                </button>
              </div>
            </form>
            {/* Form End */}
          </div>
        </dialog>
      </div>
    </>
  );
};

export default LoginModal;
