import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

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


interface StatusPanelProps {
  conflicts: string[];
  generatedSchedule: GeneratedSlot[];
}

const StatusPanel: React.FC<StatusPanelProps> = ({ conflicts, generatedSchedule }) => {
  if (conflicts.length === 0 && generatedSchedule.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-md font-medium text-gray-800 mb-3">Status</h3>
      {conflicts.length > 0 && (
        <div className="mb-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-amber-800">Warnings</h4>
              {conflicts.map((conflict, index) => (
                <p key={index} className="text-sm text-amber-700 mt-1">{conflict}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      {generatedSchedule.length > 0 && (
        <div className="flex items-start space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-green-800">Generation Complete</h4>
            <p className="text-sm text-green-700 mt-1">{generatedSchedule.length} exam slots created successfully</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPanel;