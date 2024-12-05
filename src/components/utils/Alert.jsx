import React, { useEffect } from "react";

const Alert = ({ type, text, setError }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 1000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [setError]);

  return (
    <>
      {type === "error" && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setError(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{text}</span>
        </div>
      )}
    </>
  );
};

export default Alert;
