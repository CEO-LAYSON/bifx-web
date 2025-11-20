import React from "react";
import { FileText, Upload, MessageCircle, CheckCircle } from "lucide-react";

const AssignmentCard = ({ assignment, lesson, onSubmitAssignment }) => {
  const handleWhatsAppSubmit = () => {
    const message = `Assignment Submission for: ${lesson.title}\nCourse: ${lesson.courseTitle}\nStudent: [Your Name]\n\nMy submission: [Attach your work]`;
    const whatsappUrl = `https://wa.me/+255XXXXXXXXX?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownloadInstructions = () => {
    // Create a simple text file with assignment instructions
    const instructions = `Assignment: ${assignment.title}\n\nLesson: ${
      lesson.title
    }\nCourse: ${lesson.courseTitle}\n\nInstructions:\n${
      assignment.instructions
    }\n\nDue: ${
      assignment.dueDate || "No due date"
    }\n\nPlease submit your completed assignment via WhatsApp.`;

    const blob = new Blob([instructions], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assignment-${assignment.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <FileText size={24} className="mr-3 text-primary-gold" />
          Assignment
        </h3>

        {assignment.isSubmitted && (
          <div className="flex items-center text-green-400 text-sm">
            <CheckCircle size={16} className="mr-1" />
            Submitted
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Assignment Details */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">
            {assignment.title}
          </h4>
          <p className="text-gray-300 leading-relaxed">
            {assignment.description}
          </p>
        </div>

        {/* Instructions */}
        {assignment.instructions && (
          <div>
            <h5 className="text-white font-medium mb-2">Instructions:</h5>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-300 whitespace-pre-wrap">
                {assignment.instructions}
              </p>
            </div>
          </div>
        )}

        {/* Requirements */}
        {assignment.requirements && (
          <div>
            <h5 className="text-white font-medium mb-2">Requirements:</h5>
            <ul className="text-gray-300 space-y-1">
              {assignment.requirements.map((req, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary-purple rounded-full mr-3" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Due Date */}
        {assignment.dueDate && (
          <div className="flex items-center text-yellow-400 text-sm">
            <FileText size={16} className="mr-2" />
            Due: {new Date(assignment.dueDate).toLocaleDateString()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
          <button
            onClick={handleDownloadInstructions}
            className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            <Upload size={16} className="mr-2" />
            Download Instructions
          </button>

          <button
            onClick={handleWhatsAppSubmit}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <MessageCircle size={16} className="mr-2" />
            Submit via WhatsApp
          </button>
        </div>

        {/* Submission Note */}
        <div className="text-sm text-gray-400 bg-gray-900/50 rounded-lg p-3">
          <strong>Note:</strong> After submitting via WhatsApp, your instructor
          will review your work and provide feedback within 24-48 hours.
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
