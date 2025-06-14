"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const StatusPanel = ({ conflicts, generatedSchedule }) => {
    if (conflicts.length === 0 && generatedSchedule.length === 0)
        return null;
    return (<div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-md font-medium text-gray-800 mb-3">Status</h3>
      {conflicts.length > 0 && (<div className="mb-4">
          <div className="flex items-start space-x-2">
            <lucide_react_1.AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"/>
            <div>
              <h4 className="text-sm font-medium text-amber-800">Warnings</h4>
              {conflicts.map((conflict, index) => (<p key={index} className="text-sm text-amber-700 mt-1">{conflict}</p>))}
            </div>
          </div>
        </div>)}
      {generatedSchedule.length > 0 && (<div className="flex items-start space-x-2">
          <lucide_react_1.CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"/>
          <div>
            <h4 className="text-sm font-medium text-green-800">Generation Complete</h4>
            <p className="text-sm text-green-700 mt-1">{generatedSchedule.length} exam slots created successfully</p>
          </div>
        </div>)}
    </div>);
};
exports.default = StatusPanel;
