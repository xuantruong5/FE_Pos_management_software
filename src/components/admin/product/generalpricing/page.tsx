"use client";
import { Search, Plus, SlidersHorizontal, Settings, CircleHelp, FileSymlink, ChevronDown, X, ChevronsRight, ChevronRight, ChevronLeft, ChevronsLeft, ChevronUp, Minus, } from "lucide-react";
import { useState } from "react";
const generalpricing = () => {
    const products = [
        {
            code: "SP000002",
            name: "Bánh mì Staff chà bông 55gr (gói)",
            cost: "168,000",
            lastPrice: "168,000",
            price: "10,000",
            stock: 100,
        },
        {
            code: "SP000001",
            name: "Bánh mì Staff chà bông 55gr (lốc)",
            cost: "28,000",
            lastPrice: "28,000",
            price: "50,000",
            stock: 1500,
        },
        {
            code: "10225873544",
            name: "Bánh mì Staff chà bông 55gr (thùng)",
            cost: "7,000",
            lastPrice: "7,000",
            price: "175,000",
            stock: 1500,
        },
        {
            code: "10224397850",
            name: "Rửa bát kim tuyến",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1500,
        },
        {
            code: "10224361306",
            name: "Lau kính sắc biển 540 ml",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1500,
        },
        {
            code: "10223908257",
            name: "Tăm chỉ nha khoa Amita (50 C/H)",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1500,
        },
        {
            code: "10223908180",
            name: "Tăm chỉ Amita (gói 50 que)",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },
        {
            code: "10223525751",
            name: "Thịt dê nạc",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },
        {
            code: "1021024676802",
            name: "Xịt chống muỗi trẻ em",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },
        {
            code: "1021023987836",
            name: "Khô cá lóc non sông Đốc Cà Mau hút chân không 500gram",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },
        {
            code: "1021023976409",
            name: "Sen đá trung",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },
        {
            code: "1021023769752",
            name: "Kẹo dẻo cốt trái cây xoài xanh 300g x 24gói",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },
        {
            code: "1021022915952",
            name: "Sữa đặc có đường Ông Thọ trắng nhãn vàng lon 380g",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },
        {
            code: "1021022832795",
            name: "Kiwi vàng New Zealand khay 3,5kg",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },
        {
            code: "10138214291",
            name: "Sủi cảo tôm thịt Cholimex 300g",
            cost: "0",
            lastPrice: "0",
            price: "0",
            stock: 1,
        },

        {
            code: "SP000003",
            name: "Bánh mì sandwich Staff 300g",
            cost: "25,000",
            lastPrice: "25,000",
            price: "32,000",
            stock: 1,
        },
        {
            code: "SP000004",
            name: "Bánh mì ngọt nhân sữa",
            cost: "12,000",
            lastPrice: "12,000",
            price: "18,000",
            stock: 1,
        },
        {
            code: "SP000005",
            name: "Bánh bao nhân thịt 80g",
            cost: "8,000",
            lastPrice: "8,000",
            price: "12,000",
            stock: 1,
        },
        {
            code: "SP000006",
            name: "Xúc xích tiệt trùng 500g",
            cost: "45,000",
            lastPrice: "45,000",
            price: "58,000",
            stock: 1,
        },
        {
            code: "SP000007",
            name: "Chả cá thác lác 500g",
            cost: "75,000",
            lastPrice: "75,000",
            price: "95,000",
            stock: 1,
        },
        {
            code: "SP000008",
            name: "Thịt heo xay 500g",
            cost: "62,000",
            lastPrice: "62,000",
            price: "78,000",
            stock: 1,
        },
        {
            code: "SP000009",
            name: "Thịt bò xay 500g",
            cost: "115,000",
            lastPrice: "115,000",
            price: "145,000",
            stock: 1,
        },
        {
            code: "SP000010",
            name: "Cánh gà giữa 500g",
            cost: "48,000",
            lastPrice: "48,000",
            price: "65,000",
            stock: 1,
        },
        {
            code: "SP000011",
            name: "Đùi gà góc tư 500g",
            cost: "42,000",
            lastPrice: "42,000",
            price: "58,000",
            stock: 1,
        },
        {
            code: "SP000012",
            name: "Trứng gà công nghiệp 10 quả",
            cost: "28,000",
            lastPrice: "28,000",
            price: "35,000",
            stock: 1,
        },
        {
            code: "SP000013",
            name: "Sữa tươi Vinamilk 1L",
            cost: "32,000",
            lastPrice: "32,000",
            price: "39,000",
            stock: 1,
        },
        {
            code: "SP000014",
            name: "Sữa chua có đường Vinamilk",
            cost: "25,000",
            lastPrice: "25,000",
            price: "32,000",
            stock: 1,
        },
        {
            code: "SP000015",
            name: "Nước ngọt Coca Cola 1.5L",
            cost: "18,000",
            lastPrice: "18,000",
            price: "22,000",
            stock: 1,
        },
        {
            code: "SP000016",
            name: "Nước suối Aquafina 500ml",
            cost: "5,000",
            lastPrice: "5,000",
            price: "7,000",
            stock: 1,
        },
        {
            code: "SP000017",
            name: "Nước tăng lực Sting dâu 330ml",
            cost: "9,000",
            lastPrice: "9,000",
            price: "12,000",
            stock: 1,
        },
        {
            code: "SP000018",
            name: "Cà phê hòa tan 3in1",
            cost: "35,000",
            lastPrice: "35,000",
            price: "45,000",
            stock: 1,
        },
        {
            code: "SP000019",
            name: "Trà xanh túi lọc 25 gói",
            cost: "22,000",
            lastPrice: "22,000",
            price: "29,000",
            stock: 1,
        },
        {
            code: "SP000020",
            name: "Đường trắng tinh luyện 1kg",
            cost: "20,000",
            lastPrice: "20,000",
            price: "25,000",
            stock: 1,
        },
        {
            code: "SP000021",
            name: "Muối i-ốt 500g",
            cost: "7,000",
            lastPrice: "7,000",
            price: "10,000",
            stock: 1,
        },
        {
            code: "SP000022",
            name: "Nước mắm Nam Ngư 500ml",
            cost: "28,000",
            lastPrice: "28,000",
            price: "35,000",
            stock: 1,
        },
        {
            code: "SP000023",
            name: "Dầu ăn Tường An 1L",
            cost: "42,000",
            lastPrice: "42,000",
            price: "52,000",
            stock: 1,
        },
        {
            code: "SP000024",
            name: "Nước tương Maggi 700ml",
            cost: "25,000",
            lastPrice: "25,000",
            price: "32,000",
            stock: 1,
        },
        {
            code: "SP000025",
            name: "Tương ớt Chinsu 250g",
            cost: "15,000",
            lastPrice: "15,000",
            price: "20,000",
            stock: 1,
        },
        {
            code: "SP000026",
            name: "Mì Hảo Hảo tôm chua cay",
            cost: "4,000",
            lastPrice: "4,000",
            price: "5,000",
            stock: 1,
        },
        {
            code: "SP000027",
            name: "Mì Omachi sườn hầm ngũ quả",
            cost: "8,000",
            lastPrice: "8,000",
            price: "11,000",
            stock: 1,
        },
        {
            code: "SP000028",
            name: "Miến Phú Hương 55g",
            cost: "6,000",
            lastPrice: "6,000",
            price: "8,000",
            stock: 1,
        },
        {
            code: "SP000029",
            name: "Gạo ST25 túi 5kg",
            cost: "145,000",
            lastPrice: "145,000",
            price: "175,000",
            stock: 1,
        },
        {
            code: "SP000030",
            name: "Gạo thơm Jasmine 5kg",
            cost: "95,000",
            lastPrice: "95,000",
            price: "120,000",
            stock: 1,
        },
        {
            code: "SP000031",
            name: "Bột giặt OMO 3kg",
            cost: "95,000",
            lastPrice: "95,000",
            price: "118,000",
            stock: 1,
        },
        {
            code: "SP000032",
            name: "Nước giặt Ariel 2.4kg",
            cost: "115,000",
            lastPrice: "115,000",
            price: "145,000",
            stock: 1,
        },
        {
            code: "SP000033",
            name: "Nước xả Comfort 1.8L",
            cost: "72,000",
            lastPrice: "72,000",
            price: "89,000",
            stock: 1,
        },
        {
            code: "SP000034",
            name: "Nước rửa chén Sunlight 750ml",
            cost: "28,000",
            lastPrice: "28,000",
            price: "35,000",
            stock: 1,
        },
        {
            code: "SP000035",
            name: "Nước lau sàn Sunlight 1L",
            cost: "32,000",
            lastPrice: "32,000",
            price: "42,000",
            stock: 1,
        },
        {
            code: "SP000036",
            name: "Giấy vệ sinh 10 cuộn",
            cost: "48,000",
            lastPrice: "48,000",
            price: "62,000",
            stock: 1,
        },
        {
            code: "SP000037",
            name: "Khăn giấy hộp 180 tờ",
            cost: "22,000",
            lastPrice: "22,000",
            price: "30,000",
            stock: 1,
        },
        {
            code: "SP000038",
            name: "Bàn chải đánh răng người lớn",
            cost: "15,000",
            lastPrice: "15,000",
            price: "22,000",
            stock: 1,
        },
        {
            code: "SP000039",
            name: "Kem đánh răng P/S 180g",
            cost: "32,000",
            lastPrice: "32,000",
            price: "40,000",
            stock: 1,
        },
        {
            code: "SP000040",
            name: "Dầu gội Clear 650ml",
            cost: "95,000",
            lastPrice: "95,000",
            price: "115,000",
            stock: 1,
        },
        {
            code: "SP000041",
            name: "Sữa tắm Lifebuoy 850g",
            cost: "78,000",
            lastPrice: "78,000",
            price: "98,000",
            stock: 1,
        },
        {
            code: "SP000042",
            name: "Khẩu trang y tế 50 cái",
            cost: "35,000",
            lastPrice: "35,000",
            price: "45,000",
            stock: 1,
        },
        {
            code: "SP000043",
            name: "Túi rác tự hủy size lớn",
            cost: "28,000",
            lastPrice: "28,000",
            price: "38,000",
            stock: 1,
        },
        {
            code: "SP000044",
            name: "Màng bọc thực phẩm 30m",
            cost: "18,000",
            lastPrice: "18,000",
            price: "25,000",
            stock: 1,
        },
        {
            code: "SP000045",
            name: "Giấy bạc bọc thực phẩm",
            cost: "25,000",
            lastPrice: "25,000",
            price: "32,000",
            stock: 1,
        },
        {
            code: "SP000046",
            name: "Nước rửa tay Lifebuoy 500ml",
            cost: "45,000",
            lastPrice: "45,000",
            price: "58,000",
            stock: 1,
        },
        {
            code: "SP000047",
            name: "Cồn sát khuẩn 500ml",
            cost: "32,000",
            lastPrice: "32,000",
            price: "42,000",
            stock: 1,
        },
        {
            code: "SP000048",
            name: "Khăn lau đa năng 5 cái",
            cost: "20,000",
            lastPrice: "20,000",
            price: "28,000",
            stock: 1,
        },
        {
            code: "SP000049",
            name: "Miếng rửa chén 5 cái",
            cost: "12,000",
            lastPrice: "12,000",
            price: "18,000",
            stock: 1,
        },
        {
            code: "SP000050",
            name: "Túi zip đựng thực phẩm 20 cái",
            cost: "18,000",
            lastPrice: "18,000",
            price: "25,000",
            stock: 1,
        },
    ];
    // list
    const columns = [
        "Mã hàng",
        "Tên hàng",
        "Tồn kho",
        "Giá vốn",
        "Giá nhập cuối",
        "Bảng giá chung",
    ];
    const [showColumns, setShowColumns] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(columns);

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const currentProducts = products.slice(startIndex, endIndex);

    // thêm bảng giá 
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [activePriceTab, setActivePriceTab] = useState("info");


    // chỗ làm tròn 
    const [priceFormula, setPriceFormula] = useState("");
    const [priceValue, setPriceValue] = useState("");
    const [priceUnit, setPriceUnit] = useState("%");
    const [formulaOperator, setFormulaOperator] = useState("+");
    const [autoRound, setAutoRound] = useState(false);
    const [roundUnit, setRoundUnit] = useState("đồng");
    // đổi xang bảng bản giá trung 
    const [autoUpdateCommonPrice, setAutoUpdateCommonPrice] = useState(false);
    const [addProductFromCommonPrice, setAddProductFromCommonPrice] = useState(false);

    // đóng mở 
    const [openEffect, setOpenEffect] = useState(true);
    const [openFormula, setOpenFormula] = useState(true);
    const [openCashier, setOpenCashier] = useState(true);

    // phần tích của thêm bảng 
    const [productScope, setProductScope] = useState("allowOutside");
    const [warningOutsidePriceList, setWarningOutsidePriceList] = useState(false);

    // nhóm hàng 
    const [showGroupPicker, setShowGroupPicker] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
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
                            <input type="text" placeholder="Theo mã, tên hàng" className="w-full outline-none text-[14px] text-gray-700 placeholder:text-gray-400" />
                        </div>
                    </div>

                    {/* Bên phải */}
                    <div className="flex items-center gap-2">
                        {/* Bảng giá */}
                        <button type="button" onClick={() => { setActivePriceTab("info"); setShowPriceModal(true); }} className="h-[40px] px-3 border border-blue-500 rounded-lg flex items-center gap-1.5 text-[17px] font-semibold  text-blue-600 hover:bg-blue-200 transition" >
                            <Plus size={18} />
                            <span>Bảng giá</span>
                        </button>

                        {/* Import */}
                        <button type="button" className="h-[40px] px-3 border border-gray-300 rounded-lg flex items-center gap-1.5 text-[17px] font-semibold text-gray-700 hover:bg-gray-200 transition">
                            <FileSymlink size={18} />
                            <span>Import</span>
                        </button>

                        {/* Xuất file */}
                        <button type="button" className="h-[40px] px-3 border border-gray-300 rounded-lg flex items-center gap-1.5 text-[17px] font-semibold text-gray-700 hover:bg-gray-200 transition" >
                            <FileSymlink size={18} />
                            <span>Xuất file</span>
                        </button>

                        {/* Danh sách / bộ lọc */}
                        <div className="relative">
                            <button type="button" onClick={() => setShowColumns(!showColumns)} className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                                <SlidersHorizontal size={21} />
                            </button>

                            {showColumns && (
                                <div className="absolute top-[46px] right-0 w-[425px] bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] p-3">
                                    <div className="grid grid-cols-2 gap-x-6">
                                        {columns.map((column) => (
                                            <label key={column} className="flex items-center gap-2 h-[36px] cursor-pointer text-[15px] text-gray-700" >
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
                    {showPriceModal && (
                        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-4 bg-black/50">
                            {/* onClick={() => setShowPriceModal(false)}  */}
                            <div className="w-[950px] max-h-[calc(100vh-40px)] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()} >
                                {/* ================= HEADER ================= */}
                                <div className="h-[64px] px-6 flex items-center justify-between shrink-0">
                                    <h2 className="text-[23px] font-semibold text-gray-800">
                                        Tạo bảng giá
                                    </h2>
                                    <button type="button" onClick={() => setShowPriceModal(false)} className="text-gray-500 hover:text-red-700">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* ================= TAB ================= */}
                                <div className="h-[46px] px-6 border-b border-gray-200 flex items-end gap-8 shrink-0">

                                    {/* Thông tin */}
                                    <button type="button" onClick={() => setActivePriceTab("info")}
                                        className={`h-full px-0 border-b-2 text-[18px] font-medium transition ${activePriceTab === "info" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-700 hover:text-blue-600"}`} >
                                        Thông tin
                                    </button>

                                    {/* Phạm vi áp dụng */}
                                    <button type="button" onClick={() => setActivePriceTab("scope")}
                                        className={`h-full px-0 border-b-2 text-[18px] font-medium transition ${activePriceTab === "scope" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-700 hover:text-blue-600"}`} >
                                        Phạm vi áp dụng
                                    </button>
                                </div>
                                {/* ================= CONTENT ================= */}
                                <div className="px-6 py-4 flex-1 overflow-y-auto">
                                    {/* ================== THÔNG TIN ===================== */}
                                    {activePriceTab === "info" && (
                                        <>
                                            {/* Tên bảng giá */}
                                            <div className="mb-5">
                                                <label className="block text-[16px] text-gray-700 mb-1.5">
                                                    Tên bảng giá
                                                </label>
                                                <input type="text" placeholder="Nhập tên bảng giá" className="w-full h-[40px] border border-gray-300 rounded-lg px-3 text-[15px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                            </div>

                                            {/* ================= HIỆU LỰC ================= */}
                                            <div className="border border-gray-200 rounded-lg p-3 mb-5">
                                                <button type="button" onClick={() => setOpenEffect(!openEffect)} className=" w-full flex items-center justify-between mb-4">
                                                    <span className="text-[18px] font-semibold text-gray-800">
                                                        Hiệu lực
                                                    </span>
                                                    {openEffect
                                                        ? <ChevronUp size={18} />
                                                        : <ChevronDown size={18} />
                                                    }
                                                </button>
                                                {openEffect && (
                                                    <div className="mt-4">
                                                        <div className="flex items-center gap-3 mb-5">
                                                            <span className="text-[17px] w-[95px] shrink-0">
                                                                Hiệu lực
                                                            </span>
                                                            {/* Thời gian */}
                                                            <div className="flex items-center gap-2 flex-1">
                                                                <input type="datetime-local" defaultValue="2026-08-30T21:04" className="h-[40px] w-[auto] border border-gray-300 rounded-lg px-2 text-[15px] outline-none focus:border-blue-500" />
                                                                <span className="text-[16px] text-gray-600">
                                                                    đến
                                                                </span>
                                                                <input type="datetime-local" defaultValue="2027-08-30T21:04" className="h-[40px] w-[auto] border border-gray-300 rounded-lg px-2 text-[15px] outline-none focus:border-blue-500" />
                                                            </div>
                                                        </div>
                                                        {/* Trạng thái */}
                                                        <div className="flex items-center">
                                                            <span className="text-[17px] w-[95px] shrink-0">
                                                                Trạng thái
                                                            </span>
                                                            <label className="flex items-center gap-2 mr-7 cursor-pointer">
                                                                <input type="radio" name="priceStatus" defaultChecked className="w-6 h-6 accent-blue-600" />
                                                                <span className="text-[15px]">
                                                                    Áp dụng
                                                                </span>
                                                            </label>
                                                            <label className="flex items-center gap-2 cursor-pointer">
                                                                <input type="radio" name="priceStatus" className="w-6 h-6 accent-blue-600" />
                                                                <span className="text-[15px]">
                                                                    Chưa áp dụng
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* ================= CÔNG THỨC GIÁ ================= */}
                                            <div className="border border-gray-200 rounded-lg p-3 mb-5">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-[15px] font-semibold text-gray-800">
                                                            Công thức giá
                                                        </div>
                                                        <div className="text-[13px] text-gray-500 mt-1">
                                                            Tạo công thức dựa trên giá vốn, giá nhập hoặc giá bán ở các bảng giá khác
                                                        </div>
                                                    </div>
                                                    <button type="button" onClick={() => setOpenFormula(!openFormula)} className="flex items-center justify-center">
                                                        {openFormula
                                                            ? <ChevronUp size={18} className="text-gray-700" />
                                                            : <ChevronDown size={18} className="text-gray-700" />
                                                        }
                                                    </button>
                                                </div>
                                                {openFormula && (
                                                    <>
                                                        {/* Công thức */}
                                                        < div className="flex items-center gap-2 mt-4">
                                                            <span className="text-[15px] ml-2 whitespace-nowrap">
                                                                Giá mới =
                                                            </span>
                                                            <select value={priceFormula}
                                                                onChange={(e) => {
                                                                    const value = e.target.value; setPriceFormula(value);
                                                                    // Nếu bỏ chọn thì reset
                                                                    if (e.target.value === "") {
                                                                        setPriceValue("");
                                                                        setAutoRound(false);
                                                                    }
                                                                    // Khi đổi sang bảng giá khác
                                                                    if (value !== "sale") {
                                                                        setAutoUpdateCommonPrice(false);
                                                                        setAddProductFromCommonPrice(false);
                                                                    }
                                                                }}
                                                                className="w-[250px] h-[40px] border border-gray-300 rounded-lg px-2 text-[15px] outline-none focus:border-blue-500" >
                                                                <option value="">
                                                                    Chọn bảng giá
                                                                </option>
                                                                <option value="cost">
                                                                    Giá vốn
                                                                </option>
                                                                <option value="import">
                                                                    Giá nhập cuối
                                                                </option>
                                                                <option value="sale">
                                                                    bảng giá chung
                                                                </option>
                                                            </select>
                                                            {/* Plus */}
                                                            <button type="button" onClick={() => setFormulaOperator("+")}
                                                                className={`w-[28px] h-[28px] shrink-0 rounded-full flex items-center justify-center transition ${formulaOperator === "+" ? "bg-blue-600 text-white border border-blue-600" : "border border-gray-300 text-gray-700 hover:bg-gray-100"}`} >
                                                                <Plus size={16} />
                                                            </button>
                                                            {/* Minus */}
                                                            <button type="button" onClick={() => setFormulaOperator("-")}
                                                                className={`w-[28px] h-[28px] shrink-0 rounded-full flex items-center justify-center transition ${formulaOperator === "-" ? "bg-blue-600 text-white border border-blue-600" : "border border-gray-300 text-gray-700 hover:bg-gray-100"}`} >
                                                                <Minus size={16} />
                                                            </button>

                                                            {/* Ô nhập số + VND/% */}
                                                            <div className={`h-[40px] flex-1 min-w-[150px] rounded-lg flex items-center border ${priceFormula ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-100"}`} >
                                                                {/* Input số */}
                                                                <input type="number" min="0" max="999" step="1" disabled={!priceFormula} value={priceValue}
                                                                    onChange={(e) => {
                                                                        let value = e.target.value;
                                                                        // Không cho số âm
                                                                        if (Number(value) < 0) {
                                                                            value = "0";
                                                                        }
                                                                        // Không cho lớn hơn 999
                                                                        if (Number(value) > 999) {
                                                                            value = "999";
                                                                        }
                                                                        // Không cho nhập số thập phân
                                                                        // if (value.includes(".")) {
                                                                        //     value = value.split(".")[0];
                                                                        // }

                                                                        setPriceValue(value);
                                                                    }}
                                                                    placeholder="0" className={`flex-1 h-full min-w-0 bg-transparent px-3 text-[15px] text-right outline-none ${priceFormula ? "text-gray-800" : "text-gray-400 cursor-not-allowed"}`} />
                                                                {/* VND */}
                                                                <button type="button" disabled={!priceFormula} onClick={() => setPriceUnit("VND")}
                                                                    className={`h-[32px] px-2 text-[14px] rounded-md transition ${priceUnit === "VND" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`} >
                                                                    VND
                                                                </button>
                                                                {/* % */}
                                                                <button type="button" disabled={!priceFormula} onClick={() => setPriceUnit("%")}
                                                                    className={`h-[32px] px-2 mr-1 text-[14px] rounded-md transition ${priceUnit === "%" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`} >
                                                                    %
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {/* ===== CHỈ HIỆN KHI CHỌN BẢNG GIÁ CHUNG ============== */}
                                                        {priceFormula === "sale" && (
                                                            <div className="mt-3 space-y-3">
                                                                {/* Tự động cập nhật giá */}
                                                                <label className="flex items-center gap-2 ml-2 cursor-pointer">
                                                                    <input type="checkbox" checked={autoUpdateCommonPrice}
                                                                        onChange={(e) => setAutoUpdateCommonPrice(e.target.checked)}
                                                                        className="w-4 h-4 accent-blue-600 cursor-pointer shrink-0" />
                                                                    <span className="text-[14px] text-gray-700">
                                                                        Tự động cập nhật giá theo{" "}
                                                                        <span className="font-semibold">
                                                                            Bảng giá chung
                                                                        </span>
                                                                    </span>
                                                                </label>

                                                                {/* Thêm hàng hóa */}
                                                                <label className="flex items-center gap-2 ml-2 cursor-pointer">
                                                                    <input type="checkbox" checked={addProductFromCommonPrice} onChange={(e) => setAddProductFromCommonPrice(e.target.checked)}
                                                                        className="w-4 h-4 accent-blue-600 cursor-pointer shrink-0" />
                                                                    <span className="text-[15px] text-gray-700">
                                                                        Thêm hàng hóa từ{" "}
                                                                        <span className="font-semibold">
                                                                            Bảng giá chung
                                                                        </span>{" "}
                                                                        khi tạo bảng giá này
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        )}
                                                        {/* ================= TỰ ĐỘNG LÀM TRÒN ================= */}
                                                        {priceFormula && (
                                                            <div className="flex items-center mt-2 ml-2">
                                                                {/* Checkbox */}
                                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                                    <input type="checkbox" checked={autoRound} onChange={(e) => setAutoRound(e.target.checked)} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                                                    <span className="text-[15px] text-gray-700">
                                                                        Tự động làm tròn giá đến
                                                                    </span>
                                                                </label>
                                                                {/* Dropdown làm tròn */}
                                                                <select value={roundUnit} onChange={(e) => setRoundUnit(e.target.value)} disabled={!autoRound}
                                                                    className={`ml-2 h-[30px] min-w-[125px] border rounded-md px-2 text-[14px] outline-none ${autoRound ? "border-blue-300 text-gray-800 bg-white cursor-pointer" : "border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed"}`} >
                                                                    <option value="đồng">
                                                                        Đồng
                                                                    </option>
                                                                    <option value="chục đồng">
                                                                        Chục Đồng
                                                                    </option>
                                                                    <option value="trăm đồng">
                                                                        Trăm Đồng
                                                                    </option>
                                                                    <option value="nghìn đồng">
                                                                        Nghìn Đồng
                                                                    </option>
                                                                    <option value="chục nghìn đồng">
                                                                        Chục Nghìn Đồng
                                                                    </option>
                                                                    <option value="trăm nghìn đồng">
                                                                        Trăm Nghìn Đồng
                                                                    </option>
                                                                </select>
                                                                {/* Info */}
                                                                <div className="relative group ml-3">
                                                                    <div className="w-[18px] h-[18px] rounded-full border border-gray-400 text-[11px] text-black font-bold flex items-center justify-center cursor-help">
                                                                        i
                                                                    </div>
                                                                    <div className="absolute left-[24px] top-1/2 -translate-y-1/2 hidden group-hover:block z-50 w-[430px] rounded-md bg-[#001a3a] px-2 py-1.5 text-[12px] text-white font-medium shadow-lg">
                                                                        <div className="font-bold mb-1">Ví dụ:</div>
                                                                        {roundUnit === "đồng" && (
                                                                            <>
                                                                                <div>
                                                                                    Nếu kết quả là 23,432.35 thì làm tròn đến hàng đơn vị là: 23,432
                                                                                </div>
                                                                                <div>
                                                                                    Nếu kết quả là 23,432.55 thì làm tròn đến hàng đơn vị là: 23,433
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {roundUnit === "chục đồng" && (
                                                                            <>
                                                                                <div>
                                                                                    Nếu kết quả là 23,432 thì làm tròn đến chục đồng là: 23,430
                                                                                </div>
                                                                                <div>
                                                                                    Nếu kết quả là 23,435 thì làm tròn đến chục đồng là: 23,440
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {roundUnit === "trăm đồng" && (
                                                                            <>
                                                                                <div>
                                                                                    Nếu kết quả là 23,432 thì làm tròn đến trăm đồng là: 23,400
                                                                                </div>
                                                                                <div>
                                                                                    Nếu kết quả là 23,450 thì làm tròn đến trăm đồng là: 23,500
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {roundUnit === "nghìn đồng" && (
                                                                            <>
                                                                                <div>
                                                                                    Nếu kết quả là 23,432 thì làm tròn đến nghìn đồng là: 23,000
                                                                                </div>
                                                                                <div>
                                                                                    Nếu kết quả là 23,550 thì làm tròn đến nghìn đồng là: 24,000
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {roundUnit === "chục nghìn đồng" && (
                                                                            <>
                                                                                <div>
                                                                                    Nếu kết quả là 23,432 thì làm tròn đến chục nghìn đồng là: 20,000
                                                                                </div>
                                                                                <div>
                                                                                    Nếu kết quả là 25,432 thì làm tròn đến chục nghìn đồng là: 30,000
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {roundUnit === "trăm nghìn đồng" && (
                                                                            <>
                                                                                <div>
                                                                                    Nếu kết quả là 234,320 thì làm tròn đến trăm nghìn đồng là: 200,000
                                                                                </div>
                                                                                <div>
                                                                                    Nếu kết quả là 250,000 thì làm tròn đến trăm nghìn đồng là: 300,000
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {/* ================= THU NGÂN ================= */}
                                            <div className="border border-gray-200 rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[15px] font-semibold text-gray-800">
                                                        Khi thu ngân lên đơn với bảng giá này
                                                    </span>
                                                    <button type="button" onClick={() => setOpenCashier(!openCashier)} className="flex items-center justify-center" >
                                                        {openCashier
                                                            ? <ChevronUp size={18} className="text-gray-700" />
                                                            : <ChevronDown size={18} className="text-gray-700" />
                                                        }
                                                    </button>
                                                </div>
                                                {openCashier && (
                                                    <div>
                                                        {/* Cho phép hàng ngoài bảng giá */}
                                                        <label className="flex items-center gap-2 mb-3 cursor-pointer">
                                                            <input type="radio" name="productScope" value="allowOutside" checked={productScope === "allowOutside"} onChange={() => setProductScope("allowOutside")} className="w-4 h-4 accent-blue-600" />
                                                            <span className="text-[15px]">
                                                                Được phép thêm hàng hóa không có trong bảng giá
                                                            </span>
                                                        </label>

                                                        {/* Cảnh báo */}
                                                        <label className={`flex items-center gap-2 ml-5 mb-4 ${productScope === "allowOutside" ? "cursor-pointer" : "cursor-not-allowed"}`}>
                                                            <input type="checkbox" checked={warningOutsidePriceList} disabled={productScope !== "allowOutside"} onChange={(e) => setWarningOutsidePriceList(e.target.checked)} className="w-4 h-4 accent-blue-600 disabled:opacity-50" />
                                                            <span className={`text-[15px] ${productScope !== "allowOutside" ? "text-gray-400" : "text-gray-800"}`}>
                                                                Gửi cảnh báo khi thêm hàng hóa không có trong bảng giá
                                                            </span>
                                                        </label>
                                                        {/* Chỉ hàng trong bảng giá */}
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input type="radio" name="productScope" value="onlyPriceList" checked={productScope === "onlyPriceList"} onChange={() => { setProductScope("onlyPriceList"); setWarningOutsidePriceList(false); }} className="w-4 h-4 accent-blue-600" />
                                                            <span className="text-[15px]">
                                                                Chỉ được thêm hàng hóa có trong bảng giá này
                                                            </span>
                                                            <span className="w-4 h-4 rounded-full border border-gray-400 text-[11px] flex items-center justify-center text-gray-500">
                                                                i
                                                            </span>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {/* ============== PHẠM VI ÁP DỤNG =================== */}
                                    {activePriceTab === "scope" && (
                                        <div className="space-y-5">
                                            {/* ================= CHI NHÁNH ================= */}
                                            <div className="border border-gray-200 rounded-lg px-3 py-3">
                                                <div className="text-[18px] font-semibold text-gray-800 mb-5">
                                                    Chi nhánh
                                                </div>
                                                {/* Toàn hệ thống */}
                                                <label className="flex items-center gap-2 mb-5 cursor-pointer">
                                                    <input type="radio" name="branchScope" value="all" defaultChecked className="w-4 h-4 accent-blue-600" />
                                                    <span className="text-[16px] text-gray-700">
                                                        Toàn hệ thống
                                                    </span>
                                                </label>
                                                {/* Chi nhánh cụ thể */}
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="branchScope" value="specific" className="w-4 h-4 accent-blue-600" />
                                                    <span className="text-[16px] text-gray-700">
                                                        Chi nhánh cụ thể
                                                    </span>

                                                </label>

                                            </div>

                                            {/* ================= NHÓM KHÁCH HÀNG ================= */}
                                            <div className="border border-gray-200 rounded-lg px-3 py-3">
                                                <div className="text-[18px] font-semibold text-gray-800 mb-5">
                                                    Nhóm khách hàng
                                                </div>
                                                {/* Tất cả */}
                                                <label className="flex items-center gap-2 mb-5 cursor-pointer">
                                                    <input type="radio" name="customerScope" value="all" defaultChecked className="w-4 h-4 accent-blue-600" />
                                                    <span className="text-[16px] text-gray-700">
                                                        Tất cả
                                                    </span>

                                                </label>

                                                {/* Nhóm cụ thể */}
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="customerScope" value="specific" className="w-4 h-4 accent-blue-600" />
                                                    <span className="text-[16px] text-gray-700">
                                                        Nhóm khách hàng cụ thể
                                                    </span>
                                                </label>
                                            </div>
                                            {/* ================= NGƯỜI TẠO GIAO DỊCH ================= */}
                                            <div className="border border-gray-200 rounded-lg px-3 py-3">
                                                <div className="text-[18px] font-semibold text-gray-800 mb-5">
                                                    Người tạo giao dịch
                                                </div>
                                                {/* Tất cả */}
                                                <label className="flex items-center gap-2 mb-5 cursor-pointer">
                                                    <input type="radio" name="creatorScope" value="all" defaultChecked className="w-4 h-4 accent-blue-600" />
                                                    <span className="text-[16px] text-gray-700">
                                                        Tất cả
                                                    </span>
                                                </label>
                                                {/* Người cụ thể */}
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="creatorScope" value="specific" className="w-4 h-4 accent-blue-600" />
                                                    <span className="text-[16px] text-gray-700">
                                                        Người tạo giao dịch cụ thể
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* ================= FOOTER ================= */}
                                <div className="h-[72px] px-6 border-t border-gray-200 flex items-center justify-end gap-2 shrink-0">

                                    <button type="button" onClick={() => setShowPriceModal(false)} className="h-[40px] px-4 border border-gray-300 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
                                        Bỏ qua
                                    </button>

                                    <button type="button" className="h-[40px] px-5 bg-blue-600 rounded-lg text-[14px] font-semibold text-white hover:bg-blue-700 transition" >
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex mt-4 items-stretch">
                    <div className="w-[300px] bg-white  p-4 shrink-0 rounded-lg">
                        <div className="flex items-center justify-between mb-5 mt-3">
                            <span className="font-semibold text-[20px]">
                                Bảng giá
                            </span>
                            <button onClick={() => { setActivePriceTab("info"); setShowPriceModal(true); }} className="text-blue-600 font-medium text-[18px]">
                                Tạo mới
                            </button>
                        </div>
                        <div className="h-[43px] border border-gray-300 rounded-lg flex items-center px-1 mb-5 mt-4">
                            <span className="bg-blue-600 text-white rounded-md px-2 py-[3px] text-[13px] flex items-center gap-2">
                                Bảng giá chung
                                <button type="button">
                                    <X size={16} />
                                </button>
                            </span>
                        </div>
                        {/* Nhóm hàng */}
                        <div className="relative mb-5">
                            {/* Button chọn nhóm hàng */}
                            <button type="button" onClick={() => setShowGroupPicker(!showGroupPicker)}
                                className={`w-full h-[40px] px-4 border rounded-xl text-left text-[17px] flex items-center justify-between bg-white ${showGroupPicker ? "border-blue-500" : "border-gray-300 hover:border-blue-400"}`}>
                                <span
                                    className={`truncate ${selectedGroups.length > 0 ? "text-gray-800" : "text-gray-400"}`}>
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
                                <ChevronDown size={20} className={`text-gray-500 transition-transform ${showGroupPicker ? "rotate-180" : ""}`} />
                            </button>

                            {/* ================= POPUP NHÓM HÀNG ================= */}
                            {showGroupPicker && (
                                <>
                                    <div className="fixed inset-0 z-[9998]" onClick={() => setShowGroupPicker(false)} />
                                    <div className="absolute left-[calc(100%+10px)] top-0 z-[9999] w-[400px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden" onClick={(e) => e.stopPropagation()} >
                                        {/* Header */}
                                        <div className="px-4 pt-4 pb-3">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-[18px] font-semibold text-gray-900">
                                                    Nhóm hàng
                                                </h3>
                                            </div>
                                            {/* Search */}
                                            <div className="relative">
                                                <Search size={19} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="text" placeholder="Tìm kiếm" className="w-full h-[40px] pl-10 pr-3 border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500" />
                                            </div>
                                        </div>
                                        {/* Danh sách */}
                                        <div className="max-h-[400px] overflow-y-auto px-3 pb-3">
                                            {groups.map((group) => {
                                                const isExpanded = expandedGroups.includes(group.id);
                                                const allChildrenSelected = group.children.length > 0 &&
                                                    group.children.every((child) => selectedGroups.includes(child.id));
                                                return (
                                                    <div key={group.id}>
                                                        {/* Nhóm cha */}
                                                        <div className="flex items-center h-[38px]">
                                                            <span className="text-gray-400 w-[18px] text-center">
                                                                ⋮⋮
                                                            </span>
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
                                                                className="w-[25px] flex justify-center" >
                                                                <ChevronRight size={17} className={`text-gray-600 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                                                            </button>

                                                            <input
                                                                type="checkbox"
                                                                checked={allChildrenSelected}
                                                                onChange={(e) => {
                                                                    const childIds =
                                                                        group.children.map(
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
                                                                className="w-[16px] h-[16px] accent-blue-600 cursor-pointer" />

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
                                                                className="ml-2 text-[16px] text-gray-700 hover:text-gray-900 text-left" >
                                                                {group.name} ({group.count})
                                                            </button>
                                                        </div>

                                                        {/* Nhóm con */}
                                                        {isExpanded && (
                                                            <div className="ml-[45px]">
                                                                {group.children.map((child) => (
                                                                    <label key={child.id} className="flex items-center gap-2 h-[36px] cursor-pointer" >
                                                                        <input type="checkbox" checked={selectedGroups.includes(child.id)}
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
                                                                            className="w-[16px] h-[16px] accent-blue-600 cursor-pointer" />
                                                                        <span className="text-[16px] text-gray-700">
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
                                                        setSelectedGroups([]);
                                                    } else {
                                                        setSelectedGroups(allIds);
                                                    }
                                                }}
                                                className="text-blue-600 font-medium text-[15px] hover:text-blue-700" >
                                                {selectedGroups.length >= 2
                                                    ? "Bỏ chọn tất cả"
                                                    : "Chọn tất cả"}
                                            </button>
                                            <button type="button" onClick={() => setShowGroupPicker(false)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg" >
                                                Áp dụng
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>


                        {/* Tồn kho */}
                        <div className="mb-5 ">
                            <label className="block font-semibold text-[18px] mb-4 ">
                                Tồn kho
                            </label>

                            <div className="relative">
                                <select className="w-full h-[40px] border border-gray-300 mb-4 rounded-lg px-3 text-[16px] bg-white outline-none appearance-none">
                                    <option>Tất cả</option>
                                    <option>Dưới mức định tồn</option>
                                    <option>Vượt mức định tồn</option>
                                    <option>Còn hàng trong kho</option>
                                    <option>Hết hàng trong kho</option>
                                    <option>Hết hàng</option>
                                </select>
                                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        {/* Giá bán */}
                        <div>
                            <label className="block font-semibold text-[18px] mb-4">
                                Giá bán
                            </label>

                            <div className="relative mb-5">
                                <select className="w-full h-[40px] border border-gray-300 rounded-lg px-3 text-[16px] bg-white outline-none appearance-none" >
                                    <option>Chọn điều kiện</option>
                                    <option>Nhỏ hơn</option>
                                    <option>Nhỏ hơn hoặc bằng</option>
                                    <option>Bằng</option>
                                    <option>Lớn hơn</option>
                                </select>
                                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            <div className="relative">
                                <select className="w-full h-[40px] border border-gray-300 rounded-lg px-3 text-[16px] bg-white outline-none appearance-none" >
                                    <option>Chọn giá so sánh</option>
                                    <option>Giá vốn</option>
                                    <option>Giá nhập cuối</option>
                                </select>

                                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0 ml-3 bg-white rounded-lg flex flex-col">
                        <div className="h-[calc(100vh-150px)] overflow-y-auto overflow-x-auto">
                            <table className="w-full min-w-[900px] border-collapse">
                                <thead className="sticky top-0 z-10">
                                    {/* ================= TIÊU ĐỀ CỘT ================= */}
                                    <tr className="h-[40px] bg-[#e8f3ff] border-b border-blue-300">
                                        {selectedColumns.includes("Mã hàng") && (
                                            <th className="px-3 text-left text-[16px] font-semibold text-gray-800 w-[160px]">
                                                Mã hàng
                                            </th>
                                        )}
                                        {selectedColumns.includes("Tên hàng") && (
                                            <th className="px-3 text-left text-[16px] font-semibold text-gray-800">
                                                Tên hàng
                                            </th>
                                        )}
                                        {selectedColumns.includes("Tồn kho") && (
                                            <th className="px-3 text-center text-[16px] font-semibold text-gray-800">
                                                Tồn Kho
                                            </th>
                                        )}
                                        {selectedColumns.includes("Giá vốn") && (
                                            <th className="px-3 text-right text-[16px] font-semibold text-gray-800 w-[130px]">
                                                Giá vốn
                                            </th>
                                        )}
                                        {selectedColumns.includes("Giá nhập cuối") && (
                                            <th className="px-3 text-right text-[16px] font-semibold text-gray-800 w-[140px]">
                                                Giá nhập cuối
                                            </th>
                                        )}
                                        {selectedColumns.includes("Bảng giá chung") && (
                                            <th className="px-3 text-right text-[16px] font-semibold text-gray-800 w-[150px]">
                                                Bảng giá chung
                                            </th>
                                        )}
                                    </tr>
                                    {/* ================= TÌM KIẾM ================= */}
                                    <tr className="h-[45px] bg-white border-b border-gray-200">
                                        {/* Tìm mã hàng */}
                                        {selectedColumns.includes("Mã hàng") && (
                                            <th className="px-3">
                                                <input type="text" placeholder="Tìm mã hàng" className="w-full h-[40px] border border-gray-300 mb-2 mt-3 rounded-lg px-3 text-[14px] font-normal text-gray-700 placeholder:text-gray-400 outline-none focus:border-blue-500" />
                                            </th>
                                        )}

                                        {/* Tìm tên hàng */}
                                        {selectedColumns.includes("Tên hàng") && (
                                            <th className="px-3 text-left">
                                                <input type="text" placeholder="Tìm tên hàng" className="w-[350px] h-[40px] border border-gray-300 rounded-lg px-3 text-[14px] font-normal text-gray-700 placeholder:text-gray-400 outline-none focus:border-blue-500" />
                                            </th>
                                        )}
                                        {/* Tồn kho */}
                                        {selectedColumns.includes("Tồn kho") && (
                                            <th></th>
                                        )}
                                        {/* Giá vốn */}
                                        {selectedColumns.includes("Giá vốn") && (
                                            <th></th>
                                        )}
                                        {/* Giá nhập cuối */}
                                        {selectedColumns.includes("Giá nhập cuối") && (
                                            <th></th>
                                        )}
                                        {/* Bảng giá chung */}
                                        {selectedColumns.includes("Bảng giá chung") && (
                                            <th></th>
                                        )}

                                    </tr>
                                </thead>

                                {/* ================= BODY ================= */}
                                <tbody>
                                    {currentProducts.map((item, index) => (
                                        <tr key={item.code} className="h-[50px] border-b border-gray-200 hover:bg-gray-50" >
                                            {/* Mã hàng */}
                                            {selectedColumns.includes("Mã hàng") && (
                                                <td className="px-3 text-[16px] text-gray-800">
                                                    {item.code}
                                                </td>
                                            )}
                                            {/* Tên hàng */}
                                            {selectedColumns.includes("Tên hàng") && (
                                                <td className="px-3 text-[16px] text-gray-800">
                                                    {item.name}
                                                </td>
                                            )}
                                            {/* Tồn kho */}
                                            {selectedColumns.includes("Tồn kho") && (
                                                <td className="px-3 text-center text-[16px] text-gray-800">
                                                    {item.stock}
                                                </td>
                                            )}
                                            {/* Giá vốn */}
                                            {selectedColumns.includes("Giá vốn") && (
                                                <td className="px-3 text-right text-[16px] text-gray-800">
                                                    {item.cost}
                                                </td>
                                            )}
                                            {/* Giá nhập cuối */}
                                            {selectedColumns.includes("Giá nhập cuối") && (
                                                <td className="px-3 text-right text-[16px] text-gray-800">
                                                    {item.lastPrice}
                                                </td>
                                            )}
                                            {/* Bảng giá chung */}
                                            {selectedColumns.includes("Bảng giá chung") && (
                                                <td className="px-3">
                                                    <input type="text" defaultValue={item.price} className={`w-full h-[25px] border border-gray-300 rounded-lg px-2 text-[16px] text-right outline-none ${index === 0 ? "text-red-500" : "text-gray-800"}`} />
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* PAGINATION */}
                        <div className="h-[50px] shrink-0 bg-white flex items-center justify-between px-2 mt-2">
                            {/* Bên trái */}
                            <div className="flex items-center gap-2 text-[16px] text-gray-600 font-semibold">
                                <span>
                                    Hiển thị:
                                </span>
                                <select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setCurrentPage(1);
                                    }} className="h-[30px] w-[100px] border border-gray-300 rounded-lg px-2 text-[14px] bg-white outline-none" >
                                    <option value={15}>15 dòng</option>
                                    <option value={20}>20 dòng</option>
                                    <option value={30}>30 dòng</option>
                                    <option value={50}>50 dòng</option>
                                    <option value={100}>100 dòng</option>
                                </select>

                            </div>

                            {/* Bên phải */}
                            <div className="flex items-center gap-1">
                                {/* Về trang đầu */}
                                <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}
                                    className={`w-[32px] h-[30px] flex items-center justify-center rounded-lg text-[18px]
                                    ${currentPage === 1
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}>
                                    <ChevronsLeft size={18} />
                                </button>
                                {/* Trang trước */}
                                <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className={`w-[32px] h-[30px] flex items-center justify-center rounded-lg text-[18px]
                                    ${currentPage === 1
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}>
                                    <ChevronLeft size={18} />
                                </button>
                                {/* Số trang */}
                                <button type="button" className="w-[40px] h-[30px] border border-gray-300 rounded-lg text-[13px] text-gray-700 bg-white font-semibold" >
                                    {currentPage}
                                </button>
                                {/* Trang sau */}
                                <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className={`w-[32px] h-[30px] flex items-center justify-center rounded-lg text-[18px]
                                    ${currentPage === totalPages
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}>
                                    <ChevronRight size={18} />
                                </button>
                                {/* Trang cuối */}
                                <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}
                                    className={`w-[32px] h-[30px] flex items-center justify-center rounded-lg text-[18px]
                                    ${currentPage === totalPages
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`} >
                                    <ChevronsRight size={18} />
                                </button>
                                {/* Thông tin */}
                                <span className="text-[16px] text-gray-600 ml-4 font-semibold">
                                    {totalItems === 0
                                        ? "0 - 0"
                                        : `${startIndex + 1} - ${endIndex}`}
                                    {" "}trong {totalItems} hàng hóa
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default generalpricing;