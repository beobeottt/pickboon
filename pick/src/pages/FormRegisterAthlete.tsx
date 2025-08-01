import React, { useState } from "react";
import axiosInstance from "../api/axios";

const FormRegisterAthlete: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    gender: string;
    location: string;
    point: string;
    image: File | null;
  }>({
    name: '',
    phone: '',
    email: '',
    gender: '',
    location: '',
    point: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [menuOpen, setMenuOpen] = useState(false); // 👈 toggle menu

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Tạo FormData để gửi file
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name);
      submitFormData.append('phoneNumber', formData.phone);
      submitFormData.append('email', formData.email);
      submitFormData.append('gender', formData.gender);
      submitFormData.append('location', formData.location);
      submitFormData.append('point', formData.point);
      
      // Thêm file ảnh nếu có
      if (formData.image) {
        submitFormData.append('image', formData.image);
      }

      const response = await axiosInstance.post('/athlete', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage('Đăng ký thành công!');
      console.log('Response:', response.data);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        gender: '',
        location: '',
        point: '',
        image: null,
      });
    } catch (error) {
      console.error('Error:', error);
      setMessage('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 max-w-3xl mx-auto text-base leading-relaxed">
      {/* Form */}
      <form onSubmit={handleSubmit} className="text-white p-8 rounded max-w-md mx-auto mt-8 space-y-6">
        <div>
          <label className="block mb-1">Full Name:</label>
          <input type="text" name="name" onChange={handleChange}
            className="w-full p-2 rounded border border-white bg-transparent text-white" />
        </div>

        <div>
          <label className="block mb-1">Phone Number:</label>
          <input type="text" name="phone" onChange={handleChange}
            className="w-full p-2 rounded border border-white bg-transparent text-white" />
        </div>

        <div>
          <label className="block mb-1">Email:</label>
          <input type="email" name="email" onChange={handleChange}
            className="w-full p-2 rounded border border-white bg-transparent text-white" />
        </div>

        <div>
          <label className="block mb-1">Gender:</label>
          <select name="gender" onChange={handleChange}
            className="w-full p-2 rounded border border-white text-black">
            <option value="">Chọn giới tính</option>
            <option value="Male">Male</option>
            <option value="FeMale">FeMale</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Profile's image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange}
            className="text-white" />
        </div>

        <div>
          <label className="block mb-1">location:</label>
          <select name="location" onChange={handleChange}
            className="w-full p-2 rounded border border-white text-black">
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

        <div>
          <label className="block mb-1">Point (1-10):</label>
          <input
            type="number"
            name="point"
            min="1"
            max="10"
            step="0.1"
            value={formData.point}
            onChange={handleChange}
            className="w-full p-2 rounded border border-white bg-transparent text-white"
          />
        </div>

        {message && (
          <div className={`text-center p-2 rounded ${message.includes('thành công') ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}
        </button>
      </form>
    </div>
  )
}

export default FormRegisterAthlete;