import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Navbar from "./NavBar";

const tournaments = [
    {
        date: "2025-07-26",
        location: "Đắk Lắk",
        title: "GIẢI PICKLEBALL TRANH CÚP HẠNG Ô TÔ CHÂU ÂU SKODA LẦN THỨ I NĂM 2025 - ĐÔI HỖN HỢP 5.2",
        image: "/images/tournament1.png",
      },
      {
        date: "2025-07-26",
        location: "Đà Nẵng",
        title: "PICKLEBALL SÂN PRO TRANH CÚP FACOLOS MỞ RỘNG 2025 - ĐÔI NỮ NEWBIE 4.2",
        image: "/images/tournament2.png",
      },
];

export default function AmateurTournament()
{
    const [location, setLocation] = useState("");
    const [format, setFormat] = useState("");

    return (
        <div className="bg-[#1e1f29] text-white min-h-screen font-sans">
            <Navbar/>
      <h1 className="text-2xl font-bold text-white mb-6">Giải đấu đang diễn ra</h1>

      {/* Thanh tìm kiếm & filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Input placeholder="Tìm kiếm sự kiện..." className="w-full sm:w-[300px]" />
        <Button className="bg-red-600 hover:bg-red-700 text-white">TÌM KIẾM</Button>

        <Select onValueChange={setLocation}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Thành phố" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Đắk Lắk">Đắk Lắk</SelectItem>
            <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
            <SelectItem value="Khánh Hòa">Khánh Hòa</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setFormat}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Roundrobin - Tournament" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Roundrobin">Roundrobin</SelectItem>
            <SelectItem value="Tournament">Tournament</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Danh sách giải */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tournaments.map((t, i) => (
          <Card key={i} className="bg-[#101010] text-white border border-gray-700 shadow-md hover:scale-[1.02] transition-all">
            <CardContent className="p-3">
              <img src={t.image} alt={t.title} className="w-full h-[180px] object-cover rounded-md mb-3" />
              <p className="text-sm text-gray-400 mb-1">{t.date} / {t.location}</p>
              <p className="text-sm font-semibold leading-tight">{t.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}