"use client";
import React, { useState } from "react";

interface CourseInfo {
  courseCode: string;
  courseTitle: string;
  creditUnit: string;
}

const AddCourseForm: React.FC = () => {
  const [courses, setCourses] = useState<CourseInfo[]>([
    {
      courseCode: "",
      courseTitle: "",
      creditUnit: "",
    },
  ]);

  const updateCourse = (
    index: number,
    field: keyof CourseInfo,
    value: string
  ) => {
    setCourses(
      courses.map((course, i) =>
        i === index ? { ...course, [field]: value } : course
      )
    );
  };

  const handleAddCourse = () => {
    console.log("Courses:", courses);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Add Course
      </h1>
      <div className="space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course code
                </label>
                <input
                  type="text"
                  value={course.courseCode}
                  onChange={(e) =>
                    updateCourse(index, "courseCode", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-sm sm:text-base"
                  placeholder="Enter course code"
                />
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course title
                </label>
                <input
                  type="text"
                  value={course.courseTitle}
                  onChange={(e) =>
                    updateCourse(index, "courseTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-sm sm:text-base"
                  placeholder="Enter course title"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit unit
                </label>
                <input
                  type="number"
                  value={course.creditUnit}
                  onChange={(e) =>
                    updateCourse(index, "creditUnit", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-sm sm:text-base"
                  placeholder="Enter credit unit"
                  min="1"
                  max="10"
                />
              </div>
            </div>
            {index > 0 && <hr className="my-6 border-gray-200" />}
          </div>
        ))}
        <div className="flex items-center justify-end pt-6">
          <button
            onClick={handleAddCourse}
            className="w-full sm:w-auto px-6 py-2 bg-[#212121] text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Add course
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseForm;
