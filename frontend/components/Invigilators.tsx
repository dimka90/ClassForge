'use client'

import { useState } from "react";
import { Edit2, Trash2,} from "lucide-react";

interface Invigilator {
   id: string;
   name: string;
   email: string;
   phone: string;
   department: string;
   faculty: string;
 }
 
export default function Invigilators(){

   const [existingInvigilators, setExistingInvigilators] = useState<
   Invigilator[]
 >([
   {
     id: "existing-1",
     name: "Dr. Johnson Adebayo",
     email: "j.adebayo@university.edu",
     phone: "+234 803 123 4567",
     department: "Computer Science",
     faculty: "Science",
   },
   {
     id: "existing-2",
     name: "Prof. Sarah Ibrahim",
     email: "s.ibrahim@university.edu",
     phone: "+234 807 987 6543",
     department: "Mathematics",
     faculty: "Science",
   },
   {
     id: "existing-3",
     name: "Dr. Michael Okonkwo",
     email: "m.okonkwo@university.edu",
     phone: "+234 815 456 7890",
     department: "Physics",
     faculty: "Science",
   },
   {
     id: "existing-4",
     name: "Mrs. Grace Akande",
     email: "g.akande@university.edu",
     phone: "+234 809 234 5678",
     department: "Chemistry",
     faculty: "Science",
   },
   {
     id: "existing-5",
     name: "Dr. Ahmed Musa",
     email: "a.musa@university.edu",
     phone: "+234 816 345 6789",
     department: "Biology",
     faculty: "Science",
   },
 ]);
 
   const handleEditInvigilator = (id: string) => {
      console.log("Edit invigilator:", id);
      // Handle edit logic here
    };
  
    const handleDeleteInvigilator = (id: string) => {
      setExistingInvigilators(
        existingInvigilators.filter((invigilator) => invigilator.id !== id)
      );
    };
   return(
      <div>
          <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Existing Invigilators
          </h2>
          <div className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-medium">{existingInvigilators.length}</span>{" "}
            invigilators
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {existingInvigilators.map((invigilator) => (
                  <tr key={invigilator.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {invigilator.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {invigilator.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {invigilator.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {invigilator.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {invigilator.faculty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditInvigilator(invigilator.id)}
                          className="text-[#212121] hover:text-blue-800"
                          title="Edit invigilator"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteInvigilator(invigilator.id)
                          }
                          className="text-[#212121] hover:text-red-800"
                          title="Delete invigilator"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {existingInvigilators.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No invigilators added yet. Add your first invigilator above.
          </div>
        )}
      </div>
      </div>   )
}