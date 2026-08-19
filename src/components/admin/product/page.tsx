"use client";

import { Search, SlidersHorizontal, Plus, ChevronDown, FileUp, FileDown, List, Settings, CircleHelp, ChevronRight, CalendarDays, } from "lucide-react";
import { useState } from "react";

const Product = () => {
    const columns = [
        "Hình ảnh",
        "Mã hàng",
        "Mã vạch",
        "Tên hàng",
        "Nhóm hàng",
        "Loại hàng",
        "Liên kết kênh bán",
        "Giá bán",
        "Giá vốn",
        "Thương hiệu",
        "Tồn kho",
        "Vị trí",
        "Khách đặt",
        "Thời gian tạo",
        "Dự kiến hết hàng",
        "Định mức tồn ít nhất",
        "Định mức tồn nhiều nhất",
        "Trạng thái",
    ];
    const [showFilter, setShowFilter] = useState(false);
    const [showColumns, setShowColumns] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(columns);



    const [stockFilter, setStockFilter] = useState("Tất cả");
    const [expectedStock, setExpectedStock] = useState("Toàn thời gian");
    const [showExpectedPicker, setShowExpectedPicker] = useState(false);
    const [createdTime, setCreatedTime] = useState("all");
    const [directSale, setDirectSale] = useState("all");
    const [salesChannel, setSalesChannel] = useState("all");


    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const today = new Date().toISOString().split("T")[0];
    const [showCustomPicker, setShowCustomPicker] = useState(false);

    // nhóm hàng 
    const [showGroupPicker, setShowGroupPicker] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);


    // thời gian tạo 
    const [showCreatedPicker, setShowCreatedPicker] = useState(false);
    const [showCreatedCustomPicker, setShowCreatedCustomPicker] = useState(false);
    const [createdFromDate, setCreatedFromDate] = useState("");
    const [createdToDate, setCreatedToDate] = useState("");


    const groups = [
        {
            id: "food",
            name: "Bánh, kẹo, snack",
            count: 4,
            children: [
                { id: "cake", name: "Bánh", count: 2 },
                { id: "candy", name: "Kẹo", count: 1 },
                { id: "snack", name: "Snack", count: 1 },
            ],
        },
        {
            id: "personal",
            name: "Chăm sóc cá nhân",
            count: 4,
            children: [
                { id: "shampoo", name: "Dầu gội", count: 2 },
                { id: "skincare", name: "Chăm sóc da", count: 2 },
            ],
        },
        {
            id: "home",
            name: "Chăm sóc nhà cửa",
            count: 3,
            children: [
                { id: "detergent", name: "Nước giặt", count: 2 },
                { id: "cleaning", name: "Đồ vệ sinh", count: 1 },
            ],
        },
        {
            id: "pet",
            name: "Chăm sóc thú cưng",
            count: 1,
            children: [
                { id: "pet-food", name: "Đồ ăn thú cưng", count: 1 },
                { id: "pet-clothes", name: "Đồ dùng thú cưng", count: 1 },
            ],
        },
        {
            id: "gia dụng",
            name: "nhà bếp ",
            count: 1,
            children: [
                { id: "pet-food", name: "Đồ ăn thú cưng", count: 1 },
                { id: "pet-clothes", name: "Đồ dùng thú cưng", count: 1 },
            ],
        },
    ];

    const products = [
        {
            id: 1,
            image: "https://ann.com.vn/image/combo-5-hop-tam-chi-nha-khoa-ve-sinh-rang-mieng-dental-flossers-hop-50-2.png",
            code: "10223908180",
            barcode: "",
            name: "Tăm chỉ Amita (gói 50 que)",
            group: "Chỉ, tăm nha khoa",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 2,
            image: "🥩",
            code: "10223525751",
            barcode: "",
            name: "Thịt dê nạc",
            group: "Các loại thịt khác",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 3,
            image: "🧴",
            code: "1021024676802",
            barcode: "",
            name: "Xịt chống muỗi trẻ em",
            group: "Diệt chuột, côn trùng",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 4,
            image: "🐟",
            code: "1021023987836",
            barcode: "",
            name: "Khô cá lóc non sông Đốc Cà Mau hút chân không 500gram",
            group: "Thực phẩm sơ chế, tẩm ướp",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 5,
            image: "🌱",
            code: "1021023976409",
            barcode: "",
            name: "Sen đá trung",
            group: "Hạt giống, cây con",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 6,
            image: "🍬",
            code: "1021023769752",
            barcode: "",
            name: "Kẹo dẻo cốt trái cây xoài xanh 300g x 24gói",
            group: "Kẹo dẻo, kẹo marshmallow",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 7,
            image: "🥛",
            code: "1021022915952",
            barcode: "",
            name: "Sữa đặc có đường Ông Thọ trắng nhãn vàng lon 380g",
            group: "Sữa đặc",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 8,
            image: "🥝",
            code: "1021022832795",
            barcode: "",
            name: "Kiwi vàng New Zealand khay 3,5kg",
            group: "Trái cây",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 9,
            image: "🥟",
            code: "101381421291",
            barcode: "8934637514987",
            name: "Sủi cảo tôm thịt Cholimex 300g",
            group: "Hoành thánh, bánh xếp, há cảo, sủi cảo",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "Cholimex",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 10,
            image: "🍱",
            code: "10138153516",
            barcode: "",
            name: "Khay đá silicon có nắp 14 viên 213",
            group: "Hộp đựng thực phẩm",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 11,
            image: "🍞",
            code: "10137863505",
            barcode: "8938502525641",
            name: "Bánh bao Thọ Phát trái đào 240g",
            group: "Bánh bao, bánh mì, pizza",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "Thọ Phát",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 12,
            image: "🎨",
            code: "10137406670",
            barcode: "",
            name: "Màu dạ acrylic 60 màu",
            group: "Văn phòng phẩm khác",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 13,
            image: "🐟",
            code: "10137340627",
            barcode: "",
            name: "Sealect cá ngừ xắt lát ngâm dầu đậu nành 165g",
            group: "Thủy sản hộp",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "Sealect",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 14,
            image: "🍋",
            code: "10136999639",
            barcode: "",
            name: "Sả tươi 500gr",
            group: "Rau gia vị, rau thơm",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 15,
            image: "🍮",
            code: "10136761804",
            barcode: "",
            name: "Kẹo thạch Zai Zai Đức Hạnh 1 túi 700g loại cây dài",
            group: "Rau câu, thạch",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 16,
            image: "🧃",
            code: "10136747981",
            barcode: "",
            name: "Nước nghệ Hàn Quốc Curcumin",
            group: "Bột nghệ, viên nghệ",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 17,
            image: "🍪",
            code: "10136747982",
            barcode: "",
            name: "Bánh quy bơ hộp thiếc",
            group: "Bánh quy",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 18,
            image: "🧼",
            code: "10136747983",
            barcode: "",
            name: "Nước rửa tay diệt khuẩn",
            group: "Chăm sóc cá nhân",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 19,
            image: "🧽",
            code: "10136747984",
            barcode: "",
            name: "Miếng rửa chén đa năng",
            group: "Đồ vệ sinh",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
        {
            id: 20,
            image: "🐶",
            code: "10136747985",
            barcode: "",
            name: "Thức ăn cho chó trưởng thành",
            group: "Đồ ăn thú cưng",
            type: "Hàng hóa",
            salePrice: 0,
            costPrice: 0,
            brand: "",
            stock: 0,
            location: "",
            ordered: 0,
            createdAt: "17/08/2026",
            expectedOut: "",
            minStock: 0,
            maxStock: 0,
            status: "Đang kinh doanh",
        },
    ];

    // làm món hàng yêu thích 
    const [favorites, setFavorites] = useState<number[]>([]);


    // làm trang 
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const currentProducts = products.slice(startIndex, endIndex);


    return (
        <div className="min-h-screen ">
            <div className="px-30">
                <header className="h-[40px] flex items-center px-6">
                    <div className="w-[300px]">
                        <h1 className="text-[24px] font-bold text-gray-900">
                            Hàng hóa
                        </h1>
                    </div>

                    {/* Search */}
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

                    {/* Actions */}
                    <div className="w-[auto] flex items-center justify-end gap-2">

                        {/* Tạo mới */}
                        <div className="relative group">
                            <button className="h-[40px] px-4 rounded-lg border border-blue-500 text-blue-600  bg-white flex items-center gap-2 font-semibold hover:bg-blue-50" >
                                <Plus size={21} />
                                <span>Tạo mới</span>
                                <ChevronDown size={17} />
                            </button>

                            {/* Dropdown */}
                            <div className="absolute top-[46px] right-0 w-[250px] bg-white text-gray-800  rounded-lg shadow-xl hidden group-hover:block z-50 overflow-hidden" >
                                <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer mt-2">
                                    Hàng hóa
                                </div>

                                <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                    Dịch vụ
                                </div>

                                <div className="px-4 py-4 hover:bg-[#f1f2f4] cursor-pointer">
                                    Combo - đóng gói
                                </div>
                            </div>
                        </div>

                        {/* Import */}
                        <button className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white flex items-center gap-2  text-gray-700 font-semibold hover:bg-gray-50">
                            <FileUp size={20} />
                            <span>Import file</span>
                        </button>
                        {/* Export */}
                        <button className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white flex items-center gap-2  text-gray-700 font-semibold hover:bg-gray-50" >
                            <FileDown size={20} />
                            <span>Xuất file</span>
                        </button>

                        {/* List */}
                        <div className="relative">

                            <button type="button" onClick={() => setShowColumns(!showColumns)}
                                className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                                <List size={21} />
                            </button>

                            {showColumns && (
                                <div className="absolute top-[46px] right-0 w-[425px] bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] p-3" >
                                    <div className="grid grid-cols-2 gap-x-6">

                                        {columns.map((column) => (
                                            <label key={column}
                                                className="flex items-center gap-2 h-[36px] cursor-pointer text-[15px] text-gray-700" >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedColumns.includes(column)}
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

                        {/* Settings */}
                        <button className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                            <Settings size={20} />
                        </button>

                        {/* Help */}
                        <button className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                            <CircleHelp size={20} />
                        </button>

                    </div>
                </header>
                <div className="flex gap-4 mt-4">
                    {/* ================= CỘT FILTER BÊN TRÁI ================= */}
                    <aside className="w-[auto] shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-5">
                            {/* Nhóm hàng */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[18px] font-semibold text-gray-900">
                                    Nhóm hàng
                                </h2>
                                <button type="button"
                                    className="text-blue-600 text-[17px] font-medium hover:text-blue-700">
                                    Tạo mới
                                </button>
                            </div>
                            <div className="relative">
                                {/* Button chọn nhóm hàng */}
                                <button
                                    type="button"
                                    onClick={() => setShowGroupPicker(!showGroupPicker)}
                                    className={`w-full h-[43px] px-4 border rounded-xl text-left text-[17px] flex items-center justify-between bg-white ${showGroupPicker
                                        ? "border-blue-500"
                                        : "border-gray-300 hover:border-blue-400"
                                        }`}
                                >
                                    <span
                                        className={`truncate ${selectedGroups.length > 0
                                            ? "text-gray-800"
                                            : "text-gray-400"
                                            }`}
                                    >
                                        {selectedGroups.length > 0
                                            ? (() => {
                                                const selectedNames = groups
                                                    .flatMap((group) => [
                                                        selectedGroups.includes(group.id)
                                                            ? group.name
                                                            : null,
                                                        ...group.children
                                                            .filter((child) =>
                                                                selectedGroups.includes(child.id)
                                                            )
                                                            .map((child) => child.name),
                                                    ])
                                                    .filter(Boolean);

                                                const visibleNames = selectedNames.slice(0, 3);
                                                const remainingCount = selectedNames.length - 3;

                                                return (
                                                    <>
                                                        {visibleNames.join(", ")}
                                                        {remainingCount > 0 && (
                                                            <span className="text-blue-600 font-medium">
                                                                {" "}+{remainingCount}
                                                            </span>
                                                        )}
                                                    </>
                                                );
                                            })()
                                            : "Chọn nhóm hàng"}
                                    </span>

                                    <ChevronDown
                                        size={20}
                                        className={`text-gray-500 transition-transform ${showGroupPicker ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* ================= POPUP NHÓM HÀNG ================= */}
                                {showGroupPicker && (
                                    <>
                                        <div className="fixed inset-0 z-[9998]" onClick={() => setShowGroupPicker(false)} />
                                        <div className="absolute left-0 top-[52px] z-[9999] w-[400px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">

                                            {/* Header */}
                                            <div className="px-4 pt-4 pb-3">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h3 className="text-[16px] font-semibold text-gray-900">
                                                        Nhóm hàng
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        className="text-blue-600 text-[15px] font-medium hover:text-blue-700 flex items-center gap-1"
                                                    >
                                                        <Plus size={17} />
                                                        Tạo mới
                                                    </button>
                                                </div>
                                                {/* Search */}
                                                <div className="relative">
                                                    <Search
                                                        size={19}
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                    />

                                                    <input
                                                        type="text"
                                                        placeholder="Tìm kiếm"
                                                        className="w-full h-[40px] pl-10 pr-3 border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Danh sách */}
                                            <div className="max-h-[400px] overflow-y-auto px-3 pb-3">

                                                {groups.map((group) => {
                                                    const isExpanded = expandedGroups.includes(group.id);

                                                    const allChildrenSelected = group.children.every(
                                                        (child) => selectedGroups.includes(child.id)
                                                    );

                                                    return (
                                                        <div key={group.id}>
                                                            {/* Nhóm cha */}
                                                            <div className="flex items-center h-[38px]">
                                                                {/* Icon kéo */}
                                                                <span className="text-gray-400 w-[20px] text-center">
                                                                    ⋮⋮
                                                                </span>

                                                                {/* Mũi tên */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setExpandedGroups((prev) =>
                                                                            prev.includes(group.id)
                                                                                ? prev.filter(
                                                                                    (id) => id !== group.id
                                                                                )
                                                                                : [...prev, group.id]
                                                                        );
                                                                    }}
                                                                    className="w-[25px] flex justify-center"
                                                                >
                                                                    <ChevronRight size={17} className={`text-gray-600 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                                                                </button>

                                                                {/* Checkbox nhóm cha */}
                                                                <input
                                                                    type="checkbox"
                                                                    checked={allChildrenSelected}
                                                                    onChange={(e) => {
                                                                        const childIds = group.children.map(
                                                                            (child) => child.id
                                                                        );

                                                                        if (e.target.checked) {
                                                                            setSelectedGroups((prev) => [
                                                                                ...new Set([
                                                                                    ...prev,
                                                                                    group.id,
                                                                                    ...childIds,
                                                                                ]),
                                                                            ]);
                                                                        } else {
                                                                            setSelectedGroups((prev) =>
                                                                                prev.filter(
                                                                                    (id) =>
                                                                                        id !== group.id &&
                                                                                        !childIds.includes(id)
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="w-[16px] h-[16px] accent-blue-600 cursor-pointer"
                                                                />

                                                                {/* Tên nhóm */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setExpandedGroups((prev) =>
                                                                            prev.includes(group.id)
                                                                                ? prev.filter(
                                                                                    (id) => id !== group.id
                                                                                )
                                                                                : [...prev, group.id]
                                                                        );
                                                                    }}
                                                                    className="ml-2 text-[13px] text-gray-700 hover:text-gray-900 text-left"
                                                                >
                                                                    {group.name} ({group.count})
                                                                </button>
                                                            </div>

                                                            {/* Nhóm con */}
                                                            {isExpanded && (
                                                                <div className="ml-[45px]">

                                                                    {group.children.map((child) => (
                                                                        <label
                                                                            key={child.id}
                                                                            className="flex items-center gap-2 h-[36px] cursor-pointer"
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={selectedGroups.includes(
                                                                                    child.id
                                                                                )}
                                                                                onChange={(e) => {
                                                                                    if (e.target.checked) {
                                                                                        setSelectedGroups(
                                                                                            (prev) => [
                                                                                                ...prev,
                                                                                                child.id,
                                                                                            ]
                                                                                        );
                                                                                    } else {
                                                                                        setSelectedGroups(
                                                                                            (prev) =>
                                                                                                prev.filter(
                                                                                                    (id) =>
                                                                                                        id !==
                                                                                                        child.id
                                                                                                )
                                                                                        );
                                                                                    }
                                                                                }}
                                                                                className="w-[16px] h-[16px] accent-blue-600 cursor-pointer"
                                                                            />

                                                                            <span className="text-[15px] text-gray-700">
                                                                                {child.name} ({child.count})
                                                                            </span>
                                                                        </label>
                                                                    ))}

                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Footer */}
                                            <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const allIds = groups.flatMap((group) => [
                                                            group.id,
                                                            ...group.children.map((child) => child.id),
                                                        ]);

                                                        if (selectedGroups.length >= 2) {
                                                            // Bỏ chọn tất cả
                                                            setSelectedGroups([]);
                                                        } else {
                                                            // Chọn tất cả
                                                            setSelectedGroups(allIds);
                                                        }
                                                    }}
                                                    className="text-blue-600 font-medium text-[15px] hover:text-blue-700"
                                                >
                                                    {selectedGroups.length >= 2
                                                        ? "Bỏ chọn tất cả"
                                                        : "Chọn tất cả"}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setShowGroupPicker(false)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                                                >
                                                    Áp dụng
                                                </button>

                                            </div>
                                        </div>
                                    </>

                                )}
                            </div>


                            {/* Tồn kho */}
                            <div className="mt-8">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Tồn kho
                                </h2>

                                <p className="text-[15px] text-gray-500 mb-2">
                                    Tiêu chí tồn
                                </p>

                                <div className="relative">
                                    <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}
                                        className="appearance-none w-full h-[45px] px-4 pr-10 border border-gray-300 rounded-xl bg-white text-[18px] text-gray-800 outline-none focus:border-blue-500 " >
                                        <option>Tất cả</option>
                                        <option>Dưới mức định tồn </option>
                                        <option>Vượt mức định tồn </option>
                                        <option>Còn hàng trong kho</option>
                                        <option>Hết hàng trong kho</option>
                                        <option>Tùy chỉnh giá trị tồn</option>
                                    </select>

                                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700" />
                                </div>
                            </div>

                            {/* Dự kiến hết hàng */}
                            <div className="mt-8">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Dự kiến hết hàng
                                </h2>
                                <div className="space-y-3">
                                    {/* Toàn thời gian */}
                                    <div className="relative flex items-center gap-3">
                                        {/* Radio */}
                                        <button type="button" onClick={() => { setExpectedStock("all"); setShowExpectedPicker(true); }}
                                            className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ${expectedStock !== "custom" ? "border-blue-500" : "border-gray-400"}`}>
                                            {expectedStock !== "custom" && (
                                                <span className="w-[12px] h-[12px] rounded-full bg-blue-500" />
                                            )}
                                        </button>
                                        <button type="button" onClick={() => setShowExpectedPicker(!showExpectedPicker)}
                                            className={`flex-1 h-[49px] px-4 border rounded-xl flex items-center justify-between text-[18px] text-gray-800 bg-white ${showExpectedPicker ? "border-blue-500" : "border-gray-300 hover:border-blue-400"}`} >
                                            <span>
                                                {expectedStock === "all" || expectedStock === "custom"
                                                    ? "Toàn thời gian"
                                                    : expectedStock}
                                            </span>
                                            <ChevronRight size={22} className="text-gray-500" />
                                        </button>


                                        {/* POPUP */}
                                        {showExpectedPicker && (
                                            <>
                                                <div className="fixed inset-0 z-[9998]" onClick={() => setShowExpectedPicker(false)} />
                                                <div className="absolute left-[225px] top-[-95px] z-[9999] w-[380px] bg-white rounded-xl shadow-xl border border-gray-200 p-4">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {/* Theo ngày */}
                                                        <div>
                                                            <h3 className="font-semibold text-[15px] mb-3">
                                                                Theo ngày
                                                            </h3>
                                                            <div className="flex flex-col gap-2">
                                                                {[
                                                                    "Ngày mai",
                                                                    "Ngày kia",
                                                                    "3 ngày tới",
                                                                    "5 ngày tới",
                                                                    "7 ngày tới",
                                                                ].map((item) => (
                                                                    <button key={item} type="button"
                                                                        onClick={() => { setExpectedStock(item); setShowExpectedPicker(false); }}
                                                                        className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${expectedStock === item ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"}`} >
                                                                        {item}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {/* Theo tuần */}
                                                        <div>
                                                            <h3 className="font-semibold text-[15px] mb-3">
                                                                Theo tuần
                                                            </h3>
                                                            <div className="flex flex-col gap-2">
                                                                {[
                                                                    "Tuần này",
                                                                    "Tuần tới",
                                                                    "2 tuần tới",
                                                                ].map((item) => (
                                                                    <button
                                                                        key={item}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setExpectedStock(item);
                                                                            setShowExpectedPicker(false);
                                                                        }}
                                                                        className={`w-fit px-3 h-[33px] rounded-full border text-[14px]
                                                                    ${expectedStock === item ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"}`}>
                                                                        {item}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Theo tháng */}
                                                        <div>
                                                            <h3 className="font-semibold text-[15px] mb-3">
                                                                Theo tháng
                                                            </h3>
                                                            <div className="flex flex-col gap-2">
                                                                {[
                                                                    "Tháng này",
                                                                    "Tháng tới",
                                                                    "30 ngày tới",
                                                                    "2 tháng tới",
                                                                    "3 tháng tới",
                                                                ].map((item) => (
                                                                    <button
                                                                        key={item}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setExpectedStock(item);
                                                                            setShowExpectedPicker(false);
                                                                        }}
                                                                        className={`w-fit px-3 h-[33px] rounded-full border text-[14px] ${expectedStock === item ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"}`}>
                                                                        {item}
                                                                    </button>
                                                                ))}
                                                                {/* Toàn thời gian */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => { setExpectedStock("all"); setShowExpectedPicker(false); }}
                                                                    className={`w-auto px-3 h-[40px] rounded-full border text-[14px rounded-full border text-[14px] ${expectedStock === "all" ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"}`}>
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
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setExpectedStock("custom");
                                                setShowCustomPicker(true);
                                            }}
                                            className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ${expectedStock === "custom"
                                                ? "border-blue-500"
                                                : "border-gray-400"
                                                }`}
                                        >
                                            {expectedStock === "custom" && (
                                                <span className="w-[12px] h-[12px] rounded-full bg-blue-500" />
                                            )}
                                        </button>

                                        <div className="relative flex-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setExpectedStock("custom");
                                                    setShowCustomPicker(true);
                                                }}
                                                className={`w-full h-[49px] px-4 border rounded-xl flex items-center justify-between text-[18px] text-gray-800 ${expectedStock === "custom"
                                                    ? "border-blue-500"
                                                    : "border-gray-300 hover:border-blue-400"
                                                    }`}
                                            >
                                                <span>
                                                    {fromDate && toDate
                                                        ? `${new Date(fromDate).toLocaleDateString("vi-VN")} - ${new Date(toDate).toLocaleDateString("vi-VN")}`
                                                        : "Tùy chỉnh"}
                                                </span>

                                                <CalendarDays size={22} className="text-gray-500" />
                                            </button>

                                            {showCustomPicker && (
                                                <div className="absolute left-[225px] top-0 z-[9999] w-[380px] bg-white rounded-xl shadow-xl border p-4">
                                                    {/* Dòng ngày ở đầu */}
                                                    <div className="text-sm mb-4">
                                                        Từ ngày:{" "}
                                                        <span className="font-semibold">
                                                            {fromDate
                                                                ? new Date(fromDate).toLocaleDateString("vi-VN")
                                                                : "--/--/----"}
                                                        </span>
                                                        {" - "}
                                                        Đến ngày:{" "}
                                                        <span className="font-semibold">
                                                            {toDate
                                                                ? new Date(toDate).toLocaleDateString("vi-VN")
                                                                : "--/--/----"}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-2 mb-4">
                                                        <input
                                                            type="date"
                                                            value={fromDate}
                                                            min={today}
                                                            onChange={(e) => {
                                                                setFromDate(e.target.value);
                                                                setToDate("");
                                                            }}
                                                            className="w-full h-10 border rounded-lg px-2"
                                                        />

                                                        <input
                                                            type="date"
                                                            value={toDate}
                                                            min={fromDate || today}
                                                            onChange={(e) => setToDate(e.target.value)}
                                                            className="w-full h-10 border rounded-lg px-2"
                                                        />
                                                    </div>

                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setFromDate("");
                                                                setToDate("");
                                                                setExpectedStock("all");
                                                                setShowCustomPicker(false);
                                                            }}
                                                            className="px-4 py-2 border rounded-lg"
                                                        >
                                                            Bỏ qua
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={!fromDate || !toDate}
                                                            onClick={() => setShowCustomPicker(false)}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                                                        >
                                                            Áp dụng
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>




                            {/* Thời gian tạo */}
                            <div className="mt-8">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Thời gian tạo
                                </h2>

                                <div className="space-y-3">

                                    {/* Toàn thời gian */}
                                    <div className="relative flex items-center gap-3">

                                        {/* Radio */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCreatedTime("all");
                                                setShowCreatedPicker(true);
                                            }}
                                            className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ${createdTime !== "custom"
                                                ? "border-blue-500"
                                                : "border-gray-400"
                                                }`}
                                        >
                                            {createdTime !== "custom" && (
                                                <span className="w-[12px] h-[12px] rounded-full bg-blue-500" />
                                            )}
                                        </button>

                                        {/* Button */}
                                        <button
                                            type="button"
                                            onClick={() => setShowCreatedPicker(!showCreatedPicker)}
                                            className={`flex-1 h-[49px] px-4 border rounded-xl flex items-center justify-between text-[18px] text-gray-800 bg-white ${showCreatedPicker
                                                ? "border-blue-500"
                                                : "border-gray-300 hover:border-blue-400"
                                                }`}
                                        >
                                            <span>
                                                {createdTime === "all" || createdTime === "custom"
                                                    ? "Toàn thời gian"
                                                    : createdTime}
                                            </span>

                                            <ChevronRight
                                                size={22}
                                                className="text-gray-500"
                                            />
                                        </button>

                                        {/* POPUP THỜI GIAN TẠO */}
                                        {showCreatedPicker && (
                                            <>
                                                {/* Overlay */}
                                                <div
                                                    className="fixed inset-0 z-[9998]"
                                                    onClick={() => setShowCreatedPicker(false)}
                                                />

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
                                                                    <button
                                                                        key={item}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setCreatedTime(item);
                                                                            setShowCreatedPicker(false);
                                                                        }}
                                                                        className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                            ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                            }`}
                                                                    >
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
                                                                    <button
                                                                        key={item}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setCreatedTime(item);
                                                                            setShowCreatedPicker(false);
                                                                        }}
                                                                        className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                            ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                            }`}
                                                                    >
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
                                                                    <button
                                                                        key={item}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setCreatedTime(item);
                                                                            setShowCreatedPicker(false);
                                                                        }}
                                                                        className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                            ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                            }`}
                                                                    >
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
                                                                    <button
                                                                        key={item}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setCreatedTime(item);
                                                                            setShowCreatedPicker(false);
                                                                        }}
                                                                        className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                            ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                            }`}
                                                                    >
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
                                                                    <button
                                                                        key={item}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setCreatedTime(item);
                                                                            setShowCreatedPicker(false);
                                                                        }}
                                                                        className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === item
                                                                            ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                            }`}
                                                                    >
                                                                        {item}
                                                                    </button>
                                                                ))}

                                                                {/* Toàn thời gian */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setCreatedTime("all");
                                                                        setShowCreatedPicker(false);
                                                                    }}
                                                                    className={`w-fit px-3 h-[34px] rounded-full border text-[14px] ${createdTime === "all"
                                                                        ? "bg-blue-600 text-white border-blue-600 font-semibold"
                                                                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                                                                        }`}
                                                                >
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
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCreatedTime("custom");
                                                setShowCreatedCustomPicker(true);
                                            }}
                                            className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ${createdTime === "custom"
                                                ? "border-blue-500"
                                                : "border-gray-400"
                                                }`}
                                        >
                                            {createdTime === "custom" && (
                                                <span className="w-[12px] h-[12px] rounded-full bg-blue-500" />
                                            )}
                                        </button>

                                        {/* Tùy chỉnh */}
                                        <div className="relative flex-1">

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCreatedTime("custom");
                                                    setShowCreatedCustomPicker(true);
                                                }}
                                                className={`w-full h-[49px] px-4 border rounded-xl flex items-center justify-between text-[18px] text-gray-800 bg-white ${createdTime === "custom"
                                                    ? "border-blue-500"
                                                    : "border-gray-300 hover:border-blue-400"
                                                    }`}
                                            >
                                                <span>
                                                    {createdFromDate && createdToDate
                                                        ? `${new Date(createdFromDate).toLocaleDateString("vi-VN")} - ${new Date(createdToDate).toLocaleDateString("vi-VN")}`
                                                        : "Tùy chỉnh"}
                                                </span>

                                                <CalendarDays
                                                    size={22}
                                                    className="text-gray-500"
                                                />
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

                                                        <input
                                                            type="date"
                                                            value={createdFromDate}
                                                            onChange={(e) => {
                                                                setCreatedFromDate(e.target.value);
                                                                setCreatedToDate("");
                                                            }}
                                                            className="w-full h-10 border rounded-lg px-2"
                                                        />

                                                        <input
                                                            type="date"
                                                            value={createdToDate}
                                                            min={createdFromDate}
                                                            onChange={(e) =>
                                                                setCreatedToDate(e.target.value)
                                                            }
                                                            className="w-full h-10 border rounded-lg px-2"
                                                        />

                                                    </div>

                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setCreatedFromDate("");
                                                                setCreatedToDate("");
                                                                setCreatedTime("all");
                                                                setShowCreatedCustomPicker(false);
                                                            }}
                                                            className="px-4 py-2 border rounded-lg"
                                                        >
                                                            Bỏ qua
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                !createdFromDate ||
                                                                !createdToDate
                                                            }
                                                            onClick={() =>
                                                                setShowCreatedCustomPicker(false)
                                                            }
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                                                        >
                                                            Áp dụng
                                                        </button>

                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                </div>
                            </div>





                            {/* Nhà cung cấp */}
                            <div className="mt-8">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Nhà cung cấp
                                </h2>
                                <select
                                    className="w-full h-[43px] px-4 border border-gray-300 rounded-xl  text-[17px] text-gray-700 bg-white  hover:border-blue-400 focus:outline-none focus:border-blue-500" defaultValue="">
                                    <option value="" disabled>
                                        Chọn nhà cung cấp
                                    </option>
                                    <option value="hoang-gia">Công ty Hoàng Gia</option>
                                    <option value="xuan-mai">Công ty Xuân Mai</option>
                                    <option value="minh-phat">Công ty Minh Phát</option>
                                    <option value="thanh-cong">Công ty Thành Công</option>
                                    <option value="phu-quy">Công ty Phú Quý</option>
                                    <option value="tat-ca">Tất cả</option>
                                </select>
                            </div>
                            {/* Vị trí */}
                            <div className="mt-8">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Vị trí
                                </h2>
                                <button
                                    type="button"
                                    className="w-full h-[45px] px-4 border border-gray-300 rounded-xl text-left text-[18px] text-gray-400 hover:border-blue-400"
                                >
                                    Chọn vị trí
                                </button>
                            </div>
                            {/* Loại hàng */}
                            <div className="mt-8">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Loại hàng
                                </h2>
                                <select className="w-full h-[45px] px-4 border border-gray-300 rounded-xl text-[17px] text-gray-700 bg-white hover:border-blue-400 focus:outline-none focus:border-blue-500" defaultValue="" >
                                    <option value="" disabled>
                                        Chọn loại hàng
                                    </option>
                                    <option value="hang-hoa">Hàng hóa</option>
                                    <option value="dich-vu">Dịch vụ</option>
                                    <option value="combo-dong-goi">Combo - đóng gói</option>
                                </select>
                            </div>
                            {/* Bán trực tiếp */}
                            <div className="mt-8">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Bán trực tiếp
                                </h2>
                                <div className="flex gap-3">
                                    {[
                                        { label: "Tất cả", value: "all" },
                                        { label: "Có", value: "yes" },
                                        { label: "Không", value: "no" },
                                    ].map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => setDirectSale(item.value)}
                                            className={`h-[43px] px-5 rounded-full border text-[16px] font-medium ${directSale === item.value
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Liên kết kênh bán */}
                            <div className="mt-8">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Liên kết kênh bán
                                </h2>
                                <div className="flex gap-3">
                                    {[
                                        { label: "Tất cả", value: "all" },
                                        { label: "Có", value: "yes" },
                                        { label: "Không", value: "no" },
                                    ].map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => setSalesChannel(item.value)}
                                            className={`h-[43px] px-5 rounded-full border text-[16px] font-medium ${salesChannel === item.value
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Trạng thái hàng hóa */}
                            <div className="mt-8 pb-5">
                                <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
                                    Trạng thái hàng hóa
                                </h2>
                                <div className="relative">
                                    <select
                                        className="appearance-none w-full h-[45px] px-4 pr-10 border border-gray-300 rounded-xl bg-white text-[16px] text-gray-800 outline-none focus:border-blue-500"
                                    >
                                        <option>Hàng đang kinh doanh</option>
                                        <option>Hàng ngừng kinh doanh</option>
                                        <option>Tất cả</option>
                                    </select>

                                    <ChevronDown
                                        size={20}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700"
                                    />
                                </div>
                            </div>

                        </div>
                    </aside>



                    {/* ================= PHẦN DANH SÁCH HÀNG HÓA ================= */}
                    <main className="flex-1 min-w-0">
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            {/* ================= TABLE ================= */}
                            <div className="w-full overflow-x-auto">
                                <table className="w-max min-w-[2100px] border-collapse">
                                    {/* ================= HEADER ================= */}
                                    <thead>
                                        <tr className="h-[40px] bg-[#e7f2ff] border-b border-gray-200">
                                            {/* Checkbox tổng */}
                                            <th className="w-[42px] min-w-[42px] sticky left-0 z-20 bg-[#e7f2ff]">
                                                <div className="flex items-center justify-center">
                                                    <input type="checkbox" className="w-[16px] h-[16px] rounded border-gray-400 accent-blue-600 cursor-pointer" />
                                                </div>
                                            </th>
                                            {/* Star */}
                                            <th className="w-[42px] min-w-[42px] bg-[#e7f2ff]">
                                                <div className="flex items-center justify-center">
                                                    <span className="text-[22px] text-gray-400">
                                                        ☆
                                                    </span>
                                                </div>
                                            </th>

                                            {/* Các cột */}
                                            {selectedColumns.map((column) => {
                                                if (column === "Hình ảnh") {
                                                    return (<th key={column} className="w-[55px] min-w-[55px] bg-[#e7f2ff]" />);
                                                }

                                                const widthMap: Record<string, string> = {
                                                    "Mã hàng": "auto",
                                                    "Mã vạch": "auto",
                                                    "Tên hàng": "auto",
                                                    "Nhóm hàng": "auto",
                                                    "Loại hàng": "auto",
                                                    "Liên kết kênh bán": "auto",
                                                    "Giá bán": "auto",
                                                    "Giá vốn": "auto",
                                                    "Thương hiệu": "auto",
                                                    "Tồn kho": "auto",
                                                    "Vị trí": "auto",
                                                    "Khách đặt": "auto",
                                                    "Thời gian tạo": "auto",
                                                    "Dự kiến hết hàng": "auto",
                                                    "Định mức tồn ít nhất": "auto",
                                                    "Định mức tồn nhiều nhất": "auto",
                                                    "Trạng thái": "auto",
                                                };
                                                return (
                                                    <th key={column} style={{ width: widthMap[column] || "150px", minWidth: widthMap[column] || "150px", }}
                                                        className="px-3 text-[16px] font-semibold text-gray-800 text-left whitespace-nowrap">
                                                        {column}
                                                    </th>
                                                );
                                            })}

                                        </tr>
                                    </thead>

                                    {/* ================= BODY ================= */}
                                    <tbody>
                                        {currentProducts.map((product) => (
                                            <tr key={product.id} className="h-[60px] border-b border-gray-100 hover:bg-[#f8fbff] transition-colors">
                                                {/* Checkbox */}
                                                <td className="w-[42px] min-w-[42px] bg-white">
                                                    <div className="flex items-center justify-center">
                                                        <input type="checkbox" className="w-[16px] h-[16px] rounded border-gray-400 accent-blue-600 cursor-pointer" />
                                                    </div>
                                                </td>

                                                {/* Star */}
                                                <td className="w-[42px] min-w-[42px]">
                                                    <button type="button"
                                                        onClick={() => { setFavorites((prev) => prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]); }}
                                                        className={`w-full h-full flex items-center justify-center text-[23px] ${favorites.includes(product.id)
                                                            ? "text-yellow-400"
                                                            : "text-gray-400 hover:text-yellow-400"
                                                            }`}
                                                    >
                                                        {favorites.includes(product.id) ? "★" : "☆"}
                                                    </button>
                                                </td>

                                                {/* Các dữ liệu */}
                                                {selectedColumns.map((column) => {

                                                    /* ================= HÌNH ẢNH ================= */
                                                    if (column === "Hình ảnh") {
                                                        return (
                                                            <td key={column} className="w-[55px] min-w-[55px] px-2">
                                                                <div className="w-[50px] h-[50px] rounded-md bg-gray-100 flex items-center justify-center overflow-hidden text-[23px]">
                                                                    <img
                                                                        src={product.image}
                                                                        className="w-full h-full object-cover" />
                                                                </div>
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= MÃ HÀNG ================= */
                                                    if (column === "Mã hàng") {
                                                        return (
                                                            <td key={column} className="px-3 text-[17px] text-gray-800 whitespace-nowrap" >
                                                                {product.code}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= MÃ VẠCH ================= */
                                                    if (column === "Mã vạch") {
                                                        return (
                                                            <td key={column} className="px-3 text-[17px] text-gray-800 whitespace-nowrap" >
                                                                {product.barcode}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= TÊN HÀNG ================= */
                                                    if (column === "Tên hàng") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-800"
                                                            >
                                                                <div className="max-w-[280px] whitespace-normal leading-5">
                                                                    {product.name}
                                                                </div>
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= NHÓM HÀNG ================= */
                                                    if (column === "Nhóm hàng") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-700"
                                                            >
                                                                <div className="max-w-[210px] whitespace-normal leading-5">
                                                                    {product.group}
                                                                </div>
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= LOẠI HÀNG ================= */
                                                    if (column === "Loại hàng") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-700 whitespace-nowrap"
                                                            >
                                                                {product.type}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= LIÊN KẾT KÊNH BÁN ================= */
                                                    if (column === "Liên kết kênh bán") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-700 whitespace-nowrap"
                                                            >
                                                                -
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= GIÁ BÁN ================= */
                                                    if (column === "Giá bán") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-800 text-right whitespace-nowrap"
                                                            >
                                                                {product.salePrice.toLocaleString("vi-VN")}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= GIÁ VỐN ================= */
                                                    if (column === "Giá vốn") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-800 text-right whitespace-nowrap"
                                                            >
                                                                {product.costPrice.toLocaleString("vi-VN")}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= THƯƠNG HIỆU ================= */
                                                    if (column === "Thương hiệu") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-700 whitespace-nowrap"
                                                            >
                                                                {product.brand || "-"}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= TỒN KHO ================= */
                                                    if (column === "Tồn kho") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-800 text-right"
                                                            >
                                                                {product.stock}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= VỊ TRÍ ================= */
                                                    if (column === "Vị trí") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-700"
                                                            >
                                                                {product.location || "-"}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= KHÁCH ĐẶT ================= */
                                                    if (column === "Khách đặt") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-800 text-right"
                                                            >
                                                                {product.ordered}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= THỜI GIAN TẠO ================= */
                                                    if (column === "Thời gian tạo") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-700 whitespace-nowrap"
                                                            >
                                                                {product.createdAt}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= DỰ KIẾN HẾT HÀNG ================= */
                                                    if (column === "Dự kiến hết hàng") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-700 whitespace-nowrap"
                                                            >
                                                                {product.expectedOut || "-"}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= ĐỊNH MỨC ÍT NHẤT ================= */
                                                    if (column === "Định mức tồn ít nhất") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-800 text-right"
                                                            >
                                                                {product.minStock}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= ĐỊNH MỨC NHIỀU NHẤT ================= */
                                                    if (column === "Định mức tồn nhiều nhất") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px] text-gray-800 text-right"
                                                            >
                                                                {product.maxStock}
                                                            </td>
                                                        );
                                                    }

                                                    /* ================= TRẠNG THÁI ================= */
                                                    if (column === "Trạng thái") {
                                                        return (
                                                            <td
                                                                key={column}
                                                                className="px-3 text-[17px]"
                                                            >
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[13px] font-medium">
                                                                    {product.status}
                                                                </span>
                                                            </td>
                                                        );
                                                    }

                                                    return null;
                                                })}

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                            {/* ================= FOOTER ================= */}
                            <div className="h-[48px] border-t border-gray-200 flex items-center justify-between px-4 bg-white">

                                {/* Bên trái */}
                                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                    <span>Hiển thị</span>

                                    <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                                        className="h-[32px] px-3 border border-gray-300 rounded-lg bg-white outline-none cursor-pointer">
                                        <option value="15">15 dòng</option>
                                        <option value="20">20 dòng</option>
                                        <option value="40">40 dòng</option>
                                        <option value="50">50 dòng</option>
                                        <option value="100">100 dòng</option>
                                    </select>
                                </div>

                                {/* Pagination */}
                                {/* Pagination */}
                                <div className="flex items-center gap-3">

                                    {/* Trang đầu */}
                                    <button
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(1)}
                                        className={`text-[18px] ${currentPage === 1
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-700 hover:text-blue-600"
                                            }`}
                                    >
                                        |◀
                                    </button>

                                    {/* Trang trước */}
                                    <button
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                        className={`text-[22px] ${currentPage === 1
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-700 hover:text-blue-600"
                                            }`}
                                    >
                                        ‹
                                    </button>

                                    {/* CHỈ HIỂN THỊ TRANG HIỆN TẠI */}
                                    <button
                                        type="button"
                                        className="w-[32px] h-[32px] border border-blue-500 bg-blue-50 text-blue-600 rounded-lg text-[14px] font-semibold"
                                    >
                                        {currentPage}
                                    </button>

                                    {/* Trang sau */}
                                    <button
                                        type="button"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                        className={`text-[22px] ${currentPage === totalPages
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-700 hover:text-blue-600"
                                            }`}
                                    >
                                        ›
                                    </button>

                                    {/* Trang cuối */}
                                    <button
                                        type="button"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(totalPages)}
                                        className={`text-[18px] ${currentPage === totalPages
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-700 hover:text-blue-600"
                                            }`}
                                    >
                                        ▶|
                                    </button>

                                    {/* Thông tin */}
                                    <span className="text-[13px] text-gray-600 ml-2">
                                        {totalItems === 0
                                            ? "0 - 0"
                                            : `${startIndex + 1} - ${endIndex} trong ${totalItems} hàng hóa`}
                                    </span>

                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Product;