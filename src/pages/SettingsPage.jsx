import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
  Check,
  ChevronRight,
} from "lucide-react";
import Button from "../components/ui/Button";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  const ProfileSettings = () => (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-yellow-500/30 hover:shadow-[0_0_40px_rgba(255,215,0,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full" />
            Profile Picture
          </h3>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-1 shadow-[0_0_30px_rgba(255,215,0,0.4)] group-hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] transition-shadow duration-500">
                <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center overflow-hidden">
                  <User className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <Camera className="w-4 h-4 text-black" />
              </div>
            </div>
            <div>
              <Button
                variant="primary"
                size="sm"
                className="relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Change Picture</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </Button>
              <p className="text-sm text-gray-400 mt-2">
                JPG, GIF or PNG. Max size 2MB.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "First Name", value: "John", type: "text" },
              { label: "Last Name", value: "Doe", type: "text" },
              { label: "Email", value: "john.doe@example.com", type: "email" },
              { label: "Phone", value: "+1 (555) 123-4567", type: "tel" },
            ].map((field, idx) => (
              <div key={idx} className="relative group/input">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-hover/input:text-purple-300 transition-colors">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-pink-500/30 hover:shadow-[0_0_40px_rgba(236,72,153,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full" />
            Bio
          </h3>
          <textarea
            rows={4}
            defaultValue="Experienced forex trader with 5+ years in the market. Passionate about teaching others the fundamentals of successful trading."
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300 resize-none"
          />
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      {[
        {
          title: "Email Notifications",
          icon: Bell,
          gradient: "from-blue-500 to-cyan-500",
          items: [
            {
              label: "Course updates",
              description: "New lessons, assignments, and course announcements",
            },
            {
              label: "Live session reminders",
              description: "Notifications before scheduled live sessions",
            },
            {
              label: "Assignment deadlines",
              description: "Reminders for upcoming assignment due dates",
            },
            {
              label: "Progress reports",
              description: "Weekly progress summaries and achievements",
            },
            {
              label: "Marketing emails",
              description: "Promotional content and platform updates",
            },
          ],
        },
        {
          title: "Push Notifications",
          icon: Bell,
          gradient: "from-purple-500 to-pink-500",
          items: [
            {
              label: "Live session notifications",
              description: "Real-time alerts for live sessions",
            },
            {
              label: "Assignment reminders",
              description: "Notifications for assignment deadlines",
            },
            {
              label: "Achievement unlocks",
              description: "Celebrate your learning milestones",
            },
          ],
        },
      ].map((section, idx) => (
        <div
          key={idx}
          className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div
                className={`w-1 h-6 bg-gradient-to-b ${section.gradient} rounded-full`}
              />
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors duration-300"
                >
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer group/toggle">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-yellow-500/30 hover:shadow-[0_0_40px_rgba(255,215,0,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full" />
            Change Password
          </h3>
          <div className="space-y-4">
            {[
              { label: "Current Password", type: "password" },
              { label: "New Password", type: "password" },
              { label: "Confirm New Password", type: "password" },
            ].map((field, idx) => (
              <div key={idx} className="relative group/input">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-hover/input:text-yellow-300 transition-colors">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-300"
                />
              </div>
            ))}
            <Button
              variant="primary"
              className="w-full relative overflow-hidden group/btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Update Password
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-green-500/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button
            variant="outline"
            className="relative overflow-hidden group/btn border-green-500/50 hover:border-green-400"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Enable
            </span>
            <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
            Login Sessions
          </h3>
          <div className="space-y-3">
            {[
              {
                device: "Current Session",
                browser: "Chrome on Windows",
                status: "Active now",
                active: true,
              },
              {
                device: "Mobile App",
                browser: "iPhone",
                status: "Last active 2 hours ago",
                active: false,
              },
            ].map((session, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      session.active
                        ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse"
                        : "bg-gray-500"
                    }`}
                  />
                  <div>
                    <p className="text-white font-medium">{session.device}</p>
                    <p className="text-sm text-gray-400">{session.browser}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm ${
                      session.active ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {session.status}
                  </span>
                  {!session.active && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AppearanceSettings = () => (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full" />
            Theme
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Dark",
                active: true,
                gradient: "from-gray-700 to-gray-900",
              },
              {
                name: "Light",
                active: false,
                gradient: "from-gray-100 to-gray-300",
              },
              {
                name: "Auto",
                active: false,
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((theme) => (
              <div
                key={theme.name}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group/theme ${
                  theme.active
                    ? "border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div
                  className={`h-20 rounded-lg bg-gradient-to-br ${
                    theme.gradient
                  } mb-3 flex items-center justify-center ${
                    theme.name === "Light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {theme.name === "Auto" && (
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-purple-500" />
                    </div>
                  )}
                </div>
                <p className="text-white font-medium text-center">
                  {theme.name}
                </p>
                {theme.active && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
            Language
          </h3>
          <div className="relative group/select">
            <select className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 appearance-none cursor-pointer">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );

  const PreferencesSettings = () => (
    <div className="space-y-6">
      {/* Learning Preferences */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-green-500/30 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
            Learning Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Preferred Study Time",
                options: [
                  "Morning (6AM - 12PM)",
                  "Afternoon (12PM - 6PM)",
                  "Evening (6PM - 12AM)",
                  "Night (12AM - 6AM)",
                ],
              },
              {
                label: "Study Duration",
                options: [
                  "15 minutes",
                  "30 minutes",
                  "45 minutes",
                  "1 hour",
                  "2 hours",
                ],
              },
            ].map((select, idx) => (
              <div key={idx} className="relative group/select">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-hover/select:text-green-300 transition-colors">
                  {select.label}
                </label>
                <select className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300 appearance-none cursor-pointer">
                  {select.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-11 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-6 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-pink-500/30 hover:shadow-[0_0_40px_rgba(236,72,153,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full" />
            Privacy Settings
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Show profile to other students",
                description: "Allow others to view your profile",
              },
              {
                label: "Show progress publicly",
                description: "Display your course progress to others",
              },
              {
                label: "Allow direct messages",
                description: "Receive messages from other users",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors duration-300"
              >
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer group/toggle">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "security":
        return <SecuritySettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "preferences":
        return <PreferencesSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[120px] animate-spin"
          style={{ animationDuration: "30s" }}
        />
      </div>

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500/20 via-purple-500/20 to-pink-500/20 p-8 border border-white/10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-purple-500/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)]">
              <Settings className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-300 ml-16">
            Manage your account preferences and platform settings
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 p-4 border border-white/10 backdrop-blur-xl sticky top-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full relative flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-500/20 via-purple-500/20 to-pink-500/20 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl border border-white/20 shadow-[0_0_20px_rgba(255,215,0,0.2)]" />
                    )}
                    <Icon
                      size={20}
                      className={`${
                        isActive
                          ? "text-yellow-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    <span className="font-medium relative z-10">
                      {tab.label}
                    </span>
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 p-6 border border-white/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/3 via-purple-500/3 to-pink-500/3" />
            <div className="relative z-10">{renderContent()}</div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  className="relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.4)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
