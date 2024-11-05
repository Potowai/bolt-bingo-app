import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  gifUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, gifUrl }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-orange-500/30 p-8 border border-orange-500/30 z-10 transform transition-all duration-300 scale-100 hover:scale-105">
              <div className="flex justify-end">
                <button
                  className="text-gray-400 hover:text-gray-600 focus:outline-none mb-3"
                  onClick={onClose}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <span className="text-4xl font-bold text-orange-500 font-serif">
                  Vous avez gagné le bingo!
                </span>
                <div className="flex justify-center">
                  <img src={gifUrl} alt="GIF" className="max-w-full rounded-lg border-4 border-orange-500/30" />
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-gray-900 opacity-80 backdrop-blur-3xl"></div>
        </div>
      )}
    </>
  );
};

export default Modal;
