import React from "react";
import { X } from "lucide-react";

const MobileSidebar = ({ isOpen, onClose, sidebarComponent }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-purple rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">BIFX</span>
            </div>
            <span className="text-white font-bold text-lg">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="h-full overflow-y-auto">{sidebarComponent}</div>
      </div>
    </>
  );
};

export default MobileSidebar;
