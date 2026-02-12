import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../store/slices/adminSlice";
import UserManagementTable from "../../../components/admin/UserManagementTable";
import { Users, Search, Filter } from "lucide-react";

const UserListPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        {/* Floating Orbs */}
        <div className="absolute top-0 -right-40 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 -left-40 w-80 h-80 bg-primary-gold/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative space-y-6 pt-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20 rounded-xl blur-lg opacity-50" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-purple/20 rounded-lg">
                  <Users size={24} className="text-primary-purple" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white relative">
                    User Management
                    <span className="absolute -bottom-1 left-0 w-24 h-1 bg-gradient-to-r from-primary-purple to-primary-gold rounded-full" />
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Manage all user accounts and permissions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-white" id="user-count">
                --
              </div>
              <div className="text-xs text-gray-400">Total Users</div>
            </div>
            <div className="w-px h-8 bg-gray-700" />
            <div className="text-center">
              <div
                className="text-2xl font-bold text-green-400"
                id="active-count"
              >
                --
              </div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
          </div>
        </div>

        <UserManagementTable />
      </div>
    </div>
  );
};

export default UserListPage;
