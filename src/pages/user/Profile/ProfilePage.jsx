import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  BookOpen,
  Settings,
  Bell,
  Shield,
  Download,
  ChevronRight,
  Star,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Edit3,
  Camera,
  CheckCircle,
  X,
} from "lucide-react";
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

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      earned: true,
      icon: "🎯",
    },
    {
      id: 2,
      title: "Course Completer",
      description: "Complete your first course",
      earned: true,
      icon: "🏆",
    },
    {
      id: 3,
      title: "Consistent Learner",
      description: "7-day learning streak",
      earned: false,
      icon: "🔥",
    },
    {
      id: 4,
      title: "Quiz Master",
      description: "Score 100% on 5 quizzes",
      earned: false,
      icon: "⭐",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Completed lesson",
      item: "Introduction to Forex",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      id: 2,
      action: "Started course",
      item: "Technical Analysis",
      time: "1 day ago",
      icon: BookOpen,
      color: "text-blue-400",
    },
    {
      id: 3,
      action: "Earned achievement",
      item: "First Steps",
      time: "3 days ago",
      icon: Award,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/20 via-blue-500/10 to-cyan-500/10 animate-gradient"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative glass rounded-2xl p-8 border border-white/10">
          <div className="flex items-start gap-6 flex-wrap">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-purple via-blue-500 to-cyan-400 p-1">
                <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-white">
                      {user?.fullName?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg">
                <Camera size={14} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-[200px]">
              <h1 className="text-3xl font-bold text-white mb-2 animate-fade-up">
                {user?.fullName || "User"}
              </h1>
              <p
                className="text-gray-300 mb-4 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {user?.email || "user@example.com"}
              </p>
              <div
                className="flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-purple/20 rounded-full border border-primary-purple/30">
                  <Award className="w-4 h-4 text-primary-purple" />
                  <span className="text-primary-purple text-sm font-medium">
                    Pro Member
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-gold/10 rounded-full border border-primary-gold/20">
                  <Star className="w-4 h-4 text-primary-gold" />
                  <span className="text-primary-gold text-sm font-medium">
                    Top Learner
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">
                  {profileStats.completedCourses}
                </p>
                <p className="text-gray-400 text-sm">Completed</p>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">
                  {profileStats.completedLessons}
                </p>
                <p className="text-gray-400 text-sm">Lessons</p>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">
                  {profileStats.enrolledCourses}
                </p>
                <p className="text-gray-400 text-sm">Enrolled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-purple/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-purple" />
                </div>
                Basic Information
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="hover:bg-primary-purple/10"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary-purple/30 transition-all">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={user?.fullName}
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="text-white text-lg font-medium">
                    {user?.fullName}
                  </p>
                )}
              </div>

              <div className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary-purple/30 transition-all">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <p className="text-white text-lg font-medium flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary-purple" />
                  {user?.email}
                </p>
              </div>

              <div className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary-purple/30 transition-all">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Phone Number
                </label>
                <p className="text-white text-lg font-medium flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary-purple" />
                  {user?.phone || "Not provided"}
                </p>
              </div>

              <div className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary-purple/30 transition-all">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Member Since
                </label>
                <p className="text-white text-lg font-medium flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-purple" />
                  {new Date(profileStats.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-white/10">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button variant="primary" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Account Settings */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-400" />
              </div>
              Account Settings
            </h2>

            <div className="space-y-4">
              {[
                {
                  icon: Bell,
                  title: "Email Notifications",
                  description:
                    "Receive updates about your courses and progress",
                  color: "from-yellow-500 to-orange-500",
                  toggle: true,
                },
                {
                  icon: Shield,
                  title: "Two-Factor Authentication",
                  description: "Add an extra layer of security to your account",
                  color: "from-green-500 to-emerald-500",
                  action: "Enable",
                },
                {
                  icon: Download,
                  title: "Download Your Data",
                  description: "Export all your learning data and progress",
                  color: "from-purple-500 to-pink-500",
                  action: "Download",
                },
              ].map(
                (
                  { icon: Icon, title, description, color, toggle, action },
                  index,
                ) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all hover-lift"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${color}/20 rounded-xl flex items-center justify-center`}
                      >
                        <Icon
                          className={`w-5 h-5 bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{title}</h3>
                        <p className="text-gray-400 text-sm">{description}</p>
                      </div>
                    </div>
                    {toggle && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-purple peer-checked:to-blue-500"></div>
                      </label>
                    )}
                    {action && (
                      <Button variant="outline" size="sm">
                        {action}
                      </Button>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Statistics Sidebar */}
        <div className="space-y-6">
          {/* Learning Progress */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-gold/20 to-yellow-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-gold" />
              </div>
              Learning Progress
            </h2>

            {/* Circular Progress */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${
                      (profileStats.completedLessons /
                        profileStats.totalLessons) *
                      352
                    } 352`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient
                      id="progressGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {Math.round(
                      (profileStats.completedLessons /
                        profileStats.totalLessons) *
                        100,
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Enrolled",
                  value: profileStats.enrolledCourses,
                  icon: BookOpen,
                  color: "text-blue-400",
                },
                {
                  label: "Completed",
                  value: profileStats.completedCourses,
                  icon: Award,
                  color: "text-green-400",
                },
                {
                  label: "Lessons",
                  value: profileStats.totalLessons,
                  icon: Target,
                  color: "text-purple-400",
                },
                {
                  label: "Finished",
                  value: profileStats.completedLessons,
                  icon: CheckCircle,
                  color: "text-primary-gold",
                },
              ].map(({ label, value, icon: Icon, color }, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded-xl border border-white/10 text-center"
                >
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
                  <p className="text-xl font-bold text-white">{value}</p>
                  <p className="text-gray-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-purple/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-purple" />
              </div>
              Achievements
            </h2>

            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-xl border transition-all ${
                    achievement.earned
                      ? "bg-gradient-to-r from-primary-purple/10 to-blue-500/10 border-primary-purple/30"
                      : "bg-white/5 border-white/10 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium">
                        {achievement.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              Recent Activity
            </h2>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center mt-0.5`}
                  >
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs truncate">
                      {activity.item}
                    </p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              Quick Actions
            </h2>

            <div className="space-y-3">
              {[
                {
                  icon: BookOpen,
                  label: "Browse Courses",
                  color: "text-blue-400",
                  borderColor: "border-blue-500/30",
                },
                {
                  icon: Download,
                  label: "Download Certificate",
                  color: "text-primary-gold",
                  borderColor: "border-primary-gold/30",
                },
                {
                  icon: Award,
                  label: "View Certificates",
                  color: "text-purple-400",
                  borderColor: "border-purple-500/30",
                },
              ].map(({ icon: Icon, label, color, borderColor }, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start border ${borderColor} hover:bg-white/5`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${color}`} />
                  {label}
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-500" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
