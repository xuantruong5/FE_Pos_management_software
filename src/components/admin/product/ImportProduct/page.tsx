"use client";
import { ArrowLeft, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleAlert, CircleUser, Eye, Grid2X2, Grip, ImageIcon, Pencil, Plus, Printer, ScanBarcode, Search, Tag, Trash2, X } from "lucide-react";
import { BarcodeReader } from "@material-symbols-svg/react";
import { useState } from "react";
import { DatePicker, TimePicker, Select } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import "antd/dist/reset.css";
dayjs.extend(customParseFormat);

const ImportProduct = () => {

    // cái lọc chọn nhóm hàng ở tìm kiếm 
    const groups = [
        {
            id: "food",
            name: "Bánh, kẹo, snack",
            count: 10,
            children: [
                {
                    id: "cake",
                    name: "Bánh",
                    count: 3,
                    children: [
                        {
                            id: "bread",
                            name: "Bánh mì",
                            count: 1,
                        },
                        {
                            id: "sweet-cake",
                            name: "Bánh ngọt",
                            count: 1,
                        },
                        {
                            id: "cookie",
                            name: "Bánh quy",
                            count: 1,
                        },
                    ],
                },
                {
                    id: "candy",
                    name: "Kẹo",
                    count: 3,
                    children: [
                        {
                            id: "gummy",
                            name: "Kẹo dẻo",
                            count: 1,
                        },
                        {
                            id: "hard-candy",
                            name: "Kẹo cứng",
                            count: 1,
                        },
                        {
                            id: "chocolate-candy",
                            name: "Kẹo socola",
                            count: 1,
                        },
                    ],
                },
                {
                    id: "snack",
                    name: "Snack",
                    count: 2,
                    children: [
                        {
                            id: "potato-snack",
                            name: "Khoai tây chiên",
                            count: 1,
                        },
                        {
                            id: "seaweed-snack",
                            name: "Snack rong biển",
                            count: 1,
                        },
                    ],
                },
            ],
        },

        {
            id: "personal",
            name: "Chăm sóc cá nhân",
            count: 6,
            children: [
                {
                    id: "shampoo",
                    name: "Dầu gội",
                    count: 2,
                    children: [
                        {
                            id: "shampoo-men",
                            name: "Dầu gội nam",
                            count: 1,
                        },
                        {
                            id: "shampoo-women",
                            name: "Dầu gội nữ",
                            count: 1,
                        },
                    ],
                },
                {
                    id: "skincare",
                    name: "Chăm sóc da",
                    count: 2,
                    children: [
                        {
                            id: "face-wash",
                            name: "Sữa rửa mặt",
                            count: 1,
                        },
                        {
                            id: "moisturizer",
                            name: "Kem dưỡng da",
                            count: 1,
                        },
                    ],
                },
            ],
        },

        {
            id: "home",
            name: "Chăm sóc nhà cửa",
            count: 5,
            children: [
                {
                    id: "detergent",
                    name: "Nước giặt",
                    count: 2,
                    children: [
                        {
                            id: "detergent-liquid",
                            name: "Nước giặt dạng lỏng",
                            count: 1,
                        },
                        {
                            id: "detergent-capsule",
                            name: "Nước giặt viên",
                            count: 1,
                        },
                    ],
                },
                {
                    id: "cleaning",
                    name: "Đồ vệ sinh",
                    count: 2,
                    children: [
                        {
                            id: "floor-cleaner",
                            name: "Nước lau sàn",
                            count: 1,
                        },
                        {
                            id: "toilet-cleaner",
                            name: "Nước tẩy toilet",
                            count: 1,
                        },
                    ],
                },
            ],
        },

        {
            id: "pet",
            name: "Chăm sóc thú cưng",
            count: 4,
            children: [
                {
                    id: "pet-food",
                    name: "Đồ ăn thú cưng",
                    count: 2,
                    children: [
                        {
                            id: "dog-food",
                            name: "Thức ăn cho chó",
                            count: 1,
                        },
                        {
                            id: "cat-food",
                            name: "Thức ăn cho mèo",
                            count: 1,
                        },
                    ],
                },
                {
                    id: "pet-clothes",
                    name: "Đồ dùng thú cưng",
                    count: 2,
                    children: [
                        {
                            id: "pet-toy",
                            name: "Đồ chơi thú cưng",
                            count: 1,
                        },
                        {
                            id: "pet-bed",
                            name: "Giường thú cưng",
                            count: 1,
                        },
                    ],
                },
            ],
        },

        {
            id: "giadung",
            name: "Nhà bếp",
            count: 4,
            children: [
                {
                    id: "cookware",
                    name: "Đồ gia dụng",
                    count: 2,
                    children: [
                        {
                            id: "pot",
                            name: "Nồi",
                            count: 1,
                        },
                        {
                            id: "pan",
                            name: "Chảo",
                            count: 1,
                        },
                    ],
                },
                {
                    id: "kitchen",
                    name: "Dụng cụ nhà bếp",
                    count: 2,
                    children: [
                        {
                            id: "knife",
                            name: "Dao",
                            count: 1,
                        },
                        {
                            id: "cutting-board",
                            name: "Thớt",
                            count: 1,
                        },
                    ],
                },
            ],
        },
    ];
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [showGroupSelect, setShowGroupSelect] = useState(false);
    const [groupSearch, setGroupSearch] = useState("");
    const [selectedGroup, setSelectedGroup] = useState<{ id: string; name: string; } | null>(null);

    // nút eye lọc 
    const [showDisplayOptions, setShowDisplayOptions] = useState(false);
    const [displayTab, setDisplayTab] = useState<"display" | "other">("display");
    const [displayOptions, setDisplayOptions] = useState({
        image: true,
        inventory: true,
        filterMode: true,
        sortAsc: true,
        cost: true,
        price: true,

        addRow: false,
        setupPrice: false,
        editAmount: true,
        multiSelect: false,
        importPriceIsCost: false,
        sameProduct: true,
        discount: "VND",
        defaultPaySupplier: false,
        autoFillQuantity: true,
    });
    // đơn vị tính 
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState("thùng");
    const unitOptions = ["gói", "lốc", "thùng"];
    // Số lượng sản phẩm
    const [quantity, setQuantity] = useState(1);

    // Các dòng được thêm bằng nút +
    const [extraRows, setExtraRows] = useState<number[]>([]);

    // Model thành tiền và tính giảm giá tính tạm thời mai viết be gắn vô vì giữ liệu quan trọng thì sẽ có new và oll
    const [showAmountPopup, setShowAmountPopup] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState<"VND" | "%">("VND");
    const oldAmount = quantity * 192000;
    // Thành tiền cũ
    const newAmount = discountType === "VND" ? Math.max(0, oldAmount - discount) : Math.max(0, oldAmount - (oldAmount * discount) / 100);

    // model tiền ở chỗ thêm dòngg
    // ID của dòng phụ đang mở popup
    const [activeAmountRowId, setActiveAmountRowId] = useState<number | null>(null);
    // Giảm giá riêng cho từng dòng
    const [discount2, setDiscount2] = useState<Record<number, number>>({});
    // Loại giảm giá riêng cho từng dòng
    const [discountType2, setDiscountType2] = useState<Record<number, "VND" | "%">>({});



    // note 
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState("")
    const [activeNoteRowId, setActiveNoteRowId] = useState<number | null>(null);
    const [notes, setNotes] = useState<Record<number, string>>({});
    // thiết lập giá 
    const [showPriceModal, setShowPriceModal] = useState(false);

    // icon cuối
    const [showSameProductModal, setShowSameProductModal] = useState(false);
    const [sameProductPage, setSameProductPage] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<Record<number, number>>({ 1: 1, });
    const changeQuantity = (id: number, amount: number) => { setQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + amount), })); };

    // bảng bên phải


    // ngày và giờ 
    const [dateOpen, setDateOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [detailDate, setDetailDate] = useState(dayjs());
    const [detailTime, setDetailTime] = useState(dayjs());

    // useropen 
    const [userOpen, setUserOpen] = useState(false);

    // thêm nhà cung cấp 
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [openAddress, setOpenAddress] = useState(true);
    const [openSupplierGroup, setOpenSupplierGroup] = useState(true);
    const [openInvoice, setOpenInvoice] = useState(true);





    return (
        <div className="min-h-screen ">
            <div className="px-30">
                <div className="flex w-full h-[calc(100vh-30px)]">
                    <div className="flex-1 min-w-0 ">
                        <div className="h-[46px] flex items-center px-[18px] gap-3">
                            {/* Back */}
                            <button className="w-[28px] h-[32px] flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md">
                                <ArrowLeft size={21} strokeWidth={2} />
                            </button>
                            {/* Title */}
                            <div className="text-[20px] font-semibold text-[#202124] whitespace-nowrap">
                                Nhập hàng
                            </div>
                            {/* Search */}
                            <div className="h-[36px] w-[500px] ml-[-2px] border border-gray-300 rounded-lg bg-white flex items-center">
                                <div className="pl-3 pr-2 text-gray-500">
                                    <Search size={17} className="text-gray-500 mr-2" />
                                </div>
                                <input type="text" placeholder="Tìm hàng hóa theo mã hoặc tên (F3)" className="flex-1 outline-none text-[14px] text-gray-700 placeholder:text-[#7d9bc2]" />
                                <button type="button" onClick={() => setShowGroupModal(true)}
                                    className="w-[38px] h-full flex items-center justify-center text-gray-700 hover:bg-gray-200 border border-gray-300 rounded-2xl  border-transparent">
                                    <Grip size={17} />
                                </button>
                                {/* MODAL TÌM HÀNG HÓA TỪ NHÓM HÀNG */}
                                {showGroupModal && (
                                    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center" onClick={() => { setShowGroupModal(false); setShowGroupSelect(false); }} >
                                        <div className="w-[560px] bg-white rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} >
                                            {/* HEADER */}
                                            <div className="h-[72px] px-6 flex items-center justify-between">
                                                <h2 className="text-[18px] font-semibold text-gray-800">
                                                    Thêm hàng hóa từ nhóm hàng
                                                </h2>
                                                <button type="button" onClick={() => { setShowGroupModal(false); setShowGroupSelect(false); }} className="w-[32px] h-[32px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600" >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                            {/* BODY */}
                                            <div className="px-6 pb-5">
                                                <div className="flex items-center">
                                                    {/* LABEL */}
                                                    <div className="w-[130px] text-[14px] text-[#003b70]">
                                                        Nhóm hàng
                                                    </div>
                                                    {/* SELECT */}
                                                    <div className="relative flex-1">
                                                        <button type="button" onClick={() => setShowGroupSelect(!showGroupSelect)}
                                                            className="w-full h-[34px] px-3 flex items-center justify-between border border-gray-300 rounded-lg bg-white text-left hover:border-blue-500" >
                                                            <span className={selectedGroup ? "text-gray-800" : "text-gray-500"} >
                                                                {selectedGroup ? selectedGroup.name : "Chọn nhóm hàng"}
                                                            </span>
                                                            <ChevronDown size={16} className="text-gray-500" />
                                                        </button>
                                                        {/* DROPDOWN */}
                                                        {showGroupSelect && (
                                                            <div className="absolute left-0 right-0 top-[40px] z-[1100] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                                                                {/* SEARCH */}
                                                                <div className="p-2">
                                                                    <div className="relative">
                                                                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                                                        <input type="text" value={groupSearch} onChange={(e) => setGroupSearch(e.target.value)} autoFocus placeholder="Tìm kiếm" className="w-full h-[34px] pl-9 pr-3 border border-blue-500 rounded-lg outline-none text-[14px] text-gray-700" />
                                                                    </div>
                                                                </div>
                                                                {/* LIST */}
                                                                <div className="max-h-[280px] overflow-y-auto pb-2">
                                                                    {/* CHỌN NHÓM HÀNG */}
                                                                    <button type="button" onClick={() => { setSelectedGroup(null); setShowGroupSelect(false); setGroupSearch(""); }}
                                                                        className="w-full h-[40px] px-4 text-left text-[14px] text-gray-800 hover:bg-gray-100" >
                                                                        Chọn nhóm hàng
                                                                    </button>
                                                                    {/* GROUPS */}
                                                                    {groups.map((group) => {
                                                                        const parentMatch = group.name.toLowerCase().includes(groupSearch.toLowerCase());
                                                                        const children = group.children.filter((child) => child.name.toLowerCase().includes(groupSearch.toLowerCase()));
                                                                        // Nếu tìm kiếm mà nhóm cha + nhóm con đều không khớp
                                                                        if (groupSearch && !parentMatch && children.length === 0) { return null; }
                                                                        return (
                                                                            <div key={group.id}>
                                                                                {/* ================= CẤP 1 ================= */}
                                                                                <button type="button" onClick={() => { setSelectedGroup({ id: group.id, name: group.name, }); setShowGroupSelect(false); setGroupSearch(""); }}
                                                                                    className="w-full h-[40px] px-4 text-left text-[14px] text-gray-800 hover:bg-gray-100" >
                                                                                    {group.name}
                                                                                </button>
                                                                                {/* ================= CẤP 2 ================= */}
                                                                                {(parentMatch ? group.children : children).map((child) => (
                                                                                    <div key={child.id}>
                                                                                        <button type="button" onClick={() => { setSelectedGroup({ id: child.id, name: child.name, }); setShowGroupSelect(false); setGroupSearch(""); }}
                                                                                            className="w-full h-[40px] pl-[36px] pr-4 text-left text-[14px] text-gray-800 hover:bg-gray-100" >
                                                                                            {child.name}
                                                                                        </button>
                                                                                        {/* ================= CẤP 3 ================= */}
                                                                                        {child.children?.map((subChild) => (
                                                                                            <button key={subChild.id} type="button" onClick={() => { setSelectedGroup({ id: subChild.id, name: subChild.name, }); setShowGroupSelect(false); setGroupSearch(""); }}
                                                                                                className="w-full h-[40px] pl-[56px] pr-4 text-left text-[14px] text-gray-800 hover:bg-gray-100" >
                                                                                                {subChild.name}
                                                                                            </button>
                                                                                        ))}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* FOOTER */}
                                            <div className="h-[64px] px-6 border-t border-gray-200 flex items-center justify-end gap-2">
                                                <button type="button" onClick={() => setShowGroupModal(false)} className="h-[36px] px-4 rounded-lg border border-gray-300 text-[14px] text-gray-700 hover:bg-gray-200"  >
                                                    Bỏ qua
                                                </button>
                                                <button type="button" disabled={!selectedGroup} className="h-[36px] px-4 rounded-lg bg-blue-600 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-[14px] text-white" >
                                                    Xong
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <button className="w-[38px] h-full flex items-center justify-center text-gray-700 hover:bg-gray-200 border border-gray-300 rounded-2xl border-transparent">
                                    <Plus size={19} />
                                </button>
                            </div>

                            {/* Header actions */}
                            <div className="ml-auto flex items-center gap-1">
                                <button className=" w-[34px] h-[34px] border border-gray-300 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 " >
                                    <BarcodeReader size="24" />
                                </button>
                                <button className=" w-[34px] h-[34px] border border-gray-300 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 " >
                                    <Printer size={18} />
                                </button>
                                <div className="relative">
                                    {/* Nút Eye */}
                                    <button type="button" onClick={() => setShowDisplayOptions(prev => !prev)}
                                        className={` w-[34px] h-[34px]  border rounded-lg flex items-center justify-center transition-colors ${showDisplayOptions ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-200"}`} >
                                        <Eye size={19} />
                                    </button>
                                    {/* Popup */}
                                    {showDisplayOptions && (
                                        <div className=" absolute top-[42px] right-0 z-[100] w-[330px] bg-white rounded-[14px] shadow-[0_8px_25px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden " onClick={(e) => e.stopPropagation()} >
                                            {/* Tiêu đề */}
                                            <div className="px-5 pt-5 pb-3">
                                                <h3 className="text-[16px] font-semibold text-gray-800">
                                                    Tùy chọn hiển thị
                                                </h3>
                                            </div>
                                            {/* Tabs */}
                                            <div className="px-5">
                                                <div className="flex border-b border-gray-200 h-[42px]">
                                                    <button type="button" onClick={() => setDisplayTab("display")}
                                                        className={` relative px-1 mr-7 text-[14px] font-medium ${displayTab === "display" ? "text-blue-600" : "text-gray-600"} `} >
                                                        Hiển thị
                                                        {displayTab === "display" && (
                                                            <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                                                        )}
                                                    </button>
                                                    <button type="button" onClick={() => setDisplayTab("other")} className={` relative px-1 text-[14px] font-medium ${displayTab === "other" ? "text-blue-600" : "text-gray-600"} `} >
                                                        Khác
                                                        {displayTab === "other" && (
                                                            <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Nội dung */}
                                            <div className="px-5 py-4">
                                                {/* TAB HIỂN THỊ */}
                                                {displayTab === "display" && (
                                                    <div className="space-y-0">
                                                        {/* Ảnh hàng hóa */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Ảnh hàng hóa
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        image: !prev.image
                                                                    }))}
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.image
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.image
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Tồn Kho */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Tồn Kho
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        inventory: !prev.inventory
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.inventory
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.inventory
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Chế độ lọc */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Chế độ lọc
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        filterMode: !prev.filterMode
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.filterMode
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.filterMode
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Sắp xếp */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Sắp xếp thứ tự hàng hóa
                                                            </span>

                                                            <div className="flex items-center bg-gray-100 rounded-[6px] overflow-hidden">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setDisplayOptions(prev => ({
                                                                            ...prev,
                                                                            sortAsc: true
                                                                        }))
                                                                    }
                                                                    className={`w-[38px] h-[25px] flex items-center justify-center text-[14px] ${displayOptions.sortAsc
                                                                        ? "bg-blue-600 text-white"
                                                                        : "text-gray-700"
                                                                        }`}
                                                                >
                                                                    ↑
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setDisplayOptions(prev => ({
                                                                            ...prev,
                                                                            sortAsc: false
                                                                        }))
                                                                    }
                                                                    className={`w-[38px] h-[25px] flex items-center justify-center text-[14px] ${!displayOptions.sortAsc
                                                                        ? "bg-blue-600 text-white"
                                                                        : "text-gray-700"
                                                                        }`}
                                                                >
                                                                    ↓
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Giá vốn */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="flex items-center gap-2 text-[14px] text-gray-700">
                                                                Giá vốn
                                                                <CircleAlert
                                                                    size={14}
                                                                    className="text-gray-500"
                                                                />
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        cost: !prev.cost
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.cost
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.cost
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Giá bán */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Giá bán
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        price: !prev.price
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.price
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.price
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                    </div>
                                                )}

                                                {/* TAB KHÁC */}
                                                {displayTab === "other" && (
                                                    <div className="space-y-0">

                                                        {/* Thêm dòng */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Thêm dòng
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        addRow: !prev.addRow
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.addRow
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.addRow
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Thiết lập giá */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Thiết lập giá
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        setupPrice: !prev.setupPrice
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.setupPrice
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.setupPrice
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Chỉnh sửa thành tiền */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Chỉnh sửa thành tiền
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        editAmount: !prev.editAmount
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.editAmount
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.editAmount
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Chọn nhiều hàng hóa */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Chọn nhiều hàng hóa
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        multiSelect: !prev.multiSelect
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.multiSelect
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.multiSelect
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Giá nhập là giá vốn */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="flex items-center gap-2 text-[14px] text-gray-700">
                                                                Giá nhập là giá vốn
                                                                <CircleAlert
                                                                    size={14}
                                                                    className="text-gray-500"
                                                                />
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        importPriceIsCost:
                                                                            !prev.importPriceIsCost
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.importPriceIsCost
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.importPriceIsCost
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Xem hàng hóa cùng loại */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Xem hàng hóa cùng loại
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        sameProduct: !prev.sameProduct
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.sameProduct
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.sameProduct
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Giảm giá */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="flex items-center gap-2 text-[14px] text-gray-700">
                                                                Giảm giá
                                                                <CircleAlert
                                                                    size={14}
                                                                    className="text-gray-500"
                                                                />
                                                            </span>

                                                            <div className="flex bg-gray-100 rounded-[6px] overflow-hidden">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setDisplayOptions(prev => ({
                                                                            ...prev,
                                                                            discount: "VND"
                                                                        }))
                                                                    }
                                                                    className={`px-3 h-[25px] text-[13px] font-medium ${displayOptions.discount === "VND"
                                                                        ? "bg-blue-600 text-white"
                                                                        : "text-gray-700"
                                                                        }`}
                                                                >
                                                                    VND
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setDisplayOptions(prev => ({
                                                                            ...prev,
                                                                            discount: "%"
                                                                        }))
                                                                    }
                                                                    className={`w-[34px] h-[25px] text-[13px] font-medium ${displayOptions.discount === "%"
                                                                        ? "bg-blue-600 text-white"
                                                                        : "text-gray-700"
                                                                        }`}
                                                                >
                                                                    %
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Mặc định trả nhà cung cấp */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="text-[14px] text-gray-700">
                                                                Mặc định trả nhà cung cấp
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        defaultPaySupplier:
                                                                            !prev.defaultPaySupplier
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.defaultPaySupplier
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.defaultPaySupplier
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>

                                                        {/* Tự động điền số lượng */}
                                                        <div className="flex items-center justify-between min-h-[54px]">
                                                            <span className="flex items-center gap-2 text-[14px] text-gray-700">
                                                                Tự động điền số lượng theo
                                                                <CircleAlert
                                                                    size={14}
                                                                    className="text-gray-500"
                                                                />
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setDisplayOptions(prev => ({
                                                                        ...prev,
                                                                        autoFillQuantity:
                                                                            !prev.autoFillQuantity
                                                                    }))
                                                                }
                                                                className={`relative w-[36px] h-[20px] rounded-full transition-colors ${displayOptions.autoFillQuantity
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-300"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${displayOptions.autoFillQuantity
                                                                        ? "translate-x-[16px]"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button className=" w-[34px] h-[34px] border border-gray-300 rounded-lg  bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 " >
                                    <CircleAlert size={18} />
                                </button>
                            </div>
                        </div>
                        {/* ================= TABLE ================= */}
                        <div className="px-[16px]">
                            <div className="bg-white rounded-t-[8px] mt-2">
                                {/* KHU VỰC BẢNG - SCROLL NGANG Ở CUỐI */}
                                <div className="w-full h-[calc(100vh-70px)] overflow-x-auto overflow-y-hidden">
                                    <div className=" relative w-[1607px] min-w-[1607px] h-full">
                                        <table className="w-[1607px] border-collapse table-fixed">
                                            <colgroup>
                                                {/* Xóa */}
                                                <col className="w-[52px]" />
                                                {/* STT */}
                                                <col className="w-[58px]" />
                                                {/* Hình */}
                                                {displayOptions.image && (
                                                    <col className="w-[45px]" />
                                                )}
                                                {/* Mã hàng */}
                                                <col className="w-[110px]" />
                                                {/* Tên hàng */}
                                                <col className="w-[260px]" />
                                                {/* ĐVT */}
                                                <col className="w-[150px]" />
                                                {/* Tồn kho */}
                                                {displayOptions.inventory && (
                                                    <col className="w-[120px]" />
                                                )}
                                                {/* Giá vốn */}
                                                {displayOptions.cost && (
                                                    <col className="w-[125px]" />
                                                )}
                                                {/* Giá bán */}
                                                {displayOptions.price && (
                                                    <col className="w-[125px]" />
                                                )}
                                                {/* Số lượng */}
                                                <col className="w-[120px]" />
                                                {/* Đơn giá */}
                                                <col className="w-[145px]" />
                                                {/* Giảm giá */}
                                                <col className="w-[120px]" />
                                                {/* Thành tiền */}
                                                <col className="w-[135px]" />
                                                {/* Thêm dòng */}
                                                {/* + */}
                                                <col className={displayOptions.addRow ? "w-[42px]" : "w-0"} />
                                                {/* Tag */}
                                                <col className={displayOptions.setupPrice ? "w-[42px]" : "w-0"} />
                                                {/* Icon cuối */}
                                                <col className="w-[42px]" />
                                            </colgroup>
                                            {/* HEADER */}
                                            <thead>
                                                <tr className="h-[39px] bg-[#e5f1ff] border-b border-[#c8dff7]">
                                                    {/* Xóa */}
                                                    <th></th>
                                                    {/* STT */}
                                                    <th className="text-center text-[13px] font-semibold text-gray-800">
                                                        STT
                                                    </th>
                                                    {/* Hình */}
                                                    {displayOptions.image && (
                                                        <th className="text-center text-[13px] font-semibold text-gray-800">

                                                        </th>
                                                    )}
                                                    {/* Mã hàng */}
                                                    <th className="text-center text-[13px] font-semibold text-gray-800">
                                                        Mã hàng
                                                    </th>
                                                    {/* Tên hàng */}
                                                    <th className="text-left px-2 text-[13px] font-semibold text-gray-800">
                                                        Tên hàng
                                                    </th>
                                                    {/* ĐVT */}
                                                    <th className="text-left px-2 text-[13px] font-semibold text-gray-800">
                                                        ĐVT
                                                    </th>
                                                    {/* Tồn kho */}
                                                    {displayOptions.inventory && (
                                                        <th className="text-right px-2 text-[13px] font-semibold text-gray-800">
                                                            Tồn kho
                                                        </th>
                                                    )}
                                                    {/* Giá vốn */}
                                                    {displayOptions.cost && (
                                                        <th className="text-right px-2 text-[13px] font-semibold text-gray-800">
                                                            Giá vốn
                                                        </th>
                                                    )}
                                                    {/* Giá bán */}
                                                    {displayOptions.price && (
                                                        <th className="text-right px-2 text-[13px] font-semibold text-gray-800">
                                                            Giá bán
                                                        </th>
                                                    )}
                                                    {/* Số lượng */}
                                                    <th className="text-right px-2 text-[13px] font-semibold text-gray-800">
                                                        Số lượng
                                                    </th>
                                                    {/* Đơn giá */}
                                                    <th className="text-right px-2 text-[13px] font-semibold text-gray-800">
                                                        Đơn giá
                                                    </th>
                                                    {/* Giảm giá */}
                                                    <th className="text-right px-2 text-[13px] font-semibold text-gray-800">
                                                        Giảm giá
                                                    </th>
                                                    {/* Thành tiền */}
                                                    <th className="text-right px-2 text-[13px] font-semibold text-gray-800">
                                                        Thành tiền
                                                    </th>
                                                    {/* Thêm dòng */}
                                                    {displayOptions.addRow && (
                                                        <th className="w-[42px]"></th>
                                                    )}

                                                    {/* Thiết lập giá */}
                                                    {displayOptions.setupPrice && (
                                                        <th className="w-[42px]"></th>
                                                    )}
                                                    {/* Icon */}
                                                    <th></th>
                                                </tr>
                                                {/* FILTER */}
                                                {displayOptions.filterMode && (
                                                    <tr className="h-[45px] border-b border-gray-200 bg-white">
                                                        {/* Xóa */}
                                                        <th></th>
                                                        {/* STT */}
                                                        <th></th>
                                                        {/* Hình */}
                                                        {displayOptions.image && (
                                                            <th></th>
                                                        )}
                                                        {/* Mã hàng */}
                                                        <th className="px-9">
                                                            <input type="text" placeholder="Tìm mã h..." className=" w-full h-[30px] px-1 outline-none text-[14px] text-gray-600 placeholder:text-[#86a2c4] bg-transparent " />
                                                        </th>
                                                        {/* Tên hàng */}
                                                        <th className="px-0">
                                                            <input type="text" placeholder="Tìm tên hàng" className=" w-full h-[30px] px-1 outline-none text-[14px] text-gray-600 placeholder:text-[#86a2c4] bg-transparent" />
                                                        </th>
                                                        {/* ĐVT */}
                                                        <th className="px-0">
                                                            <input type="text" placeholder="Tìm đơn vị" className=" w-full h-[30px] px-1 outline-none text-[14px] text-gray-600 placeholder:text-[#86a2c4] bg-transparent " />
                                                        </th>
                                                        {/* Tồn kho */}
                                                        {displayOptions.inventory && (
                                                            <th></th>
                                                        )}
                                                        {/* Giá vốn */}
                                                        {displayOptions.cost && (
                                                            <th></th>
                                                        )}
                                                        {/* Giá bán */}
                                                        {displayOptions.price && (
                                                            <th></th>
                                                        )}
                                                        {/* Số lượng */}
                                                        <th></th>
                                                        {/* Đơn giá */}
                                                        <th></th>
                                                        {/* Giảm giá */}
                                                        <th></th>
                                                        {/* Thành tiền */}
                                                        <th></th>
                                                        {/* Icon */}
                                                        <th></th>
                                                    </tr>
                                                )}
                                            </thead>
                                            {/* BODY */}
                                            <tbody>
                                                <tr className="group h-[77px] border-b border-gray-200 hover:bg-[#f3f4f6]">
                                                    {/* XÓA */}
                                                    <td className="align-top pt-[14px] text-center ">
                                                        <button className=" ml-[10px] text-gray-800 hover:text-red-500">
                                                            <Trash2 size={19} strokeWidth={2} />
                                                        </button>
                                                    </td>
                                                    {/* STT */}
                                                    <td className="align-top pt-[13px] text-center text-[14px] text-gray-800">
                                                        1
                                                    </td>
                                                    {/* HÌNH SẢN PHẨM */}
                                                    {displayOptions.image && (
                                                        <td className="align-top pt-[8px]">
                                                            <div className="w-full flex justify-center">
                                                                <div className="w-[25px] h-[25px] bg-[#f1f1f1] rounded flex items-center justify-center overflow-hidden">
                                                                    <span className="text-[17px]">
                                                                        🥖
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {/* MÃ HÀNG */}
                                                    <td className="align-top pt-[11px] px-9">
                                                        <div className="text-[14px] text-blue-600 font-medium whitespace-nowrap">
                                                            SP000002
                                                        </div>
                                                    </td>
                                                    {/* TÊN HÀNG */}
                                                    <td className="align-top pt-[8px] px-2">
                                                        <div className="text-[14px] leading-[22px] text-gray-800">
                                                            Bánh mì Staff chà bông 55gr -
                                                            <br />
                                                            10000 - 10000
                                                        </div>
                                                        <div className="relative">
                                                            {/* Ghi chú + Pencil */}
                                                            <button type="button" onClick={() => setShowModal(true)} className="mt-[1px] flex items-center gap-1 text-[12px] italic text-gray-500" >
                                                                <span>{note || "Ghi chú..."}</span>
                                                                <Pencil size={14} className="text-gray-500" />
                                                            </button>
                                                            {/* Modal */}
                                                            {showModal && (
                                                                <>
                                                                    {/* Overlay */}
                                                                    <div className="fixed inset-0 z-40" onClick={() => setShowModal(false)} />
                                                                    {/* Popup */}
                                                                    <div className="absolute left-0 top-full z-50 mt-2 w-[400px] rounded-[14px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                                                                        {/* Input */}
                                                                        <textarea autoFocus value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú"
                                                                            className="h-[100px] w-full resize-none border-none bg-transparent text-[13px] text-gray-700 outline-none placeholder:text-gray-400" />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    {/* ĐVT */}
                                                    <td className="align-top pt-[11px] px-2">
                                                        <div className="relative">
                                                            {/* Nút đang chọn */}
                                                            <button type="button" onClick={() => setShowUnitDropdown(prev => !prev)} className="flex items-center gap-[10px] text-[14px] text-blue-600 outline-none" >
                                                                <span>{selectedUnit}</span>
                                                                {showUnitDropdown ? (
                                                                    <ChevronUp size={15} strokeWidth={2} className="text-blue-600" />
                                                                ) : (
                                                                    <ChevronDown size={15} strokeWidth={2} className="text-blue-600" />)}
                                                            </button>
                                                            {/* Dropdown */}
                                                            {showUnitDropdown && (
                                                                <div
                                                                    className=" absolute left-0 top-[25px] z-[100] w-[110px] bg-white border border-gray-400 shadow-[0_2px_5px_rgba(0,0,0,0.15)]" >
                                                                    {unitOptions.map((unit) => (
                                                                        <button key={unit} type="button" onClick={() => { setSelectedUnit(unit); setShowUnitDropdown(false); }}
                                                                            className={` w-full h-[27px] px-[4px] flex items-center text-left text-[14px] transition-none ${selectedUnit === unit ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"} `} >
                                                                            {unit}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}

                                                        </div>
                                                    </td>
                                                    {/* TỒN KHO */}
                                                    {displayOptions.inventory && (
                                                        <td className="align-top pt-[13px] px-2 text-right">
                                                            <span className="text-[14px] text-gray-800">
                                                                10
                                                            </span>
                                                        </td>
                                                    )}
                                                    {/* GIÁ VỐN */}
                                                    {displayOptions.cost && (
                                                        <td className="align-top pt-[13px] px-2 text-right">
                                                            <span className="text-[14px] text-gray-800">
                                                                192,000
                                                            </span>
                                                        </td>
                                                    )}
                                                    {/* GIÁ BÁN */}
                                                    {displayOptions.price && (
                                                        <td className="align-top pt-[13px] px-2 text-right">
                                                            <span className="text-[14px] text-gray-800">
                                                                210,000
                                                            </span>
                                                        </td>
                                                    )}
                                                    {/* SỐ LƯỢNG */}
                                                    <td className="align-top pt-[10px] px-2">
                                                        <div className="flex items-center justify-center gap-1">
                                                            {/* Nút giảm */}
                                                            <button type="button" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                                className=" w-[24px] h-[25px] flex items-center  justify-center border border-[#cbd5e1] rounded-[4px] bg-[#f8fafc]text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity " >
                                                                <ChevronDown size={14} strokeWidth={2} />
                                                            </button>
                                                            {/* Ô số lượng */}
                                                            <input type="text" value={quantity} readOnly className=" w-[85px] h-[25px] border border-[#cbd5e1] rounded-[10px] text-right px-2 outline-none text-[14px] text-gray-700 bg-white " />
                                                            {/* Nút tăng */}
                                                            <button type="button" onClick={() => setQuantity(prev => prev + 1)}
                                                                className=" w-[24px] h-[25px] flex items-center justify-center border border-[#cbd5e1] rounded-[4px] bg-[#f8fafc] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" >
                                                                <ChevronUp size={14} strokeWidth={2} />
                                                            </button>

                                                        </div>
                                                    </td>
                                                    {/* ĐƠN GIÁ */}
                                                    <td className="align-top pt-[10px] px-2">
                                                        <input value="192,000" readOnly className=" w-full  h-[25px] border border-[#cbd5e1] rounded-lg text-right px-2 outline-none text-[14px] text-gray-700 bg-white " />
                                                    </td>
                                                    {/* GIẢM GIÁ */}
                                                    <td className="align-top pt-[10px] px-2">
                                                        <input value="0" readOnly className=" w-full h-[25px] border border-[#cbd5e1]  rounded-lg text-right px-2 outline-none text-[14px] text-gray-700 bg-white " />
                                                    </td>
                                                    {/* THÀNH TIỀN */}
                                                    <td className="align-top pt-[10px] px-2">
                                                        <div className="relative flex items-center justify-end">
                                                            {displayOptions.editAmount ? (
                                                                <div className="relative" >
                                                                    {/* Ô Thành tiền */}
                                                                    <input type="text" value={newAmount.toLocaleString("en-US")} readOnly onClick={() => { setShowAmountPopup(true); setDiscount(0); setDiscountType("VND"); }}
                                                                        className="w-[108px] h-[25px] border border-[#cbd5e1] rounded-lg text-right px-2 outline-none text-[14px] text-gray-700 bg-white cursor-pointer" />
                                                                    {/* Popup */}
                                                                    {showAmountPopup && (
                                                                        <>
                                                                            {/* Lớp bắt click bên ngoài */}
                                                                            <div className="fixed inset-0 z-[100]" onClick={() => setShowAmountPopup(false)} />
                                                                            <div className="absolute z-[200] top-[32px] right-0 w-[320px] bg-white border border-gray-200 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.15)] p-4">
                                                                                {/* Thành tiền cũ */}
                                                                                <div className="flex items-center justify-between mb-4">
                                                                                    <span className="text-[14px] text-gray-700">
                                                                                        Thành tiền cũ
                                                                                    </span>
                                                                                    <span className="text-[14px] text-gray-800">
                                                                                        {oldAmount.toLocaleString("en-US")}
                                                                                    </span>
                                                                                </div>
                                                                                {/* Giảm */}
                                                                                <div className="flex items-center justify-between mb-4">
                                                                                    <span className="text-[14px] text-gray-700">
                                                                                        Giảm
                                                                                    </span>
                                                                                    <div className="flex items-center">
                                                                                        <input type="number" min="0" value={discount} onChange={(e) => setDiscount(Number(e.target.value))}
                                                                                            className="w-[90px] h-[32px] border border-[#cbd5e1] rounded-l-md text-right px-2 outline-none text-[14px]" />
                                                                                        {/* VND */}
                                                                                        <button type="button" onClick={() => setDiscountType("VND")}
                                                                                            className={`h-[32px] px-3 border-y border-[#cbd5e1] text-[13px] ${discountType === "VND" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600"}`} >
                                                                                            VND
                                                                                        </button>
                                                                                        {/* % */}
                                                                                        <button type="button" onClick={() => setDiscountType("%")}
                                                                                            className={`h-[32px] px-3 border border-l-0 rounded-r-md text-[13px] ${discountType === "%" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600"}`} >
                                                                                            %
                                                                                        </button>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Thành tiền mới */}
                                                                                <div className="flex items-center justify-between">
                                                                                    <span className="text-[14px] text-gray-700">
                                                                                        Thành tiền mới
                                                                                    </span>
                                                                                    <span className="text-[14px] font-medium text-gray-800">
                                                                                        {newAmount.toLocaleString("en-US")}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <span className="w-[108px] text-right text-[14px] text-gray-800">
                                                                    {newAmount.toLocaleString("en-US")}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    {/* THÊM DÒNG */}
                                                    <td className={`align-top pt-[14px] text-center ${displayOptions.addRow ? "w-[42px]" : "w-0 p-0"}`} >
                                                        {displayOptions.addRow && (
                                                            <button type="button" onClick={() => { setExtraRows(prev => [...prev, Date.now()]); }} className="text-gray-800 hover:text-blue-600">
                                                                <Plus size={19} strokeWidth={2} />
                                                            </button>
                                                        )}
                                                    </td>
                                                    {/* THIẾT LẬP GIÁ */}
                                                    <td className={`align-top pt-[14px] text-center ${displayOptions.setupPrice ? "w-[42px]" : "w-0 p-0"}`} >
                                                        {displayOptions.setupPrice && (
                                                            <button type="button" onClick={() => setShowPriceModal(true)} className="text-gray-800 hover:text-blue-600" >
                                                                <Tag size={18} strokeWidth={2} />
                                                            </button>
                                                        )}
                                                    </td>

                                                    {/* ICON CUỐI */}
                                                    <td className="align-top pt-[14px] text-center w-[42px]">
                                                        <button type="button" onClick={() => { setShowSameProductModal(true); setSameProductPage(1); }} className="text-gray-800 hover:text-blue-600">
                                                            <ImageIcon size={19} strokeWidth={2} />
                                                        </button>
                                                    </td>

                                                </tr>
                                                {/* ================= CÁC DÒNG THÊM ================= */}
                                                {extraRows.map((rowId) => (
                                                    <tr key={rowId} className="h-[40px] border-b border-gray-200 bg-[#f1f8ff]  " >
                                                        {/* ================= XÓA ================= */}
                                                        <td className="align-top pt-[10px] text-center ">
                                                            <button type="button" onClick={() => { setExtraRows(prev => prev.filter(id => id !== rowId)); }}
                                                                className="ml-[10px] text-gray-800 hover:text-red-500" >
                                                                <Trash2 size={18} strokeWidth={2} />
                                                            </button>
                                                        </td>
                                                        {/* ================= GHI CHÚ ================= */}
                                                        {/* Gộp: STT + Hình + Mã hàng + Tên hàng + ĐVT */}
                                                        <td colSpan={4 + (displayOptions.image ? 1 : 0)} className="align-top pt-[9px] px-2" >
                                                            <div className="relative">
                                                                {/* Ghi chú */}
                                                                <button type="button" onClick={() => setActiveNoteRowId(activeNoteRowId === rowId ? null : rowId)} className="mt-[1px] flex items-center gap-1 text-[12px] italic text-gray-500" >
                                                                    <span>
                                                                        {notes[rowId] || "Ghi chú..."}
                                                                    </span>
                                                                    <Pencil size={14} className="text-gray-500" />
                                                                </button>
                                                                {/* POPUP GHI CHÚ */}
                                                                {activeNoteRowId === rowId && (
                                                                    <>
                                                                        <div className="fixed inset-0 z-[150]" onClick={() => setActiveNoteRowId(null)} />
                                                                        <div
                                                                            className=" absolute left-[-16px] top-[25px] z-[200] w-[400px] h-[148px] bg-white rounded-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.12)] border border-gray-100 p-3 "
                                                                            onClick={(e) => e.stopPropagation()} >
                                                                            <textarea autoFocus value={notes[rowId] || ""}
                                                                                onChange={(e) =>
                                                                                    setNotes(prev => ({
                                                                                        ...prev,
                                                                                        [rowId]: e.target.value
                                                                                    }))
                                                                                }
                                                                                placeholder="Ghi chú"
                                                                                className=" w-full h-full resize-none border-none outline-none bg-transparent text-[14px] text-gray-700 placeholder:text-gray-400 " />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        {/* ================= SỐ LƯỢNG ================= */}
                                                        <td className="align-top pt-[10px] px-2">
                                                            <div className="flex items-center justify-center gap-1">
                                                                {/* Nút giảm */}
                                                                <button type="button" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                                    className=" w-[24px] h-[25px] flex items-center  justify-center border border-[#cbd5e1] rounded-[4px] bg-[#f8fafc]text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity " >
                                                                    <ChevronDown size={14} strokeWidth={2} />
                                                                </button>
                                                                {/* Ô số lượng */}
                                                                <input type="text" value={quantity} readOnly className=" w-[85px] h-[25px] border border-[#cbd5e1] rounded-[10px] text-right px-2 outline-none text-[14px] text-gray-700 bg-white " />
                                                                {/* Nút tăng */}
                                                                <button type="button" onClick={() => setQuantity(prev => prev + 1)}
                                                                    className=" w-[24px] h-[25px] flex items-center justify-center border border-[#cbd5e1] rounded-[4px] bg-[#f8fafc] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" >
                                                                    <ChevronUp size={14} strokeWidth={2} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                        {/* ================= ĐƠN GIÁ ================= */}
                                                        <td className="align-top pt-[7px] px-2">
                                                            <input value="192,000" readOnly className=" w-full h-[25px] border border-[#cbd5e1] rounded-lg text-right px-2 outline-none text-[14px] text-gray-700 bg-white " />
                                                        </td>
                                                        {/* ================= GIẢM GIÁ ================= */}
                                                        <td className="align-top pt-[7px] px-2">
                                                            <input value="0" readOnly className=" w-full h-[25px] border border-[#cbd5e1] rounded-lg text-right px-2 outline-none text-[14px] text-gray-700 bg-white " />
                                                        </td>
                                                        {/* ================= THÀNH TIỀN ================= */}
                                                        <td className="align-top pt-[7px] px-2">
                                                            <div className="relative flex items-center justify-end">
                                                                {displayOptions.editAmount ? (
                                                                    <div className="relative">
                                                                        {/* Ô Thành tiền */}
                                                                        <input type="text" value={(quantity * 192000 - (discount2[rowId] || 0)).toLocaleString("en-US")} readOnly
                                                                            onClick={() => {
                                                                                setActiveAmountRowId(rowId);
                                                                                setDiscount2(prev => ({ ...prev, [rowId]: 0, }));
                                                                                setDiscountType2(prev => ({ ...prev, [rowId]: "VND", }));
                                                                            }}
                                                                            className="w-[108px] h-[25px] border border-[#cbd5e1] rounded-lg text-right px-2 outline-none text-[14px] text-gray-700 bg-white cursor-pointer" />

                                                                        {/* CHỈ HIỆN POPUP CỦA DÒNG ĐANG CLICK */}
                                                                        {activeAmountRowId === rowId && (
                                                                            <>
                                                                                {/* Overlay */}
                                                                                <div className="fixed inset-0 z-[100]" onClick={() => setActiveAmountRowId(null)} />
                                                                                {/* Popup */}
                                                                                <div className="absolute z-[200] top-[32px] right-0 w-[320px] bg-white border border-gray-200 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.15)] p-4">
                                                                                    {/* Thành tiền cũ */}
                                                                                    <div className="flex items-center justify-between mb-4">
                                                                                        <span className="text-[14px] text-gray-700">
                                                                                            Thành tiền cũ
                                                                                        </span>
                                                                                        <span className="text-[14px] text-gray-800">
                                                                                            {(quantity * 192000).toLocaleString("en-US")}
                                                                                        </span>
                                                                                    </div>
                                                                                    {/* Giảm */}
                                                                                    <div className="flex items-center justify-between mb-4">
                                                                                        <span className="text-[14px] text-gray-700">
                                                                                            Giảm
                                                                                        </span>
                                                                                        <div className="flex items-center">
                                                                                            <input type="number" min="0" value={discount2[rowId] || 0} onChange={(e) => setDiscount2(prev => ({ ...prev, [rowId]: Number(e.target.value), }))}
                                                                                                className="w-[90px] h-[32px] border border-[#cbd5e1] rounded-l-md text-right px-2 outline-none text-[14px]" />
                                                                                            {/* VND */}
                                                                                            <button type="button" onClick={() => setDiscountType2(prev => ({ ...prev, [rowId]: "VND", }))}
                                                                                                className={`h-[32px] px-3 border-y border-[#cbd5e1] text-[13px] ${(discountType2[rowId] || "VND") === "VND" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600"}`} >
                                                                                                VND
                                                                                            </button>
                                                                                            {/* % */}
                                                                                            <button type="button" onClick={() => setDiscountType2(prev => ({ ...prev, [rowId]: "%", }))}
                                                                                                className={`h-[32px] px-3 border border-l-0 rounded-r-md text-[13px] ${discountType2[rowId] === "%" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600"}`} >
                                                                                                %
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* Thành tiền mới */}
                                                                                    <div className="flex items-center justify-between">
                                                                                        <span className="text-[14px] text-gray-700">
                                                                                            Thành tiền mới
                                                                                        </span>
                                                                                        <span className="text-[14px] font-medium text-gray-800">
                                                                                            {((discountType2[rowId] || "VND") === "VND" ? Math.max(0, quantity * 192000 - (discount2[rowId] || 0)) : Math.max(0, quantity * 192000 - (quantity * 192000 * (discount2[rowId] || 0)) / 100)).toLocaleString("en-US")}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <span className="w-[108px] text-right text-[14px] text-gray-800">
                                                                        {(quantity * 192000 - (discount2[rowId] || 0)).toLocaleString("en-US")}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        {/* ================= THÊM DÒNG ================= */}
                                                        {displayOptions.addRow && (
                                                            <td className="align-top pt-[9px] text-center">
                                                                <button type="button" onClick={() => { setExtraRows(prev => [...prev, Date.now()]); }}
                                                                    className="text-gray-800 hover:text-blue-600" >
                                                                    <Plus size={19} strokeWidth={2} />
                                                                </button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {showPriceModal && (
                                            <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[10px]">
                                                <div className="w-[960px] max-w-[95vw] rounded-xl bg-white shadow-xl">
                                                    {/* HEADER */}
                                                    <div className="flex items-center justify-between px-6 py-5">
                                                        <h2 className="text-[18px] font-semibold text-gray-800">
                                                            Thiết lập giá cho Bánh mì Staff chà bông 55gr
                                                        </h2>
                                                        <button type="button" onClick={() => setShowPriceModal(false)} className="text-gray-500 hover:text-gray-800" >
                                                            <X size={20} />
                                                        </button>
                                                    </div>
                                                    {/* CONTENT */}
                                                    <div className="px-6">
                                                        <div className="overflow-x-auto">
                                                            <table className="min-w-[1100px] w-full border-collapse">
                                                                <thead>
                                                                    <tr className="bg-gray-100 text-[13px] text-gray-700">
                                                                        <th className="w-[170px] px-3 py-3 text-left font-medium">
                                                                            Tên bảng giá
                                                                        </th>

                                                                        <th className="min-w-[260px] px-3 py-3 text-center font-medium">
                                                                            Giá bán (Bánh mì Staff chà bông 55gr -
                                                                            <br />
                                                                            10000 - 10000 (gói))
                                                                        </th>
                                                                        <th className="min-w-[260px] px-3 py-3 text-center font-medium">
                                                                            Giá bán (Bánh mì Staff chà bông 55gr -
                                                                            <br />
                                                                            10000 - 10000 (lốc))
                                                                        </th>
                                                                        <th className="min-w-[260px] px-3 py-3 text-center font-medium">
                                                                            Giá bán (Bánh mì Staff chà bông 55gr -
                                                                            <br />
                                                                            10000 - 10000 (thùng))
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {/* BẢNG GIÁ CHUNG */}
                                                                    <tr className="border-b border-gray-200">
                                                                        <td className="px-3 py-3 text-[14px] text-gray-700">
                                                                            Bảng giá chung
                                                                        </td>
                                                                        <td className="px-3 py-2">
                                                                            <input type="text" defaultValue="10,000" className="h-[33px] w-full rounded-lg border border-gray-300 px-3 text-right text-[14px] outline-none focus:border-blue-500" />
                                                                        </td>
                                                                        <td className="px-3 py-2">
                                                                            <input type="text" defaultValue="53,000" className="h-[33px] w-full rounded-lg border border-gray-300 px-3 text-right text-[14px] outline-none focus:border-blue-500" />
                                                                        </td>
                                                                        <td className="px-3 py-2">
                                                                            <input type="text" defaultValue="210,000" className="h-[33px] w-full rounded-lg border border-gray-300 px-3 text-right text-[14px] outline-none focus:border-blue-500" />
                                                                        </td>
                                                                    </tr>

                                                                    {/* BÁN SỈ */}
                                                                    <tr className="border-b border-gray-200">
                                                                        <td className="px-3 py-3 text-[14px] text-gray-700">
                                                                            Bán sỉ
                                                                        </td>
                                                                        <td className="px-3 py-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <input type="text" defaultValue="8,400" className="h-[33px] w-full rounded-lg border border-gray-300 px-3 text-right text-[14px] outline-none focus:border-blue-500" />

                                                                                <button type="button" className="shrink-0 text-gray-600 hover:text-red-500" >
                                                                                    <Trash2 size={17} />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-3 py-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <input type="text" defaultValue="50,400" className="h-[33px] w-full rounded-lg border border-gray-300 px-3 text-right text-[14px] outline-none focus:border-blue-500" />
                                                                                <button type="button" className="shrink-0 text-gray-600 hover:text-red-500" >
                                                                                    <Trash2 size={17} />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-3 py-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <input
                                                                                    type="text" defaultValue="201,600" className="h-[33px] w-full rounded-lg border border-gray-300 px-3 text-right text-[14px] outline-none focus:border-blue-500" />
                                                                                <button type="button" className="shrink-0 text-gray-600 hover:text-red-500">
                                                                                    <Trash2 size={17} />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/* FOOTER */}
                                                    <div className="flex justify-end gap-2 px-6 py-4">
                                                        <button type="button" onClick={() => setShowPriceModal(false)} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50"  >
                                                            Bỏ qua
                                                        </button>
                                                        <button type="button"
                                                            // TODO: lưu giá
                                                            onClick={() => { setShowPriceModal(false); }}
                                                            className="rounded-lg bg-blue-600 px-5 py-2 text-[14px] font-medium text-white hover:bg-blue-700"  >
                                                            Xong
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {showSameProductModal && (
                                            <>
                                                {/* Nền tối */}
                                                <div className="fixed inset-0 z-[1000] bg-black/50" onClick={() => setShowSameProductModal(false)} />
                                                {/* MODAL */}
                                                <div className="fixed left-1/2 top-[10px] z-[1100] w-[1050px] -translate-x-1/2 overflow-hidden rounded-[14px] bg-white shadow-2xl">
                                                    {/* HEADER */}
                                                    <div className="flex h-[62px] items-center justify-between px-6">
                                                        <h2 className="text-[18px] font-semibold text-gray-800">
                                                            Hàng hóa cùng loại
                                                        </h2>
                                                        <button type="button" onClick={() => setShowSameProductModal(false)} className="text-gray-500 hover:text-gray-800" >
                                                            <X size={19} />
                                                        </button>
                                                    </div>
                                                    {/* BODY */}
                                                    <div className="flex min-h-[360px] px-6 pb-5">
                                                        {/* BÊN TRÁI */}
                                                        <div className="w-[380px] pr-8">
                                                            {/* DẦU */}
                                                            <div className="mb-6">
                                                                <div className="mb-3 text-[14px] text-gray-700">
                                                                    DÂU
                                                                </div>
                                                                <button type="button" onClick={() => setSelectedColor(selectedColor === "DÂU" ? "DÂU,CAM" : "DÂU")}
                                                                    className={` rounded-full px-4 py-[6px] text-[14px] transition ${selectedColor === "DÂU" ? "bg-blue-600 text-white border border-blue-600" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400"} `} >
                                                                    10000
                                                                </button>
                                                            </div>
                                                            {/* CAM */}
                                                            <div>
                                                                <div className="mb-3 text-[14px] text-gray-700">
                                                                    CAM
                                                                </div>
                                                                <button type="button" onClick={() => setSelectedColor(selectedColor === "CAM" ? "DÂU,CAM" : "CAM")}
                                                                    className={` rounded-full px-4 py-[6px] text-[14px] transition ${selectedColor === "CAM" ? "bg-blue-600 text-white border border-blue-600" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400"
                                                                        }`} >
                                                                    10000
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {/* BÊN PHẢI */}
                                                        <div className="flex-1">
                                                            {/* TITLE + PAGINATION */}
                                                            <div className="mb-4 flex items-center justify-between">
                                                                <span className="text-[16px] text-gray-700">
                                                                    Tổng số lượng nhập: {Object.values(quantities).reduce((total, quantity) => total + quantity, 0)}
                                                                </span>
                                                                <div className="flex items-center gap-3 text-gray-600">
                                                                    <button type="button" disabled={sameProductPage === 1} onClick={() => setSameProductPage(prev => prev - 1)}
                                                                        className="disabled:text-gray-300" >
                                                                        <ChevronLeft size={18} />
                                                                    </button>
                                                                    <span className="text-[14px]">
                                                                        {sameProductPage} / 2
                                                                    </span>
                                                                    <button type="button" disabled={sameProductPage === 2} onClick={() => setSameProductPage(prev => prev + 1)} className="disabled:text-gray-300" >
                                                                        <ChevronRight size={18} />
                                                                    </button>

                                                                </div>
                                                            </div>
                                                            {/* PRODUCT LIST */}
                                                            <div className="flex gap-5">
                                                                {sameProductPage === 1 ? (
                                                                    <>
                                                                        {/* SẢN PHẨM 1 */}
                                                                        <div className="w-[140px]">
                                                                            <div className="relative flex h-[140px] items-center justify-center rounded-md bg-gray-50">
                                                                                <ImageIcon size={48} className="text-blue-300" />
                                                                                <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-[13px] text-gray-600">
                                                                                    240
                                                                                </span>
                                                                            </div>
                                                                            <div className="mt-2 text-[14px] leading-[20px] text-gray-700">
                                                                                Bánh mì Staff chà bông 55gr -
                                                                                <span className="text-orange-500">
                                                                                    {" "}10000 - 10000
                                                                                </span>
                                                                                {" - "}
                                                                                <span className="text-orange-500">
                                                                                    gói
                                                                                </span>
                                                                            </div>
                                                                            <div className="mt-12 flex items-center gap-2">
                                                                                <button onClick={() => changeQuantity(1, -1)} type="button" className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300" >
                                                                                    <ChevronDown size={14} />
                                                                                </button>
                                                                                <input type="text" value={quantities[1] ?? 0} readOnly className="h-[24px] w-[78px] rounded-md border border-gray-300 text-center text-[14px] outline-none" />
                                                                                <button type="button" onClick={() => changeQuantity(1, 1)} className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300" >
                                                                                    <ChevronUp size={14} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        {/* SẢN PHẨM 2 */}
                                                                        <div className="w-[140px]">
                                                                            <div className="relative flex h-[140px] items-center justify-center rounded-md bg-gray-50">
                                                                                <ImageIcon size={48} className="text-blue-300" />
                                                                                <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-[13px] text-gray-600">
                                                                                    60
                                                                                </span>
                                                                            </div>
                                                                            <div className="mt-2 text-[14px] leading-[20px] text-gray-700">
                                                                                Bánh mì Staff chà bông 55gr -
                                                                                <span className="text-orange-500">
                                                                                    {" "}10000 - 10000
                                                                                </span>
                                                                                {" - "}
                                                                                <span className="text-blue-600">
                                                                                    lốc
                                                                                </span>
                                                                            </div>
                                                                            <div className="mt-12 flex items-center gap-2">
                                                                                <button onClick={() => changeQuantity(2, -1)} type="button" className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300" >
                                                                                    <ChevronDown size={14} />
                                                                                </button>
                                                                                <input type="text" value={quantities[2] ?? 0} readOnly className="h-[24px] w-[78px] rounded-md border border-gray-300 text-center text-[14px] outline-none" />
                                                                                <button onClick={() => changeQuantity(2, 1)} type="button" className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300" >
                                                                                    <ChevronUp size={14} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        {/* SẢN PHẨM 3 */}
                                                                        <div className="w-[140px]">
                                                                            <div className="relative flex h-[140px] items-center justify-center rounded-md bg-gray-50">
                                                                                <ImageIcon size={48} className="text-blue-300" />
                                                                                <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-[13px] text-gray-600">
                                                                                    10
                                                                                </span>
                                                                            </div>
                                                                            <div className="mt-2 text-[14px] leading-[20px] text-gray-700">
                                                                                Bánh mì Staff chà bông 55gr -
                                                                                <span className="text-orange-500">
                                                                                    {" "}10000 - 10000
                                                                                </span>
                                                                                {" - "}
                                                                                <span className="text-blue-600">
                                                                                    gói
                                                                                </span>
                                                                            </div>
                                                                            <div className="mt-12 flex items-center gap-2">
                                                                                <button type="button" onClick={() => changeQuantity(3, -1)} className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300" >
                                                                                    <ChevronDown size={14} />
                                                                                </button>
                                                                                <input type="text" value={quantities[3] ?? 0} readOnly className="h-[24px] w-[78px] rounded-md border border-gray-300 text-center text-[14px] outline-none" />
                                                                                <button type="button" onClick={() => changeQuantity(3, 1)} className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300" >
                                                                                    <ChevronUp size={14} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        {/* SẢN PHẨM 4 */}
                                                                        <div className="w-[140px]">
                                                                            <div className="relative flex h-[140px] items-center justify-center rounded-md bg-gray-50">
                                                                                <ImageIcon size={48} className="text-blue-300" />
                                                                                <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-[13px] text-gray-600">
                                                                                    40
                                                                                </span>
                                                                            </div>

                                                                            <div className="mt-2 text-[14px] leading-[20px] text-gray-700">
                                                                                Bánh mì Staff chà bông 55gr -
                                                                                <span className="text-orange-500">
                                                                                    {" "}10000 - 10000
                                                                                </span>
                                                                                {" - "}
                                                                                <span className="text-blue-600">
                                                                                    lốc
                                                                                </span>
                                                                            </div>

                                                                            <div className="mt-12 flex items-center gap-2">
                                                                                <button type="button" onClick={() => changeQuantity(4, -1)} className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300">
                                                                                    <ChevronDown size={14} />
                                                                                </button>
                                                                                <input type="text" value={quantities[4] ?? 0} readOnly className="h-[24px] w-[78px] rounded-md border border-gray-300 text-center text-[14px] outline-none" />
                                                                                <button type="button" onClick={() => changeQuantity(4, 1)} className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300" >
                                                                                    <ChevronUp size={14} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {/* TRANG 2 */}
                                                                        <div className="w-[140px]">
                                                                            <div className="relative flex h-[140px] items-center justify-center rounded-md bg-gray-50">
                                                                                <ImageIcon size={48} className="text-blue-300" />

                                                                                <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-[13px] text-gray-600">
                                                                                    10
                                                                                </span>
                                                                            </div>

                                                                            <div className="mt-2 text-[14px] leading-[20px] text-gray-700">
                                                                                Bánh mì Staff chà bông 55gr -
                                                                                <span className="text-orange-500">
                                                                                    {" "}10000 - 10000
                                                                                </span>
                                                                                {" - "}
                                                                                <span className="text-blue-600">
                                                                                    thùng
                                                                                </span>
                                                                            </div>
                                                                            <div className="mt-12 flex items-center gap-2">
                                                                                <button type="button" onClick={() => changeQuantity(5, -1)} className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300">
                                                                                    <ChevronDown size={14} />
                                                                                </button>
                                                                                <input type="text" value={quantities[5] ?? 0} readOnly className="h-[24px] w-[78px] rounded-md border border-gray-300 text-center text-[14px] outline-none" />
                                                                                <button type="button" onClick={() => changeQuantity(5, 1)} className="flex h-[23px] w-[23px] items-center justify-center rounded-full border border-gray-300" >
                                                                                    <ChevronUp size={14} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* FOOTER */}
                                                    <div className="flex h-[66px] items-center justify-end gap-2 border-t border-gray-200 px-6">
                                                        <button type="button" onClick={() => setShowSameProductModal(false)} className="h-[40px] rounded-lg border border-gray-300 px-4 text-[14px] font-medium text-gray-600 hover:bg-gray-50" >
                                                            Bỏ qua
                                                        </button>
                                                        <button type="button" onClick={() => setShowSameProductModal(false)} className="h-[40px] rounded-lg bg-blue-600 px-5 text-[14px] font-medium text-white hover:bg-blue-700" >
                                                            Xong
                                                        </button>

                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= KHUNG BÊN PHẢI ================= */}
                    <div className="w-[420px] flex-shrink-0 h-[calc(100vh-15px)] bg-white border-l border-gray-200 flex flex-col">
                        {/* ================= TOP ================= */}
                        <div className="h-[56px] flex-shrink-0 px-3 flex items-center justify-between">
                            {/* Người dùng */}
                            <div className="relative">
                                <button type="button" onClick={() => setUserOpen(!userOpen)} className="h-[34px] w-[180px] px-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between text-[14px] text-gray-700 hover:bg-gray-50" >
                                    <div className="flex items-center gap-2">
                                        <span className="w-[20px] h-[20px] flex items-center justify-center">
                                            <CircleUser size={20} className="text-gray-500" />
                                        </span>
                                        <span>truong tran</span>
                                    </div>
                                    {userOpen ? (
                                        <ChevronUp size={16} className="text-gray-500" />
                                    ) : (
                                        <ChevronDown size={16} className="text-gray-500" />
                                    )}
                                </button>
                                {/* Dropdown */}
                                {userOpen && (
                                    <>
                                        {/* Click ra ngoài để đóng */}
                                        <div className="fixed inset-0 z-40" onClick={() => setUserOpen(false)} />
                                        {/* Model */}
                                        <div className="absolute top-[40px] left-0 w-[250px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
                                            {/* Ô tìm kiếm */}
                                            <div className="h-[34px] border border-blue-500 rounded-lg flex items-center px-2 mb-2">
                                                <Search size={18} className="text-gray-500" />
                                                <input type="text" className="w-full outline-none text-[14px] ml-2" />
                                            </div>
                                            {/* Người dùng */}
                                            <button type="button" onClick={() => setUserOpen(false)} className="w-full h-[34px] px-2 rounded-md bg-blue-50 flex items-center justify-between text-[14px] text-gray-700" >
                                                <span>truong tran</span>
                                                <Check size={18} className="text-blue-600" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* Ngày giờ */}
                            <div className="flex items-center w-[150px] h-[32px] border border-gray-300 rounded-md bg-white px-1">
                                {/* NGÀY */}
                                <DatePicker value={detailDate} onChange={(date) => { if (date) { setDetailDate(date); setDateOpen(false); } }} format="DD/MM/YYYY" allowClear={false} variant="borderless" suffixIcon={null} open={dateOpen} onOpenChange={setDateOpen}
                                    className="!w-[100px] !h-[30px] !p-0 !text-[13px]" />
                                {/* GIỜ */}
                                <TimePicker value={detailTime} onChange={(time) => { if (time) { setDetailTime(time); setTimeOpen(false); } }} format="HH:mm" minuteStep={1} allowClear={false} variant="borderless" suffixIcon={null} open={timeOpen} onOpenChange={setTimeOpen}
                                    className="!w-[55px] !h-[30px] !p-0 !text-[13px]" />
                            </div>
                        </div>
                        {/* ================= CONTENT ================= */}
                        <div className="flex-1 overflow-y-auto px-3">
                            {/* Nhà cung cấp */}
                            <div className="flex items-center w-full h-[34px] border border-gray-300 rounded-lg bg-white focus-within:border-blue-500">
                                <input type="text" placeholder="Tìm nhà cung cấp" className="flex-1 h-full px-3 border-none outline-none text-[14px] text-gray-700 placeholder:text-gray-400 bg-transparent" />
                                <button type="button" onClick={() => setShowSupplierModal(true)} className="w-[24px] h-[24px] flex-shrink-0 mr-3 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 " >
                                    <Plus size={18} />
                                </button>
                            </div>
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
                            {/* Mã phiếu nhập */}
                            <div className="flex items-center justify-between min-h-[44px]">
                                <span className="text-[14px] text-gray-700">
                                    Mã phiếu nhập
                                </span>
                                <input type="text" placeholder="Mã phiếu tự động" className="w-[185px] h-[34px] px-3 border border-gray-300 rounded-lg outline-none text-[14px] text-gray-700 placeholder:text-gray-400 text-right" />
                            </div>


                            {/* Mã đặt hàng nhập */}
                            <div className="flex items-center justify-between min-h-[44px]">
                                <span className="text-[14px] text-gray-700">
                                    Mã đặt hàng nhập
                                </span>
                            </div>
                            {/* Trạng thái */}
                            <div className="flex items-center justify-between min-h-[44px]">
                                <span className="text-[14px] text-gray-700">
                                    Trạng thái
                                </span>
                                <span className="text-[14px] text-gray-700">
                                    Phiếu tạm
                                </span>
                            </div>
                            {/* Số hóa đơn đầu vào */}
                            <div className="flex items-center justify-between min-h-[54px]">
                                <span className="text-[14px] text-gray-700">
                                    Số hóa đơn đầu vào
                                </span>
                                <input type="text" placeholder="Nhập số hóa đơn đầu ..." className="w-[185px] h-[34px] px-3 border border-gray-300 rounded-lg outline-none text-[13px] text-gray-700 placeholder:text-gray-400 text-right" />
                            </div>
                            {/* Tổng tiền hàng */}
                            <div className="flex items-center justify-between min-h-[44px]">
                                <span className="text-[14px] text-gray-700">
                                    Tổng tiền hàng
                                    <span className="ml-1 text-gray-500">①</span>
                                </span>
                                <span className="text-[14px] text-gray-700">
                                    192,000
                                </span>
                            </div>
                            {/* Giảm giá */}
                            <div className="relative flex items-center justify-between min-h-[44px]">
                                <span className="text-[14px] text-gray-700">
                                    Giảm giá
                                </span>
                                <div className="relative">
                                    <input type="text" value={ discountType === "VND" ? discount.toLocaleString("vi-VN") : discount } readOnly 
                                    // onClick={() => setShowAmountPopup(true)}
                                        className="w-[185px] h-[34px] px-3 border border-gray-300 rounded-lg outline-none text-[14px] text-gray-700 text-right cursor-pointer" />

                                    {showAmountPopup && (
                                        <div className="absolute z-50 right-[-18px] bottom-[46px] w-[416px] h-[68px] bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] px-4 flex items-center">
                                            <span className="text-[14px] text-gray-700 mr-3">
                                                Giảm giá
                                            </span>
                                            <div className="flex items-center w-[312px] h-[34px] border border-blue-500 rounded-lg overflow-hidden">
                                                <input type="text" value={discount} onChange={(e) => { setDiscount(Number(e.target.value) || 0); }} className="flex-1 h-full px-3 outline-none border-none text-[14px] text-gray-700 text-right" />
                                                <button
                                                    type="button"
                                                    onClick={() => setDiscountType("VND")}
                                                    className={`h-full w-[48px] text-[14px] ${discountType === "VND"
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "text-gray-700"
                                                        }`}
                                                > VND
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setDiscountType("%")}
                                                    className={`h-full w-[38px] text-[14px] ${discountType === "%"
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "text-gray-700"
                                                        }`}
                                                >
                                                    %
                                                </button>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Cần trả nhà cung cấp */}
                            <div className="flex items-center justify-between min-h-[44px]">
                                <span className="text-[14px] font-semibold text-gray-800">
                                    Cần trả nhà cung cấp
                                </span>
                                <span className="text-[14px] font-semibold text-blue-600">
                                    192,000
                                </span>
                            </div>
                            {/* Tiền trả nhà cung cấp */}
                            <div className="flex items-center justify-between min-h-[44px]">
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] text-gray-700">
                                        Tiền trả nhà cung cấp (F8)
                                    </span>
                                    <span className="text-blue-600 text-[16px]">
                                        ▣
                                    </span>
                                </div>
                                <input type="text" value="0" readOnly className="w-[185px] h-[34px] px-3 border border-gray-300 rounded-lg outline-none text-[14px] text-gray-700 text-right" />
                            </div>
                            {/* Tiền mặt */}
                            <div className="flex items-center min-h-[30px]">
                                <span className="text-[14px] text-gray-700">
                                    Tiền mặt
                                </span>
                            </div>
                            {/* Tính vào công nợ */}
                            <div className="flex items-center justify-between min-h-[44px]">
                                <span className="text-[14px] text-gray-700">
                                    Tính vào công nợ
                                </span>
                                <span className="text-[14px] text-gray-700">
                                    -192,000
                                </span>
                            </div>
                            {/* Ghi chú */}
                            <div className="mt-2">
                                <textarea placeholder="Ghi chú" className="w-full h-[75px] px-3 py-2 border border-gray-300 rounded-lg resize-none outline-none text-[14px] text-gray-700 placeholder:text-gray-400 focus:border-blue-500" />
                            </div>
                        </div>
                        {/* ================= FOOTER ================= */}
                        <div className="h-[72px] flex-shrink-0 px-3 flex items-center gap-3 bg-white">
                            <button type="button" className="flex-1 h-[48px] rounded-lg border border-blue-600 bg-white text-blue-600 text-[14px] font-semibold hover:bg-blue-50" >
                                Lưu tạm
                            </button>
                            <button type="button" className="flex-1 h-[48px] rounded-lg bg-blue-600 text-white text-[14px] font-semibold hover:bg-blue-700" >
                                Hoàn thành
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ImportProduct;