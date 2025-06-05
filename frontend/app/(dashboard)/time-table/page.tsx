"use client";
import React, { useState } from "react";
import { Calendar, AlertCircle, CheckCircle, Download, Eye, Save } from "lucide-react";

interface ScheduleParameters {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  session: string;
  semester: string;
  level: string;
}

interface AssignmentData {
  selectedCourses: string[];
  selectedHalls: string[];
  selectedInvigilators: string[];
}

interface ConstraintSettings {
  preventOverlaps: boolean;
  minimumGap: boolean;
  respectCreditUnits: boolean;
  maxExamsPerDay: number;
}

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

const TimetableSchedulingEngine: React.FC = () => {
  const [scheduleParams, setScheduleParams] = useState<ScheduleParameters>({
    startDate: "",
    endDate: "",
    startTime: "09:00",
    endTime: "17:00",
    session: "",
    semester: "",
    level: "",
  });

  const [assignments, setAssignments] = useState<AssignmentData>({
    selectedCourses: [],
    selectedHalls: [],
    selectedInvigilators: [],
  });

  const [constraints, setConstraints] = useState<ConstraintSettings>({
    preventOverlaps: true,
    minimumGap: true,
    respectCreditUnits: true,
    maxExamsPerDay: 4,
  });

  const [generatedSchedule, setGeneratedSchedule] = useState<GeneratedSlot[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [conflicts, setConflicts] = useState<string[]>([]);

  // Sample data - in real app, this would come from your database
  const availableCourses = [
    { id: "1", code: "CSC 101", title: "Introduction to Computer Science", creditUnit: 3, level: "100L" },
    { id: "2", code: "MTH 101", title: "Elementary Mathematics I", creditUnit: 3, level: "100L" },
    { id: "3", code: "PHY 101", title: "General Physics I", creditUnit: 3, level: "100L" },
    { id: "4", code: "CSC 201", title: "Computer Programming I", creditUnit: 4, level: "200L" },
    { id: "5", code: "CSC 301", title: "Data Structures", creditUnit: 3, level: "300L" },
    { id: "6", code: "CSC 401", title: "Software Engineering", creditUnit: 4, level: "400L" },
  ];

  const availableHalls = [
    { id: "1", name: "Main Auditorium", capacity: 500 },
    { id: "2", name: "Computer Lab A", capacity: 80 },
    { id: "3", name: "Lecture Hall 1", capacity: 150 },
    { id: "4", name: "Science Complex Hall", capacity: 200 },
  ];

  const availableInvigilators = [
    { id: "1", name: "Dr. Johnson Adebayo", department: "Computer Science" },
    { id: "2", name: "Prof. Sarah Ibrahim", department: "Mathematics" },
    { id: "3", name: "Dr. Michael Okonkwo", department: "Physics" },
    { id: "4", name: "Mrs. Grace Akande", department: "Chemistry" },
    { id: "5", name: "Dr. Ahmed Musa", department: "Biology" },
  ];

  const sessionOptions = ["Morning", "Afternoon", "Evening"];
  const semesterOptions = ["1st Semester", "2nd Semester"];
  const levelOptions = ["100L", "200L", "300L", "400L", "All Levels"];

  const handleScheduleParamChange = (field: keyof ScheduleParameters, value: string) => {
    setScheduleParams(prev => ({ ...prev, [field]: value }));
  };

  const handleCourseSelection = (courseId: string, selected: boolean) => {
    setAssignments(prev => ({
      ...prev,
      selectedCourses: selected
        ? [...prev.selectedCourses, courseId]
        : prev.selectedCourses.filter(id => id !== courseId)
    }));
  };

  const handleHallSelection = (hallId: string, selected: boolean) => {
    setAssignments(prev => ({
      ...prev,
      selectedHalls: selected
        ? [...prev.selectedHalls, hallId]
        : prev.selectedHalls.filter(id => id !== hallId)
    }));
  };

  const handleInvigilatorSelection = (invigilatorId: string, selected: boolean) => {
    setAssignments(prev => ({
      ...prev,
      selectedInvigilators: selected
        ? [...prev.selectedInvigilators, invigilatorId]
        : prev.selectedInvigilators.filter(id => id !== invigilatorId)
    }));
  };

  const handleConstraintChange = (field: keyof ConstraintSettings, value: boolean | number) => {
    setConstraints(prev => ({ ...prev, [field]: value }));
  };

  const generateTimetable = async () => {
    setIsGenerating(true);
    setConflicts([]);
    
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate sample schedule
    const sampleSchedule: GeneratedSlot[] = [
      {
        id: "1",
        date: "2024-06-10",
        time: "09:00 - 12:00",
        course: "CSC 101 - Introduction to Computer Science",
        hall: "Main Auditorium",
        duration: "3 hours",
        invigilators: ["Dr. Johnson Adebayo", "Prof. Sarah Ibrahim", "Dr. Michael Okonkwo"],
        level: "100L"
      },
      {
        id: "2",
        date: "2024-06-10",
        time: "14:00 - 16:30",
        course: "MTH 101 - Elementary Mathematics I",
        hall: "Lecture Hall 1",
        duration: "2.5 hours",
        invigilators: ["Prof. Sarah Ibrahim", "Mrs. Grace Akande", "Dr. Ahmed Musa"],
        level: "100L"
      },
      {
        id: "3",
        date: "2024-06-11",
        time: "09:00 - 12:00",
        course: "CSC 201 - Computer Programming I",
        hall: "Computer Lab A",
        duration: "3 hours",
        invigilators: ["Dr. Johnson Adebayo", "Dr. Michael Okonkwo", "Mrs. Grace Akande"],
        level: "200L"
      }
    ];

    setGeneratedSchedule(sampleSchedule);
    setIsGenerating(false);
    
    // Check for conflicts
    if (assignments.selectedInvigilators.length < 3) {
      setConflicts(["Warning: Insufficient invigilators selected. Each exam requires minimum 3 invigilators."]);
    }
  };

  const isFormValid = () => {
    return (
      scheduleParams.startDate &&
      scheduleParams.endDate &&
      scheduleParams.session &&
      scheduleParams.semester &&
      scheduleParams.level &&
      assignments.selectedCourses.length > 0 &&
      assignments.selectedHalls.length > 0 &&
      assignments.selectedInvigilators.length >= 3
    );
  };

  const filteredCourses = scheduleParams.level === "All Levels" 
    ? availableCourses 
    : availableCourses.filter(course => course.level === scheduleParams.level);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Generate Examination Timetable
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Parameters & Assignment */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section A: Schedule Parameters */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-800">Schedule Parameters</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={scheduleParams.startDate}
                  onChange={(e) => handleScheduleParamChange("startDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={scheduleParams.endDate}
                  onChange={(e) => handleScheduleParamChange("endDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={scheduleParams.startTime}
                  onChange={(e) => handleScheduleParamChange("startTime", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={scheduleParams.endTime}
                  onChange={(e) => handleScheduleParamChange("endTime", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session <span className="text-red-500">*</span>
                </label>
                <select
                  value={scheduleParams.session}
                  onChange={(e) => handleScheduleParamChange("session", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Session</option>
                  {sessionOptions.map(session => (
                    <option key={session} value={session}>{session}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester <span className="text-red-500">*</span>
                </label>
                <select
                  value={scheduleParams.semester}
                  onChange={(e) => handleScheduleParamChange("semester", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Semester</option>
                  {semesterOptions.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level/Year <span className="text-red-500">*</span>
                </label>
                <select
                  value={scheduleParams.level}
                  onChange={(e) => handleScheduleParamChange("level", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Level</option>
                  {levelOptions.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section B: Course Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Select Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {filteredCourses.map(course => (
                <label key={course.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assignments.selectedCourses.includes(course.id)}
                    onChange={(e) => handleCourseSelection(course.id, e.target.checked)}
                    className="mt-1 w-4 h-4 rounded accent-gray-900"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{course.code}</p>
                    <p className="text-sm text-gray-600 truncate">{course.title}</p>
                    <p className="text-xs text-blue-600">{course.creditUnit} Credit Units • {course.level}</p>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {assignments.selectedCourses.length} courses
            </p>
          </div>

          {/* Section C: Hall Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Select Examination Halls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableHalls.map(hall => (
                <label key={hall.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assignments.selectedHalls.includes(hall.id)}
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
            <p className="text-xs text-gray-500 mt-2">
              Selected: {assignments.selectedHalls.length} halls
            </p>
          </div>

          {/* Section D: Invigilator Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Select Invigilators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableInvigilators.map(invigilator => (
                <label key={invigilator.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assignments.selectedInvigilators.includes(invigilator.id)}
                    onChange={(e) => handleInvigilatorSelection(invigilator.id, e.target.checked)}
                    className="w-4 h-4 rounded accent-gray-900"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{invigilator.name}</p>
                    <p className="text-xs text-gray-600">{invigilator.department}</p>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected: {assignments.selectedInvigilators.length} invigilators 
              {assignments.selectedInvigilators.length < 3 && (
                <span className="text-red-500 ml-1">(Minimum 3 required)</span>
              )}
            </p>
          </div>
        </div>

        {/* Right Column - Constraints & Generation */}
        <div className="space-y-6">
          
          {/* Constraint Settings */}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max exams per day
                </label>
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

          {/* Generation Controls */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Generate Timetable</h2>
            
            <div className="space-y-3">
              <button
                onClick={generateTimetable}
                disabled={!isFormValid() || isGenerating}
                className={`w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isFormValid() && !isGenerating
                    ? "bg-[#212121] text-white hover:bg-gray-900 focus:ring-gray-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300"
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Generate Timetable"
                )}
              </button>
              
              {generatedSchedule.length > 0 && (
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <Eye className="w-4 h-4 inline mr-1" />
                    Preview
                  </button>
                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <Save className="w-4 h-4 inline mr-1" />
                    Save Draft
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Status Panel */}
          {(conflicts.length > 0 || generatedSchedule.length > 0) && (
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
                    <p className="text-sm text-green-700 mt-1">
                      {generatedSchedule.length} exam slots created successfully
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Generated Schedule Preview */}
      {generatedSchedule.length > 0 && (
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
                          <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {invigilator}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableSchedulingEngine;