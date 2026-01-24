import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
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
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue="John"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">Bio</h3>
        <textarea
          rows={4}
          defaultValue="Experienced forex trader with 5+ years in the market. Passionate about teaching others the fundamentals of successful trading."
          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>

      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Profile Picture
        </h3>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <Button variant="outline" size="sm">
              Change Picture
            </Button>
            <p className="text-sm text-gray-400 mt-2">
              JPG, GIF or PNG. Max size 2MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          {[
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
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Push Notifications
        </h3>
        <div className="space-y-4">
          {[
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
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button variant="primary">Update Password</Button>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Enable 2FA</p>
            <p className="text-sm text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button variant="outline">Enable</Button>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Login Sessions
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-600">
            <div>
              <p className="text-white font-medium">Current Session</p>
              <p className="text-sm text-gray-400">
                Chrome on Windows • Active now
              </p>
            </div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium">Mobile App</p>
              <p className="text-sm text-gray-400">
                iPhone • Last active 2 hours ago
              </p>
            </div>
            <Button variant="outline" size="sm">
              Revoke
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const AppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Dark", active: true },
            { name: "Light", active: false },
            { name: "Auto", active: false },
          ].map((theme) => (
            <div
              key={theme.name}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                theme.active
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <p className="text-white font-medium text-center">{theme.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
        <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  );

  const PreferencesSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
          Learning Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Study Time
            </label>
            <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option>Morning (6AM - 12PM)</option>
              <option>Afternoon (12PM - 6PM)</option>
              <option>Evening (6PM - 12AM)</option>
              <option>Night (12AM - 6AM)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Study Duration
            </label>
            <select className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-4">
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
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-6 border border-purple-700">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-300">
          Manage your account preferences and platform settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            {renderContent()}
            <div className="mt-8 pt-6 border-t border-gray-600">
              <Button variant="primary" className="flex items-center space-x-2">
                <Save size={18} />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
