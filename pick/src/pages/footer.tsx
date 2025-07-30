import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <footer className="bg-[#23243a] text-white py-8 mt-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
                        <div className="space-y-2 text-gray-300">
                            <div className="flex items-center gap-2">
                                <span>📞</span>
                                <span>Phone Number: 0822124069</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>📧</span>
                                <span>Email: viesport@gmail.vn</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Theo Dõi</h3>
                        <div className="space-y-2 text-gray-300">
                            <div className="flex items-center gap-2">
                                <span>Facebook:</span>
                                <a href="https://facebook.com/viesport" className="text-blue-400 hover:text-blue-300 transition-colors">
                                    VieSport
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Instagram:</span>
                                <a href="https://instagram.com/viesport" className="text-pink-400 hover:text-pink-300 transition-colors">
                                    @viesport
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>YouTube:</span>
                                <a href="https://youtube.com/viesport" className="text-red-400 hover:text-red-300 transition-colors">
                                    VieSport Channel
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 VieSport VNA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;