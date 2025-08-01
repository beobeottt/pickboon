import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Menu } from "lucide-react"; // cài bằng: pnpm add lucide-react

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll khi mở sidebar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#1e1f29] border-b border-gray-700">
        <Link to="/"><h1 className="text-2xl font-bold text-white">
          VieSport
        </h1></Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex gap-8 text-sm text-white items-center">
        <div className="relative group">
            <button className="hover:text-red-500">PICKLEBALL CLUB ▾</button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#2a2b35] border border-gray-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                <li>
                  <Link to = "/social-list" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Social</Link>
                </li>
                <li>
                <Link to = "/clubs" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">List Of Club</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <button className="hover:text-red-500">ATHLETE ▾</button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#2a2b35] border border-gray-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                <li>
                  <Link to = "/athlete" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Register Player</Link>
                </li>
                <li>
                <Link to = "/athlete-list" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">List Of Athlete</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <button className="hover:text-red-500">GIẢI ĐẤU ▾</button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#2a2b35] border border-gray-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                <li>
                  <Link to = "" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Giải đấu VieSport</Link>
                </li>
                <li>
                <Link to = "/amateur-tournament" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Giải đấu chính thức</Link>
                </li>
                <li>
                <Link to = "" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Giải đấu phong trào</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Menu icon (Mobile only) */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-6 text-black px-6 pt-4">
          <details>
            <summary className="cursor-pointer">PICKLEBALL CLUB</summary>
            <ul className="pl-4 space-y-2 text-sm">
            <li>
                  <Link to = "/social-list" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Social</Link>
                </li>
                <li>
                <Link to = "/clubs" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">List Of Club</Link>
                </li>
            </ul>
            
          </details>
          <details>
            <summary className="cursor-pointer">ATHLETE</summary>
            <ul className="pl-4 space-y-2 text-sm">
            <li>
                  <Link to = "/athlete" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Register Player</Link>
                </li>
                <li>
                <Link to = "/athlete-list" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">List Of Athlete</Link>
                </li>
            </ul>
          </details>
          <details>
            <summary className="cursor-pointer">Giải đấu</summary>
            <ul className="pl-4 space-y-2 text-sm">
            <li>
                  <Link to = "" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Giải đấu VieSport</Link>
                </li>
                <li>
                <Link to = "/amateur-tournament" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Giải đấu chính thức</Link>
                </li>
                <li>
                <Link to = "" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3a3b45] hover:text-white">Giải đấu phong trào</Link>
                </li>
            </ul>
          </details>
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
