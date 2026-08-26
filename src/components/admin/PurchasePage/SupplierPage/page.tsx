"use client";
import { CalendarDays, ChevronDown, ChevronRight, ChevronUp, CircleDollarSign, CircleHelp, FileDown, FileInput, FileSymlink, FileUp, List, Lock, LockKeyhole, PencilLine, Plus, Search, Settings, SlidersHorizontal, SquarePen, Trash2, X } from "lucide-react";
import React, { useState } from "react";

import * as XLSX from "xlsx";

const SupplierPage = () => {
    const [showFilter, setShowFilter] = useState(false);
    const columns = [
        "Mã nhà cung cấp",
        "Tên nhà cung cấp",
        "Điện thoại",
        "Nhóm nhà cung cấp",
        "Email",
        "Địa chỉ",
        "Khu vực",
        "Phường/Xã",
        "Công ty",
        "Ghi chú",
        "Mã số thuế",
        "Số CCCD/CMND",
        "Người tạo",
        "Ngày tạo",
        "Nợ cần trả hiện tại",
        "Tổng mua",
        "Tổng mua trừ trả hàng",
        "Trạng thái",
    ];
    const [showColumns, setShowColumns] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(columns);

    // nút tích
    const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);


    // tạo mới của nhóm 
    const [showAddGroupModal, setShowAddGroupModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupNote, setGroupNote] = useState("");

    // nhóm nhà cung cấp 
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState("Tất cả các nhóm");

    // toàn thời gian 
    const [showCreatedPicker, setShowCreatedPicker] = useState(false);
    const [createdTime, setCreatedTime] = useState("all");
    const [showCreatedCustomPicker, setShowCreatedCustomPicker] = useState(false);
    const [createdFromDate, setCreatedFromDate] = useState("");
    const [createdToDate, setCreatedToDate] = useState("");

    // trạng thái 
    const [selectedStatus, setSelectedStatus] = useState("Đang hoạt động");

    // dữ liệu 
    const suppliers = [
        {
            id: 1,
            code: "NCC0002",
            name: "Công ty Hoàng Gia",
            phone: "0905123456",
            email: "hoanggia@gmail.com",
            debt: 0,
            totalBuy: 0,
        },
        {
            id: 2,
            code: "NCC0003",
            name: "Công ty Pharmedic",
            phone: "0912345678",
            email: "pharmedic@gmail.com",
            debt: 0,
            totalBuy: 0,
        },
        {
            id: 3,
            code: "NCC0004",
            name: "Đại lý Hồng Phúc",
            phone: "0987654321",
            email: "hongphuc@gmail.com",
            debt: 3600000,
            totalBuy: 4260000,
        },
        {
            id: 4,
            code: "NCC0005",
            name: "Cửa hàng Đại Việt",
            phone: "0935123456",
            email: "daiviet@gmail.com",
            debt: 0,
            totalBuy: 0,
        },
        {
            id: 5,
            code: "NCC0001",
            name: "Công ty TNHH Citigo",
            phone: "0909123456",
            email: "citigo@gmail.com",
            debt: 0,
            totalBuy: 0,
        },
        {
            id: 6,
            code: "NCC0006",
            name: "Công ty Minh Long",
            phone: "0911223344",
            email: "minhlong@gmail.com",
            debt: 1250000,
            totalBuy: 5800000,
        },
        {
            id: 7,
            code: "NCC0007",
            name: "Công ty Thành Công",
            phone: "0922334455",
            email: "thanhcong@gmail.com",
            debt: 0,
            totalBuy: 3200000,
        },
        {
            id: 8,
            code: "NCC0008",
            name: "Nhà phân phối An Khang",
            phone: "0933445566",
            email: "ankhang@gmail.com",
            debt: 850000,
            totalBuy: 4500000,
        },
        {
            id: 9,
            code: "NCC0009",
            name: "Công ty Dược Việt Nam",
            phone: "0944556677",
            email: "duocvietnam@gmail.com",
            debt: 0,
            totalBuy: 7200000,
        },
        {
            id: 10,
            code: "NCC0010",
            name: "Công ty Phú Quý",
            phone: "0955667788",
            email: "phuquy@gmail.com",
            debt: 2100000,
            totalBuy: 6500000,
        },
        {
            id: 11,
            code: "NCC0011",
            name: "Đại lý Tân Phát",
            phone: "0966778899",
            email: "tanphat@gmail.com",
            debt: 0,
            totalBuy: 2800000,
        },
        {
            id: 12,
            code: "NCC0012",
            name: "Công ty Hưng Thịnh",
            phone: "0977889900",
            email: "hungthinh@gmail.com",
            debt: 1500000,
            totalBuy: 5100000,
        },
        {
            id: 13,
            code: "NCC0013",
            name: "Cửa hàng Nhật Minh",
            phone: "0988990011",
            email: "nhatminh@gmail.com",
            debt: 0,
            totalBuy: 1900000,
        },
        {
            id: 14,
            code: "NCC0014",
            name: "Công ty Bình Minh",
            phone: "0901234567",
            email: "binhminh@gmail.com",
            debt: 750000,
            totalBuy: 3900000,
        },
        {
            id: 15,
            code: "NCC0015",
            name: "Nhà thuốc An Tâm",
            phone: "0913456789",
            email: "antam@gmail.com",
            debt: 0,
            totalBuy: 2400000,
        },
        {
            id: 16,
            code: "NCC0016",
            name: "Công ty Gia Phát",
            phone: "0924567890",
            email: "giaphat@gmail.com",
            debt: 3200000,
            totalBuy: 8400000,
        },
        {
            id: 17,
            code: "NCC0017",
            name: "Đại lý Hoàng Nam",
            phone: "0935678901",
            email: "hoangnam@gmail.com",
            debt: 0,
            totalBuy: 3600000,
        },
        {
            id: 18,
            code: "NCC0018",
            name: "Công ty Kim Thành",
            phone: "0946789012",
            email: "kimthanh@gmail.com",
            debt: 950000,
            totalBuy: 4700000,
        },
        {
            id: 19,
            code: "NCC0019",
            name: "Công ty Đức Minh",
            phone: "0957890123",
            email: "ducminh@gmail.com",
            debt: 0,
            totalBuy: 5300000,
        },
        {
            id: 20,
            code: "NCC0020",
            name: "Cửa hàng Phúc Lộc",
            phone: "0968901234",
            email: "phucloc@gmail.com",
            debt: 1800000,
            totalBuy: 6200000,
        },
        {
            id: 21,
            code: "NCC0021",
            name: "Công ty Nam Việt",
            phone: "0979012345",
            email: "namviet@gmail.com",
            debt: 0,
            totalBuy: 4100000,
        },
        {
            id: 22,
            code: "NCC0022",
            name: "Đại lý Thành Đạt",
            phone: "0980123456",
            email: "thanhdat@gmail.com",
            debt: 600000,
            totalBuy: 3100000,
        },
        {
            id: 23,
            code: "NCC0023",
            name: "Công ty Đại Phát",
            phone: "0902345678",
            email: "daiphat@gmail.com",
            debt: 2750000,
            totalBuy: 7900000,
        },
        {
            id: 24,
            code: "NCC0024",
            name: "Nhà phân phối Việt Anh",
            phone: "0914567890",
            email: "vietanh@gmail.com",
            debt: 0,
            totalBuy: 5600000,
        },
        {
            id: 25,
            code: "NCC0025",
            name: "Công ty Phương Nam",
            phone: "0925678901",
            email: "phuongnam@gmail.com",
            debt: 1100000,
            totalBuy: 6800000,
        },
    ];

    // phân trang 
    const [pageSize, setPageSize] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = suppliers.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const currentSuppliers = suppliers.slice(startIndex, endIndex);

    // thêm nhà cung cấp 
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [openAddress, setOpenAddress] = useState(true);
    const [openSupplierGroup, setOpenSupplierGroup] = useState(true);
    const [openInvoice, setOpenInvoice] = useState(true);

    // xuất file excel 
    const handleExportExcel = () => {
        // Chuyển dữ liệu nhà cung cấp sang dữ liệu Excel
        const data = suppliers.map((supplier, index) => ({
            "STT": index + 1,
            "Mã nhà cung cấp": supplier.code,
            "Tên nhà cung cấp": supplier.name,
            "Điện thoại": supplier.phone,
            "Email": supplier.email,
            "Nợ cần trả hiện tại": supplier.debt,
            "Tổng mua": supplier.totalBuy,
        }));
        // Tạo worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        // Tạo workbook
        const workbook = XLSX.utils.book_new();
        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Nhà cung cấp"
        );
        // Độ rộng các cột
        worksheet["!cols"] = [
            { wch: 6 },
            { wch: 20 },
            { wch: 30 },
            { wch: 16 },
            { wch: 30 },
            { wch: 22 },
            { wch: 18 },
        ];
        // Xuất file
        XLSX.writeFile(
            workbook,
            `danh-sach-nha-cung-cap-${new Date().toISOString().slice(0, 10)}.xlsx`
        );
    };

    // Nhà cung cấp đang được mở chi tiết
    const [expandedSupplierId, setExpandedSupplierId] = useState<number | null>(null);
    // Tab chi tiết
    const [supplierDetailTab, setSupplierDetailTab] = useState<"info" | "history" | "debt">("info");

    // chỉnh sửa 
    const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);
    const [editSupplier, setEditSupplier] = useState<any>(null);

    const [editForm, setEditForm] = useState({
        name: "",
        code: "",
        phone: "",
        email: "",
        address: "",
        province: "",
        ward: "",
        supplierGroup: "",
        note: "",
        companyName: "",
        taxCode: "",
        citizenId: "",
    })
    // lịch sử nhập xuất 
    const historyData = [
        {
            code: "PN000045",
            time: "23/08/2026 13:03",
            creator: "tramy",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN000044",
            time: "22/08/2026 13:03",
            creator: "Hương - Kế Toán",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN000040",
            time: "18/08/2026 12:58",
            creator: "Hoàng - Kinh Doanh",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN000021",
            time: "30/07/2026 12:38",
            creator: "tramy",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN000011",
            time: "20/07/2026 12:27",
            creator: "Hương - Kế Toán",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN00009",
            time: "18/07/2026 12:26",
            creator: "Hoàng - Kinh Doanh",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN00008",
            time: "17/07/2026 12:24",
            creator: "tramy",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN00005",
            time: "14/07/2026 12:21",
            creator: "tramy",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN00004",
            time: "13/07/2026 12:20",
            creator: "Hoàng - Kinh Doanh",
            total: "0",
            status: "Đã nhập hàng",
        },
        {
            code: "PN00003",
            time: "12/07/2026 12:19",
            creator: "Hoàng - Kinh Doanh",
            total: "0",
            status: "Đã nhập hàng",
        },
    ];

    const debtData = [
        {
            code: "PN000045",
            time: "23/08/2026 13:05",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN000044",
            time: "22/08/2026 13:03",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN000040",
            time: "18/08/2026 12:59",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN000021",
            time: "30/07/2026 12:38",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN000011",
            time: "20/07/2026 12:28",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN00009",
            time: "18/07/2026 12:27",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN00008",
            time: "17/07/2026 12:26",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN00005",
            time: "14/07/2026 12:22",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN00004",
            time: "13/07/2026 12:21",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
        {
            code: "PN00003",
            time: "12/07/2026 12:20",
            type: "Nhập hàng",
            value: "0",
            debt: "0",
        },
    ];





    return (
        <div className="min-h-screen ">
            <div className="px-30">
                <div className="h-[60px] flex items-center px-9 gap-5">
                    <div className="w-[240px] shrink-0">
                        <h1 className="text-[23px] font-bold text-gray-900">
                            Nhà cung cấp
                        </h1>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-[545px]">
                            {/* Thanh tìm kiếm */}
                            <div className="w-full h-[40px] border border-gray-300 rounded-lg flex items-center px-3 bg-white">
                                <Search size={21} className="text-gray-500 mr-2" />

                                <input type="text" placeholder="Theo mã, tên hàng"
                                    className="flex-1 outline-none text-[16px] text-gray-700 placeholder:text-gray-400" />

                                <button type="button" onClick={() => setShowFilter(!showFilter)}
                                    className={`w-[28px] h-[28px] rounded-full flex items-center justify-center ${showFilter ? "bg-gray-200" : "hover:bg-gray-100"}`} >
                                    <SlidersHorizontal size={19} className="text-gray-700" />
                                </button>
                            </div>
                            {/* Popup */}
                            {showFilter && (
                                <div className="absolute top-[46px] left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-[100]" >
                                    {/* Nội dung */}
                                    <div className="p-4">
                                        <input type="text" placeholder="Theo mã, tên hàng"
                                            className="w-full h-[40px] px-3 mb-[10px] border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500" />
                                        <input type="text" placeholder="Theo ghi chú, mô tả đặt hàng"
                                            className="w-full h-[40px] px-3 border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500" />

                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-gray-200 p-3 flex justify-end">
                                        <button type="button"
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    {selectedSuppliers.length > 0 ? (
                        <div className="ml-auto flex items-center gap-3">
                            <span className="text-[14px] font-medium text-gray-700">
                                Đã chọn {selectedSuppliers.length}
                            </span>

                            {/* Bỏ chọn */}
                            <button type="button" onClick={() => setSelectedSuppliers([])}
                                className="w-[32px] h-[32px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600" >
                                <X size={18} />
                            </button>

                            {/* Xóa */}
                            <button type="button" onClick={() => { console.log("Xóa:", selectedSuppliers); }}
                                className="h-[40px] px-3.5 rounded-lg border border-gray-300 bg-white flex items-center gap-1.5 text-[14px] text-gray-700 hover:bg-gray-200">
                                <Trash2 size={17} />
                                Xóa
                            </button>

                        </div>
                    ) : (

                        <div className="ml-auto flex items-center gap-2">
                            <button onClick={() => setShowSupplierModal(true)} className="h-[40px] px-3.5 rounded-lg border border-blue-600 text-blue-600 bg-white flex items-center gap-1.5 text-[17px] font-semibold hover:bg-blue-100">
                                <Plus size={18} />
                                Nhà cung cấp
                            </button>


                            <button className="h-[40px] px-3.5 rounded-lg border border-gray-350 bg-white flex items-center gap-1.5 text-[17px] text-gray-700 font-semibold hover:bg-gray-200" >
                                <FileUp size={17} />
                                Import file
                            </button>

                            <button type="button" onClick={handleExportExcel} className="h-[40px] px-3.5 rounded-lg border border-gray-300 bg-white flex items-center gap-1.5 text-[17px] text-gray-700 font-semibold hover:bg-gray-200" >
                                <FileInput size={17} />
                                Xuất file
                            </button>
                            <div className="relative">
                                <button type="button" onClick={() => setShowColumns(!showColumns)}
                                    className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                                    <List size={21} />
                                </button>
                                {showColumns && (
                                    <div className="absolute top-[46px] right-0 w-[255px] bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] p-3">
                                        <div className="grid grid-cols-1">
                                            {columns.map((column) => (
                                                <label key={column} className="flex items-center gap-2 h-[36px] cursor-pointer text-[15px] text-gray-700">
                                                    <input type="checkbox" checked={selectedColumns.includes(column)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedColumns([
                                                                    ...selectedColumns,
                                                                    column,
                                                                ]);
                                                            } else {
                                                                setSelectedColumns(
                                                                    selectedColumns.filter(
                                                                        (item) => item !== column
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                        className="w-[16px] h-[16px] accent-blue-600 cursor-pointer" />
                                                    <span>{column}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200">
                                <Settings size={18} />
                            </button>
                            <button
                                className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200">
                                <CircleHelp size={18} />
                            </button>

                        </div>
                    )}
                    {showSupplierModal && (
                        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
                            <div className="w-[960px] max-h-[90vh] bg-white rounded-xl shadow-xl flex flex-col">
                                {/* Header */}
                                <div className="h-[62px] px-6  flex items-center justify-between mt-6">
                                    <h2 className="text-[20px] font-semibold text-gray-900">
                                        Tạo nhà cung cấp
                                    </h2>
                                    <button onClick={() => setShowSupplierModal(false)} className="text-gray-500 hover:text-red-800" >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-6 overflow-y-auto">
                                    {/* Tên + Mã */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[14px] text-gray-700 mb-1.5">
                                                Tên nhà cung cấp
                                            </label>
                                            <input type="text" placeholder="Bắt buộc" className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500" />
                                        </div>

                                        <div>
                                            <label className="block text-[14px] text-gray-700 mb-1.5">
                                                Mã nhà cung cấp
                                            </label>
                                            <input type="text" placeholder="Tự động" disabled className="w-full h-[40px] px-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500" />
                                        </div>

                                    </div>

                                    {/* Điện thoại + Email */}
                                    <div className="grid grid-cols-2 gap-6 mt-5">
                                        <div>
                                            <label className="block text-[14px] text-gray-700 mb-1.5">
                                                Điện thoại
                                            </label>

                                            <input type="text" className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500" />
                                        </div>

                                        <div>
                                            <label className="block text-[14px] text-gray-700 mb-1.5">
                                                Email
                                            </label>
                                            <input type="email" placeholder="email@gmail.com" className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500" />
                                        </div>

                                    </div>
                                    {/* Địa chỉ */}
                                    <div className="mt-5 border border-gray-200 rounded-lg">
                                        <button type="button" onClick={() => setOpenAddress(!openAddress)} className="w-full px-4 py-3.5 flex items-center justify-between" >
                                            <h3 className="font-semibold text-[15px]">
                                                Địa chỉ
                                            </h3>
                                            {openAddress
                                                ? <ChevronUp size={18} />
                                                : <ChevronDown size={18} />
                                            }
                                        </button>
                                        {openAddress && (
                                            <div className="px-4 pb-4">
                                                <label className="block text-[14px] text-gray-700 mb-1.5">
                                                    Địa chỉ
                                                </label>
                                                <input type="text" placeholder="Nhập địa chỉ" className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500" />
                                                <div className="grid grid-cols-2 gap-6 mt-4">
                                                    <div>
                                                        <label className="block text-[14px] text-gray-700 mb-1.5">
                                                            Khu vực
                                                        </label>
                                                        <input type="text" placeholder="Chọn Tỉnh/Thành phố" className="w-full h-[40px] px-3 rounded-lg border border-gray-300" />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[14px] text-gray-700 mb-1.5">
                                                            Phường/Xã
                                                        </label>
                                                        <input type="text" placeholder="Chọn Phường/Xã" className="w-full h-[40px] px-3 rounded-lg border border-gray-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* Nhóm nhà cung cấp */}
                                    <div className="mt-5 border border-gray-200 rounded-lg">
                                        <button type="button" onClick={() => setOpenSupplierGroup(!openSupplierGroup)} className="w-full px-4 py-3.5 flex items-center justify-between" >
                                            <h3 className="font-semibold text-[15px]">
                                                Nhóm nhà cung cấp, ghi chú
                                            </h3>
                                            {openSupplierGroup
                                                ? <ChevronUp size={18} />
                                                : <ChevronDown size={18} />
                                            }
                                        </button>
                                        {openSupplierGroup && (
                                            <div className="px-4 pb-4">
                                                <label className="block text-[14px] text-gray-700 mb-1.5">
                                                    Nhóm nhà cung cấp
                                                </label>
                                                <input type="text" placeholder="Chọn nhóm nhà cung cấp" className="w-full h-[40px] px-3 rounded-lg border border-gray-300" />
                                                <label className="block text-[14px] text-gray-700 mb-1.5 mt-4">
                                                    Ghi chú
                                                </label>
                                                <textarea placeholder="Nhập ghi chú" className="w-full h-[72px] px-3 py-2 rounded-lg border border-gray-300 resize-none" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Thông tin xuất hóa đơn */}
                                    <div className="mt-5 border border-gray-200 rounded-lg">
                                        <button type="button" onClick={() => setOpenInvoice(!openInvoice)} className="w-full px-4 py-3.5 flex items-center justify-between" >
                                            <h3 className="font-semibold text-[15px]">
                                                Thông tin xuất hóa đơn
                                            </h3>
                                            {openInvoice
                                                ? <ChevronUp size={18} />
                                                : <ChevronDown size={18} />
                                            }
                                        </button>
                                        {openInvoice && (
                                            <div className="px-4 pb-4">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-[14px] text-gray-700 mb-1.5">
                                                            Tên công ty
                                                        </label>
                                                        <input type="text" placeholder="Nhập tên công ty" className="w-full h-[40px] px-3 rounded-lg border border-gray-300" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[14px] text-gray-700 mb-1.5">
                                                            Mã số thuế
                                                        </label>
                                                        <input type="text" placeholder="Nhập mã số thuế" className="w-full h-[40px] px-3 rounded-lg border border-gray-300" />
                                                    </div>
                                                </div>

                                                <div className="mt-4 w-1/2">
                                                    <label className="block text-[14px] text-gray-700 mb-1.5">
                                                        Số CCCD/CMND
                                                    </label>

                                                    <input type="text" placeholder="Nhập số CCCD/CMND" className="w-full h-[40px] px-3 rounded-lg border border-gray-300" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="h-[64px] px-6 border-t border-gray-200 flex items-center justify-end gap-2">
                                    <button onClick={() => setShowSupplierModal(false)}
                                        className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50" >
                                        Bỏ qua
                                    </button>

                                    <button
                                        onClick={() => {
                                            // xử lý lưu nhà cung cấp
                                        }}
                                        className="h-[40px] px-5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700" >
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="px-7 py-4 flex gap-4">
                    {/* ================= SIDEBAR BÊN TRÁI ================= */}
                    <aside className="w-[300px] min-w-[250px] bg-white rounded-lg px-3 py-3">
                        {/* Nhóm nhà cung cấp */}
                        <div className="mb-5 mt-3">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-[18px] font-semibold text-gray-900">
                                    Nhóm nhà cung cấp
                                </h2>
                                <button onClick={() => setShowAddGroupModal(true)} className="text-[16px] text-blue-600 font-medium hover:text-blue-700">
                                    Tạo mới
                                </button>
                                {showAddGroupModal && (
                                    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-5">

                                        <div className="w-[600px] bg-white rounded-2xl shadow-xl overflow-hidden">
                                            <div className="h-[65px] px-6 flex items-center justify-between">
                                                <h2 className="text-[20px] font-semibold text-gray-900">
                                                    Thêm nhóm nhà cung cấp
                                                </h2>
                                                <button type="button" onClick={() => setShowAddGroupModal(false)}
                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-800 text-[22px]">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                            <div className="px-6 pb-7">
                                                <div className="mb-3">
                                                    <label className="block text-[13px] text-gray-700 mb-1">
                                                        Tên nhóm
                                                    </label>
                                                    <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)}
                                                        className="w-full h-[33px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-[13px] text-gray-700 mb-1">
                                                        Ghi chú
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={groupNote}
                                                        onChange={(e) => setGroupNote(e.target.value)}
                                                        className="w-full h-[33px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                </div>

                                            </div>

                                            {/* Footer */}
                                            <div className="h-[65px] border-t border-gray-200 flex items-center justify-end gap-2 px-6">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAddGroupModal(false)}
                                                    className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white text-gray-600 text-[14px] font-medium hover:bg-gray-200" >
                                                    Bỏ qua
                                                </button>
                                                <button type="button" onClick={() => {
                                                    console.log({ name: groupName, note: groupNote, });
                                                    setShowAddGroupModal(false);
                                                }} className="h-[40px] px-4 rounded-lg bg-blue-600 text-white text-[14px] font-medium hover:bg-blue-700" >
                                                    Lưu
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                {/* Button */}
                                <button type="button" onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                                    className={`w-full h-[40px] px-3 rounded-lg border bg-white flex items-center justify-between text-[15px] mt-5 text-gray-700
                                    ${showGroupDropdown ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300"}`} >
                                    <span>{selectedGroup}</span>
                                    <ChevronDown size={16} className={`transition-transform ${showGroupDropdown ? "rotate-180" : ""}`} />
                                </button>
                                {showGroupDropdown && (
                                    <div className="absolute left-0 right-0 top-[37px] z-50 bg-white rounded-lg shadow-lg overflow-hidden" >
                                        <button type="button" onClick={() => { setSelectedGroup("Tất cả các nhóm"); setShowGroupDropdown(false); }}
                                            className="w-full h-[50px] px-4 flex items-center justify-between text-[14px] text-gray-700 bg-[#f1f8ff] hover:bg-gray-100"  >
                                            <span>Tất cả các nhóm</span>
                                            {selectedGroup === "Tất cả các nhóm" && (
                                                <span className="text-blue-600 text-[20px] font-bold">
                                                    ✓
                                                </span>
                                            )}
                                        </button>

                                        <button type="button" onClick={() => { setSelectedGroup("Nhóm thực phẩm"); setShowGroupDropdown(false); }}
                                            className="w-full h-[45px] px-4 flex items-center justify-between text-[14px] text-gray-700 hover:bg-gray-100" >
                                            <span>Nhóm thực phẩm</span>
                                            {selectedGroup === "Nhóm thực phẩm" && (
                                                <span className="text-blue-600 text-[20px] font-bold">
                                                    ✓
                                                </span>
                                            )}
                                        </button>

                                        {/* Nhóm 2 */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedGroup("Nhóm đồ uống");
                                                setShowGroupDropdown(false);
                                            }}
                                            className="w-full h-[45px] px-4 flex items-center justify-between text-[14px] text-gray-700 hover:bg-gray-100" >
                                            <span>Nhóm đồ uống</span>
                                            {selectedGroup === "Nhóm đồ uống" && (
                                                <span className="text-blue-600 text-[20px] font-bold">
                                                    ✓
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Tổng mua */}
                        <div className="mb-5 ">
                            <h2 className="text-[18px] font-semibold text-gray-900 mb-2">
                                Tổng mua
                            </h2>
                            <div className="text-[15px] text-gray-500 mb-2 mt-3">
                                Giá trị
                            </div>
                            {/* Từ */}
                            <div className="h-[40px] border border-gray-300 rounded-lg flex items-center mb-2 overflow-hidden mt-6">
                                <span className="w-[55px] px-3 py-2 bg-[#dcdcdc] text-[16px] text-black font-semibold">
                                    Từ
                                </span>
                                <input type="text" placeholder="Nhập giá trị" className="flex-1 px-2 h-full outline-none text-[14px] placeholder:text-gray-400" />
                            </div>

                            {/* Tới */}
                            <div className="h-[40px] border border-gray-300 rounded-lg flex items-center overflow-hidden mt-6">
                                <span className="w-[55px] px-3 py-2 bg-[#dcdcdc] text-[16px] text-black font-semibold">
                                    Tới
                                </span>
                                <input type="text" placeholder="Nhập giá trị" className="flex-1 px-2 h-full outline-none text-[14px] placeholder:text-gray-400" />
                            </div>
                        </div>

                        {/* Thời gian */}
                        <div className="mb-5">
                            <div className="text-[17px] text-gray-500 mb-2">
                                Thời gian
                            </div>
                            <div className="space-y-3">
                                {/* Toàn thời gian */}
                                <div className="relative flex items-center gap-3">
                                    {/* Radio */}
                                    <button type="button" onClick={() => { setCreatedTime("all"); setShowCreatedPicker(true); }}
                                        className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ${createdTime !== "custom" ? "border-blue-500" : "border-gray-400"}`} >
                                        {createdTime !== "custom" && (
                                            <span className="w-[12px] h-[12px] rounded-full bg-blue-500" />
                                        )}
                                    </button>
                                    {/* Button */}
                                    <button type="button" onClick={() => setShowCreatedPicker(!showCreatedPicker)}
                                        className={`flex-1 h-[40px] px-4 border rounded-xl flex items-center justify-between text-[18px] text-gray-800 bg-white ${showCreatedPicker ? "border-blue-500" : "border-gray-300 hover:border-blue-400"}`}>
                                        <span>
                                            {createdTime === "all" || createdTime === "custom" ? "Toàn thời gian" : createdTime}
                                        </span>
                                        <ChevronRight size={22} className="text-gray-500" />
                                    </button>

                                    {/* POPUP THỜI GIAN TẠO */}
                                    {showCreatedPicker && (
                                        <>
                                            {/* Overlay */}
                                            <div className="fixed inset-0 z-[9998]" onClick={() => setShowCreatedPicker(false)} />

                                            {/* Popup */}
                                            <div className="absolute left-[225px] top-[-95px] z-[9999] w-[760px] bg-white rounded-xl shadow-xl border border-gray-200 p-4">
                                                <div className="grid grid-cols-5 gap-5">
                                                    {/* THEO NGÀY */}
                                                    <div>
                                                        <h3 className="font-semibold text-[15px] mb-3">
                                                            Theo ngày
                                                        </h3>
                                                        <div className="flex flex-col gap-2">

                                                            {[
                                                                "Hôm nay",
                                                                "Hôm qua",
                                                                "3 ngày qua",
                                                                "7 ngày qua",
                                                                "15 ngày qua",
                                                            ].map((item) => (
                                                                <button key={item} type="button" onClick={() => { setCreatedTime(item); setShowCreatedPicker(false); }}
                                                                    className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                        ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"}`}>
                                                                    {item}
                                                                </button>
                                                            ))}

                                                        </div>
                                                    </div>
                                                    {/* THEO TUẦN */}
                                                    <div>
                                                        <h3 className="font-semibold text-[15px] mb-3">
                                                            Theo tuần
                                                        </h3>
                                                        <div className="flex flex-col gap-2">
                                                            {[
                                                                "Tuần này",
                                                                "Tuần trước",
                                                                "2 tuần qua",
                                                                "4 tuần qua",
                                                            ].map((item) => (
                                                                <button key={item} type="button" onClick={() => { setCreatedTime(item); setShowCreatedPicker(false); }}
                                                                    className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                        ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                        }`}>
                                                                    {item}
                                                                </button>
                                                            ))}

                                                        </div>
                                                    </div>

                                                    {/* THEO THÁNG */}
                                                    <div>
                                                        <h3 className="font-semibold text-[15px] mb-3">
                                                            Theo tháng
                                                        </h3>
                                                        <div className="flex flex-col gap-2">
                                                            {[
                                                                "Tháng này",
                                                                "Tháng trước",
                                                                "30 ngày qua",
                                                                "60 ngày qua",
                                                                "90 ngày qua",
                                                            ].map((item) => (
                                                                <button key={item} type="button" onClick={() => { setCreatedTime(item); setShowCreatedPicker(false); }}
                                                                    className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                        ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                        }`}>
                                                                    {item}
                                                                </button>
                                                            ))}

                                                        </div>
                                                    </div>
                                                    {/* THEO QUÝ */}
                                                    <div>
                                                        <h3 className="font-semibold text-[15px] mb-3">
                                                            Theo quý
                                                        </h3>
                                                        <div className="flex flex-col gap-2">

                                                            {[
                                                                "Quý này",
                                                                "Quý trước",
                                                                "2 quý qua",
                                                            ].map((item) => (
                                                                <button key={item} type="button" onClick={() => { setCreatedTime(item); setShowCreatedPicker(false); }}
                                                                    className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                        ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                        }`} >
                                                                    {item}
                                                                </button>
                                                            ))}

                                                        </div>
                                                    </div>

                                                    {/* THEO NĂM */}
                                                    <div>
                                                        <h3 className="font-semibold text-[15px] mb-3">
                                                            Theo năm
                                                        </h3>

                                                        <div className="flex flex-col gap-2">

                                                            {[
                                                                "Năm nay",
                                                                "Năm trước",
                                                                "2 năm qua",
                                                            ].map((item) => (
                                                                <button key={item} type="button" onClick={() => { setCreatedTime(item); setShowCreatedPicker(false); }}
                                                                    className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                        ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                        }`}>
                                                                    {item}
                                                                </button>
                                                            ))}

                                                            {/* Toàn thời gian */}
                                                            <button type="button" onClick={() => { setCreatedTime("all"); setShowCreatedPicker(false); }}
                                                                className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === "all"
                                                                    ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                    }`} >
                                                                Toàn thời gian
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Tùy chỉnh */}
                                <div className="flex items-center gap-3">
                                    {/* Radio */}
                                    <button type="button" onClick={() => { setCreatedTime("custom"); setShowCreatedCustomPicker(true); }}
                                        className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ${createdTime === "custom" ? "border-blue-500" : "border-gray-400"}`} >
                                        {createdTime === "custom" && (
                                            <span className="w-[12px] h-[12px] rounded-full bg-blue-500" />
                                        )}
                                    </button>
                                    {/* Tùy chỉnh */}
                                    <div className="relative flex-1">
                                        <button type="button" onClick={() => { setCreatedTime("custom"); setShowCreatedCustomPicker(true); }}
                                            className={`w-full h-[40px] px-4 border rounded-xl flex items-center justify-between text-[18px] text-gray-800 bg-white ${createdTime === "custom" ? "border-blue-500" : "border-gray-300 hover:border-blue-400"}`} >
                                            <span>
                                                {createdFromDate && createdToDate
                                                    ? `${new Date(createdFromDate).toLocaleDateString("vi-VN")} - ${new Date(createdToDate).toLocaleDateString("vi-VN")}`
                                                    : "Tùy chỉnh"}
                                            </span>

                                            <CalendarDays size={22} className="text-gray-500" />
                                        </button>

                                        {/* POPUP CUSTOM */}
                                        {showCreatedCustomPicker && (
                                            <div className="absolute left-[225px] top-0 z-[9999] w-[400px] bg-white rounded-xl shadow-xl border border-gray-200 p-4">
                                                <div className="text-sm mb-4">
                                                    Từ ngày:{" "}
                                                    <span className="font-semibold">
                                                        {createdFromDate
                                                            ? new Date(createdFromDate).toLocaleDateString("vi-VN")
                                                            : "--/--/----"}
                                                    </span>
                                                    {" - "}
                                                    Đến ngày:{" "}
                                                    <span className="font-semibold">
                                                        {createdToDate
                                                            ? new Date(createdToDate).toLocaleDateString("vi-VN")
                                                            : "--/--/----"}
                                                    </span>
                                                </div>

                                                <div className="flex gap-2 mb-4">
                                                    <input type="date" value={createdFromDate}
                                                        onChange={(e) => { setCreatedFromDate(e.target.value); setCreatedToDate(""); }}
                                                        className="w-full h-10 border rounded-lg px-2" />
                                                    <input type="date" value={createdToDate} min={createdFromDate} onChange={(e) => setCreatedToDate(e.target.value)}
                                                        className="w-full h-10 border rounded-lg px-2" />
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <button type="button" onClick={() => { setCreatedFromDate(""); setCreatedToDate(""); setCreatedTime("all"); setShowCreatedCustomPicker(false); }}
                                                        className="px-4 py-2 border rounded-lg">
                                                        Bỏ qua
                                                    </button>
                                                    <button type="button" disabled={!createdFromDate || !createdToDate} onClick={() => setShowCreatedCustomPicker(false)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300" >
                                                        Áp dụng
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nợ hiện tại */}
                        <div className="mb-5">
                            <h2 className="text-[18px] font-semibold text-gray-900 mb-2">
                                Nợ hiện tại
                            </h2>

                            {/* Từ */}
                            <div className="h-[40px] border border-gray-300 rounded-lg flex items-center mb-2 overflow-hidden mt-6">
                                <span className="w-[55px] px-3 py-2 bg-[#dcdcdc] text-[16px] text-black font-semibold">
                                    Từ
                                </span>
                                <input type="text" placeholder="Nhập giá trị" className="flex-1 px-2 h-full outline-none text-[14px] placeholder:text-gray-400" />
                            </div>

                            {/* Tới */}
                            <div className="h-[40px] border border-gray-300 rounded-lg flex items-center overflow-hidden mt-6">
                                <span className="w-[55px] px-3 py-2 bg-[#dcdcdc] text-[16px] text-black font-semibold">
                                    Tới
                                </span>
                                <input type="text" placeholder="Nhập giá trị" className="flex-1 px-2 h-full outline-none text-[14px] placeholder:text-gray-400" />
                            </div>
                        </div>

                        {/* Trạng thái */}
                        <div>
                            <h2 className="text-[18px] font-semibold text-gray-900 mb-2">
                                Trạng thái
                            </h2>
                            <div className="flex flex-wrap gap-2 mt-6">
                                <button onClick={() => setSelectedStatus("Tất cả")}
                                    className={`h-[40px] px-3 rounded-full text-[14px] font-semibold ${selectedStatus === "Tất cả" ? "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700" : "bg-white text-black border border-gray-300 hover:bg-gray-100"}`}>
                                    Tất cả
                                </button>

                                {/* Đang hoạt động */}
                                <button onClick={() => setSelectedStatus("Đang hoạt động")}
                                    className={`h-[40px] px-3 rounded-full text-[14px] font-semibold ${selectedStatus === "Đang hoạt động" ? "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700" : "bg-white text-black border border-gray-300 hover:bg-gray-100"}`}>
                                    Đang hoạt động
                                </button>

                                {/* Ngừng hoạt động */}
                                <button onClick={() => setSelectedStatus("Ngừng hoạt động")}
                                    className={`h-[40px] px-3 rounded-full text-[14px] font-semibold mt-4 ${selectedStatus === "Ngừng hoạt động" ? "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700" : "bg-white text-black border border-gray-300 hover:bg-gray-100"}`}>
                                    Ngừng hoạt động
                                </button>

                            </div>
                        </div>
                    </aside>
                    <main className="flex-1 min-w-0">
                        <div className="bg-white rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    {/* Header */}
                                    <thead>
                                        <tr className="h-[40px] bg-[#e5f2ff] border-b border-blue-200">
                                            <th className="w-[55px] px-3 text-left">
                                                <input type="checkbox"
                                                    checked={suppliers.length > 0 && selectedSuppliers.length === suppliers.length}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedSuppliers(
                                                                suppliers.map((supplier) => supplier.id)
                                                            );
                                                        } else {
                                                            setSelectedSuppliers([]);
                                                        }
                                                    }}
                                                    className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                            </th>
                                            <th className="w-[165px] px-3 text-left text-[13px] font-semibold">
                                                Mã nhà cung cấp
                                            </th>
                                            <th className="px-3 text-left text-[13px] font-semibold">
                                                Tên nhà cung cấp
                                            </th>
                                            <th className="w-[145px] px-3 text-left text-[13px] font-semibold">
                                                Điện thoại
                                            </th>
                                            <th className="w-[145px] px-3 text-left text-[13px] font-semibold">
                                                Email
                                            </th>
                                            <th className="w-[210px] px-3 text-right text-[13px] font-semibold">
                                                Nợ cần trả hiện tại
                                            </th>
                                            <th className="w-[150px] px-3 text-right text-[13px] font-semibold">
                                                Tổng mua
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* ================= DÒNG TỔNG ================= */}
                                        <tr className="h-[42px] border-b border-gray-200">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>

                                            {/* Tổng nợ */}
                                            <td className="px-3 text-right text-[15px] font-semibold">
                                                {suppliers
                                                    .reduce((sum, item) => sum + item.debt, 0)
                                                    .toLocaleString("vi-VN")}
                                            </td>

                                            {/* Tổng mua */}
                                            <td className="px-3 text-right text-[15px] font-semibold">
                                                {suppliers
                                                    .reduce((sum, item) => sum + item.totalBuy, 0)
                                                    .toLocaleString("vi-VN")}
                                            </td>
                                        </tr>

                                        {/* ================= DANH SÁCH NHÀ CUNG CẤP ================= */}
                                        {currentSuppliers.map((supplier) => {
                                            const isExpanded = expandedSupplierId === supplier.id;
                                            return (
                                                <React.Fragment key={supplier.id}>
                                                    {/* ===================================================== DÒNG NHÀ CUNG CẤP ====================================================== */}
                                                    <tr
                                                        onClick={() => {
                                                            setExpandedSupplierId(
                                                                isExpanded ? null : supplier.id
                                                            );
                                                            setSupplierDetailTab("info");
                                                        }}
                                                        className={`h-[46px]  cursor-pointer transition-colors ${isExpanded ? "bg-[#f5faff]" : "border-b border-gray-200 hover:bg-gray-50"}`} >
                                                        {/* Checkbox */}
                                                        <td className={`px-3 ${isExpanded ? "border-t-3 border-l-3 border-blue-600" : ""}`} onClick={(e) => e.stopPropagation()} >
                                                            <input type="checkbox"
                                                                checked={selectedSuppliers.includes(
                                                                    supplier.id
                                                                )}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSelectedSuppliers((prev) => [
                                                                            ...prev,
                                                                            supplier.id,
                                                                        ]);
                                                                    } else {
                                                                        setSelectedSuppliers((prev) =>
                                                                            prev.filter(
                                                                                (id) =>
                                                                                    id !== supplier.id
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                                className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                                        </td>
                                                        {/* Mã nhà cung cấp */}
                                                        <td className={`px-3 text-[14px] text-gray-900 ${isExpanded ? "border-t-3 border-blue-600" : ""}`}>
                                                            {supplier.code}
                                                        </td>
                                                        {/* Tên nhà cung cấp */}
                                                        <td className={`px-3 text-[14px] text-gray-900 ${isExpanded ? "border-t-3 border-blue-600" : ""}`}>
                                                            {supplier.name}
                                                        </td>
                                                        {/* Điện thoại */}
                                                        <td className={`px-3 text-[14px] text-gray-900 ${isExpanded ? "border-t-3 border-blue-600" : ""}`}>
                                                            {supplier.phone || ""}
                                                        </td>
                                                        {/* Email */}
                                                        <td className={`px-3 text-[14px] text-gray-900 ${isExpanded ? "border-t-3 border-blue-600" : ""}`}>
                                                            {supplier.email || ""}
                                                        </td>
                                                        {/* Nợ cần trả */}
                                                        <td className={`px-3 text-right text-[14px] text-gray-900 ${isExpanded ? "border-t-3 border-blue-600" : ""}`}>
                                                            {supplier.debt.toLocaleString("vi-VN")}
                                                        </td>
                                                        {/* Tổng mua */}
                                                        <td className={`px-3 text-right text-[14px] text-gray-900 ${isExpanded ? "border-t-3 border-r-3 border-blue-600" : ""}`}>
                                                            {supplier.totalBuy.toLocaleString("vi-VN")}
                                                        </td>
                                                    </tr>
                                                    {/* ===================================================== CHI TIẾT NHÀ CUNG CẤP ====================================================== */}
                                                    {isExpanded && (
                                                        <tr>
                                                            <td colSpan={7} className="p-0" >
                                                                <div className="w-full bg-white border-l-3 border-r-3 border-b-3 border-blue-600">
                                                                    {/* ================================================= TABS ================================================== */}
                                                                    <div className="h-[54px] border-b border-gray-200 flex items-end px-5 gap-8">
                                                                        {/* Thông tin */}
                                                                        <button type="button" onClick={(e) => { e.stopPropagation(); setSupplierDetailTab("info"); }}
                                                                            className={`relative h-[54px] px-0 text-[14px] font-medium ${supplierDetailTab === "info" ? "text-blue-600" : "text-gray-700"}`} >
                                                                            Thông tin
                                                                            {supplierDetailTab === "info" && (
                                                                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
                                                                            )}
                                                                        </button>
                                                                        {/* Lịch sử */}
                                                                        <button type="button" onClick={(e) => { e.stopPropagation(); setSupplierDetailTab("history"); }}
                                                                            className={`relative h-[54px] px-0 text-[14px] font-medium ${supplierDetailTab === "history" ? "text-blue-600" : "text-gray-700"}`} >
                                                                            Lịch sử nhập/trả hàng
                                                                            {supplierDetailTab === "history" && (
                                                                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
                                                                            )}
                                                                        </button>
                                                                        {/* Công nợ */}
                                                                        <button type="button" onClick={(e) => { e.stopPropagation(); setSupplierDetailTab("debt"); }}
                                                                            className={`relative h-[54px] px-0 text-[14px] font-medium ${supplierDetailTab === "debt" ? "text-blue-600" : "text-gray-700"}`} >
                                                                            Nợ cần trả nhà cung cấp

                                                                            {supplierDetailTab === "debt" && (
                                                                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                    {/* ================================================= TAB THÔNG TIN  ================================================== */}
                                                                    {supplierDetailTab === "info" && (
                                                                        <div className="px-5 py-4">
                                                                            {/* =========================================================  THÔNG TIN NHÀ CUNG CẤP ========================================================= */}

                                                                            {/* Tên + mã + chi nhánh */}
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex items-center gap-3">
                                                                                    <h2 className="text-[18px] font-semibold text-gray-900">
                                                                                        {supplier.name}
                                                                                    </h2>
                                                                                    <span className="text-[14px] text-gray-600">
                                                                                        {supplier.code}
                                                                                    </span>
                                                                                </div>
                                                                                <span className="text-[14px] text-gray-700">
                                                                                    Chi nhánh trung tâm
                                                                                </span>
                                                                            </div>
                                                                            {/* Thông tin tạo */}
                                                                            <div className="flex items-center gap-3 mt-4 text-[14px]">
                                                                                <span className="text-gray-700">
                                                                                    Người tạo:
                                                                                </span>
                                                                                <span className="text-gray-900">
                                                                                    tramy
                                                                                </span>
                                                                                <span className="text-gray-300">
                                                                                    |
                                                                                </span>
                                                                                <span className="text-gray-700">
                                                                                    Ngày tạo:
                                                                                </span>
                                                                                <span className="text-gray-900">
                                                                                    24/08/2026
                                                                                </span>
                                                                                <span className="text-gray-300">
                                                                                    |
                                                                                </span>
                                                                                <span className="text-gray-700">
                                                                                    Nhóm nhà cung cấp:
                                                                                </span>
                                                                                <span className="text-gray-500">
                                                                                    Chưa có
                                                                                </span>
                                                                            </div>
                                                                            {/* ========================================================= PHONE + EMAIL  ========================================================= */}
                                                                            <div className="grid grid-cols-2 gap-6 mt-8">
                                                                                {/* Điện thoại */}
                                                                                <div>
                                                                                    <div className="text-[14px] text-gray-700 mb-2">
                                                                                        Điện thoại
                                                                                    </div>
                                                                                    <div className="h-[40px] border-b border-gray-200 flex items-center text-[14px] text-gray-500">
                                                                                        {supplier.phone || "Chưa có"}
                                                                                    </div>
                                                                                </div>
                                                                                {/* Email */}
                                                                                <div>
                                                                                    <div className="text-[14px] text-gray-700 mb-2">
                                                                                        Email
                                                                                    </div>
                                                                                    <div className="h-[40px] border-b border-gray-200 flex items-center text-[14px] text-gray-500">
                                                                                        {supplier.email || "Chưa có"}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/* =========================================================  ĐỊA CHỈ ========================================================= */}
                                                                            <div className="mt-4">
                                                                                <div className="text-[14px] text-gray-700 mb-2">
                                                                                    Địa chỉ
                                                                                </div>
                                                                                <div className="h-[40px] border-b border-gray-200 flex items-center text-[14px] text-gray-500">
                                                                                    Chưa có
                                                                                </div>
                                                                            </div>
                                                                            {/* ========================================================= THÔNG TIN XUẤT HÓA ĐƠN ========================================================= */}
                                                                            <button type="button" onClick={(e) => e.stopPropagation()} className="mt-6 text-[14px] text-blue-600 hover:text-blue-700">
                                                                                Thêm thông tin xuất hóa đơn
                                                                            </button>
                                                                            {/* ========================================================= GHI CHÚ ========================================================= */}
                                                                            <div className="mt-5 flex items-center gap-2 text-[14px] text-gray-700">
                                                                                <span className="text-gray-500 text-[18px]">
                                                                                    <SquarePen size={18} />
                                                                                </span>
                                                                                <span>
                                                                                    Chưa có ghi chú
                                                                                </span>
                                                                            </div>
                                                                            {/* ========================================================= FOOTER ACTION ========================================================= */}
                                                                            <div className="h-[66px] border-t border-gray-200 flex items-center justify-between px-0 mt-6">
                                                                                {/* ===================================================== XÓA ===================================================== */}
                                                                                <button type="button"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        console.log(
                                                                                            "Xóa nhà cung cấp:",
                                                                                            supplier.id
                                                                                        );
                                                                                    }}
                                                                                    className="flex items-center gap-2 text-[14px] text-blue-600 hover:text-blue-700" >
                                                                                    <Trash2 size={18} />
                                                                                    <span>
                                                                                        Xóa
                                                                                    </span>
                                                                                </button>
                                                                                {/* =====================================================  BÊN PHẢI ===================================================== */}
                                                                                <div className="flex items-center gap-2">
                                                                                    {/* ================================================= CHỈNH SỬA ================================================= */}
                                                                                    <button type="button"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            setEditSupplier(supplier);
                                                                                            setEditForm({
                                                                                                name: supplier.name || "",
                                                                                                code: supplier.code || "",
                                                                                                phone: supplier.phone || "",
                                                                                                email: supplier.email || "",
                                                                                                address: "",
                                                                                                province: "",
                                                                                                ward: "",
                                                                                                supplierGroup: "",
                                                                                                note: "",
                                                                                                companyName: "",
                                                                                                taxCode: "",
                                                                                                citizenId: "",
                                                                                            });
                                                                                            setShowEditSupplierModal(true);
                                                                                        }}
                                                                                        className="h-[40px] px-4 rounded-lg bg-blue-600 text-white flex items-center gap-2 text-[14px] font-semibold hover:bg-blue-700" >
                                                                                        <PencilLine size={18} />
                                                                                        Chỉnh sửa
                                                                                    </button>
                                                                                    {/* ================================================= NGỪNG HOẠT ĐỘNG ================================================= */}
                                                                                    <button type="button"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            console.log(
                                                                                                "Ngừng hoạt động:",
                                                                                                supplier.id
                                                                                            );
                                                                                        }}
                                                                                        className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white text-gray-700 flex items-center gap-2 text-[14px] font-semibold hover:bg-gray-50" >
                                                                                        <LockKeyhole size={18} />
                                                                                        Ngừng hoạt động
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            {/* ========================================================= MODAL SỬA NHÀ CUNG CẤP ========================================================= */}

                                                                            {showEditSupplierModal && editSupplier && (
                                                                                <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowEditSupplierModal(false)} >
                                                                                    <div className="w-full max-w-[960px] max-h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()} >
                                                                                        {/* HEADER */}
                                                                                        <div className="h-[64px] px-6 flex items-center justify-between border-b border-gray-200 shrink-0">
                                                                                            <h2 className="text-[20px] font-semibold text-gray-900">
                                                                                                Sửa nhà cung cấp
                                                                                            </h2>
                                                                                            <button type="button" onClick={() => setShowEditSupplierModal(false)}
                                                                                                className="w-[36px] h-[36px] rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900" >
                                                                                                <X size={22} />
                                                                                            </button>
                                                                                        </div>
                                                                                        {/* BODY */}
                                                                                        <div className="flex-1 overflow-y-auto px-6 py-5">
                                                                                            {/* Tên + mã */}
                                                                                            <div className="grid grid-cols-2 gap-6">
                                                                                                {/* Tên nhà cung cấp */}
                                                                                                <div>
                                                                                                    <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                        Tên nhà cung cấp
                                                                                                    </label>
                                                                                                    <input type="text" value={editForm.name}
                                                                                                        onChange={(e) =>
                                                                                                            setEditForm({
                                                                                                                ...editForm,
                                                                                                                name: e.target.value,
                                                                                                            })
                                                                                                        }
                                                                                                        className="w-full h-[40px] px-3 rounded-lg border border-blue-600 outline-none text-[14px] text-gray-900 focus:ring-1 focus:ring-blue-500" />
                                                                                                </div>
                                                                                                {/* Mã nhà cung cấp */}
                                                                                                <div>
                                                                                                    <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                        Mã nhà cung cấp
                                                                                                    </label>
                                                                                                    <input type="text" value={editForm.code}
                                                                                                        onChange={(e) =>
                                                                                                            setEditForm({
                                                                                                                ...editForm,
                                                                                                                code: e.target.value,
                                                                                                            })
                                                                                                        }
                                                                                                        className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                                                                </div>
                                                                                                {/* Điện thoại */}
                                                                                                <div>
                                                                                                    <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                        Điện thoại
                                                                                                    </label>
                                                                                                    <input type="text" value={editForm.phone}
                                                                                                        onChange={(e) =>
                                                                                                            setEditForm({
                                                                                                                ...editForm,
                                                                                                                phone: e.target.value,
                                                                                                            })
                                                                                                        }
                                                                                                        className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                                                                </div>
                                                                                                {/* Email */}
                                                                                                <div>
                                                                                                    <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                        Email
                                                                                                    </label>
                                                                                                    <input type="email" placeholder="email@gmail.com" value={editForm.email}
                                                                                                        onChange={(e) =>
                                                                                                            setEditForm({
                                                                                                                ...editForm,
                                                                                                                email: e.target.value,
                                                                                                            })
                                                                                                        }
                                                                                                        className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                                                                </div>
                                                                                            </div>
                                                                                            {/* ================================================= ĐỊA CHỈ  ================================================= */}
                                                                                            <div className="mt-4 border border-gray-200 rounded-lg">
                                                                                                <button type="button" onClick={() => setOpenAddress(!openAddress)}
                                                                                                    className="w-full h-[52px] px-3 flex items-center justify-between" >
                                                                                                    <h3 className="text-[15px] font-semibold text-gray-800">
                                                                                                        Địa chỉ
                                                                                                    </h3>
                                                                                                    {openAddress ? (
                                                                                                        <ChevronUp size={18} className="text-gray-700" />
                                                                                                    ) : (
                                                                                                        <ChevronDown size={18} className="text-gray-700" />
                                                                                                    )}
                                                                                                </button>
                                                                                                {openAddress && (
                                                                                                    <div className="px-3 pb-5">
                                                                                                        <div>
                                                                                                            <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                                Địa chỉ
                                                                                                            </label>
                                                                                                            <input type="text" placeholder="Nhập địa chỉ" value={editForm.address}
                                                                                                                onChange={(e) =>
                                                                                                                    setEditForm({
                                                                                                                        ...editForm,
                                                                                                                        address: e.target.value,
                                                                                                                    })
                                                                                                                }
                                                                                                                className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                                                                        </div>
                                                                                                        <div className="grid grid-cols-2 gap-6 mt-4">
                                                                                                            <div>
                                                                                                                <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                                    Khu vực
                                                                                                                </label>
                                                                                                                <select value={editForm.province}
                                                                                                                    onChange={(e) =>
                                                                                                                        setEditForm({
                                                                                                                            ...editForm,
                                                                                                                            province: e.target.value,
                                                                                                                        })
                                                                                                                    }
                                                                                                                    className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px]" >
                                                                                                                    <option value="">
                                                                                                                        Chọn Tỉnh/Thành phố
                                                                                                                    </option>

                                                                                                                    <option value="Hồ Chí Minh">
                                                                                                                        Hồ Chí Minh
                                                                                                                    </option>

                                                                                                                    <option value="Hà Nội">
                                                                                                                        Hà Nội
                                                                                                                    </option>
                                                                                                                </select>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                                    Phường/Xã
                                                                                                                </label>
                                                                                                                <select value={editForm.ward}
                                                                                                                    onChange={(e) =>
                                                                                                                        setEditForm({
                                                                                                                            ...editForm,
                                                                                                                            ward: e.target.value,
                                                                                                                        })
                                                                                                                    }
                                                                                                                    className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px]" >
                                                                                                                    <option value="">
                                                                                                                        Chọn Phường/Xã
                                                                                                                    </option>
                                                                                                                </select>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                            {/* =================================================  NHÓM NHÀ CUNG CẤP + GHI CHÚ ================================================= */}
                                                                                            <div className="mt-4 border border-gray-200 rounded-lg">
                                                                                                <button type="button" onClick={() => setOpenSupplierGroup(!openSupplierGroup)}
                                                                                                    className="w-full h-[52px] px-3 flex items-center justify-between">
                                                                                                    <h3 className="text-[15px] font-semibold text-gray-800">
                                                                                                        Nhóm nhà cung cấp, ghi chú
                                                                                                    </h3>
                                                                                                    {openSupplierGroup ? (
                                                                                                        <ChevronUp size={18} className="text-gray-700" />
                                                                                                    ) : (
                                                                                                        <ChevronDown size={18} className="text-gray-700" />
                                                                                                    )}
                                                                                                </button>
                                                                                                {openSupplierGroup && (
                                                                                                    <div className="px-3 pb-5">
                                                                                                        <div>
                                                                                                            <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                                Nhóm nhà cung cấp
                                                                                                            </label>
                                                                                                            <select value={editForm.supplierGroup}
                                                                                                                onChange={(e) =>
                                                                                                                    setEditForm({
                                                                                                                        ...editForm,
                                                                                                                        supplierGroup: e.target.value,
                                                                                                                    })
                                                                                                                }
                                                                                                                className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px]"  >
                                                                                                                <option value="">
                                                                                                                    Chọn nhóm nhà cung cấp
                                                                                                                </option>
                                                                                                            </select>
                                                                                                        </div>
                                                                                                        <div className="mt-4">
                                                                                                            <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                                Ghi chú
                                                                                                            </label>
                                                                                                            <textarea rows={3} placeholder="Nhập ghi chú" value={editForm.note}
                                                                                                                onChange={(e) =>
                                                                                                                    setEditForm({
                                                                                                                        ...editForm,
                                                                                                                        note: e.target.value,
                                                                                                                    })
                                                                                                                }
                                                                                                                className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none text-[14px] resize-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                            {/* ================================================= THÔNG TIN XUẤT HÓA ĐƠN================================================= */}
                                                                                            <div className="mt-4 border border-gray-200 rounded-lg">
                                                                                                <button type="button" onClick={() => setOpenInvoice(!openInvoice)}
                                                                                                    className="w-full h-[52px] px-3 flex items-center justify-between"  >
                                                                                                    <h3 className="text-[15px] font-semibold text-gray-800">
                                                                                                        Thông tin xuất hóa đơn
                                                                                                    </h3>
                                                                                                    {openInvoice ? (
                                                                                                        <ChevronUp size={18} className="text-gray-700" />
                                                                                                    ) : (
                                                                                                        <ChevronDown size={18} className="text-gray-700" />
                                                                                                    )}
                                                                                                </button>
                                                                                                {openInvoice && (
                                                                                                    <div className="px-3 pb-5">
                                                                                                        <div className="grid grid-cols-2 gap-6">
                                                                                                            <div>
                                                                                                                <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                                    Tên công ty
                                                                                                                </label>
                                                                                                                <input type="text" placeholder="Nhập tên công ty" value={editForm.companyName}
                                                                                                                    onChange={(e) =>
                                                                                                                        setEditForm({
                                                                                                                            ...editForm,
                                                                                                                            companyName: e.target.value,
                                                                                                                        })
                                                                                                                    }
                                                                                                                    className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                                    Mã số thuế
                                                                                                                </label>
                                                                                                                <input type="text" placeholder="Nhập mã số thuế" value={editForm.taxCode}
                                                                                                                    onChange={(e) =>
                                                                                                                        setEditForm({
                                                                                                                            ...editForm,
                                                                                                                            taxCode: e.target.value,
                                                                                                                        })
                                                                                                                    }
                                                                                                                    className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <label className="block text-[14px] text-gray-700 mb-2">
                                                                                                                    Số CCCD/CMND
                                                                                                                </label>
                                                                                                                <input type="text" placeholder="Nhập số CCCD/CMND" value={editForm.citizenId}
                                                                                                                    onChange={(e) =>
                                                                                                                        setEditForm({
                                                                                                                            ...editForm,
                                                                                                                            citizenId: e.target.value,
                                                                                                                        })
                                                                                                                    }
                                                                                                                    className="w-full h-[40px] px-3 rounded-lg border border-gray-300 outline-none text-[14px] placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* =====================================================  FOOTER MODAL ===================================================== */}
                                                                                        <div className="h-[64px] border-t border-gray-200 px-6 flex items-center justify-end gap-2 shrink-0 bg-white">
                                                                                            <button type="button" onClick={() => setShowEditSupplierModal(false)}
                                                                                                className="h-[40px] px-5 rounded-lg border border-gray-300 bg-white text-gray-700 text-[14px] font-semibold hover:bg-gray-50" >
                                                                                                Bỏ qua
                                                                                            </button>
                                                                                            <button type="button"
                                                                                                onClick={() => {
                                                                                                    console.log(
                                                                                                        "Dữ liệu cập nhật:",
                                                                                                        editForm
                                                                                                    );
                                                                                                    setShowEditSupplierModal(false);
                                                                                                }}
                                                                                                className="h-[40px] px-5 rounded-lg bg-blue-600 text-white text-[14px] font-semibold hover:bg-blue-700">
                                                                                                Lưu
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                        </div>
                                                                    )}
                                                                    {supplierDetailTab === "history" && (
                                                                        <>
                                                                            {historyData.length === 0 ? (
                                                                                // CHƯA CÓ LỊCH SỬ                                                                              
                                                                                <div className="px-5 py-6 min-h-[250px]">
                                                                                    <div className="text-[14px] text-gray-500 text-center py-10">
                                                                                        Chưa có lịch sử nhập/trả hàng
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                // CÓ LỊCH SỬ                                                                             
                                                                                <div className="px-3">
                                                                                    {/* Header bảng */}
                                                                                    <div className="h-[38px] bg-gray-100 grid grid-cols-[2fr_2fr_3fr_1fr_1.5fr] items-center text-[13px] font-semibold text-gray-700">
                                                                                        <div className="px-2">
                                                                                            Mã phiếu
                                                                                        </div>
                                                                                        <div className="px-2">
                                                                                            Thời gian
                                                                                        </div>
                                                                                        <div className="px-2">
                                                                                            Người tạo
                                                                                        </div>
                                                                                        <div className="px-2 text-right">
                                                                                            Tổng cộng
                                                                                        </div>
                                                                                        <div className="px-2">
                                                                                            Trạng thái
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* Danh sách lịch sử */}
                                                                                    {historyData.map((item) => (
                                                                                        <div key={item.code} className="h-[45px] grid grid-cols-[2fr_2fr_3fr_1fr_1.5fr] items-center border-b border-gray-200 text-[14px]"  >
                                                                                            {/* Mã phiếu */}
                                                                                            <div className="px-2">
                                                                                                <button type="button" className="text-blue-600 hover:underline" >
                                                                                                    {item.code}
                                                                                                </button>
                                                                                            </div>
                                                                                            {/* Thời gian */}
                                                                                            <div className="px-2">
                                                                                                {item.time}
                                                                                            </div>
                                                                                            {/* Người tạo */}
                                                                                            <div className="px-2">
                                                                                                {item.creator}
                                                                                            </div>
                                                                                            {/* Tổng cộng */}
                                                                                            <div className="px-2 text-right">
                                                                                                {item.total}
                                                                                            </div>
                                                                                            {/* Trạng thái */}
                                                                                            <div className="px-2">
                                                                                                <span className="inline-flex px-2 py-1 rounded-md bg-green-100 text-green-600 text-[12px]">
                                                                                                    {item.status}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}

                                                                                    {/* Xuất file */}
                                                                                    <div className="h-[64px] flex items-center border-t border-gray-200">
                                                                                        <button type="button" className="flex items-center gap-2 text-[14px] text-gray-700 hover:text-blue-600" >
                                                                                            <FileSymlink size={18} />
                                                                                            Xuất file
                                                                                        </button>
                                                                                    </div>

                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    )}

                                                                    {/* ================================================= TAB CÔNG NỢ================================================== */}

                                                                    {supplierDetailTab === "debt" && (
                                                                        <div className="px-5 py-4">
                                                                            {debtData.length === 0 ? (
                                                                                <div className="px-5 py-6 min-h-[250px]">
                                                                                    <div className="text-[14px] text-gray-500 text-center py-10">
                                                                                        Chưa có công nợ
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <div>
                                                                                    {/* ================================================= BỘ LỌC================================================= */}
                                                                                    <div className="flex items-center justify-end mb-5">
                                                                                        <select
                                                                                            className="w-[186px] h-[34px] px-3 rounded-lg border border-gray-300 bg-white text-[14px] text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" >
                                                                                            <option value="all">
                                                                                                Tất cả giao dịch
                                                                                            </option>
                                                                                            <option value="purchase">
                                                                                                Nhập hàng
                                                                                            </option>
                                                                                            <option value="payment">
                                                                                                Thanh toán
                                                                                            </option>
                                                                                            <option value="adjustment">
                                                                                                Điều chỉnh
                                                                                            </option>
                                                                                            <option value="discount">
                                                                                                Chiết khấu thanh toán
                                                                                            </option>
                                                                                        </select>

                                                                                    </div>


                                                                                    {/* ================================================= BẢNG CÔNG NỢ ================================================= */}
                                                                                    <div className="w-full overflow-hidden">
                                                                                        {/* Header bảng */}
                                                                                        <div className="h-[38px] bg-gray-100 border-b border-gray-200 grid grid-cols-[1.1fr_1fr_1fr_1fr_1.2fr] items-center text-[13px] font-semibold text-gray-800">
                                                                                            {/* Mã phiếu */}
                                                                                            <div className="px-3">
                                                                                                Mã phiếu
                                                                                            </div>
                                                                                            {/* Thời gian */}
                                                                                            <div className="px-3">
                                                                                                Thời gian
                                                                                            </div>
                                                                                            {/* Loại */}
                                                                                            <div className="px-3">
                                                                                                Loại
                                                                                            </div>
                                                                                            {/* Giá trị */}
                                                                                            <div className="px-3 text-right">
                                                                                                Giá trị
                                                                                            </div>
                                                                                            {/* Nợ */}
                                                                                            <div className="px-3 text-right">
                                                                                                Nợ cần trả nhà cung cấp
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* ================================================= DATA  ================================================= */}
                                                                                        {debtData.map((item, index) => (
                                                                                            <div key={index} className="h-[45px] border-b border-gray-200 grid grid-cols-[1.1fr_1fr_1fr_1fr_1.2fr] items-center text-[14px] text-gray-800 hover:bg-gray-50" >
                                                                                                {/* Mã phiếu */}
                                                                                                <div className="px-3">
                                                                                                    <button type="button" onClick={(e) => {
                                                                                                        e.stopPropagation();
                                                                                                        console.log(
                                                                                                            "Xem phiếu công nợ:",
                                                                                                            item.code
                                                                                                        );
                                                                                                    }}
                                                                                                        className="text-blue-600 hover:text-blue-700 hover:underline" >
                                                                                                        {item.code}
                                                                                                    </button>
                                                                                                </div>
                                                                                                {/* Thời gian */}
                                                                                                <div className="px-3">
                                                                                                    {item.time}
                                                                                                </div>
                                                                                                {/* Loại */}
                                                                                                <div className="px-3">
                                                                                                    {item.type}
                                                                                                </div>
                                                                                                {/* Giá trị */}
                                                                                                <div className="px-3 text-right">
                                                                                                    {Number(item.value).toLocaleString("vi-VN")}
                                                                                                </div>
                                                                                                {/* Nợ cần trả */}
                                                                                                <div className="px-3 text-right">
                                                                                                    {Number(item.debt).toLocaleString("vi-VN")}
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                    {/* =================================================  FOOTER ================================================= */}
                                                                                    <div className="h-[66px] border-t border-gray-200 flex items-center justify-between">
                                                                                        {/* ================================================= BÊN TRÁI ================================================= */}
                                                                                        <div className="flex items-center gap-6">
                                                                                            {/* Xuất file công nợ */}
                                                                                            <button type="button" onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                console.log(
                                                                                                    "Xuất file công nợ:",
                                                                                                    supplier.id
                                                                                                );
                                                                                            }}
                                                                                                className="h-[34px] px-3 rounded-lg flex items-center gap-2 text-[14px] text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                                                                                                <FileInput size={18} />
                                                                                                <span>
                                                                                                    Xuất file công nợ
                                                                                                </span>
                                                                                            </button>
                                                                                            {/* Xuất file */}
                                                                                            <button type="button" onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                console.log(
                                                                                                    "Xuất file:",
                                                                                                    supplier.id
                                                                                                );
                                                                                            }}
                                                                                                className="h-[34px] px-3 rounded-lg flex items-center gap-2 text-[14px] text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                                                                                                <FileInput size={18} />
                                                                                                <span>
                                                                                                    Xuất file
                                                                                                </span>
                                                                                            </button>

                                                                                        </div>

                                                                                        {/* ================================================= BÊN PHẢI ================================================= */}
                                                                                        <div className="flex items-center gap-2">
                                                                                            {/* Thanh toán */}
                                                                                            <button type="button" onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                console.log(
                                                                                                    "Thanh toán:",
                                                                                                    supplier.id
                                                                                                );
                                                                                            }}
                                                                                                className="h-[40px] px-4 rounded-lg bg-blue-600 text-white flex items-center gap-2 text-[14px] font-semibold hover:bg-blue-700" >
                                                                                                <CircleDollarSign size={18} />
                                                                                                Thanh toán
                                                                                            </button>
                                                                                            {/* Điều chỉnh */}
                                                                                            <button
                                                                                                type="button" onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    console.log(
                                                                                                        "Điều chỉnh:",
                                                                                                        supplier.id
                                                                                                    );
                                                                                                }}
                                                                                                className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white text-gray-700 flex items-center gap-2 text-[14px] font-semibold hover:bg-gray-50" >
                                                                                                <PencilLine size={17} />
                                                                                                Điều chỉnh
                                                                                            </button>
                                                                                            {/* Chiết khấu thanh toán */}
                                                                                            <button type="button" onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                console.log(
                                                                                                    "Chiết khấu thanh toán:",
                                                                                                    supplier.id
                                                                                                );
                                                                                            }}
                                                                                                className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white text-gray-700 flex items-center gap-2 text-[14px] font-semibold hover:bg-gray-50">
                                                                                                <CircleDollarSign size={17} />
                                                                                                Chiết khấu thanh toán
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="h-[48px] border-t border-gray-200 flex items-center justify-between px-4 bg-white">
                            {/* Bên trái */}
                            <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                <span>Hiển thị</span>
                                <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                                    className="h-[32px] px-3 border border-gray-300 rounded-lg bg-white outline-none cursor-pointer" >
                                    <option value="10">10 dòng</option>
                                    <option value="15">15 dòng</option>
                                    <option value="20">20 dòng</option>
                                    <option value="40">40 dòng</option>
                                    <option value="50">50 dòng</option>
                                    <option value="100">100 dòng</option>
                                </select>
                            </div>
                            {/* Pagination */}
                            <div className="flex items-center gap-3">
                                {/* Trang đầu */}
                                <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}
                                    className={`text-[18px] ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"}`} >
                                    |◀
                                </button>

                                {/* Trang trước */}
                                <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}
                                    className={`text-[22px] ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"}`} >
                                    ‹
                                </button>

                                {/* Trang hiện tại */}
                                <button type="button" className="w-[32px] h-[32px] border border-blue-500 bg-blue-50 text-blue-600 rounded-lg text-[14px] font-semibold" >
                                    {currentPage}
                                </button>
                                {/* Trang sau */}
                                <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}
                                    className={`text-[22px] ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"}`} >
                                    ›
                                </button>

                                {/* Trang cuối */}
                                <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}
                                    className={`text-[18px] ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"}`} >
                                    ▶|
                                </button>

                                {/* Thông tin */}
                                <span className="text-[13px] text-gray-600 ml-2">
                                    {totalItems === 0
                                        ? "0 - 0"
                                        : `${startIndex + 1} - ${endIndex} trong ${totalItems} nhà cung cấp`}
                                </span>

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SupplierPage;