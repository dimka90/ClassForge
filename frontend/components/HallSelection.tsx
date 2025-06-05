import React from 'react';

interface Hall {
  id: string;
  name: string;
  capacity: number;
}

interface HallSelectionProps {
  availableHalls: Hall[];
  selectedHalls: string[];
  handleHallSelection: (hallId: string, selected: boolean) => void;
}

const HallSelection: React.FC<HallSelectionProps> = ({ availableHalls, selectedHalls, handleHallSelection }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Select Examination Halls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableHalls.map((hall) => (
          <label key={hall.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedHalls.includes(hall.id)}
              onChange={(e) => handleHallSelection(hall.id, e.target.checked)}
              className="w-4 h-4 rounded accent-gray-900"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{hall.name}</p>
              <p className="text-xs text-gray-600">Capacity: {hall.capacity} students</p>
            </div>
          </label>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">Selected: {selectedHalls.length} halls</p>
    </div>
  );
};

export default HallSelection;