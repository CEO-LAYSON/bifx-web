import React, { useState } from "react";
import { useSelector } from "react-redux";
import { User, Mail, Phone, Calendar, Award, BookOpen } from "lucide-react";
import Button from "../../../components/ui/Button";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  // Mock additional data - replace with API calls
  const profileStats = {
    enrolledCourses: 3,
    completedCourses: 1,
    totalLessons: 45,
    completedLessons: 12,
    joinDate: "2025-01-15",
    lastActive: "2025-11-22",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 rounded-xl p-6 border border-purple-700">
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-gray-300">
          Manage your account information and view your learning statistics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <User className="mr-2" size={24} />
                Basic Information
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user?.fullName}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                  ) : (
                    <p className="text-white text-lg">{user?.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <p className="text-white text-lg flex items-center">
                    <Mail className="mr-2" size={18} />
                    {user?.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone
                  </label>
                  <p className="text-white text-lg flex items-center">
                    <Phone className="mr-2" size={18} />
                    {user?.phone || "Not provided"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Member Since
                  </label>
                  <p className="text-white text-lg flex items-center">
                    <Calendar className="mr-2" size={18} />
                    {new Date(profileStats.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm">
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">
              Account Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">
                    Email Notifications
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Receive updates about your courses
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Sidebar */}
        <div className="space-y-6">
          {/* Learning Stats */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Award className="mr-2" size={24} />
              Learning Statistics
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Enrolled Courses</span>
                <span className="text-white font-bold text-lg">
                  {profileStats.enrolledCourses}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completed Courses</span>
                <span className="text-white font-bold text-lg">
                  {profileStats.completedCourses}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Lessons</span>
                <span className="text-white font-bold text-lg">
                  {profileStats.totalLessons}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completed Lessons</span>
                <span className="text-white font-bold text-lg">
                  {profileStats.completedLessons}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-gold mb-1">
                    {Math.round(
                      (profileStats.completedLessons /
                        profileStats.totalLessons) *
                        100
                    )}
                    %
                  </div>
                  <div className="text-gray-400 text-sm">Overall Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2" size={18} />
                Browse Courses
              </Button>

              <Button variant="outline" className="w-full justify-start">
                Download Certificate
              </Button>

              <Button variant="outline" className="w-full justify-start">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
