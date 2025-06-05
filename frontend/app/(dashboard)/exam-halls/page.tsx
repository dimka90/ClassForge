"use client";
import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface Venue {
  id: string;
  hallName: string;
  hallCapacity: string;
  facilities: string[];
}

const VenueManagementForm: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: "1",
      hallName: "",
      hallCapacity: "",
      facilities: [],
    },
  ]);

  const [existingVenues, setExistingVenues] = useState<Venue[]>([
    {
      id: "existing-1",
      hallName: "Main Auditorium",
      hallCapacity: "500",
      facilities: ["Projector", "Air Conditioning", "Sound System"],
    },
    {
      id: "existing-2",
      hallName: "Computer Lab A",
      hallCapacity: "80",
      facilities: ["Computers", "Projector", "Air Conditioning"],
    },
    {
      id: "existing-3",
      hallName: "Lecture Hall 1",
      hallCapacity: "150",
      facilities: ["Projector", "Whiteboard"],
    },
  ]);

  const facilityOptions = [
    "Projector",
    "Air Conditioning",
    "Sound System",
    "Whiteboard",
    "Computers",
    "WiFi",
    "Power Outlets",
  ];

  const updateVenue = (
    index: number,
    field: keyof Venue,
    value: string | string[]
  ) => {
    setVenues(
      venues.map((venue, i) =>
        i === index ? { ...venue, [field]: value } : venue
      )
    );
  };

  const handleFacilityChange = (
    index: number,
    facility: string,
    checked: boolean
  ) => {
    const currentFacilities = venues[index].facilities;
    let updatedFacilities;

    if (checked) {
      updatedFacilities = [...currentFacilities, facility];
    } else {
      updatedFacilities = currentFacilities.filter((f) => f !== facility);
    }

    updateVenue(index, "facilities", updatedFacilities);
  };

  const handleAddVenue = () => {
    console.log("New Venues:", venues);
    // Handle form submission logic here
  };

  const handleEditVenue = (id: string) => {
    console.log("Edit venue:", id);
    // Handle edit logic here
  };

  const handleDeleteVenue = (id: string) => {
    setExistingVenues(existingVenues.filter((venue) => venue.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Manage Venues
      </h1>

      {/* Add New Venues Section */}
      <div className="mb-10">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Add New Venue
        </h2>

        <div className="space-y-6">
          {venues.map((venue, index) => (
            <div key={index} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Hall Name */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hall name
                  </label>
                  <input
                    type="text"
                    value={venue.hallName}
                    onChange={(e) =>
                      updateVenue(index, "hallName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="Enter hall name"
                  />
                </div>

                {/* Hall Capacity */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hall capacity
                  </label>
                  <input
                    type="number"
                    value={venue.hallCapacity}
                    onChange={(e) =>
                      updateVenue(index, "hallCapacity", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    placeholder="Enter capacity"
                    min="1"
                  />
                </div>
              </div>

              {/* Facilities */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Facilities (Optional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {facilityOptions.map((facility) => (
                    <label
                      key={facility}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={venue.facilities.includes(facility)}
                        onChange={(e) =>
                          handleFacilityChange(
                            index,
                            facility,
                            e.target.checked
                          )
                        }
                        className="w-3 h-3 rounded accent-gray-900"
                      />
                      <span className="text-sm text-gray-700">{facility}</span>
                    </label>
                  ))}
                </div>
              </div>

              {index > 0 && <hr className="my-6 border-gray-200" />}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex items-center justify-end pt-6">
            <button
              onClick={handleAddVenue}
              className="w-full sm:w-auto px-6 py-2 bg-[#212121] text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Add venue
            </button>
          </div>
        </div>
      </div>

      {/* Existing Venues Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Existing Venues
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hall Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facilities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {existingVenues.map((venue) => (
                  <tr key={venue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {venue.hallName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {venue.hallCapacity} students
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {venue.facilities.map((facility, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditVenue(venue.id)}
                          className="text-[#212121] hover:text-blue-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVenue(venue.id)}
                          className="text-[#212121] hover:text-red-800"
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

        {existingVenues.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No venues added yet. Add your first venue above.
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueManagementForm;
