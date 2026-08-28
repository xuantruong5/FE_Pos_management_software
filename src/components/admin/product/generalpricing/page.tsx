"use client";
import { Search, Plus, FileUp, FileDown, SlidersHorizontal, Settings, CircleHelp, FileSymlink, } from "lucide-react";
const generalpricing = () => {
    return (
        <div className="min-h-screen">
            <div className="px-30">     
                    <div className="h-full px-6 flex items-center justify-between">
                        {/* Bên trái */}
                        <div className="flex items-center">
                            <h1 className="text-[24px] font-bold text-gray-900">
                                Bảng giá chung
                            </h1>
                        </div>
                        {/* Thanh tìm kiếm */}
                        <div className="flex-1 max-w-[500px] ml-[10px]">
                            <div className="h-[40px] w-full border border-gray-300 rounded-lg flex items-center px-2 bg-white">
                                <Search size={18} className="text-gray-600 mr-2" />
                                <input type="text" placeholder="Theo mã, tên hàng"className="w-full outline-none text-[14px] text-gray-700 placeholder:text-gray-400" />
                            </div>
                        </div>

                        {/* Bên phải */}
                        <div className="flex items-center gap-2">
                            {/* Bảng giá */}
                            <button type="button" className="h-[40px] px-3 border border-blue-500 rounded-lg flex items-center gap-1.5 text-[17px] font-semibold  text-blue-600 hover:bg-blue-200 transition" >
                                <Plus size={18} />
                                <span>Bảng giá</span>
                            </button>

                            {/* Import */}
                            <button type="button" className="h-[40px] px-3 border border-gray-300 rounded-lg flex items-center gap-1.5 text-[17px] font-semibold text-gray-700 hover:bg-gray-200 transition">
                                <FileSymlink  size={18} />
                                <span>Import</span>
                            </button>

                            {/* Xuất file */}
                            <button type="button" className="h-[40px] px-3 border border-gray-300 rounded-lg flex items-center gap-1.5 text-[17px] font-semibold text-gray-700 hover:bg-gray-200 transition" >
                                <FileSymlink  size={18} />
                                <span>Xuất file</span>
                            </button>

                            {/* Danh sách / bộ lọc */}
                            <button type="button" className="w-[40px] h-[40px] border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 transition" >
                                <SlidersHorizontal size={18} />
                            </button>

                            {/* Cài đặt */}
                            <button type="button" className="w-[40px] h-[40px] border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 transition" >
                                <Settings size={18} />
                            </button>

                            {/* Trợ giúp */}
                            <button
                                type="button"
                                className="w-[40px] h-[40px] border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-200 transition">
                                <CircleHelp size={18} />
                            </button>
                        </div>
                    </div>
            </div>
            {/* HEADER */}


            {/* NỘI DUNG */}
            <div className="px-30">

            </div>

        </div>
    );
};

export default generalpricing;