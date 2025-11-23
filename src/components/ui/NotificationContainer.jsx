import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { removeNotification } from "../../store/slices/uiSlice";

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.ui);

  useEffect(() => {
    const autoRemoveTimers = notifications.map((notification) => {
      if (notification.autoHide !== false) {
        return setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration || 5000);
      }
      return null;
    });

    return () => {
      autoRemoveTimers.forEach((timer) => timer && clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-900/20 border-green-800";
      case "error":
        return "bg-red-900/20 border-red-800";
      case "warning":
        return "bg-yellow-900/20 border-yellow-800";
      default:
        return "bg-blue-900/20 border-blue-800";
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border ${getBackgroundColor(
            notification.type
          )} backdrop-blur-sm transform transition-all duration-300 animate-in slide-in-from-right-full`}
        >
          <div className="flex items-start space-x-3">
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">
                {notification.title}
              </p>
              {notification.message && (
                <p className="text-gray-300 text-sm mt-1">
                  {notification.message}
                </p>
              )}
            </div>
            <button
              onClick={() => dispatch(removeNotification(notification.id))}
              className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
