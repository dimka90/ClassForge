"use client";
import React, { useState } from "react";
import ScheduleParameters from "@/components/ScheduleParamters";
import CourseSelection from "@/components/CourseSelection";
import ConstraintSettings from "@/components/ConstraintSettings";
import GenerationControls from "@/components/GenerationControls";
import StatusPanel from "@/components/StatusPanel";
import SchedulePreview from "@/components/SchedulePreview";

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

interface Course {
  id: string;
  code: string;
  title: string;
  creditUnit: number;
  level: string;
}

const availableCourses: Course[] = [
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

  const [generatedSchedule, setGeneratedSchedule] = useState<GeneratedSlot[]>(
    []
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [conflicts, setConflicts] = useState<string[]>([]);

  const handleScheduleParamChange = (
    field: keyof ScheduleParameters,
    value: string
  ) => {
    setScheduleParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleCourseSelection = (courseId: string, selected: boolean) => {
    setAssignments((prev) => ({
      ...prev,
      selectedCourses: selected
        ? [...prev.selectedCourses, courseId]
        : prev.selectedCourses.filter((id) => id !== courseId),
    }));
  };

  const handleConstraintChange = (
    field: keyof ConstraintSettings,
    value: boolean | number
  ) => {
    setConstraints((prev) => ({ ...prev, [field]: value }));
  };

  const generateTimetable = async () => {
    setIsGenerating(true);
    setConflicts([]);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const sampleSchedule: GeneratedSlot[] = [
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
  };

  const isFormValid = () => {
    return (
      !!scheduleParams.startDate &&
      !!scheduleParams.endDate &&
      !!scheduleParams.session &&
      !!scheduleParams.semester &&
      !!scheduleParams.level &&
      assignments.selectedCourses.length > 0 &&
      assignments.selectedHalls.length > 0 &&
      assignments.selectedInvigilators.length >= 3
    );
  };

  const filteredCourses =
    scheduleParams.level === "All Levels"
      ? availableCourses
      : availableCourses.filter(
          (course) => course.level === scheduleParams.level
        );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Generate Examination Timetable
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ScheduleParameters
            scheduleParams={scheduleParams}
            handleScheduleParamChange={handleScheduleParamChange}
          />
          <CourseSelection
            filteredCourses={filteredCourses}
            selectedCourses={assignments.selectedCourses}
            handleCourseSelection={handleCourseSelection}
          />
        </div>
        <div className="space-y-6">
          <ConstraintSettings
            constraints={constraints}
            handleConstraintChange={handleConstraintChange}
          />
          <GenerationControls
            isFormValid={isFormValid()}
            isGenerating={isGenerating}
            generatedSchedule={generatedSchedule}
            generateTimetable={generateTimetable}
          />
          <StatusPanel
            conflicts={conflicts}
            generatedSchedule={generatedSchedule}
          />
        </div>
      </div>
      <SchedulePreview generatedSchedule={generatedSchedule} />
    </div>
  );
};

export default TimetableSchedulingEngine;
