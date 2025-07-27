import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [athletes, setAthletes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const images = [
    "logo11.jpg",
    "logo1.png",
    "logo2.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    // Gọi API lấy danh sách athlete
    axiosInstance.get("/athlete")
      .then(res => {
        setAthletes(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert("Lỗi khi lấy dữ liệu!");
      });
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const navigate = useNavigate();

  return (
    <div className="bg-[#1e1f29] text-white min-h-screen font-sans">
      <Navbar/>

      {/* ✅ Carousel */}
      <div className="flex justify-center items-center py-10">
        <div className="relative max-w-xl w-full flex justify-center items-center">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className="w-[300px] h-auto object-contain transition-opacity duration-500"
          />

          {/* Nút điều hướng trái */}
          <button
            onClick={prevImage}
            className="absolute left-0 md:left-[-40px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
          >
            ‹
          </button>

          {/* Nút điều hướng phải */}
          <button
            onClick={nextImage}
            className="absolute right-0 md:right-[-40px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Giới thiệu */}
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">PVNA Tour 2025</h2>
        <p className="text-gray-300 mb-6">
          VieSport TOUR 2025 – Giải đấu Pickleball đẳng cấp toàn quốc! Giải đấu hứa hẹn mang đến những trận đấu đỉnh cao, tinh thần thể thao sôi động và cơ hội kết nối cộng đồng Pickleball Việt Nam.
        </p>
        {/* Tabs */}
        

        {/* Danh sách vận động viên */}
        <div className="bg-[#23243a] rounded-lg p-6 mt-8 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Danh sách vận động viên</h3>
          {loading ? (
            <div>Đang tải dữ liệu...</div>
          ) : athletes.length === 0 ? (
            <div>Chưa có vận động viên nào.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-[#282a36]">
                    <th className="px-4 py-2">Athlete</th>
                    <th className="px-4 py-2">Team</th>
                    <th className="px-4 py-2">Point</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {athletes.map((athlete, idx) => (
                    <tr
                      key={athlete._id || idx}
                      className="bg-[#23243a] hover:bg-[#282a36] rounded cursor-pointer"
                      onClick={() => navigate(`/athlete/${athlete._id}`)}
                    >
                      <td className="px-4 py-2 font-semibold flex items-center gap-2">
                        {athlete.image && !imageErrors[athlete._id] ? (
                          <img
                            src={`http://localhost:3000/athlete/uploads/${athlete.image}`}
                            alt={athlete.name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-400"
                            onError={() => {
                              setImageErrors(prev => ({...prev, [athlete._id]: true}));
                            }}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-600 text-white font-bold text-lg border border-gray-400">
                            {athlete.name ? athlete.name.charAt(0).toUpperCase() : '?'}
                          </div>
                        )}
                        {athlete.name || ""}
                      </td>
                      <td className="px-4 py-2">{athlete.team || ""}</td>
                      <td className="px-4 py-2">{athlete.point || ""}</td>
                      <td className="px-4 py-2">{athlete.gender || ""}</td>
                      <td className="px-4 py-2">{athlete.location || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
