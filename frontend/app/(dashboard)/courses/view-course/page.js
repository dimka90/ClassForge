"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewCourses;
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
function ViewCourses() {
    return (<div className="flex flex-col items-center justify-center h-screen text-gray-600">
         <image_1.default src="/images/no-course.png" alt="sleeping bear" width={340} height={255}/>
         <h1 className="text-2xl mb-1">No course available</h1>
         <p className="text-sm mb-5">Courses will appear here after they have been added.</p>
         <link_1.default href="/courses/manage" className="bg-[#212121] text-white text-sm font-semibold px-4 py-2 rounded-sm">Add Course</link_1.default>
      </div>);
}
