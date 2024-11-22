import React from "react";

const Korporat = ({
  handleLogin,
  handleSubmit,
  setIsSignUpModalOpen,
  handleInputChange,
  formData,
  errors,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Sign Up - Korporat</h3>
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
            Nama Perusahaan
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
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
            Already have an account?{" "}
            <a className="text-primary cursor-pointer" onClick={handleLogin}>
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
    </>
  );
};

export default Korporat;
