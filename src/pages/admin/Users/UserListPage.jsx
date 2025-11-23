import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../store/slices/adminSlice";
import UserManagementTable from "../../../components/admin/UserManagementTable";

const UserListPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <p className="text-gray-400">
          Manage all user accounts and permissions
        </p>
      </div>

      <UserManagementTable />
    </div>
  );
};

export default UserListPage;
