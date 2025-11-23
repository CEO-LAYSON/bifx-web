import React, { useState, useRef, useEffect } from "react";
import { FileText, Bookmark, Share, Download, Maximize } from "lucide-react";

const CoursePlayerWithNotes = ({ lesson, course }) => {
  const [notes, setNotes] = useState("");
  const [isNoteTaking, setIsNoteTaking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  // Load saved notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${lesson.id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [lesson.id]);

  // Save notes to localStorage
  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem(`notes_${lesson.id}`, newNotes);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const addTimestamp = () => {
    const timestamp = `[${formatTime(currentTime)}] `;
    const newNotes = notes + (notes ? "\n" + timestamp : timestamp);
    saveNotes(newNotes);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const downloadNotes = () => {
    const element = document.createElement("a");
    const file = new Blob([notes], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `notes-${lesson.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Player - 2/3 width */}
      <div className="lg:col-span-2">
        <div className="bg-black rounded-xl overflow-hidden border border-gray-700">
          {/* Video player would go here */}
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Maximize size={32} className="text-white" />
              </div>
              <p className="text-gray-400">Video Player</p>
              <p className="text-gray-500 text-sm">
                Current Time: {formatTime(currentTime)}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsNoteTaking(!isNoteTaking)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isNoteTaking
                      ? "bg-primary-purple text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <FileText size={16} className="mr-2" />
                  Notes
                </button>

                <button
                  onClick={addTimestamp}
                  className="flex items-center px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Bookmark size={16} className="mr-2" />
                  Timestamp
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadNotes}
                  disabled={!notes}
                  className="flex items-center px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Panel - 1/3 width */}
      <div className="lg:col-span-1">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">My Notes</h3>
            <div className="text-gray-400 text-sm">
              {notes.split("\n").filter((line) => line.trim()).length} notes
            </div>
          </div>

          {isNoteTaking ? (
            <div className="space-y-4">
              <textarea
                value={notes}
                onChange={(e) => saveNotes(e.target.value)}
                placeholder="Start taking notes... Click the timestamp button to add current video time."
                rows={12}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
              />

              <div className="flex space-x-2">
                <button
                  onClick={() => setIsNoteTaking(false)}
                  className="flex-1 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={addTimestamp}
                  className="flex items-center px-3 py-2 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Bookmark size={16} className="mr-2" />
                  Add Timestamp
                </button>
              </div>
            </div>
          ) : (
            <div>
              {notes ? (
                <div className="bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {notes}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No notes yet</p>
                  <button
                    onClick={() => setIsNoteTaking(true)}
                    className="px-4 py-2 bg-primary-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Start Taking Notes
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Tips */}
          <div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
            <h4 className="text-sm font-semibold text-white mb-2">
              Note-taking Tips
            </h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Use timestamps to mark important moments</li>
              <li>• Summarize key concepts in your own words</li>
              <li>• Note down questions for later review</li>
              <li>• Download notes for offline study</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerWithNotes;
