"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ScheduleParamters_1 = __importDefault(require("@/components/ScheduleParamters"));
const CourseSelection_1 = __importDefault(require("@/components/CourseSelection"));
const HallSelection_1 = __importDefault(require("@/components/HallSelection"));
const InvigilatorSelection_1 = __importDefault(require("@/components/InvigilatorSelection"));
const ConstraintSettings_1 = __importDefault(require("@/components/ConstraintSettings"));
const GenerationControls_1 = __importDefault(require("@/components/GenerationControls"));
const StatusPanel_1 = __importDefault(require("@/components/StatusPanel"));
const SchedulePreview_1 = __importDefault(require("@/components/SchedulePreview"));
const availableCourses = [
    {
        id: "1",
        code: "CSC 101",
        title: "Introduction to Computer Science",
        creditUnit: 3,
        level: "100L",
    },
    {
        id: "2",
        code: "MTH 101",
        title: "Elementary Mathematics I",
        creditUnit: 3,
        level: "100L",
    },
    {
        id: "3",
        code: "PHY 101",
        title: "General Physics I",
        creditUnit: 3,
        level: "100L",
    },
    {
        id: "4",
        code: "CSC 201",
        title: "Computer Programming I",
        creditUnit: 4,
        level: "200L",
    },
    {
        id: "5",
        code: "CSC 301",
        title: "Data Structures",
        creditUnit: 3,
        level: "300L",
    },
    {
        id: "6",
        code: "CSC 401",
        title: "Software Engineering",
        creditUnit: 4,
        level: "400L",
    },
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
const TimetableSchedulingEngine = () => {
    const [scheduleParams, setScheduleParams] = (0, react_1.useState)({
        startDate: "",
        endDate: "",
        startTime: "09:00",
        endTime: "17:00",
        session: "",
        semester: "",
        level: "",
    });
    const [assignments, setAssignments] = (0, react_1.useState)({
        selectedCourses: [],
        selectedHalls: [],
        selectedInvigilators: [],
    });
    const [constraints, setConstraints] = (0, react_1.useState)({
        preventOverlaps: true,
        minimumGap: true,
        respectCreditUnits: true,
        maxExamsPerDay: 4,
    });
    const [generatedSchedule, setGeneratedSchedule] = (0, react_1.useState)([]);
    const [isGenerating, setIsGenerating] = (0, react_1.useState)(false);
    const [conflicts, setConflicts] = (0, react_1.useState)([]);
    const handleScheduleParamChange = (field, value) => {
        setScheduleParams((prev) => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    const handleCourseSelection = (courseId, selected) => {
        setAssignments((prev) => (Object.assign(Object.assign({}, prev), { selectedCourses: selected
                ? [...prev.selectedCourses, courseId]
                : prev.selectedCourses.filter((id) => id !== courseId) })));
    };
    const handleHallSelection = (hallId, selected) => {
        setAssignments((prev) => (Object.assign(Object.assign({}, prev), { selectedHalls: selected
                ? [...prev.selectedHalls, hallId]
                : prev.selectedHalls.filter((id) => id !== hallId) })));
    };
    const handleInvigilatorSelection = (invigilatorId, selected) => {
        setAssignments((prev) => (Object.assign(Object.assign({}, prev), { selectedInvigilators: selected
                ? [...prev.selectedInvigilators, invigilatorId]
                : prev.selectedInvigilators.filter((id) => id !== invigilatorId) })));
    };
    const handleConstraintChange = (field, value) => {
        setConstraints((prev) => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    const generateTimetable = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsGenerating(true);
        setConflicts([]);
        yield new Promise((resolve) => setTimeout(resolve, 2000));
        const sampleSchedule = [
            {
                id: "1",
                date: "2024-06-10",
                time: "09:00 - 12:00",
                course: "CSC 101 - Introduction to Computer Science",
                hall: "Main Auditorium",
                duration: "3 hours",
                invigilators: [
                    "Dr. Johnson Adebayo",
                    "Prof. Sarah Ibrahim",
                    "Dr. Michael Okonkwo",
                ],
                level: "100L",
            },
            {
                id: "2",
                date: "2024-06-10",
                time: "14:00 - 16:30",
                course: "MTH 101 - Elementary Mathematics I",
                hall: "Lecture Hall 1",
                duration: "2.5 hours",
                invigilators: [
                    "Prof. Sarah Ibrahim",
                    "Mrs. Grace Akande",
                    "Dr. Ahmed Musa",
                ],
                level: "100L",
            },
            {
                id: "3",
                date: "2024-06-11",
                time: "09:00 - 12:00",
                course: "CSC 201 - Computer Programming I",
                hall: "Computer Lab A",
                duration: "3 hours",
                invigilators: [
                    "Dr. Johnson Adebayo",
                    "Dr. Michael Okonkwo",
                    "Mrs. Grace Akande",
                ],
                level: "200L",
            },
        ];
        setGeneratedSchedule(sampleSchedule);
        setIsGenerating(false);
        if (assignments.selectedInvigilators.length < 3) {
            setConflicts([
                "Warning: Insufficient invigilators selected. Each exam requires minimum 3 invigilators.",
            ]);
        }
    });
    const isFormValid = () => {
        return (!!scheduleParams.startDate &&
            !!scheduleParams.endDate &&
            !!scheduleParams.session &&
            !!scheduleParams.semester &&
            !!scheduleParams.level &&
            assignments.selectedCourses.length > 0 &&
            assignments.selectedHalls.length > 0 &&
            assignments.selectedInvigilators.length >= 3);
    };
    const filteredCourses = scheduleParams.level === "All Levels"
        ? availableCourses
        : availableCourses.filter((course) => course.level === scheduleParams.level);
    return (<div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Generate Examination Timetable
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ScheduleParamters_1.default scheduleParams={scheduleParams} handleScheduleParamChange={handleScheduleParamChange}/>
          <CourseSelection_1.default filteredCourses={filteredCourses} selectedCourses={assignments.selectedCourses} handleCourseSelection={handleCourseSelection}/>
          <HallSelection_1.default availableHalls={availableHalls} selectedHalls={assignments.selectedHalls} handleHallSelection={handleHallSelection}/>
          <InvigilatorSelection_1.default availableInvigilators={availableInvigilators} selectedInvigilators={assignments.selectedInvigilators} handleInvigilatorSelection={handleInvigilatorSelection}/>
        </div>
        <div className="space-y-6">
          <ConstraintSettings_1.default constraints={constraints} handleConstraintChange={handleConstraintChange}/>
          <GenerationControls_1.default isFormValid={isFormValid()} isGenerating={isGenerating} generatedSchedule={generatedSchedule} generateTimetable={generateTimetable}/>
          <StatusPanel_1.default conflicts={conflicts} generatedSchedule={generatedSchedule}/>
        </div>
      </div>
      <SchedulePreview_1.default generatedSchedule={generatedSchedule}/>
    </div>);
};
exports.default = TimetableSchedulingEngine;
