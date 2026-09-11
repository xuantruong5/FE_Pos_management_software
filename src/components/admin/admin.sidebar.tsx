
"use client";
const AdminSidebar = () => {
    return (
        <aside className="w-full h-[49px] bg-[#0078F0] text-white mt-2">
            <div className="h-full flex items-center gap-2 px-40">
                <div className="flex items-center gap-2 px-5 h-[38px] rounded-lg bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold">
                    <span>Tổng quan</span>
                </div>
                <div className="relative group">

                    <div className="flex items-center gap-2 px-5 h-[38px] rounded-lg group-hover:bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold">
                        <span>Hàng hóa</span>
                    </div>

                    <div className="absolute top-[42px] left-0 w-[500px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:flex z-50">

                        {/* Cột trái */}
                        <div className="w-1/2 border-r border-gray-200">
                            <p className="px-4 pt-4 text-[13px] text-gray-400">
                                Hàng hóa
                            </p>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Danh sách hàng hóa
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Thiết lập giá
                            </div>
                        </div>

                        {/* Cột phải */}
                        <div className="w-1/2">
                            <p className="px-4 pt-4 text-[13px] text-gray-400">
                                Kho hàng
                            </p>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Kiểm kho
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Xuất dùng nội bộ
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Xuất hủy
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group">

                    <div className="flex items-center px-5 h-[38px] rounded-lg group-hover:bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold">
                        <span>Mua hàng</span>
                    </div>

                    <div className="absolute top-[42px] left-0 w-[750px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:flex z-50">
                        {/* Cột 1 */}
                        <div className="w-1/3 border-r border-gray-200">
                            <p className="px-4 pt-4 pb-2 text-[13px] font-semibold text-gray-400">
                                Nhà cung cấp
                            </p>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Nhà cung cấp
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer flex items-center justify-between">
                                <span>Hóa đơn đầu vào</span>
                                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                    Mới
                                </span>
                            </div>

                        </div>

                        {/* Cột 2 */}
                        <div className="w-1/3 border-r border-gray-200">
                            <p className="px-4 pt-4 pb-2 text-[13px] font-semibold text-gray-400">
                                Mua hàng
                            </p>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Nhập hàng
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Trả hàng nhập
                            </div>
                        </div>

                        {/* Cột 3 */}
                        <div className="w-1/3">
                            <p className="px-4 pt-4 pb-2 text-[13px] font-semibold text-gray-400">
                                Mua dịch vụ
                            </p>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer flex items-center justify-between">
                                <span>Mua dịch vụ</span>
                                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                    Mới
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Đơn hàng */}
                <div className="relative group">

                    {/* Button */}
                    <div className="  flex items-center px-5 h-[38px] rounded-lg cursor-pointer whitespace-nowrap font-bold group-hover:bg-[#0068D7] ">
                        <span>Đơn hàng</span>
                    </div>

                    {/* Dropdown */}
                    <div className=" absolute top-[42px] left-0 w-[250px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:block z-50 overflow-hidden ">

                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Đặt hàng
                        </div>

                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Hóa đơn
                        </div>

                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Trả hàng
                        </div>

                        <div className="border-t border-gray-200"></div>

                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Đối tác giao hàng
                        </div>

                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Vận đơn
                        </div>

                    </div>
                </div>

                {/* Khách hàng */}
                <div className="relative group">

                    {/* Button */}
                    <div className=" flex items-center px-5 h-[38px] rounded-lg group-hover:bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold ">
                        <span>Khách hàng</span>
                    </div>

                    <div className=" absolute top-[42px] left-0 w-[500px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:flex z-50 ">

                        {/* Cột trái */}
                        <div className="w-1/2 border-r border-gray-200">
                            <p className="px-4 pt-4 pb-2 text-[13px] font-semibold text-gray-400">
                                Khách hàng
                            </p>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Khách hàng
                            </div>
                        </div>

                        {/* Cột phải */}
                        <div className="w-1/2">

                            <p className="px-4 pt-4 pb-2 text-[13px] font-semibold text-gray-400">
                                Kênh tiếp cận
                            </p>
                            <div className=" px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer flex items-center justify-between ">
                                <span>Cửa hàng online trên Zalo</span>

                                <span className=" bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ">
                                    Mới
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Nhân viên */}
                <div className="relative group">

                    <div className=" flex items-center px-5 h-[38px] rounded-lg group-hover:bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold ">
                        <span>Nhân viên</span>
                    </div>

                    <div className=" absolute top-[42px] left-0 w-[250px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:block z-50 overflow-hidden ">
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Danh sách nhân viên
                        </div>
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Lịch làm việc
                        </div>
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Bảng chấm công
                        </div>
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Bảng lương
                        </div>
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Bảng hoa hồng
                        </div>
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Thiết lập nhân viên
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-5 h-[38px] rounded-lg hover:bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold">
                    <span>Sổ quỹ</span>
                </div>

                {/* Báo cáo */}
                <div className="relative group">
                    <div className=" flex items-center px-5 h-[38px] rounded-lg group-hover:bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold ">
                        <span>Báo cáo</span>
                    </div>

                    <div className=" absolute top-[42px] left-0 w-[500px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:flex z-50 overflow-hidden ">

                        {/* Cột trái */}
                        <div className="w-1/2">
                            <p className=" px-4 pt-4 pb-2 text-[13px] font-semibold text-gray-400 ">
                                Báo cáo
                            </p>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Cuối ngày
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Bán hàng
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Đặt hàng
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Hàng hóa
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Khách hàng
                            </div>
                        </div>

                        {/* Cột phải */}
                        <div className="w-1/2 pt-[45px]">
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Nhà cung cấp
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Nhân viên
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Kênh bán hàng
                            </div>
                            <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                Tài chính
                            </div>
                        </div>
                    </div>
                </div>



                <div className="relative group">
                    <div className=" flex items-center px-5 h-[38px] rounded-lg group-hover:bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold ">
                        <span>Bán online</span>
                    </div>
                    <div className=" absolute top-[42px] left-0 w-[250px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:block z-50 overflow-hidden ">
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Bán online
                        </div>
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Website bán hàng
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div className=" flex items-center px-5 h-[38px] rounded-lg group-hover:bg-[#0068D7] cursor-pointer whitespace-nowrap font-bold ">
                        <span>Thuế & Kế Toán</span>
                    </div>
                    <div className=" absolute top-[42px] left-0 w-[250px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:block z-50 overflow-hidden ">
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Thuế & Kế Toán
                        </div>
                        <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                            Hóa đơn điện tử
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
};

export default AdminSidebar;