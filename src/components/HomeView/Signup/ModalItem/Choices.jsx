import React from "react";

const Choices = ({ setIsSignUpModalOpen, setUserType, setStep }) => {
  return (
    <>
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
      <p className="py-4">Pilih antara Individu/Korporat</p>
      <div className="flex justify-center gap-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            setUserType("individu");
            setStep("individu");
          }}
        >
          Individu
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setUserType("korporat");
            setStep("korporat");
          }}
        >
          Korporat
        </button>
      </div>
    </>
  );
};

export default Choices;
