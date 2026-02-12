import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPendingEnrollments } from "../../../store/slices/adminSlice";
import EnrollmentVerificationTable from "../../../components/admin/EnrollmentVerificationTable";
import {
  BookOpen,
  ArrowUpRight,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";

const EnrollmentList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingEnrollments());
  }, [dispatch]);

  return (
    <div className="space-y-8 relative">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-purple/20 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-primary-gold/15 rounded-full blur-[100px] animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-primary-purple/10 rounded-full blur-[110px] animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Header Section */}
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-gold/40 via-primary-purple/30 to-primary-gold/40 rounded-2xl blur opacity-50" />

        <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-700/50 p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 via-transparent to-primary-gold/5 rounded-xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title and Description */}
            <div className="flex items-start gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold to-primary-purple rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative p-3 bg-gradient-to-br from-primary-gold to-primary-purple rounded-xl">
                  <BookOpen size={28} className="text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  Enrollment Verification
                  <div className="px-3 py-1 bg-gradient-to-r from-primary-gold to-primary-purple rounded-full text-xs font-medium text-white animate-pulse">
                    Admin
                  </div>
                </h1>
                <p className="text-gray-400 text-lg flex items-center gap-2">
                  Verify payment and activate course access for students
                  <ArrowUpRight size={16} className="text-primary-gold" />
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="relative group/stat">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-xl blur-md opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                <div className="relative bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-5 py-3 flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Clock size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      Pending
                    </p>
                    <p className="text-white font-bold text-xl">0</p>
                  </div>
                </div>
              </div>

              <div className="relative group/stat">
                <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-md opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                <div className="relative bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-5 py-3 flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      Verified
                    </p>
                    <p className="text-white font-bold text-xl">0</p>
                  </div>
                </div>
              </div>

              <div className="relative group/stat">
                <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-md opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                <div className="relative bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-5 py-3 flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Users size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">
                      Total
                    </p>
                    <p className="text-white font-bold text-xl">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Table */}
      <EnrollmentVerificationTable />
    </div>
  );
};

export default EnrollmentList;
