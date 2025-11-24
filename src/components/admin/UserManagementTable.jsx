import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserRole, fetchAllUsers } from "../../store/slices/adminSlice";
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  User,
  Shield,
  Award,
} from "lucide-react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

const UserManagementTable = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [activeActions, setActiveActions] = useState(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "ALL" || (user.role || user.roles?.[0]) === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      await dispatch(changeUserRole({ userId, role: newRole })).unwrap();
      setActiveActions(null);
    } catch (error) {
      console.error("Failed to change role:", error);
    }
  };

  const getRoleBadge = (user) => {
    const role = user.role || user.roles?.[0];
    if (role === "ADMIN") {
      return { label: "Admin", color: "bg-red-500 text-white" };
    }
    if (role === "INSTRUCTOR") {
      return { label: "Instructor", color: "bg-purple-500 text-white" };
    }
    return { label: "User", color: "bg-gray-500 text-white" };
  };

  const getRoleIcon = (user) => {
    const role = user.role || user.roles?.[0];
    if (role === "ADMIN") {
      return <Shield size={16} />;
    }
    if (role === "INSTRUCTOR") {
      return <Award size={16} />;
    }
    return <User size={16} />;
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">User Management</h2>
            <p className="text-gray-400">
              Manage user accounts and permissions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-gold"
            >
              <option value="ALL">All Roles</option>
              <option value="USER">Users</option>
              <option value="INSTRUCTOR">Instructors</option>
              <option value="ADMIN">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-gray-400 font-semibold">
                User
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Role
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Status
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Joined
              </th>
              <th className="text-left p-4 text-gray-400 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => {
              const roleBadge = getRoleBadge(user);
              return (
                <tr
                  key={user.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  {/* User Info */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-purple rounded-full flex items-center justify-center text-white font-semibold">
                        {user.fullName?.charAt(0) || user.email?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {user.fullName || "No Name"}
                        </div>
                        <div className="text-gray-400 text-sm flex items-center">
                          <Mail size={14} className="mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${roleBadge.color}`}
                      >
                        {roleBadge.label}
                      </span>
                      {getRoleIcon(user)}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.enabled
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {user.enabled ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="p-4 text-gray-400 text-sm">
                    {user.createdAt || user.created_at
                      ? new Date(
                          user.createdAt || user.created_at
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveActions(
                            activeActions === user.id ? null : user.id
                          )
                        }
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeActions === user.id && (
                        <div className="absolute right-0 top-12 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 min-w-48">
                          <div className="p-2">
                            <div className="text-xs text-gray-400 px-3 py-2 border-b border-gray-600">
                              Change Role
                            </div>

                            {(user.role || user.roles?.[0]) !== "ADMIN" && (
                              <button
                                onClick={() =>
                                  handleRoleChange(user.id, "ADMIN")
                                }
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-600 rounded transition-colors flex items-center"
                              >
                                <Shield size={14} className="mr-2" />
                                Make Admin
                              </button>
                            )}

                            {(user.role || user.roles?.[0]) !==
                              "INSTRUCTOR" && (
                              <button
                                onClick={() =>
                                  handleRoleChange(user.id, "INSTRUCTOR")
                                }
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-600 rounded transition-colors flex items-center"
                              >
                                <Award size={14} className="mr-2" />
                                Make Instructor
                              </button>
                            )}

                            {(user.role || user.roles?.[0]) !== "USER" && (
                              <button
                                onClick={() =>
                                  handleRoleChange(user.id, "USER")
                                }
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-600 rounded transition-colors flex items-center"
                              >
                                <User size={14} className="mr-2" />
                                Make User
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-400">
            {searchTerm || roleFilter !== "ALL"
              ? "Try adjusting your search or filters"
              : "No users registered yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;
