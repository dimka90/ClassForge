"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CourseSelection = ({ filteredCourses, selectedCourses, handleCourseSelection }) => {
    return (<div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Select Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
        {filteredCourses.map((course) => (<label key={course.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" checked={selectedCourses.includes(course.id)} onChange={(e) => handleCourseSelection(course.id, e.target.checked)} className="mt-1 w-4 h-4 rounded accent-gray-900"/>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{course.code}</p>
              <p className="text-sm text-gray-600 truncate">{course.title}</p>
              <p className="text-xs text-blue-600">{course.creditUnit} Credit Units • {course.level}</p>
            </div>
          </label>))}
      </div>
      <p className="text-xs text-gray-500 mt-2">Selected: {selectedCourses.length} courses</p>
    </div>);
};
exports.default = CourseSelection;
