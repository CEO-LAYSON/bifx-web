import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { X, AlertCircle, CheckCircle } from "lucide-react";
import { enrollmentAPI } from "../../services/api/enrollmentAPI";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Alert from "../ui/Alert";

const CourseEnrollmentModal = ({
  course,
  isOpen,
  onClose,
  onEnrollmentSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (!isOpen) return null;

  const handleEnrollment = async (data) => {
    setIsSubmitting(true);
    setEnrollmentStatus(null);

    try {
      const enrollmentData = {
        courseId: course.id,
        paymentReference: data.paymentReference,
        paymentAmount: course.priceCents / 100,
        paymentCurrency: "USD",
        paymentMethod: data.paymentMethod,
        notes: data.notes,
      };

      await enrollmentAPI.requestEnrollment(enrollmentData);

      setEnrollmentStatus({
        type: "success",
        message:
          "Enrollment request submitted successfully! Our team will verify your payment and activate your course access.",
      });

      reset();

      // Call success callback after a delay
      setTimeout(() => {
        onEnrollmentSuccess();
        onClose();
      }, 3000);
    } catch (error) {
      setEnrollmentStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to submit enrollment request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    { value: "MPESA", label: "M-Pesa" },
    { value: "BANK_TRANSFER", label: "Bank Transfer" },
    { value: "CREDIT_CARD", label: "Credit Card" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative z-[1001]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Enroll in Course</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Course Info */}
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">
            {course.title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Price</span>
            <span className="text-2xl font-bold text-primary-gold">
              ${course.priceCents / 100}
            </span>
          </div>
        </div>

        {/* Enrollment Form */}
        <form onSubmit={handleSubmit(handleEnrollment)} className="p-6">
          {enrollmentStatus && (
            <Alert
              type={enrollmentStatus.type}
              message={enrollmentStatus.message}
              className="mb-4"
            />
          )}

          {!enrollmentStatus && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <select
                    {...register("paymentMethod", {
                      required: "Payment method is required",
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-purple"
                  >
                    <option value="">Select payment method</option>
                    {paymentMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                  {errors.paymentMethod && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>

                <Input
                  label="Payment Reference/Transaction ID"
                  placeholder="Enter your payment reference"
                  error={errors.paymentReference?.message}
                  {...register("paymentReference", {
                    required: "Payment reference is required",
                  })}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={3}
                    placeholder="Any additional information about your payment..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  className="flex-1"
                >
                  Submit Enrollment
                </Button>
              </div>
            </>
          )}

          {enrollmentStatus?.type === "success" && (
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <Button onClick={onClose} variant="primary" className="w-full">
                Close
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CourseEnrollmentModal;
