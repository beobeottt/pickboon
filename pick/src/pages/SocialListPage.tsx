import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { SocialCard } from "../components/SocialCard";
import Navbar from "./NavBar";
import Footer from "./footer";

const SocialListPage: React.FC = () =>
{
    const [search, setSearch] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [socials, setSocials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // get inf from database
    useEffect(() => {
        axiosInstance.get("/social")
        .then(res => {
            setSocials(res.data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);

    if(loading) return <div className="text-white">Đang tải dữ liệu.....</div>;

    const filteredSocials = socials.filter((social) => {
        return(
            social.name.toLowerCase().includes(search.toLowerCase()) && (selectedCity === '' || social.location.includes(selectedCity))
        );
    });
    return(
        <div className="bg-[#1e1f29] text-white min-h-screen font-sans">
            <Navbar />
            <h1 className="text-2xl font-bold mb-6">Danh sách Social</h1>

            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Tìm kiếm clubs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded text-black"
                />

                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="p-2 rounded text-black"
                >
                    <option value="0">Lựa Chọn Thành Phố</option>
                    <option value="Tuyên Quang">Tuyên Quang</option>
                    <option value="Lào Cai">Lào Cai</option>
                    <option value="Thái Nguyên">Thái Nguyên</option>
                    <option value="Phú Thọ">Phú Thọ</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Hưng Yên">Hưng Yên</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                    <option value="Quảng Trị">Quảng Trị</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Quãng Ngãi">Quãng Ngãi</option>
                    <option value="Gia Lai">Gia Lai</option>
                    <option value="Khánh Hoà">Khánh Hoà</option>
                    <option value="Lâm Đồng">Lâm Đồng</option>
                    <option value="1Đắk Lắk">Đắk Lắk</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Tây Ninh">Tây Ninh</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Vĩnh Long">Vĩnh Long</option>
                    <option value="Đồng Tháp">Đồng Tháp</option>
                    <option value="Cà Mau">Cà Mau</option>
                    <option value="An Giang">An Giang</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Huế">Huế</option>
                    <option value="Lai Châu">Lai Châu</option>
                    <option value="Điện Biên">Điện Biên</option>
                    <option value="Sơn La">Sơn La</option>
                    <option value="Lạng Sơn">Lạng Sơn</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Thanh Hoá">Thanh Hoá</option>
                    <option value="Nghệ An">Nghệ An</option>
                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                    <option value="Cao Bằng">Cao Bằng</option>
                </select>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredSocials.map((social, index) => (
                    <SocialCard logo={''} key={index} {...social} />
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default SocialListPage;