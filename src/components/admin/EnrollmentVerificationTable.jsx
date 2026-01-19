import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyEnrollment,
  fetchPendingEnrollments,
} from "../../store/slices/adminSlice";
import {
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  User,
  BookOpen,
} from "lucide-react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

const EnrollmentVerificationTable = () => {
  const dispatch = useDispatch();
  const { pendingEnrollments, isLoading } = useSelector((state) => state.admin);

  const handleVerify = async (enrollmentId) => {
    try {
      await dispatch(
        verifyEnrollment({ enrollmentId, action: "VERIFY" }),
      ).unwrap();
      // Refresh the list
      dispatch(fetchPendingEnrollments());
    } catch (error) {
      console.error("Failed to verify enrollment:", error);
    }
  };

  const handleReject = async (enrollmentId) => {
    try {
      await dispatch(
        verifyEnrollment({ enrollmentId, action: "REJECT" }),
      ).unwrap();
      // Refresh the list
      dispatch(fetchPendingEnrollments());
    } catch (error) {
      console.error("Failed to reject enrollment:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentMethodColor = (method) => {
    switch (method) {
      case "MPESA":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "BANK_TRANSFER":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "CREDIT_CARD":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Pending Enrollments
            </h2>
            <p className="text-gray-400">
              Verify payment and activate course access
            </p>
          </div>
          <div className="flex items-center space-x-2 text-orange-400">
            <Clock size={20} />
            <span className="font-semibold">
              {pendingEnrollments.length} pending
            </span>
          </div>
        </div>
      </div>

      {/* Enrollments List */}
      <div className="divide-y divide-gray-700">
        {pendingEnrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="p-6 hover:bg-gray-700/30 transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* User & Course Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center text-white font-semibold">
                    <User size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      {enrollment.user?.fullName || "Unknown User"}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {enrollment.user?.email}
                    </p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <BookOpen size={14} className="mr-1" />
                      <span>{enrollment.course?.title}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white font-semibold flex items-center">
                      <DollarSign size={14} className="mr-1" />
                      {enrollment.paymentAmount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Method:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs border ${getPaymentMethodColor(
                        enrollment.paymentMethod,
                      )}`}
                    >
                      {enrollment.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Reference:</span>
                    <span className="text-white font-mono text-xs">
                      {enrollment.paymentReference}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3">
                <div className="text-xs text-gray-400">
                  Requested: {formatDate(enrollment.createdAt)}
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleVerify(enrollment.id)}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Verify
                  </Button>

                  <Button
                    onClick={() => handleReject(enrollment.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <XCircle size={16} className="mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>

            {/* Notes */}
            {enrollment.notes && (
              <div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                <div className="text-xs text-gray-400 mb-1">User Notes:</div>
                <div className="text-gray-300 text-sm">{enrollment.notes}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {pendingEnrollments.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            All caught up!
          </h3>
          <p className="text-gray-400">
            No pending enrollment requests to verify.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnrollmentVerificationTable;
