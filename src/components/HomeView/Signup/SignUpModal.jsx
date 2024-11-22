import React, { useState } from "react";

import Choices from "./ModalItem/Choices";
import Individual from "./ModalItem/individual";
import Korporat from "./ModalItem/Korporat";

const SignUpModal = ({ setIsLoginModalOpen, setIsSignUpModalOpen }) => {
  const [step, setStep] = useState("select"); // Step: 'select' or 'form'
  const [userType, setUserType] = useState(null); // 'Individu' or 'Korporat'
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
      setIsSignUpModalOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Modal */}
        <dialog open className="modal z-2">
          <div className="modal-box p-10">
            {step === "select" && (
              <Choices
                setIsSignUpModalOpen={setIsSignUpModalOpen}
                setUserType={setUserType}
                setStep={setStep}
              />
            )}

            {step === "individu" && (
              <Individual
                handleSubmit={handleSubmit}
                handleLogin={handleLogin}
                setIsSignUpModalOpen={setIsSignUpModalOpen}
                formData={formData}
                errors={errors}
              />
            )}

            {step === "korporat" && (
              <Korporat
                handleSubmit={handleSubmit}
                handleLogin={handleLogin}
                setIsSignUpModalOpen={setIsSignUpModalOpen}
                formData={formData}
                errors={errors}
              />
            )}
          </div>
        </dialog>
      </div>
    </>
  );
};

export default SignUpModal;
