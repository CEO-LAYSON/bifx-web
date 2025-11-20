import React from "react";
import { BookOpen, Search, User, BarChart3 } from "lucide-react";

const EmptyState = ({ title, message, icon = "book", action, actionText }) => {
  const getIcon = () => {
    const icons = {
      book: BookOpen,
      search: Search,
      user: User,
      chart: BarChart3,
    };
    const IconComponent = icons[icon] || BookOpen;
    return <IconComponent className="h-12 w-12 text-gray-500" />;
  };

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">{getIcon()}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mx-auto mb-6">{message}</p>
      {action && (
        <button
          onClick={action}
          className="bg-primary-purple text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
