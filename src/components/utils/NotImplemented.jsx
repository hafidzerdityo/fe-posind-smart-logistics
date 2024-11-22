import React from "react";

const NotImplemented = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {/* Modal */}
        <dialog open className="modal z-2">
          <div className="modal-box p-10">
            <div className="flex items-center justify-center h-screen bg-base-200">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-error mb-4">404</h1>
                <p className="text-2xl">Page not found</p>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default NotImplemented;
