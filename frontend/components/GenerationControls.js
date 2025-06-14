"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const GenerationControls = ({ isFormValid, isGenerating, generatedSchedule, generateTimetable }) => {
    return (<div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Generate Timetable</h2>
      <div className="space-y-3">
        <button onClick={generateTimetable} disabled={!isFormValid || isGenerating} className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isFormValid && !isGenerating
            ? "bg-[#212121] text-white hover:bg-gray-900 focus:ring-gray-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300"}`}>
          {isGenerating ? (<div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </div>) : ("Generate Timetable")}
        </button>
        {generatedSchedule.length > 0 && (<div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <lucide_react_1.Eye className="w-4 h-4 inline mr-1"/>
              Preview
            </button>
            <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <lucide_react_1.Save className="w-4 h-4 inline mr-1"/>
              Save Draft
            </button>
          </div>)}
      </div>
    </div>);
};
exports.default = GenerationControls;
