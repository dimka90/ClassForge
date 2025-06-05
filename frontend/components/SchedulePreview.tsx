import React from 'react';
import { Download } from 'lucide-react';

interface GeneratedSlot {
  id: string;
  date: string;
  time: string;
  course: string;
  hall: string;
  duration: string;
  invigilators: string[];
  level: string;
}

interface SchedulePreviewProps {
  generatedSchedule: GeneratedSlot[];
}

const SchedulePreview: React.FC<SchedulePreviewProps> = ({ generatedSchedule }) => {
  if (generatedSchedule.length === 0) return null;

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800">Generated Timetable Preview</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Download className="w-4 h-4 inline mr-2" />
          Export to PDF
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hall</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invigilators</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {generatedSchedule.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{slot.date}</div>
                  <div className="text-sm text-gray-500">{slot.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{slot.course}</div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {slot.level}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.hall}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.duration}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="space-y-1">
                    {slot.invigilators.map((invigilator, index) => (
                      <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">{invigilator}</div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePreview;