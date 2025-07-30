import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";

const AthleteListPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [athletes, setAthletes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        axiosInstance.get("/athlete")
            .then(res => {
                setAthletes(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                alert("Lỗi khi lấy dữ liệu");
            });
    }, []);

    const navigate = useNavigate();

    return (
        <div className="bg-[#1e1f29] text-white min-h-screen font-sans">
            <Navbar />
            <div className="max-w-5xl mx-auto text-center px-4">
                <h2 className="text-3xl font-bold mb-4 text-white">PVNA Tour 2025</h2>
                <p className="text-white mb-6">
                    VieSport TOUR 2025 – Giải đấu Pickleball đẳng cấp toàn quốc! Giải đấu hứa hẹn mang đến những trận đấu đỉnh cao, tinh thần thể thao sôi động và cơ hội kết nối cộng đồng Pickleball Việt Nam.
                </p>
            </div>
            <div className="bg-[#23243a] rounded-lg p-6 mt-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-white">Danh Sách Vận Động Viên</h3>
                {loading ? (
                    <div className="text-white">Đang tải dữ liệu...</div>
                ) : athletes.length === 0 ? (
                    <div className="text-white">Chưa có vận động viên nào.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#282a36]">
                                    <th className="px-4 py-2 text-white">Athlete</th>
                                    <th className="px-4 py-2 text-white">Team</th>
                                    <th className="px-4 py-2 text-white">Point</th>
                                    <th className="px-4 py-2 text-white">Gender</th>
                                    <th className="px-4 py-2 text-white">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {athletes.map((athlete, idx) => (
                                    <tr key={athlete._id || idx}
                                        className="bg-[#23243a] hover:bg-[#282a36] rounded cursor-pointer"
                                        onClick={() => navigate(`/athlete/${athlete._id}`)}
                                    >
                                        <td className="px-4 py-2 font-semibold flex items-center gap-2 text-white">
                                            {athlete.image && !imageErrors[athlete._id] ? (
                                                <img
                                                    src={`http://localhost:3000/athlete/uploads/${athlete.image}`}
                                                    alt={athlete.name}
                                                    className="w-8 h-8 rounded-full object-cover border border-gray-400"
                                                    onError={() => {
                                                        setImageErrors(prev => ({ ...prev, [athlete._id]: true }));
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-600 text-white font-bold text-lg border border-gray-400">
                                                    {athlete.name ? athlete.name.charAt(0).toUpperCase() : '?'}
                                                </div>
                                            )}
                                            {athlete.name || ""}
                                        </td>
                                        <td className="px-4 py-2 text-white">{athlete.team || ""}</td>
                                        <td className="px-4 py-2 text-white">{athlete.point || ""}</td>
                                        <td className="px-4 py-2 text-white">{athlete.gender || ""}</td>
                                        <td className="px-4 py-2 text-white">{athlete.location || ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default AthleteListPage;