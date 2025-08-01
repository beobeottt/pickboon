import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { ArrowLeft, Pencil } from "lucide-react";
import { Club } from "../types/Club";

export default function ClubDetailPage() {
  const { uuid } = useParams<{ uuid: string }>(); // Extract uuid from the URL
  const navigate = useNavigate();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (uuid) {
      axiosInstance
        .get(`/club/${uuid}`) // Fetch club data by uuid
        .then((res) => {
          setClub(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [uuid]);

  if (loading) return (
    <div className="bg-[#1e1f29] min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Đang tải dữ liệu...</div>
    </div>
  );

  if (!club) return (
    <div className="bg-[#1e1f29] min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Không tìm thấy club.</div>
    </div>
  );

  return (
    <div className="bg-[#1e1f29] text-white min-h-screen">
      {/* Header with Back Button */}
      <div className="bg-[#23243a] p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Chi Tiết Club</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-[#23243a] rounded-xl shadow-lg p-8">
          {/* Image and Name Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="relative">
              {club.logo ? (
                <img
                  src={`http://localhost:3000/club/uploads/${club.logo}`} // Adjust URL based on your backend
                  alt={club.name}
                  className="w-32 h-32 rounded-full border-4 border-red-500 object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/logo.png'; }}
                />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-red-600 text-white font-bold text-4xl border-4 border-red-500">
                  {club.name.charAt(0).toUpperCase()}
                </div>
              )}
              <button className="absolute -bottom-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-2 shadow-lg transition-colors">
                <Pencil className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{club.name}</h2>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-[#2a2b35] px-3 py-1 rounded-full">Members: {club.members}</span>
                <span className="bg-[#2a2b35] px-3 py-1 rounded-full">Point: {club.point ?? 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex bg-[#2a2b35] rounded-lg p-1">
              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                  activeTab === "details"
                    ? "bg-red-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-[#3a3b45]"
                }`}
              >
                Chi Tiết
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                  activeTab === "members"
                    ? "bg-red-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-[#3a3b45]"
                }`}
              >
                Thành Viên
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2a2b35] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Thông Tin Club</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="font-medium">{club.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-medium">{club.date?.toString() || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price:</span>
                  <span className="font-medium text-green-400">{club.price ?? "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2b35] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Thống Kê</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Members:</span>
                  <span className="font-medium">{club.members}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Point:</span>
                  <span className="font-medium text-red-400">{club.point ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Match Played:</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate:</span>
                  <span className="font-medium">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}