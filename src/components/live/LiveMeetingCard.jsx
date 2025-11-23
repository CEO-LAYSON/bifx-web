import React from "react";
import {
  Video,
  Calendar,
  Clock,
  Users,
  ExternalLink,
  Lock,
} from "lucide-react";

const LiveMeetingCard = ({ meeting, canJoin = false }) => {
  const isUpcoming = new Date(meeting.scheduledAt) > new Date();
  const isLive = meeting.status === "LIVE";
  const isEnded = meeting.status === "ENDED";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = () => {
    if (isLive) {
      return (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
          LIVE NOW
        </span>
      );
    }
    if (isUpcoming) {
      return (
        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          UPCOMING
        </span>
      );
    }
    return (
      <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
        ENDED
      </span>
    );
  };

  const handleJoinMeeting = () => {
    if (meeting.joinUrl) {
      window.open(meeting.joinUrl, "_blank");
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-purple transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-purple rounded-lg">
            <Video className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              {meeting.title}
            </h3>
            <p className="text-gray-400 text-sm">
              with {meeting.instructor?.fullName || "Instructor"}
            </p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Meeting Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar size={16} className="mr-2" />
          <span>{formatDate(meeting.scheduledAt)}</span>
          <Clock size={16} className="ml-4 mr-2" />
          <span>{formatTime(meeting.scheduledAt)}</span>
        </div>

        {meeting.duration && (
          <div className="flex items-center text-gray-400 text-sm">
            <Clock size={16} className="mr-2" />
            <span>Duration: {meeting.duration} minutes</span>
          </div>
        )}

        {meeting.attendeeCount !== undefined && (
          <div className="flex items-center text-gray-400 text-sm">
            <Users size={16} className="mr-2" />
            <span>{meeting.attendeeCount} attendees</span>
          </div>
        )}
      </div>

      {/* Description */}
      {meeting.description && (
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {meeting.description}
        </p>
      )}

      {/* Join Button */}
      <div className="flex items-center justify-between">
        {canJoin && (isLive || isUpcoming) ? (
          <button
            onClick={handleJoinMeeting}
            className="flex items-center px-4 py-2 bg-primary-purple text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            <ExternalLink size={16} className="mr-2" />
            {isLive ? "Join Live" : "Join Meeting"}
          </button>
        ) : (
          <div className="flex items-center text-gray-400 text-sm">
            <Lock size={16} className="mr-2" />
            {isEnded ? "Meeting ended" : "Upgrade to join"}
          </div>
        )}

        {/* Recording Available */}
        {isEnded && meeting.recordingUrl && (
          <a
            href={meeting.recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-gold hover:text-yellow-400 text-sm font-medium"
          >
            Watch Recording
          </a>
        )}
      </div>
    </div>
  );
};

export default LiveMeetingCard;
