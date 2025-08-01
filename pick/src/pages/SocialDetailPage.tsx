import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import Navbar from './NavBar';
import Footer from './footer';

const SocialDetailPage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/club/${uuid}`) 
      .then((res) => {
        setClub(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch club details', error);
        setLoading(false);
      });
  }, [uuid]);

  if (loading) return <div className="text-white">Đang tải dữ liệu...</div>;
  if (!club) return <div className="text-white">Không tìm thấy club</div>;

  return (
    <div className="bg-[#1e1f29] text-white min-h-screen font-sans">
      <Navbar />
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <img
            src={club.logo || '/default-logo.png'} 
            alt={club.name}
            className="h-24 mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold">{club.name}</h1>
            <p className="text-gray-400">{club.location}</p>
            <p className="text-gray-400">📞 {club.phone || '0905-602-777'}</p>
            <a
              href="https://facebook.com/DaNangUnityPickleball"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              @{club.facebookHandle || 'DaNangUnityPickleball'}
            </a>
          </div>
        </div>

        <p className="text-gray-300 mb-4">
          We are proud to be the local leader of Pickleball in Danang providing courts, paddles, training session
          and organizing tournaments.
        </p>

        <div className="flex justify-between items-center mb-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Xem Chi Tiết
          </button>
          <p className="text-gray-400">MEMBERS: {club.members ?? 6}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <h2 className="text-xl font-semibold col-span-full">Sân Pickleball</h2>
          {/* Add Sân Pickleball content if available from API */}
          
          <h2 className="text-xl font-semibold col-span-full mt-4">Danh Sách Player</h2>
          <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {club.players?.map((player: any, index: number) => (
              <div key={index} className="bg-gray-800 p-4 rounded flex items-center">
                <img
                  src={player.image || '/default-player.png'} // Replace with default image if null
                  alt={player.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-gray-400">Đơn: {player.singleRating || '3.484'}</p>
                  <p className="text-gray-400">Đôi: {player.doubleRating || '3.718'}</p>
                </div>
              </div>
            )) || <p>Không có danh sách người chơi</p>}
          </div>

          <div className="col-span-full mt-4 text-center">
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SocialDetailPage;