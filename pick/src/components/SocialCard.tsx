import React from "react";
import { Social } from "../types/Social";

export const SocialCard = ({ name, location, members, logo, date, point, price }: Social) => (
  <div className="bg-[#23243a] rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-red-500">
    {/* Header with logo and name */}
    <div className="flex items-center gap-4 mb-4">
      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl">
        {logo ? (
          <img src={logo} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-gray-400 text-sm">{location}</p>
      </div>
    </div>

    {/* Details */}
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Members:</span>
        <span className="text-white font-semibold">{members}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Date:</span>
        <span className="text-white">{date?.toString() || 'N/A'}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Point:</span>
        <span className="text-red-400 font-semibold">{point}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Price:</span>
        <span className="text-green-400 font-semibold">{price}</span>
      </div>
    </div>

    {/* Action Button */}
    <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
      Join Now
    </button>
  </div>
);