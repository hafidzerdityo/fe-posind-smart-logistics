import React, { useState } from "react";

const SignUpModal = ({ setIsLoginModalOpen, setIsSignUpModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Form data:", formData);
      setIsModalOpen(false); // Close the modal on successful submit
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Modal */}
        <dialog open className="modal z-2">
          <form onSubmit={handleSubmit} className="modal-box p-10">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">Sign Up</h3>

              <button
                type="button"
                onClick={() => setIsSignUpModalOpen(false)}
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
            <p className="py-4">Create an account to get started.</p>

            <div className="mb-2">
              <label className="text-sm text-gray-600" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="text-sm text-gray-600" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="input input-bordered w-full"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="text-sm text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => {
                  if (!emailRegex.test(formData.email)) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      email: "Invalid email format",
                    }));
                  } else {
                    setErrors((prevErrors) => {
                      const { email, ...rest } = prevErrors;
                      return rest;
                    });
                  }
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-2">
              <label className="text-sm text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="label">
              <span className="label-text-alt">
                Sudah Punya Akun?
                <a
                  className="text-primary cursor-pointer"
                  onClick={handleLogin}
                >
                  Login
                </a>
              </span>
            </div>

            <div className="flex mt-4">
              <button type="submit" className="btn btn-primary ml-auto">
                Sign Up
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default SignUpModal;
