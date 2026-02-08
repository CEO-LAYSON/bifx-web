import React, { useState, useEffect } from "react";
import { AlertCircle, Clock, Info } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { checkLockoutStatus } from "../../store/slices/authSlice";

const LockoutTimer = ({ errorMessage, email }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(100);
  const [showTooltip, setShowTooltip] = useState(false);
  const [lockoutExpiry, setLockoutExpiry] = useState(null);

  const dispatch = useDispatch();
  const { lockoutInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Extract initial lockout duration from error message
    const match = errorMessage.match(/try again in (\d+) minutes/);
    if (match) {
      const minutes = parseInt(match[1]);
      const totalSeconds = minutes * 60;
      setTimeRemaining(totalSeconds);
    }

    // Check lockout status from backend
    if (email) {
      const checkStatus = async () => {
        try {
          await dispatch(checkLockoutStatus(email));
        } catch (error) {
          console.error("Failed to check lockout status:", error);
        }
      };
      checkStatus();
    }
  }, [errorMessage, email, dispatch]);

  useEffect(() => {
    // Sync with Redux lockout info if available
    if (lockoutInfo && lockoutInfo.lockoutEndTime) {
      const now = new Date();
      const endTime = new Date(lockoutInfo.lockoutEndTime);
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remaining);
      setLockoutExpiry(endTime);
    }
  }, [lockoutInfo]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const totalDuration = Math.max(timeRemaining, 1);
      const progressPercentage = Math.max(
        0,
        Math.min(100, (timeRemaining / totalDuration) * 100),
      );
      setProgress(100 - progressPercentage);
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgressColor = () => {
    if (progress < 30) return "bg-red-500";
    if (progress < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const remainingAttemptsMatch = errorMessage.match(
    /Remaining attempts: (\d+)/,
  );
  const remainingAttempts = remainingAttemptsMatch
    ? parseInt(remainingAttemptsMatch[1])
    : lockoutInfo?.remainingAttempts || 0;

  return (
    <div className="mb-6 p-5 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-red-500/30">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-red-500/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold mb-1">Account Locked</h3>
          <p className="text-gray-400 text-sm">
            Too many failed login attempts. Please wait before trying again.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-white font-mono text-lg">
            {formatTime(timeRemaining)}
          </span>
          <span className="text-gray-400 text-sm">remaining</span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {remainingAttempts > 0 && (
          <div className="text-center text-sm text-gray-400">
            {remainingAttempts} attempt(s) remaining before next lockout level
          </div>
        )}

        <div className="relative">
          <div
            className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-gray-400 transition-colors"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className="w-3 h-3" />
            <span>Learn about our security policy</span>
          </div>
          {showTooltip && (
            <div className="absolute z-20 p-4 bg-gray-800 border border-gray-700 rounded-xl text-xs text-gray-300 mt-2 w-72 shadow-xl">
              <p className="mb-2">
                <strong className="text-white">Security Notice:</strong> After
                multiple failed attempts, your account is temporarily locked to
                protect against unauthorized access.
              </p>
              <p className="mb-2">
                Lockout duration: 15 minutes after 5 failed attempts. Successful
                login will reset your attempt counter.
              </p>
              <p>
                Lockout is account-specific and will not affect other users.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockoutTimer;
