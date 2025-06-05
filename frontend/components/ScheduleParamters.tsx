import React from 'react';
import { Calendar } from 'lucide-react';

interface ScheduleParametersProps {
  scheduleParams: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    session: string;
    semester: string;
    level: string;
  };
  handleScheduleParamChange: (field: keyof ScheduleParametersProps['scheduleParams'], value: string) => void;
}

const sessionOptions = ["Morning", "Afternoon", "Evening"];
const semesterOptions = ["1st Semester", "2nd Semester"];
const levelOptions = ["100L", "200L", "300L", "400L", "All Levels"];

const ScheduleParameters: React.FC<ScheduleParametersProps> = ({ scheduleParams, handleScheduleParamChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-medium text-gray-800">Schedule Parameters</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            value={scheduleParams.startDate}
            onChange={(e) => handleScheduleParamChange("startDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            value={scheduleParams.endDate}
            onChange={(e) => handleScheduleParamChange("endDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
          <input
            type="time"
            value={scheduleParams.startTime}
            onChange={(e) => handleScheduleParamChange("startTime", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
          <input
            type="time"
            value={scheduleParams.endTime}
            onChange={(e) => handleScheduleParamChange("endTime", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session</label>
          <select
            value={scheduleParams.session}
            onChange={(e) => handleScheduleParamChange("session", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Session</option>
            {sessionOptions.map((session) => (
              <option key={session} value={session}>{session}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
          <select
            value={scheduleParams.semester}
            onChange={(e) => handleScheduleParamChange("semester", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((semester) => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Level/Year</label>
          <select
            value={scheduleParams.level}
            onChange={(e) => handleScheduleParamChange("level", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Level</option>
            {levelOptions.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ScheduleParameters;