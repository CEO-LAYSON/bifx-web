import React from "react";
import { clsx } from "clsx";
import { X } from "lucide-react";

const Alert = ({ type = "info", message, onClose, className = "" }) => {
  if (!message) return null;

  const variants = {
    success: "bg-green-900 border-green-700 text-green-200",
    error: "bg-red-900 border-red-700 text-red-200",
    warning: "bg-yellow-900 border-yellow-700 text-yellow-200",
    info: "bg-blue-900 border-blue-700 text-blue-200",
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between p-4 border rounded-lg",
        variants[type],
        className
      )}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-70 transition-opacity"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
