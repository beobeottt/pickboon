import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

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
      <div className="flex justify-center items-center py-16">
        <div className="relative max-w-4xl w-full flex justify-center items-center">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className="w-[600px] h-auto object-contain transition-opacity duration-500"
          />

          {/* Nút điều hướng trái */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-[-60px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition text-2xl"
          >
            ‹
          </button>

          {/* Nút điều hướng phải */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-[-60px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition text-2xl"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 flex gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Giới thiệu */}
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-white">PVNA Tour 2025</h2>
        <p className="text-white mb-6">
          VieSport TOUR 2025 – Giải đấu Pickleball đẳng cấp toàn quốc! Giải đấu hứa hẹn mang đến những trận đấu đỉnh cao, tinh thần thể thao sôi động và cơ hội kết nối cộng đồng Pickleball Việt Nam.
        </p>
        {/* Tabs */}
        

        {/* Button chuyển sang trang Pickleball */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/clubs')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Xem Danh Sách Pickleball
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
