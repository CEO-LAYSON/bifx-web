import React from "react";
import { Video, Calendar, Users, Play } from "lucide-react";
import Button from "../../../components/ui/Button";

const LiveSessionsPage = () => {
  // Mock data - replace with actual API calls
  const upcomingSessions = [
    {
      id: 1,
      title: "Live Forex Trading Session",
      instructor: "John Doe",
      date: "2025-11-25",
      time: "14:00",
      duration: "60 min",
      participants: 45,
      maxParticipants: 100,
    },
    {
      id: 2,
      title: "Advanced Technical Analysis",
      instructor: "Jane Smith",
      date: "2025-11-27",
      time: "16:00",
      duration: "90 min",
      participants: 32,
      maxParticipants: 50,
    },
  ];

  const pastSessions = [
    {
      id: 3,
      title: "Introduction to Forex Markets",
      instructor: "Mike Johnson",
      date: "2025-11-20",
      time: "15:00",
      duration: "45 min",
      participants: 78,
      recordingUrl: "#",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 rounded-xl p-6 border border-purple-700">
        <h1 className="text-3xl font-bold text-white mb-2">Live Sessions</h1>
        <p className="text-gray-300">
          Join live interactive sessions with expert instructors
        </p>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Calendar className="mr-2" size={24} />
          Upcoming Sessions
        </h2>

        {upcomingSessions.length === 0 ? (
          <div className="text-center py-8">
            <Video className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No upcoming live sessions</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {session.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Instructor: {session.instructor}
                    </p>
                  </div>
                  <Button variant="primary" size="sm">
                    <Play size={16} className="mr-2" />
                    Join Live
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {session.date} at {session.time}
                  </div>
                  <div>{session.duration}</div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {session.participants}/{session.maxParticipants}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Sessions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Past Sessions</h2>

        {pastSessions.length === 0 ? (
          <div className="text-center py-8">
            <Video className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No past sessions available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <div
                key={session.id}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {session.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Instructor: {session.instructor}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Play size={16} className="mr-2" />
                    Watch Recording
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {session.date} at {session.time}
                  </div>
                  <div>{session.duration}</div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {session.participants} watched
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSessionsPage;
