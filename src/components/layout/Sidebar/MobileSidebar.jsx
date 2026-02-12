import React from "react";
import { X } from "lucide-react";

const MobileSidebar = ({ isOpen, onClose, sidebarComponent }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with blur */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl">
        {/* Sidebar Content - directly render without extra header */}
        <div className="h-full flex flex-col">
          {/* Close button at top right - single close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="relative p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5 group"
            >
              <div className="absolute inset-0 bg-primary-purple/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <X size={24} className="relative" />
            </button>
          </div>

          {/* Sidebar content - full height */}
          <div className="flex-1 overflow-y-auto -mt-2">{sidebarComponent}</div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
