import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserRole,
  deleteUser,
  fetchAllUsers,
} from "../../store/slices/adminSlice";
import { addNotification } from "../../store/slices/uiSlice";
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  User,
  Shield,
  Award,
  Trash2,
  Users,
  CheckCircle,
  XCircle,
  Crown,
  GraduationCap,
} from "lucide-react";
import Loader from "../ui/Loader";

const UserManagementTable = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.admin);
  const tableRef = useRef(null);

  useEffect(() => {
    if (users.length === 0 && !isLoading) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, users.length, isLoading]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [activeActions, setActiveActions] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState("below");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "ALL" ||
      (user.role || user.roles?.[0]?.name) === roleFilter;
    return matchesSearch && matchesRole;
  });

  const calculateDropdownPosition = (buttonElement) => {
    if (!buttonElement || !tableRef.current) return "below";
    const buttonRect = buttonElement.getBoundingClientRect();
    const tableRect = tableRef.current.getBoundingClientRect();
    const dropdownHeight = 200;
    const spaceAbove = buttonRect.top - tableRect.top;
    const spaceBelow = tableRect.bottom - buttonRect.bottom;
    return spaceAbove > dropdownHeight ? "above" : "below";
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await dispatch(changeUserRole({ userId, role: newRole })).unwrap();
      setActiveActions(null);
      const roleMessages = {
        ADMIN: "User has been successfully promoted to Admin! 🎉",
        INSTRUCTOR: "User has been successfully promoted to Instructor! 👨‍🏫",
        USER: "User has been successfully demoted to regular User! 👤",
      };
      dispatch(
        addNotification({
          type: "success",
          title: "Role Updated Successfully!",
          message:
            roleMessages[newRole] || "User role has been updated successfully!",
          duration: 4000,
        }),
      );
    } catch (error) {
      console.error("Failed to change role:", error);
      dispatch(
        addNotification({
          type: "error",
          title: "Role Update Failed",
          message: error || "Failed to update user role. Please try again.",
          duration: 5000,
        }),
      );
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the user "${userName}"? This action cannot be undone.`,
    );
    if (!confirmed) return;
    try {
      await dispatch(deleteUser(userId)).unwrap();
      setActiveActions(null);
      dispatch(
        addNotification({
          type: "success",
          title: "User Deleted Successfully!",
          message: `User "${userName}" has been permanently deleted.`,
          duration: 4000,
        }),
      );
    } catch (error) {
      console.error("Failed to delete user:", error);
      dispatch(
        addNotification({
          type: "error",
          title: "Delete Failed",
          message: error || "Failed to delete user. Please try again.",
          duration: 5000,
        }),
      );
    }
  };

  const getRoleBadge = (user) => {
    const role = user.role || user.roles?.[0]?.name;
    if (role === "ROLE_ADMIN") {
      return {
        label: "Admin",
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        icon: Crown,
        gradient: "from-red-500/20 to-red-600/10",
      };
    }
    if (role === "ROLE_INSTRUCTOR") {
      return {
        label: "Instructor",
        color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        icon: GraduationCap,
        gradient: "from-purple-500/20 to-purple-600/10",
      };
    }
    return {
      label: "User",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: Users,
      gradient: "from-blue-500/20 to-blue-600/10",
    };
  };

  const getRoleIcon = (user) => {
    const role = user.role || user.roles?.[0]?.name;
    if (role === "ROLE_ADMIN") {
      return <Shield size={14} className="text-red-400" />;
    }
    if (role === "ROLE_INSTRUCTOR") {
      return <Award size={14} className="text-purple-400" />;
    }
    return <User size={14} className="text-blue-400" />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-primary-purple/30 rounded-full blur-lg animate-pulse" />
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-purple/30 via-primary-gold/20 to-primary-purple/30 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

      <div className="relative bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-800/40">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/5 via-transparent to-primary-gold/5" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-purple/20 rounded-lg">
                <Users size={20} className="text-primary-purple" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  User Management
                </h2>
                <p className="text-gray-400 text-sm">
                  {filteredUsers.length} users found
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative group/search">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/20 to-primary-gold/20 rounded-lg blur opacity-0 group-hover/search:opacity-100 transition-opacity" />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover/search:text-primary-purple transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="relative pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:border-primary-purple/50 transition-all w-full sm:w-64 group-hover/search:border-primary-purple/30"
                />
              </div>

              {/* Filter */}
              <div className="relative group/filter">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/20 to-primary-purple/20 rounded-lg blur opacity-0 group-hover/filter:opacity-100 transition-opacity" />
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover/filter:text-primary-gold transition-colors"
                  size={18}
                />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="relative pl-10 pr-8 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold/50 transition-all appearance-none cursor-pointer group-hover/filter:border-primary-gold/30"
                >
                  <option value="ALL">All Roles</option>
                  <option value="ROLE_USER">Users</option>
                  <option value="ROLE_INSTRUCTOR">Instructors</option>
                  <option value="ROLE_ADMIN">Admins</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 bg-primary-gold rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto" ref={tableRef}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50 bg-gray-800/50">
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    User
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Shield size={14} />
                    Role
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} />
                    Status
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    Joined
                  </div>
                </th>
                <th className="text-left p-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <MoreVertical size={14} />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {filteredUsers.map((user) => {
                const roleBadge = getRoleBadge(user);
                const RoleIcon = roleBadge.icon;
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-700/30 transition-all duration-300 group/row"
                  >
                    {/* User Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${roleBadge.gradient} rounded-full blur-md opacity-50`}
                          />
                          <div className="relative w-10 h-10 bg-gradient-to-br from-primary-purple to-primary-gold rounded-full flex items-center justify-center text-white font-semibold shadow-lg group-hover/row:scale-110 group-hover/row:rotate-3 transition-transform">
                            {user.fullName?.charAt(0) || user.email?.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="text-white font-medium group-hover/row:text-primary-gold transition-colors">
                            {user.fullName || "No Name"}
                          </div>
                          <div className="text-gray-400 text-sm flex items-center gap-1">
                            <Mail size={12} className="text-gray-500" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="p-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${roleBadge.color} shadow-lg`}
                      >
                        <RoleIcon size={12} />
                        {roleBadge.label}
                        {getRoleIcon(user)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          user.enabled
                            ? "bg-green-500/20 text-green-400 border-green-500/30 shadow-green-500/20"
                            : "bg-red-500/20 text-red-400 border-red-500/30 shadow-red-500/20"
                        } group-hover/row:shadow-lg`}
                      >
                        {user.enabled ? (
                          <>
                            <CheckCircle size={12} className="animate-pulse" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            Inactive
                          </>
                        )}
                      </div>
                    </td>

                    {/* Joined Date */}
                    <td className="p-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-purple animate-pulse" />
                        {user.createdAt || user.created_at
                          ? new Date(
                              user.createdAt || user.created_at,
                            ).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="relative">
                        <button
                          ref={(el) => {
                            if (activeActions === user.id && el) {
                              const position = calculateDropdownPosition(el);
                              setDropdownPosition(position);
                            }
                          }}
                          onClick={() => {
                            const newActiveId =
                              activeActions === user.id ? null : user.id;
                            setActiveActions(newActiveId);
                          }}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-all group-hover/row:bg-gray-600/50"
                        >
                          <MoreVertical
                            size={16}
                            className={
                              activeActions === user.id
                                ? "text-primary-gold"
                                : ""
                            }
                          />
                        </button>

                        {activeActions === user.id && (
                          <div
                            className={`absolute right-0 z-50 min-w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-xl shadow-2xl overflow-hidden ${
                              dropdownPosition === "above"
                                ? "bottom-full mb-2"
                                : "top-full mt-2"
                            }`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/10 to-primary-gold/10" />
                            <div className="relative p-2">
                              <div className="text-xs text-gray-400 px-3 py-2 border-b border-gray-700/50 font-medium">
                                Change Role
                              </div>

                              {(user.role || user.roles?.[0]?.name) !==
                                "ROLE_ADMIN" && (
                                <button
                                  onClick={() =>
                                    handleRoleChange(user.id, "ADMIN")
                                  }
                                  className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-all flex items-center group"
                                >
                                  <div className="p-1 bg-red-500/20 rounded mr-2 group-hover:bg-red-500/30 transition-colors">
                                    <Crown size={14} className="text-red-400" />
                                  </div>
                                  Make Admin
                                </button>
                              )}

                              {(user.role || user.roles?.[0]?.name) !==
                                "ROLE_INSTRUCTOR" && (
                                <button
                                  onClick={() =>
                                    handleRoleChange(user.id, "INSTRUCTOR")
                                  }
                                  className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all flex items-center group"
                                >
                                  <div className="p-1 bg-purple-500/20 rounded mr-2 group-hover:bg-purple-500/30 transition-colors">
                                    <Award
                                      size={14}
                                      className="text-purple-400"
                                    />
                                  </div>
                                  Make Instructor
                                </button>
                              )}

                              {(user.role || user.roles?.[0]?.name) !==
                                "ROLE_USER" && (
                                <button
                                  onClick={() =>
                                    handleRoleChange(user.id, "USER")
                                  }
                                  className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-lg transition-all flex items-center group"
                                >
                                  <div className="p-1 bg-blue-500/20 rounded mr-2 group-hover:bg-blue-500/30 transition-colors">
                                    <User size={14} className="text-blue-400" />
                                  </div>
                                  Make User
                                </button>
                              )}

                              <div className="border-t border-gray-700/50 my-1" />

                              <button
                                onClick={() =>
                                  handleDeleteUser(
                                    user.id,
                                    user.fullName || user.email,
                                  )
                                }
                                className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all flex items-center group"
                              >
                                <div className="p-1 bg-red-500/20 rounded mr-2 group-hover:bg-red-500/30 transition-colors">
                                  <Trash2 size={14} />
                                </div>
                                Delete User
                              </button>
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
        {!isLoading && filteredUsers.length === 0 && (
          <div className="text-center py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-primary-gold/5" />
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-700/50 rounded-full flex items-center justify-center">
                <Users size={40} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-400">
                {searchTerm || roleFilter !== "ALL"
                  ? "Try adjusting your search or filters"
                  : "No users registered yet"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementTable;
