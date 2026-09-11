"use client";
import { useState } from "react";
import { Truck, Palette, CircleHelp, MessageSquare, Bell, Settings, User, X, } from "lucide-react";

const AdminHeader = () => {
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<string[]>([]);

    const [showProfile, setShowProfile] = useState(false);

    return (
        <>
            <header className="w-full bg-white mt-2">
                <div className="px-40">
                    <div className="h-[49px] flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center shrink-0">
                            <strong className="text-[18px] font-bold">
                                XuanTruong
                            </strong>
                        </div>

                        {/* Menu */}
                        <div className="flex items-center gap-5 text-[17px]">

                            <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#E8DED5] cursor-pointer transition-colors ">
                                <Truck size={16} />
                                <span>Giao hàng</span>
                            </div>

                            <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#E8DED5] cursor-pointer transition-colors">
                                <Palette size={16} />
                                <span>Chủ đề</span>
                            </div>

                            <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#E8DED5] cursor-pointer transition-colors">
                                <CircleHelp size={16} />
                                <span>Hỗ trợ</span>
                            </div>

                            {/* Góp ý */}
                            <button
                                onClick={() => setShowFeedback(true)}
                                className="flex items-center gap-1 px-2 py-2 rounded-md hover:bg-[#E8DED5] cursor-pointer transition"
                            >
                                <MessageSquare size={16} />
                                <span>Góp ý</span>
                            </button>

                            <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#E8DED5] cursor-pointer transition-colors">
                                Tiếng Việt
                            </div>

                            <Bell size={30} className="p-1 rounded-md hover:bg-[#E8DED5] cursor-pointer transition-colors" />
                            <Settings size={30} className="p-1 rounded-md hover:bg-[#E8DED5] cursor-pointer transition-colors" />

                            <div className="relative">
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer">

                                    <User size={20} className="text-blue-600" />
                                </button>

                                {/* Dropdown */}
                                {showProfile && (
                                    <div  className="absolute right-0 top-12 w-[250px] bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden">

                                        {/* User */}
                                        <div className="px-4 py-4 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                                <User size={22} className="text-blue-600" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="text-[15px] text-gray-700 font-semibold ">
                                                    0987556644
                                                </div>

                                                <div className="text-[13px] text-red-500 mt-1">
                                                    Chưa bật xác thực 2 lớp
                                                </div>
                                            </div>

                                            <span className="text-gray-400 text-xl">
                                                ›
                                            </span>
                                        </div>

                                        {/* Hồ sơ cửa hàng */}
                                        <div className="border-t border-gray-200">
                                            <button className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50">
                                                <span className="text-[15px] text-gray-700">
                                                    Hồ sơ cửa hàng
                                                </span>

                                                <span className="text-gray-400 text-xl">
                                                    ›
                                                </span>
                                            </button>
                                        </div>

                                        {/* Đăng xuất */}
                                        <div className="border-t border-gray-200">
                                            <button
                                                onClick={() => {
                                                    setShowProfile(false);
                                                    // xử lý đăng xuất ở đây
                                                }}
                                                className="w-full px-4 py-4 text-left text-[15px] text-gray-700 hover:bg-gray-50"
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {showFeedback && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                // onClick={() => setShowFeedback(false)}
                >
                    <div
                        className="w-[480px] bg-white rounded-xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header modal */}
                        <div className="px-4 py-4 flex items-center justify-between">
                            <h2 className="text-[18px] font-bold">
                                Góp ý về XuanTruong
                            </h2>

                            <button
                                onClick={() => setShowFeedback(false)}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="px-4">
                            <p className="text-sm mb-3">
                                Chọn tính năng bạn muốn góp ý
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Giao diện mới",
                                    "Bán online",
                                    "Quản lý hàng hóa",
                                    "Bán hàng",
                                    "Nhập hàng",
                                    "Kiểm kho",
                                    "Xem báo cáo",
                                    "Công nợ khách hàng",
                                    "Khác",
                                ].map((item) => {
                                    const isSelected = selectedFeedback.includes(item);
                                    return (
                                        <button key={item}
                                            onClick={() => {
                                                if (isSelected) {
                                                    // Bấm lại → bỏ chọn
                                                    setSelectedFeedback(
                                                        selectedFeedback.filter(
                                                            (feedback) => feedback !== item
                                                        )
                                                    );
                                                } else {
                                                    // Chưa chọn → thêm vào danh sách
                                                    setSelectedFeedback([
                                                        ...selectedFeedback,
                                                        item,
                                                    ]);
                                                }
                                            }}
                                            className={`px-3 py-2 rounded-full text-sm transition-colors ${isSelected
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>


                            <div className="mt-8">
                                <label className="text-sm">
                                    Chi tiết góp ý của bạn
                                </label>
                                <textarea className="w-full h-[100px] mt-2 border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 resize-none" />
                            </div>


                            <div className="mt-8">
                                <label className="text-sm">
                                    Chúng tôi có thể liên hệ với bạn qua số điện thoại nào?
                                </label>

                                <input
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    className="w-full mt-2 h-[40px] border border-gray-300 rounded-lg px-4 outline-none focus:border-blue-500"
                                />
                            </div>


                            <button className="w-full h-[40px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg mt-7 mb-4">
                                Gửi
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="border-t px-4 py-4 text-center text-sm text-gray-500">
                            Nếu bạn đang cần hỗ trợ gấp, hãy liên hệ{" "}
                            <strong>0813 559 551</strong>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminHeader;