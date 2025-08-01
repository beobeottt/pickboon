import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { ArrowLeft, Pencil } from "lucide-react";

export default function AthleteProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('doubles');

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/athlete/${id}`)
        .then(res => {
          setAthlete(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
    <div className="bg-[#1e1f29] min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Đang tải dữ liệu...</div>
    </div>
  );
  
  if (!athlete) return (
    <div className="bg-[#1e1f29] min-h-screen flex items-center justify-center">
      <div className="text-white text-xl">Không tìm thấy vận động viên.</div>
    </div>
  );

  return (
    <div className="bg-[#1e1f29] text-white min-h-screen">
      {/* Header */}
      <div className="bg-[#23243a] p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <h1 className="text-2xl font-bold">Profile Vận Động Viên</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        
        <div className="bg-[#23243a] rounded-xl shadow-lg p-8">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="relative">
              {athlete.image ? (
                <img
                  src={`http://localhost:3000/athlete/uploads/${athlete.image}`}
                  alt={athlete.name}
                  className="w-32 h-32 rounded-full border-4 border-red-500 object-cover"
                  onError={e => { (e.currentTarget as HTMLImageElement).src = '/logo.png'; }}
                />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-red-600 text-white font-bold text-4xl border-4 border-red-500">
                  {athlete.name ? athlete.name.charAt(0).toUpperCase() : '?'}
                </div>
              )}
              <button className="absolute -bottom-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-2 shadow-lg transition-colors">
                <Pencil className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{athlete.name}</h2>
              <p className="text-gray-400 mb-4">ID: {athlete._id}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-[#2a2b35] px-3 py-1 rounded-full">{athlete.gender}</span>
                <span className="bg-[#2a2b35] px-3 py-1 rounded-full">Point: {athlete.point ?? 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex bg-[#2a2b35] rounded-lg p-1">
              <button
                onClick={() => setActiveTab('doubles')}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                  activeTab === 'doubles' 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-[#3a3b45]'
                }`}
              >
                Đánh Đôi
              </button>
              <button
                onClick={() => setActiveTab('singles')}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                  activeTab === 'singles' 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-[#3a3b45]'
                }`}
              >
                Đánh Đơn
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2a2b35] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Thông Tin Cá Nhân</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="font-medium">{athlete.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone Number:</span>
                  <span className="font-medium">{athlete.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="font-medium">{athlete.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gender:</span>
                  <span className="font-medium">{athlete.gender}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2b35] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-400">Statistical</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Point:</span>
                  <span className="font-medium text-red-400">{athlete.point ?? 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Match played:</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate:</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rank:</span>
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
