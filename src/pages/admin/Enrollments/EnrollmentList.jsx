import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPendingEnrollments } from "../../../store/slices/adminSlice";
import EnrollmentVerificationTable from "../../../components/admin/EnrollmentVerificationTable";

const EnrollmentList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingEnrollments());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Enrollment Verification
        </h1>
        <p className="text-gray-400">
          Verify payment and activate course access for students
        </p>
      </div>

      <EnrollmentVerificationTable />
    </div>
  );
};

export default EnrollmentList;
