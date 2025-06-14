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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const data_1 = require("@/data/data");
const Invigilators_1 = __importDefault(require("@/components/Invigilators"));
const InvigilatorManagementForm = () => {
    const [invigilators, setInvigilators] = (0, react_1.useState)([
        {
            id: "1",
            name: "",
            email: "",
            phone: "",
            department: "",
            faculty: "",
        },
    ]);
    const facultyOptions = [
        "Science",
        "Engineering",
        "Arts",
        "Social Sciences",
        "Medicine",
        "Law",
        "Education",
        "Agriculture",
        "Management Sciences",
    ];
    const updateInvigilator = (index, field, value) => {
        setInvigilators(invigilators.map((invigilator, i) => i === index ? Object.assign(Object.assign({}, invigilator), { [field]: value }) : invigilator));
    };
    const handleFacultyChange = (index, faculty) => {
        setInvigilators(invigilators.map((invigilator, i) => i === index ? Object.assign(Object.assign({}, invigilator), { faculty, department: "" }) : invigilator));
    };
    const handleAddInvigilator = () => {
        console.log("New Invigilators:", invigilators);
        setInvigilators([
            {
                id: "1",
                name: "",
                email: "",
                phone: "",
                department: "",
                faculty: "",
            },
        ]);
    };
    const isFormValid = () => {
        return invigilators.every((invigilator) => invigilator.name.trim() !== "" &&
            invigilator.email.trim() !== "" &&
            invigilator.phone.trim() !== "" &&
            invigilator.department.trim() !== "" &&
            invigilator.faculty.trim() !== "");
    };
    return (<div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
         <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Manage Invigilators
         </h1>
         <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
               <lucide_react_1.AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"/>
               <div>
                  <h3 className="text-sm font-medium text-amber-800">
                     Important Notice
                  </h3>
                  <p className="text-sm text-amber-700 mt-1">
                     Each exam session requires a minimum of 3 invigilators for proper
                     supervision and compliance with examination protocols.
                  </p>
               </div>
            </div>
         </div>
         <div className="mb-10">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
               Add New Invigilator
            </h2>
            <div className="space-y-6">
               {invigilators.map((invigilator, index) => {
            var _a;
            return (<div key={index} className="space-y-4 sm:space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="col-span-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                           </label>
                           <input type="text" value={invigilator.name} onChange={(e) => updateInvigilator(index, "name", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base" placeholder="Enter full name (e.g., Dr. John Doe)"/>
                        </div>
                        <div className="col-span-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                           </label>
                           <input type="email" value={invigilator.email} onChange={(e) => updateInvigilator(index, "email", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base" placeholder="Enter email address"/>
                        </div>
                        <div className="col-span-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                           </label>
                           <input type="tel" value={invigilator.phone} onChange={(e) => updateInvigilator(index, "phone", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base" placeholder="Enter phone number (e.g., +234 803 123 4567)"/>
                        </div>
                        <div className="col-span-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Faculty
                           </label>
                           <select value={invigilator.faculty} onChange={(e) => handleFacultyChange(index, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base">
                              <option value="">Select Faculty</option>
                              {facultyOptions.map((faculty) => (<option key={faculty} value={faculty}>
                                    {faculty}
                                 </option>))}
                           </select>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Department
                           </label>
                           <select value={invigilator.department} onChange={(e) => updateInvigilator(index, "department", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base" disabled={!invigilator.faculty}>
                              <option value="">
                                 {invigilator.faculty
                    ? "Select Department"
                    : "Select Faculty First"}
                              </option>
                              {invigilator.faculty &&
                    ((_a = data_1.departmentsByFaculty[invigilator.faculty]) === null || _a === void 0 ? void 0 : _a.map((department) => (<option key={department} value={department}>
                                          {department}
                                       </option>)))}
                           </select>
                        </div>
                     </div>
                     {index > 0 && <hr className="my-6 border-gray-200"/>}
                  </div>);
        })}
               <div className="flex items-center justify-end pt-6">
                  <button onClick={handleAddInvigilator} disabled={!isFormValid()} className={`w-full sm:w-auto px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isFormValid()
            ? "bg-[#212121] text-white hover:bg-gray-900 focus:ring-gray-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300"}`}>
                     Add Invigilator
                  </button>
               </div>
            </div>
         </div>
         <Invigilators_1.default />
      </div>);
};
exports.default = InvigilatorManagementForm;
