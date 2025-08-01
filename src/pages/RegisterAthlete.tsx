import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormRegisterAthlete from "./FormRegisterAthlete";
import Navbar from "./NavBar";

const RegisterAthlete = () => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    gender: string;
    city: string;
    level: string;
    image: File | null;
  }>({
    name: '',
    phone: '',
    email: '',
    gender: '',
    city: '',
    level: '', 
    image: null,
  });

  const [menuOpen, setMenuOpen] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div className="bg-[#1e1f29] text-white min-h-screen font-sans">
      <Navbar/>

      <main>
  <div className="flex flex-col items-center my-4 space-y-4">
    <Link
      to="/ranking-guide"
      className="text-white-600 px-6 py-2 rounded-lg border border-white-600 shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
    >
      Hướng dẫn xét trình độ
    </Link>

    <h1 className="text-2xl font-bold mb-4">Đăng kí</h1>

    <FormRegisterAthlete />
  </div>
</main>

      <footer></footer>
    </div>
  );
};

export default RegisterAthlete;
