import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConstraintSettingsProps {
  constraints: {
    preventOverlaps: boolean;
    minimumGap: boolean;
    respectCreditUnits: boolean;
    maxExamsPerDay: number;
  };
  handleConstraintChange: (field: keyof ConstraintSettingsProps['constraints'], value: boolean | number) => void;
}

const ConstraintSettings: React.FC<ConstraintSettingsProps> = ({ constraints, handleConstraintChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertCircle className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-medium text-gray-800">Constraint Settings</h2>
      </div>
      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={constraints.preventOverlaps}
            onChange={(e) => handleConstraintChange("preventOverlaps", e.target.checked)}
            className="w-4 h-4 rounded accent-gray-900"
          />
          <span className="text-sm text-gray-700">Prevent student exam overlaps</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={constraints.minimumGap}
            onChange={(e) => handleConstraintChange("minimumGap", e.target.checked)}
            className="w-4 h-4 rounded accent-gray-900"
          />
          <span className="text-sm text-gray-700">Minimum gap between exams</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={constraints.respectCreditUnits}
            onChange={(e) => handleConstraintChange("respectCreditUnits", e.target.checked)}
            className="w-4 h-4 rounded accent-gray-900"
          />
          <span className="text-sm text-gray-700">Respect credit unit time allocations</span>
        </label>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max exams per day</label>
          <input
            type="number"
            min="1"
            max="8"
            value={constraints.maxExamsPerDay}
            onChange={(e) => handleConstraintChange("maxExamsPerDay", parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ConstraintSettings;