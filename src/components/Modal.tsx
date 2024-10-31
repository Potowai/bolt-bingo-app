import React, { useState } from 'react';

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
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-lg shadow-orange-500/20 p-6 border border-orange-500/20 z-10">
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
              <div className="justify-center">
                <span className='text-orange-500 text-xl font-semibold mb-3'>Vous avez gagné le bingo</span>
                <div>
                <img src={gifUrl} alt="GIF" className="max-w-full rounded" />
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
