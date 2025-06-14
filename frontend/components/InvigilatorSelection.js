"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const InvigilatorSelection = ({ availableInvigilators, selectedInvigilators, handleInvigilatorSelection }) => {
    return (<div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Select Invigilators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableInvigilators.map((invigilator) => (<label key={invigilator.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" checked={selectedInvigilators.includes(invigilator.id)} onChange={(e) => handleInvigilatorSelection(invigilator.id, e.target.checked)} className="w-4 h-4 rounded accent-gray-900"/>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{invigilator.name}</p>
              <p className="text-xs text-gray-600">{invigilator.department}</p>
            </div>
          </label>))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Selected: {selectedInvigilators.length} invigilators
        {selectedInvigilators.length < 3 && (<span className="text-red-500 ml-1">(Minimum 3 required)</span>)}
      </p>
    </div>);
};
exports.default = InvigilatorSelection;
