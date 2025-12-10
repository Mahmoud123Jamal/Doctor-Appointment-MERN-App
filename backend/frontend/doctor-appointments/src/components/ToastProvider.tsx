import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ToastProviderProps } from "../types/ToastType";

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
  autoClose = 5000,
}) => {
  return (
    <>
      {children}
      <ToastContainer
        position={position}
        autoClose={autoClose}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
