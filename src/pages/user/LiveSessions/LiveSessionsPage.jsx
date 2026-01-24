import React, { useState, useEffect } from "react";
import { Video, Calendar, Users, Play } from "lucide-react";
import Button from "../../../components/ui/Button";
import { liveMeetingAPI } from "../../../services/api/liveMeetingAPI";
import { format } from "date-fns";

const LiveSessionsPage = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveSessions = async () => {
      try {
        setLoading(true);
        const [upcomingResponse, allMeetingsResponse] = await Promise.all([
          liveMeetingAPI.getUpcomingMeetings(),
          liveMeetingAPI.getLiveMeetings(),
        ]);

        // Assuming the API returns meetings with scheduledAt field
        const now = new Date();
        const upcoming = upcomingResponse.data.filter(
          (meeting) => new Date(meeting.scheduledAt) > now,
        );
        const past = allMeetingsResponse.data.filter(
          (meeting) => new Date(meeting.scheduledAt) <= now,
        );

        setUpcomingSessions(upcoming);
        setPastSessions(past);
      } catch (err) {
        setError("Failed to load live sessions");
        console.error("Error fetching live sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveSessions();
  }, []);

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

        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600 animate-pulse"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-600 rounded w-48"></div>
                    <div className="h-4 bg-gray-600 rounded w-32"></div>
                  </div>
                  <div className="h-8 bg-gray-600 rounded w-24"></div>
                </div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-600 rounded w-24"></div>
                  <div className="h-4 bg-gray-600 rounded w-16"></div>
                  <div className="h-4 bg-gray-600 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
          </div>
        ) : upcomingSessions.length === 0 ? (
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
                      Instructor: {session.instructorName || "Instructor"}
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
                    {session.scheduledAt
                      ? format(
                          new Date(session.scheduledAt),
                          "MMM dd, yyyy 'at' HH:mm",
                        )
                      : "TBD"}
                  </div>
                  <div>{session.duration || "60 min"}</div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {session.participantsCount || 0}/
                    {session.maxParticipants || 100}
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

        {loading ? (
          <div className="space-y-4">
            {[...Array(1)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600 animate-pulse"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-600 rounded w-48"></div>
                    <div className="h-4 bg-gray-600 rounded w-32"></div>
                  </div>
                  <div className="h-8 bg-gray-600 rounded w-32"></div>
                </div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-600 rounded w-24"></div>
                  <div className="h-4 bg-gray-600 rounded w-16"></div>
                  <div className="h-4 bg-gray-600 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : pastSessions.length === 0 ? (
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
                      Instructor: {session.instructorName || "Instructor"}
                    </p>
                  </div>
                  {session.recordingUrl && (
                    <Button variant="outline" size="sm">
                      <Play size={16} className="mr-2" />
                      Watch Recording
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {session.scheduledAt
                      ? format(
                          new Date(session.scheduledAt),
                          "MMM dd, yyyy 'at' HH:mm",
                        )
                      : "TBD"}
                  </div>
                  <div>{session.duration || "60 min"}</div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {session.participantsCount || 0} watched
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
