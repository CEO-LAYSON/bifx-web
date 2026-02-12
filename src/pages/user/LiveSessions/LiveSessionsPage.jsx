import React, { useState, useEffect } from "react";
import {
  Video,
  Calendar,
  Users,
  Play,
  Clock,
  Zap,
  Radio,
  History,
  ChevronRight,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import { liveMeetingAPI } from "../../../services/api/liveMeetingAPI";
import { format } from "date-fns";

const LiveSessionsPage = () => {
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchLiveSessions = async () => {
      try {
        setLoading(true);
        const [upcomingResponse, allMeetingsResponse] = await Promise.all([
          liveMeetingAPI.getUpcomingMeetings(),
          liveMeetingAPI.getLiveMeetings(),
        ]);

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

  const getTimeUntilSession = (scheduledAt) => {
    const now = new Date();
    const sessionTime = new Date(scheduledAt);
    const diff = sessionTime - now;

    if (diff <= 0) return "Starting now";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10 animate-gradient"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative glass rounded-2xl p-8 border border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 animate-fade-up">
                <span className="text-gradient bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
                  Live Sessions
                </span>
              </h1>
              <p
                className="text-gray-300 text-lg animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Join interactive sessions with expert instructors
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-red-400 text-sm font-medium">
                  Live Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 glass rounded-xl border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === "upcoming"
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Upcoming
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
            {upcomingSessions.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === "past"
              ? "bg-gradient-to-r from-primary-purple to-purple-600 text-white shadow-lg shadow-purple-500/25"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <History className="w-4 h-4" />
          Past Sessions
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
            {pastSessions.length}
          </span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 border border-white/10 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-3">
                  <div className="h-6 bg-gray-700 rounded w-48"></div>
                  <div className="h-4 bg-gray-700 rounded w-32"></div>
                </div>
                <div className="h-10 bg-gray-700 rounded w-24"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-4 bg-gray-700 rounded w-24"></div>
                <div className="h-4 bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-700 rounded w-28"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="glass rounded-2xl p-12 border border-red-500/30 text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="h-10 w-10 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Unable to load sessions
          </h3>
          <p className="text-gray-400">{error}</p>
        </div>
      ) : activeTab === "upcoming" ? (
        upcomingSessions.length === 0 ? (
          <div className="glass rounded-2xl p-12 border border-white/10 text-center">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-full flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-500" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
                <Zap className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No Upcoming Sessions
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Check back soon for new live sessions with our expert instructors.
              Subscribe to get notified when new sessions are scheduled.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.map((session, index) => (
              <div
                key={session.id}
                className="group glass rounded-2xl p-6 border border-white/10 hover-lift card-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-400 text-xs font-medium rounded-lg border border-orange-500/30 animate-pulse">
                        Starting in {getTimeUntilSession(session.scheduledAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                      {session.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Instructor:{" "}
                      {session.instructorName || "Expert Instructor"}
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="group-hover:scale-105 transition-transform"
                  >
                    <Play size={16} className="mr-2" />
                    Join Live
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                    <Calendar size={14} className="text-orange-400" />
                    {session.scheduledAt
                      ? format(
                          new Date(session.scheduledAt),
                          "MMM dd, yyyy 'at' HH:mm",
                        )
                      : "TBD"}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                    <Clock size={14} className="text-orange-400" />
                    {session.duration || "60 min"}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                    <Users size={14} className="text-orange-400" />
                    {session.participantsCount || 0}/
                    {session.maxParticipants || 100}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {(session.instructorName || "I")[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {session.instructorName || "Instructor"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-400 text-sm">
                    <Radio className="w-4 h-4 animate-pulse" />
                    <span>Live Session</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : pastSessions.length === 0 ? (
        <div className="glass rounded-2xl p-12 border border-white/10 text-center">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-purple/20 to-purple-800/20 rounded-full flex items-center justify-center">
              <History className="h-12 w-12 text-primary-purple" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            No Past Sessions
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Completed sessions will appear here with recordings for you to
            review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastSessions.map((session, index) => (
            <div
              key={session.id}
              className="group glass rounded-2xl p-6 border border-white/10 hover-lift card-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary-purple transition-colors">
                    {session.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Instructor: {session.instructorName || "Expert Instructor"}
                  </p>
                </div>
                {session.recordingUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:scale-105 transition-transform"
                  >
                    <Play size={16} className="mr-2" />
                    Watch Recording
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                  <Calendar size={14} className="text-primary-purple" />
                  {session.scheduledAt
                    ? format(new Date(session.scheduledAt), "MMM dd, yyyy")
                    : "TBD"}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                  <Clock size={14} className="text-primary-purple" />
                  {session.duration || "60 min"}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                  <Users size={14} className="text-primary-purple" />
                  {session.participantsCount || 0} watched
                </div>
              </div>

              {session.recordingUrl && (
                <div className="pt-4 border-t border-white/10">
                  <Button
                    variant="primary"
                    className="w-full group-hover:translate-y-[-2px] transition-all"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Full Recording
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Featured Session Card */}
      {upcomingSessions.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/40 via-gray-900/40 to-orange-900/40 border border-red-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>

          <div className="relative p-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded-full border border-red-500/30">
                    Featured Session
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {upcomingSessions[0]?.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  Join our expert instructor for an in-depth live trading
                  session.
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-400" />
                    {upcomingSessions[0]?.scheduledAt &&
                      format(
                        new Date(upcomingSessions[0].scheduledAt),
                        "MMM dd, yyyy",
                      )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    {upcomingSessions[0]?.duration || "60 min"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-400" />
                    {upcomingSessions[0]?.participantsCount || 0} joined
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg shadow-red-500/25"
              >
                <Play className="w-5 h-5 mr-2" />
                Join Session
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSessionsPage;
