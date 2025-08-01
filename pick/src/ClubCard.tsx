import React from "react";
type Club = {
    name: string;
    location: string;
    members: number;
    logo: string;
  };
  
  const ClubCard = ({ name, location, members, logo }: Club) => (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
      <img src={logo} alt={name} className="h-20 mb-2" />
      <p className="text-gray-700 font-semibold">{location}</p>
      <h3 className="text-lg font-bold text-center">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">Members: {members}</p>
    </div>
  );
  export default ClubCard;