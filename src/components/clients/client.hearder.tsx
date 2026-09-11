"use client"

import { useState } from "react"
import { usePosStore } from "@/store/pos.store"
import { ScanBarcode, CirclePlus, ArrowLeftRight, X, CircleChevronDown, ChevronDown, Handbag, ChartPie, Repeat, FilePenLine, FileInput, Eye, LogOut, WifiIcon } from 'lucide-react';
import { InformationCircle, Printer, ShoppingBag } from "heroicons-react";
import ReplyIcon from '@mui/icons-material/Reply';
import LoopIcon from '@mui/icons-material/Loop';
import MenuIcon from '@mui/icons-material/Menu';
import { InsertChart } from "@mui/icons-material";

const ClientHeader = () => {
    const {
        addInvoice,
        deleteInvoice,
        addOrder,
        invoices,
        currentInvoiceId,
        toggleOrderType,
        switchInvoice,
    } = usePosStore()

    const [tempQty, setTempQty] = useState("1")
    const currentInvoice = invoices.find(inv => inv.id === currentInvoiceId)

    const [isEditingBox, setIsEditingBox] = useState(false)
    const [boxValue, setBoxValue] = useState("")
    const [openMenu, setOpenMenu] = useState(false)
    const [isMainMenuOpen, setIsMainMenuOpen] = useState(false)
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false) // xử lý đặt hàng
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false); // xử lý trả hàng 
    const [isOrderActionModalOpen, setIsOrderActionModalOpen] = useState(false); // đồng bộ 






    // Tính Trang và dữ liệu của xử lý đơn hàng và trả hàng 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const orders = Array.from({ length: 25 }, (_, i) => ({
        id: `DH${String(i + 1).padStart(3, "0")}`,
        time: "19/04/2026 10:00",
        staff: `NV ${i + 1}`, // đây là của trả hàng 
        type: i % 3 === 0 ? "Hóa đơn" : i % 3 === 1 ? "Trả hàng" : "Đặt hàng", // đây là của đồng bộ 
        customer: `Khách ${i + 1}`,
        total: (Math.random() * 1000000).toFixed(0),
        status: i % 2 === 0 ? "Hoàn thành" : "Đang xử lý",
        note: "Ghi chú...jhsdjahsdjhasjdhashdjasasassadasdsadasdasdsad",
    }));



    // TÍNH PAGE
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const currentData = orders.slice(start, start + itemsPerPage);









    const handleBlur = () => {
        const num = Number(tempQty)
        // Quantity handling moved to product management
    }

    const handleBoxBlur = () => {
        setIsEditingBox(false)
    }
    const currentIndex = invoices.findIndex(
        (inv) => inv.id === currentInvoiceId
    )
    const getIndex = (type, id) => {
        return (
            invoices
                .filter(i => i.orderType === type)
                .findIndex(i => i.id === id) + 1
        )
    }


    return (
        <div className="flex items-center gap-3 bg-blue-600 px-4 py-3 text-white">

            <input
                placeholder="Tìm hàng hóa (F3)"
                className="bg-white text-black px-3 py-2 rounded w-[300px] outline-none"
            />

            {!isEditingBox ? (
                <div
                    onClick={() => setIsEditingBox(true)}
                    className="0 p-2 rounded cursor-pointer flex items-center justify-center w-[40px]"
                >
                    <ScanBarcode />
                </div>
            ) : (
                <input
                    autoFocus
                    value={boxValue}
                    onChange={(e) => setBoxValue(e.target.value)}
                    onBlur={handleBoxBlur}
                    onClick={() => setIsEditingBox(false)}
                    onKeyDown={(e) => e.key === "Enter" && handleBoxBlur()}
                    className="bg-white text-black px-2 py-2 rounded w-[80px] outline-none"

                />
            )}

            <div className="flex items-center gap-2">
                {invoices.map((inv, index) => {
                    const isActive = inv.id === currentInvoiceId


                    return (
                        <div
                            key={inv.id}
                            onClick={() => switchInvoice(inv.id)}
                            className={`relative group flex items-center px-3 py-2 rounded  cursor-pointer
                            ${isActive ? "bg-white text-black" : "bg-blue-500 text-white"}`}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleOrderType(inv.id)
                                }}
                            >
                                <ArrowLeftRight className="text-blue-500 mr-2" />
                            </button>

                            <span className={`font-semibold ${inv.orderType !== "invoice" ? "text-yellow-500" : ""}`}>
                                {inv.orderType === "invoice"
                                    ? `Hóa đơn ${getIndex("invoice", inv.id)}`
                                    : `Đặt hàng ${getIndex("order", inv.id)}`
                                }
                            </span>


                            <div className="absolute top-full mt-1 left-0 
                                bg-white text-black text-xs px-2 py-1 rounded shadow
                                opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">

                                {inv.orderType === "invoice"
                                    ? "Chuyển sang Đặt hàng"
                                    : "Chuyển sang Hóa đơn"}
                            </div>

                            <X
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteInvoice(inv.id)
                                }}
                                className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
                            />
                        </div>
                    )
                })}

                <button onClick={addInvoice} className="px-3 py-2 rounded">
                    <CirclePlus />
                </button>
            </div>

            <div className="relative">
                <button
                    onClick={() => setOpenMenu(!openMenu)}
                    className="py-2 rounded"
                >
                    <ChevronDown />
                </button>

                {openMenu && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded shadow z-50 w-[180px]">
                        <div
                            onClick={() => {
                                addOrder()
                                setOpenMenu(false)
                            }}
                            className="px-3 py-2 hover:bg-blue-50 text-sm rounded flex items-center gap-2"
                        >
                            Thêm mới đặt hàng
                        </div>
                    </div>
                )}
            </div>

            <div className="ml-auto flex gap-4 items-center">
                <div onClick={() => {
                    setIsOrderModalOpen(true)
                    setIsMainMenuOpen(false)
                }}>
                    <span> < ShoppingBag size={32} /> </span>
                </div>
                <div onClick={() => {
                    setIsReturnModalOpen(true)
                    setIsMainMenuOpen(false)
                }}>
                    <span><ReplyIcon size={32} /></span>
                </div>
                <div onClick={() => {
                    setIsOrderActionModalOpen(true)
                    setIsMainMenuOpen(false)
                }}>
                    <span><Repeat size={25} /></span>
                </div>
                <span><Printer size={32} /></span>

                <span className="font-semibold">0987654321</span>

                <div className="relative">
                    <span
                        onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
                        className="cursor-pointer"
                    >
                        <MenuIcon style={{ fontSize: 32 }} />
                    </span>

                    {isMainMenuOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-xl shadow-xl z-50 p-2">

                            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <ChartPie size={18} /> Xem báo cáo cuối ngày
                            </div>

                            <div
                                onClick={() => {
                                    setIsOrderModalOpen(true)
                                    setIsMainMenuOpen(false)
                                }}
                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                            >
                                <ShoppingBag size={18} /> Xử lý đặt hàng
                            </div>
                            <div
                                onClick={() => {
                                    setIsReturnModalOpen(true)
                                    setIsMainMenuOpen(false)
                                }}
                                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <ReplyIcon fontSize="small" /> Chọn hóa đơn trả hàng
                            </div>

                            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <FilePenLine size={18} /> Lập phiếu thu
                            </div>

                            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <FileInput size={18} /> Import file
                            </div>

                            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <Eye size={18} /> Tùy chọn hiển thị
                            </div>

                            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <InformationCircle size={18} /> Phím tắt
                            </div>

                            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                <InsertChart size={18} /> Quản lý
                            </div>

                            <div className="border-t my-1"></div>

                            <div className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 text-red-500 rounded cursor-pointer">
                                <LogOut size={18} /> Đăng xuất
                            </div>

                        </div>
                    )}

                </div>

            </div>
            {isOrderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="relative bg-white w-[1500px]  rounded-xl shadow-lg p-4 z-10 ">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-lg font-semibold text-black ">Xử lý đặt hàng</h2>
                            <span onClick={() => setIsOrderModalOpen(false)}
                                className="cursor-pointer text-gray-500 hover:text-red-500 text-black">
                                ✕
                            </span>
                        </div>

                        <div className="flex mt-4 h-full ">
                            <div className="w-[260px] space-y-4 rounded-xl">
                                <div className="bg-white border border-gray-200 rounded p-5 shadow-sm rounded-lg ml-4 ">
                                    <p className="font-semibold mb-2 text-black">Tìm kiếm</p>
                                    <input
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo mã đặt hàng"
                                    />
                                    <input
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo khách hàng"
                                    />
                                    <input
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo ghi chú"
                                    />
                                    <input
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo mã hàng"
                                    />
                                    <input
                                        className="w-full border-b mb-3 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo tên hàng"
                                    />
                                </div>
                                <div className="bg-white border border-gray-200 rounded p-5 shadow-sm rounded-lg ml-4">
                                    <p className="font-semibold mb-2 text-black">Thời gian</p>
                                    <input
                                        type="date"
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500"
                                    />
                                    <input
                                        type="date"
                                        className="w-full border-b mb-3 outline-none bg-transparent text-gray-500"
                                    />
                                </div>
                            </div>
                            <div className="w-full space-y-4 overflow-x-auto">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm ml-4 overflow-hidden ">
                                    <div className="bg-blue-500 text-white font-semibold px-6 py-4 
                                        grid grid-cols-[120px_150px_150px_120px_150px_1fr] text-base font-extrabold">
                                        <span>Mã Đặt Hàng</span>
                                        <span>Thời Gian</span>
                                        <span>Khách Hàng</span>
                                        <span className="text-right">Tổng Cộng</span>
                                        <span className="text-center">Trạng Thái</span>
                                        <span>Ghi Chú</span>
                                    </div>
                                    {currentData.map((item, index) => (
                                        <div key={index}
                                            className="grid grid-cols-[120px_150px_150px_120px_150px_1fr] 
                                            px-6 py-3 text-sm border-b hover:bg-gray-50 text-black" >
                                            <span>{item.id}</span>
                                            <span>{item.time}</span>
                                            <span>{item.customer}</span>
                                            <span className="text-right text-green-600">
                                                {Number(item.total).toLocaleString()}đ
                                            </span>
                                            <span className="text-center">
                                                <span
                                                    className={`px-2 py-1 rounded text-xs ${item.status === "Hoàn thành"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </span>
                                            <span>{item.note}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-center gap-2 px-6 py-3 text-black">

                                        {/* Về trang đầu */}
                                        <button
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            ⏮
                                        </button>

                                        {/* Trang trước */}
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            ◀
                                        </button>

                                        {/* Danh sách số trang */}
                                        <div className="flex gap-2">
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`px-3 py-1 rounded border ${currentPage === i + 1
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-white hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Trang sau */}
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            ▶
                                        </button>

                                        {/* Về trang cuối */}
                                        <button
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            ⏭
                                        </button>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            )}
            {isReturnModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center " >
                    <div className="relative bg-white w-[1500px]  rounded-xl shadow-lg p-4 z-10">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-lg font-semibold text-black ml-6  ">Chọn hóa đơn trả hàng</h2>
                            <span onClick={() => setIsReturnModalOpen(false)}
                                className="cursor-pointer text-gray-500 hover:text-red-500 text-black">
                                ✕
                            </span>
                        </div>
                        <div className="flex mt-5 ">
                            <div className="w-[270px] space-y-4 rounded-xl">
                                <div className="bg-white border border-gray-200 rounded p-5 shadow-sm rounded-lg ml-4 ">
                                    <p className="font-semibold mb-2 text-black">Tìm kiếm</p>
                                    <input
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo mã hóa đơn"
                                    />
                                    <input
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo mã vận đơn bán"
                                    />
                                    <input
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo khách hành hoặc ĐT"
                                    />
                                    <input
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo mã hàng"
                                    />
                                    <input
                                        className="w-full border-b mb-3 outline-none bg-transparent text-gray-500 mt-4"
                                        placeholder="Theo tên hàng"
                                    />
                                </div>
                                <div className="bg-white border border-gray-200 rounded p-5 shadow-sm rounded-lg ml-4 mt-10">
                                    <p className="font-semibold mb-2 text-black">Thời gian</p>
                                    <input
                                        type="date"
                                        className="w-full border-b mb-2 outline-none bg-transparent text-gray-500"
                                        placeholder="Từ Ngày"
                                    />
                                    <input
                                        type="date"
                                        className="w-full border-b mb-3 outline-none bg-transparent text-gray-500"
                                        placeholder="Đến Ngày"
                                    />
                                </div>
                            </div>
                            <div className="w-full space-y-4 overflow-x-auto">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm ml-4 overflow-hidden">
                                    <div className="bg-blue-500 text-white font-semibold px-6 py-4 
                                        grid grid-cols-[repeat(5,minmax(0,1fr))_auto] text-base font-extrabold w-full">
                                        <span>Mã hóa đơn</span>
                                        <span>Thời gian</span>
                                        <span>Nhân viên</span>
                                        <span>Khách hàng</span>
                                        <span>Tổng cộng</span>
                                        <span></span>
                                    </div>
                                    {currentData.map((item, index) => (
                                        <div key={index} className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] px-6 py-3 border-t items-center text-black">
                                            <span className="truncate">{item.id}</span>
                                            <span className="truncate">{item.time}</span>
                                            <span className="truncate">{item.staff}</span>
                                            <span className="truncate">{item.customer}</span>
                                            <span>{Number(item.total).toLocaleString()} đ</span>

                                            <button className="bg-white border border-gray-300 text-black px-3 py-1 rounded whitespace-nowrap mx-auto block">
                                                Chọn
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-center gap-2 px-6 py-3 text-black">

                                        {/* Về trang đầu */}
                                        <button
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            ⏮
                                        </button>

                                        {/* Trang trước */}
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            ◀
                                        </button>

                                        {/* Danh sách số trang */}
                                        <div className="flex gap-2">
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    className={`px-3 py-1 rounded border ${currentPage === i + 1
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-white hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Trang sau */}
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            ▶
                                        </button>

                                        {/* Về trang cuối */}
                                        <button
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            ⏭
                                        </button>
                                    </div>


                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            )}
            {isOrderActionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white w-[900px] rounded-xl shadow-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-black">Đồng bộ phiếu</h2>
                            <button onClick={() => setIsOrderActionModalOpen(false)}
                                className="cursor-pointer text-gray-500 hover:text-red-500 text-black">
                                ✕
                            </button>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-black font-bold">Loại phiếu</span>
                                <select className="border px-3 py-1.5 rounded-md text-sm bg-gray-100 text-black">
                                    <option>--Tất cả--</option>
                                    <option>Hóa đơn</option>
                                    <option>Trả hàng</option>
                                    <option>Đặt hàng</option>
                                </select>
                            </div>
                            <div className="text-sm text-blue-600 flex items-center gap-1">
                                <span className="text-black font-bold">Trạng thái kết nối:</span>
                                <span className="font-medium">Có Internet</span>
                                <WifiIcon />
                            </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden mt-6">
                            <div className="bg-blue-500 text-white px-4 py-2 grid grid-cols-[1fr_1fr_1.5fr_1fr_auto] font-semibold text-sm">
                                <span>Loại phiếu</span>
                                <span>Mã phiếu</span>
                                <span>Thời gian</span>
                                <span>Giá trị</span>
                                <span></span>
                            </div>
                            {currentData.map((item, index) => (
                                <div key={index}
                                    className="grid grid-cols-[1fr_1fr_1.5fr_1fr_auto] px-4 py-3 border-b text-sm items-center text-black">
                                    <span>{item.type}</span>
                                    <span>{item.id}</span>
                                    <span>{item.time}</span>
                                    <span>{Number(item.total).toLocaleString()} đ</span>
                                    <button className="bg-white border border-gray-300 text-black px-3 py-1 rounded whitespace-nowrap mx-auto block">
                                        Đồng bộ
                                    </button>
                                </div>
                            ))}
                            <div className="flex items-center justify-center gap-2 px-6 py-3 text-black">

                                {/* Về trang đầu */}
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    ⏮
                                </button>

                                {/* Trang trước */}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    ◀
                                </button>

                                {/* Danh sách số trang */}
                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-3 py-1 rounded border ${currentPage === i + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-white hover:bg-gray-100"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* Trang sau */}
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    ▶
                                </button>

                                {/* Về trang cuối */}
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    ⏭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}

export default ClientHeader