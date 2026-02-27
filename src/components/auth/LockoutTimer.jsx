import React, { useState, useEffect, useCallback } from "react";
import {
  AlertCircle,
  Clock,
  Shield,
  RefreshCw,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkLockoutStatus,
  clearLockout,
  clearError,
} from "../../store/slices/authSlice";

const LockoutTimer = ({
  errorMessage,
  email,
  lockoutEndTime,
  initialDuration,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(100);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { lockoutInfo } = useSelector((state) => state.auth);

  // Calculate initial time remaining
  const calculateTimeRemaining = useCallback(() => {
    // Priority: lockoutEndTime prop > Redux lockoutInfo > error message parsing
    if (lockoutEndTime) {
      const endTime = new Date(lockoutEndTime);
      const now = new Date();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      return remaining;
    }

    if (lockoutInfo?.lockoutEndTime) {
      const endTime = new Date(lockoutInfo.lockoutEndTime);
      const now = new Date();
      return Math.max(0, Math.floor((endTime - now) / 1000));
    }

    // Parse from error message
    const secondsMatch = errorMessage?.match(/try again in (\d+) seconds?/);
    if (secondsMatch) {
      return parseInt(secondsMatch[1]);
    }

    // Fallback to initial duration
    return initialDuration || 0;
  }, [
    lockoutEndTime,
    lockoutInfo?.lockoutEndTime,
    errorMessage,
    initialDuration,
  ]);

  useEffect(() => {
    const initial = calculateTimeRemaining();
    setTimeRemaining(initial);

    // Set initial progress based on original duration
    const originalDuration =
      lockoutInfo?.lockoutDuration || initialDuration || initial;
    if (originalDuration > 0) {
      setProgress((initial / originalDuration) * 100);
    }
  }, [calculateTimeRemaining, lockoutInfo?.lockoutDuration, initialDuration]);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Clear BOTH lockout AND error when timer reaches 0
            dispatch(clearLockout());
            dispatch(clearError());
            return 0;
          }
          return prev - 1;
        });

        // Update progress
        setProgress((prev) => {
          const newProgress =
            prev -
            100 /
              (lockoutInfo?.lockoutDuration ||
                initialDuration ||
                timeRemaining);
          return Math.max(0, newProgress);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining, dispatch, lockoutInfo?.lockoutDuration, initialDuration]);

  // Periodic check with backend
  useEffect(() => {
    if (timeRemaining > 0 && email) {
      const interval = setInterval(async () => {
        setIsRefreshing(true);
        try {
          await dispatch(checkLockoutStatus(email));
        } catch (error) {
          console.error("Failed to check lockout status:", error);
        }
        setIsRefreshing(false);
      }, 5000); // Check every 5 seconds

      return () => clearInterval(interval);
    }
  }, [timeRemaining, email, dispatch]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgressColor = () => {
    if (progress < 20) return "from-red-500 to-red-600";
    if (progress < 40) return "from-orange-500 to-red-500";
    if (progress < 60) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-500";
  };

  const getGlowColor = () => {
    if (progress < 20) return "shadow-red-500/50";
    if (progress < 40) return "shadow-orange-500/50";
    if (progress < 60) return "shadow-yellow-500/50";
    return "shadow-green-500/50";
  };

  const remainingAttemptsMatch = errorMessage?.match(
    /Remaining attempts: (\d+)/,
  );
  const remainingAttempts = remainingAttemptsMatch
    ? parseInt(remainingAttemptsMatch[1])
    : lockoutInfo?.remainingAttempts || 0;

  return (
    <div className="mb-6 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-gray-900/80 to-red-900/20 animate-pulse opacity-30"></div>

      <div className="relative p-6 bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-xl">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/30 blur-xl rounded-full animate-pulse"></div>
            <div className="relative p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              Account Temporarily Locked
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
                Security
              </span>
            </h3>
            <p className="text-gray-400 text-sm">
              Too many failed login attempts detected
            </p>
          </div>
        </div>

        {/* Main countdown display */}
        <div className="relative mb-5">
          {/* Circular progress */}
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-40">
              {/* Background circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-800"
                />
                {/* Progress circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 70 * (1 - progress / 100)
                  }`}
                  className="transition-all duration-1000 ease-linear"
                />
                <defs>
                  <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Time display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Clock className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-4xl font-bold text-white font-mono tracking-wider">
                  {formatTime(timeRemaining)}
                </span>
                <span className="text-gray-500 text-xs mt-1">remaining</span>
              </div>
            </div>
          </div>

          {/* Progress bar alternative */}
          <div className="mt-4 relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${getProgressColor()} transition-all duration-1000 ease-linear`}
              style={{ width: `${progress}%` }}
            ></div>
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Attempts card */}
          <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
              <Zap className="w-3 h-3" />
              <span>Remaining</span>
            </div>
            <div className="text-white font-semibold">
              {remainingAttempts}{" "}
              {remainingAttempts === 1 ? "attempt" : "attempts"}
            </div>
          </div>

          {/* Status card */}
          <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
              <RefreshCw
                className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Status</span>
            </div>
            <div className="text-white font-semibold">
              {timeRemaining > 0 ? "Locked" : "Unlocked"}
            </div>
          </div>
        </div>

        {/* Security notice */}
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-blue-200/80 text-xs">
              <strong className="text-blue-300">How it works:</strong> After 5
              failed attempts, you get locked out. If you try again during a
              lockout, the duration extends (15s → 30s → 60s...). Waiting for
              lockout to expire resets to 15s. Successful login always resets
              the counter.
            </p>
          </div>
        </div>
      </div>

      {/* Add custom animation for shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LockoutTimer;
