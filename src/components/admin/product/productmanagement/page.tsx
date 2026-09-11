"use client";

import { Search, SlidersHorizontal, Plus, ChevronDown, FileUp, FileDown, List, Settings, CircleHelp, ChevronRight, CalendarDays, Trash2, Copy, PencilLine, Printer, Ellipsis, FileInput, X, ChevronUp, Info, Image as ImageIcon, Check, Tag, FileSymlink, PrinterCheck, Download, MoreHorizontal, } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            image: "https://dehanoi.vn/wp-content/uploads/2024/03/bd122252-5a7c-400e-a17b-d6132ffcaa52.jpg",
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
            images: [
                "https://ann.com.vn/image/staff.png",
            ],
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
    // const [favorites, setFavorites] = useState<number[]>([]);
    const [bestSellerIds, setBestSellerIds] = useState<number[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);


    // làm trang 
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const currentProducts = products.slice(startIndex, endIndex);

    // của chi tiết 
    const [activeTab, setActiveTab] = useState("info");
    // chỉnh sửa của chi tiết 
    const [showEditModal, setShowEditModal] = useState(false);
    const [activeEditTab, setActiveEditTab] = useState<"info" | "description">("info");







    // thẻ kho xuất file Excel
    const stockCardData = [
        {
            code: "HD000048",
            time: "16/08/2026 15:43",
            type: "Bán hàng",
            transactionPrice: 10000,
            costPrice: 8000,
            quantity: -6,
            endingStock: 1093,
            partner: "Khách lẻ",
        },
        {
            code: "HD000047",
            time: "16/08/2026 15:43",
            type: "Bán hàng",
            transactionPrice: 10000,
            costPrice: 8000,
            quantity: -1,
            endingStock: 1099,
            partner: "Khách lẻ",
        },
        {
            code: "KK000001",
            time: "16/08/2026 15:42",
            type: "Kiểm hàng",
            transactionPrice: "",
            costPrice: 8000,
            quantity: 1100,
            endingStock: 1100,
            partner: "",
        },
        {
            code: "CB000001",
            time: "16/08/2026 15:42",
            type: "Cập nhật giá vốn",
            transactionPrice: "",
            costPrice: 8000,
            quantity: 0,
            endingStock: 0,
            partner: "",
        },
    ];
    const handleExportExcel = () => {
        const data = stockCardData.map((item) => ({
            "Chứng từ": item.code,
            "Thời gian": item.time,
            "Loại giao dịch": item.type,
            "Giá GD": item.transactionPrice,
            "Giá vốn": item.costPrice,
            "Số lượng": item.quantity,
            "Tồn cuối": item.endingStock,
            "Đối tác": item.partner,
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Thẻ kho"
        );
        XLSX.writeFile(
            workbook,
            "the-kho.xlsx"
        );
    };

    // model chỉnh sửa chi tiết
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

    // tải ảnh lên 
    const [productImages, setProductImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const product = products.find(
            (item) => item.id === selectedProduct
        );
        if (product) {
            setProductImages(product.images || []);
        } else {
            setProductImages([]);
        }
    }, [selectedProduct]);

    // đơn vị tính 
    // const [baseUnit, setBaseUnit] = useState("");
    // const [basePrice, setBasePrice] = useState("");
    // const [additionalUnits, setAdditionalUnits] = useState<any[]>([]);

    const [productUnits, setProductUnits] = useState<Record<number, {
        baseUnit: string;
        basePrice: string;
        additionalUnits: {
            id: number;
            name: string;
            conversion: string;
            price: string;
            directSale: boolean;
        }[];
    }>>({});



    // tạo thuộc tính 
    const [showAttribute, setShowAttribute] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [attribute, setAttribute] = useState("");
    const [attributes, setAttributes] = useState<string[]>([]);
    // Tên thuộc tính của từng sản phẩm
    const [productAttributes, setProductAttributes] = useState<Record<string | number, string>>({});
    // Giá trị thuộc tính của từng sản phẩm
    const [productAttributeValues, setProductAttributeValues] = useState<Record<string | number, string>>({});


    // đơn vị ngoài 
    const [openProductUnit, setOpenProductUnit] = useState<number | null>(null);

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
                    {selectedProductIds.length > 0 ? (
                        // ================= ĐANG CHỌN PRODUCT =================
                        <div className="w-auto flex items-center justify-end gap-3">
                            <span className="text-[14px] font-medium text-blue-600">
                                Đã chọn {selectedProductIds.length}
                            </span>

                            {/* Bỏ chọn */}
                            <button type="button" onClick={() => setSelectedProductIds([])} className="w-[32px] h-[32px] flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100">
                                <X size={18} />
                            </button>

                            {/* Xuất file */}
                            <button type="button" className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-50">
                                <FileSymlink size={20} />
                                <span>Xuất file</span>
                            </button>

                            {/* In tem mã */}
                            <button type="button" className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-50">
                                <PrinterCheck size={20} />
                                <span>In tem mã</span>
                            </button>

                            {/* Nhập hàng */}
                            <button type="button" className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-50">
                                <Download size={20} />
                                <span>Nhập hàng</span>
                            </button>

                            {/* More */}
                            <div className="relative group">
                                <button type="button" className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                                    <MoreHorizontal size={20} />
                                </button>
                                {/* Menu */}
                                <div className="absolute right-0 top-[44px] w-[232px] bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 hidden group-hover:block">
                                    <button type="button" className="w-full text-left px-4 py-3 text-[16px] text-gray-700 hover:bg-gray-50" >
                                        Đặt hàng nhập
                                    </button>
                                    <button type="button" className="w-full text-left px-4 py-3 text-[16px] text-gray-700 hover:bg-gray-50" >
                                        Đổi nhóm hàng
                                    </button>
                                    <div className="border-t border-gray-200 my-1" />
                                    <button type="button" className="w-full text-left px-4 py-3 text-[16px] text-red-500 hover:bg-red-50" >
                                        Ngừng kinh doanh
                                    </button>

                                    <button type="button" className="w-full text-left px-4 py-3 text-[16px] text-red-500 hover:bg-red-50">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // ================= BÌNH THƯỜNG =================
                        <div className="w-auto flex items-center justify-end gap-2">
                            {/* Tạo mới */}
                            <div className="relative group">
                                <button className="h-[40px] w-auto px-4 rounded-lg border border-blue-500 text-blue-600 bg-white flex items-center gap-2 font-semibold hover:bg-blue-50">
                                    <Plus size={21} />
                                    <span>Tạo mới</span>
                                    <ChevronDown size={17} />
                                </button>
                                {/* Dropdown */}
                                <div className="absolute top-[46px] right-0 w-[250px] bg-white text-gray-800 rounded-lg shadow-xl hidden group-hover:block z-50 overflow-hidden">
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
                            <button
                                className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-50" >
                                <FileUp size={20} />
                                <span>Import file</span>
                            </button>

                            {/* Export */}
                            <button className="h-[40px] px-4 rounded-lg border border-gray-300 bg-white flex items-center gap-2 text-gray-700 font-semibold hover:bg-gray-50" >
                                <FileDown size={20} />
                                <span>Xuất file</span>
                            </button>

                            {/* List */}
                            <div className="relative">
                                <button type="button" onClick={() => setShowColumns(!showColumns)} className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                                    <List size={21} />
                                </button>
                                {showColumns && (
                                    <div className="absolute top-[46px] right-0 w-[425px] bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] p-3">
                                        <div className="grid grid-cols-2 gap-x-6">
                                            {columns.map((column) => (
                                                <label key={column} className="flex items-center gap-2 h-[36px] cursor-pointer text-[15px] text-gray-700"  >
                                                    <input type="checkbox" checked={selectedColumns.includes(column)}
                                                        onChange={() => {
                                                            setSelectedColumns((prev) => {
                                                                // Bỏ cột
                                                                if (prev.includes(column)) {
                                                                    return prev.filter((item) => item !== column);
                                                                }
                                                                // Thêm lại cột + giữ đúng thứ tự ban đầu
                                                                return columns.filter(
                                                                    (item) => item === column || prev.includes(item)
                                                                );
                                                            });
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
                            <button className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50">
                                <Settings size={20} />
                            </button>
                            {/* Help */}
                            <button className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                                <CircleHelp size={20} />
                            </button>
                        </div>
                    )}
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
                                    className={`w-full h-[43px] px-4 border rounded-xl text-left text-[17px] flex items-center justify-between bg-white ${showGroupPicker ? "border-blue-500" : "border-gray-300 hover:border-blue-400"}`}>
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
                                                {/* Tiêu đề + Tạo mới nằm cùng hàng */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-[18px] font-semibold text-gray-900">
                                                        Nhóm hàng
                                                    </h3>
                                                    <button type="button" className="text-blue-600 text-[17px] font-medium hover:text-blue-700 flex items-center gap-1" >
                                                        <Plus size={17} />
                                                        Tạo mới
                                                    </button>
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
                                        <button type="button" onClick={() => { setCreatedTime("all"); setShowCreatedPicker(true); }}
                                            className={`w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ${createdTime !== "custom" ? "border-blue-500" : "border-gray-400"}`} >
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
                                                    <input type="checkbox"
                                                        checked={products.length > 0 && selectedProductIds.length === products.length}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedProductIds(
                                                                    products.map((product) => product.id)
                                                                );
                                                            } else {
                                                                setSelectedProductIds([]);
                                                            }
                                                        }} className="w-[16px] h-[16px] rounded border-gray-400 accent-blue-600 cursor-pointer" />
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
                                                        className="px-3 text-[16px] font-semibold text-gray-800 text-left whitespace-nowrap ">
                                                        {column}
                                                    </th>
                                                );
                                            })}

                                        </tr>
                                    </thead>

                                    {/* ================= BODY ================= */}
                                    <tbody>
                                        <tr><td colSpan={selectedColumns.length + 2} className="h-[45px] p-0 border-0 bg-white"></td></tr>
                                        {currentProducts.map((product) => (
                                            <React.Fragment key={product.id}>
                                                <tr key={product.id} onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                                                    className={`h-[60px]  border-b border-gray-100 hover:bg-[#f8fbff] transition-colors cursor-pointer  ${selectedProduct === product.id ? "bg-blue-50 !border-t-2 !border-blue-500 !border-b-0" : ""}`} >
                                                    {/* Checkbox */}


                                                    <td className={`w-[42px] min-w-[42px] ${selectedProduct === product.id ? "border-l-2 border-blue-500 bg-blue-50" : "bg-white"}`}>
                                                        <div className="flex items-center justify-center">
                                                            <input type="checkbox" checked={selectedProductIds.includes(product.id)} onClick={(e) => e.stopPropagation()} onChange={(e) => { if (e.target.checked) { setSelectedProductIds((prev) => [...prev, product.id,]); } else { setSelectedProductIds((prev) => prev.filter((id) => id !== product.id)); } }}
                                                                className="w-[16px] h-[16px] rounded border-gray-400 accent-blue-600 cursor-pointer" />
                                                        </div>
                                                    </td>

                                                    {/* Star */}
                                                    <td className="w-[42px] min-w-[42px]">
                                                        <button type="button" onClick={(e) => { e.stopPropagation(); setBestSellerIds((prev) => prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]); }}
                                                            className={`w-full h-full flex items-center justify-center text-[23px] ${bestSellerIds.includes(product.id) ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}  >
                                                            {bestSellerIds.includes(product.id) ? "★" : "☆"}
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
                                                                    <div className="max-w-[320px] whitespace-normal leading-5">

                                                                        <div className="flex items-center gap-1">

                                                                            <span>
                                                                                {product.name}
                                                                            </span>

                                                                            {/* Đơn vị tính */}
                                                                            {productUnits[product.id]?.baseUnit && (
                                                                                <div className="relative">

                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            setOpenProductUnit(
                                                                                                openProductUnit === product.id
                                                                                                    ? null
                                                                                                    : product.id
                                                                                            );
                                                                                        }}
                                                                                        className="px-2 py-0.5 bg-gray-100 rounded-md text-[16px] flex items-center gap-1"
                                                                                    >
                                                                                        {productUnits[product.id]?.baseUnit}

                                                                                        <ChevronDown className="w-3.5 h-3.5" />
                                                                                    </button>

                                                                                    {/* Dropdown */}
                                                                                    {openProductUnit === product.id && (
                                                                                        <div className="absolute z-[999] top-[32px] left-0 w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg">

                                                                                            {/* Đơn vị cơ bản */}
                                                                                            <button type="button" className="w-full px-3 py-2 text-left text-[14px] hover:bg-blue-50" >
                                                                                                {productUnits[product.id].baseUnit}
                                                                                            </button>
                                                                                            {/* Đơn vị thêm */}
                                                                                            {productUnits[product.id].additionalUnits.map(
                                                                                                (unit) => (
                                                                                                    <button key={unit.id} type="button" className="w-full px-3 py-2 text-left text-[14px] hover:bg-blue-50" >
                                                                                                        {unit.name}
                                                                                                    </button>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            );
                                                        }
                                                        /* ================= NHÓM HÀNG ================= */
                                                        if (column === "Nhóm hàng") {
                                                            return (
                                                                <td key={column} className="px-3 text-[17px] text-gray-700" >
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
                                                {selectedProduct === product.id && (
                                                    <tr>
                                                        <td colSpan={selectedColumns.length + 2} className="p-0 ">
                                                            <div className="w-[calc(100vw-639px)] max-w-full bg-white border-2 border-blue-500 flex flex-col overflow-hidden">
                                                                <div className="h-[45px] flex-shrink-0 border-b flex items-center">

                                                                    <button type="button" onClick={() => setActiveTab("info")}
                                                                        className={`h-full px-5 ${activeTab === "info" ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-black-600 hover:text-blue-600"}`} >
                                                                        Thông tin
                                                                    </button>

                                                                    <button type="button" onClick={() => setActiveTab("description")}
                                                                        className={`h-full px-5 ${activeTab === "description" ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-black-600 hover:text-blue-600"}`} >
                                                                        Mô tả, ghi chú
                                                                    </button>

                                                                    <button type="button" onClick={() => setActiveTab("stockCard")}
                                                                        className={`h-full px-5 ${activeTab === "stockCard" ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-black-600 hover:text-blue-600"}`} >
                                                                        Thẻ kho
                                                                    </button>

                                                                    <button type="button" onClick={() => setActiveTab("inventory")}
                                                                        className={`h-full px-5 ${activeTab === "inventory" ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-black-600 hover:text-blue-600"}`} >
                                                                        Tồn kho
                                                                    </button>
                                                                </div>
                                                                {activeTab === "description" && (
                                                                    <div className="p-5 w-full overflow-hidden">
                                                                        <div className="border border-gray-200 rounded-lg p-4">
                                                                            <p className="font-semibold text-gray-800">
                                                                                Mô tả
                                                                            </p>
                                                                            <p className="mt-3 text-gray-700">
                                                                                bánh mỳ này rất ngon
                                                                            </p>
                                                                        </div>
                                                                        <div className="border border-gray-200 rounded-lg p-4 mt-2">
                                                                            <p className="font-semibold text-gray-800">
                                                                                Ghi chú đặt hàng
                                                                            </p>
                                                                            <p className="mt-3 text-gray-700">
                                                                                hello ngon lắm ghi chú đặt hàng
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex justify-end mt-5">
                                                                            <button type="button" onClick={() => setShowDescriptionModal(true)} className="px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap">
                                                                                <PencilLine size={16} />
                                                                                <span>Chỉnh sửa</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>


                                                                )}
                                                                {activeTab === "info" && (
                                                                    <div className="p-5 w-full overflow-hidden">
                                                                        <div className="flex gap-5">
                                                                            <div className="w-[130px] h-[130px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                                                                <img src={product.image} className="w-full h-full object-contain" />
                                                                            </div>
                                                                            <div>
                                                                                <h2 className="text-[20px] font-semibold text-gray-800">
                                                                                    {product.name}
                                                                                </h2>
                                                                                <p className="text-gray-500 mt-3">
                                                                                    Nhóm hàng:
                                                                                    <span className="text-gray-800">
                                                                                        {product.group}
                                                                                    </span>
                                                                                </p>

                                                                                <div className="flex flex-wrap gap-2 mt-3">
                                                                                    <span className="px-5 py-1 bg-gray-200 rounded-lg text-lg text-gray-700 font-semibold">
                                                                                        {product.type}
                                                                                    </span>

                                                                                    <span className="px-5 py-1 bg-gray-200 rounded-lg text-lg text-gray-700 font-semibold">
                                                                                        Bán trực tiếp
                                                                                    </span>

                                                                                    <span className="px-5 py-1 bg-orange-200 text-orange-500 rounded-lg text-lg font-semibold">
                                                                                        Không tích điểm
                                                                                    </span>

                                                                                    {bestSellerIds.includes(
                                                                                        product.id
                                                                                    ) && (
                                                                                            <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded text-sm">
                                                                                                ★ Best Seller
                                                                                            </span>
                                                                                        )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* ================= THÔNG TIN CHI TIẾT ================= */}
                                                                        <div className="grid grid-cols-4 gap-x-8 gap-y-0 mt-7">
                                                                            {/* Mã hàng */}
                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Mã hàng
                                                                                </p>
                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.code}
                                                                                </p>
                                                                            </div>
                                                                            {/* Mã vạch */}
                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Mã vạch
                                                                                </p>

                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.barcode || "Chưa có"}
                                                                                </p>
                                                                            </div>
                                                                            {/* Tồn kho */}
                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Tồn kho
                                                                                </p>

                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.stock}
                                                                                </p>
                                                                            </div>
                                                                            {/* Định mức */}
                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Định mức tồn
                                                                                </p>

                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.minStock} -{" "}
                                                                                    {product.maxStock}
                                                                                </p>
                                                                            </div>
                                                                            {/* Giá vốn */}
                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Giá vốn
                                                                                </p>

                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.costPrice.toLocaleString("vi-VN")}
                                                                                </p>
                                                                            </div>
                                                                            {/* Giá bán */}
                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Giá bán
                                                                                </p>

                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.salePrice.toLocaleString("vi-VN")}
                                                                                </p>
                                                                            </div>
                                                                            {/* Thương hiệu */}
                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Thương hiệu
                                                                                </p>

                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.brand || "Chưa có"}
                                                                                </p>
                                                                            </div>
                                                                            {/* Vị trí */}
                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Vị trí
                                                                                </p>

                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.location || "Chưa có"}
                                                                                </p>
                                                                            </div>

                                                                            <div className="py-3 border-b border-gray-200">
                                                                                <p className="text-[18px] text-gray-500">
                                                                                    Trọng lượng
                                                                                </p>

                                                                                <p className="mt-2 text-gray-800">
                                                                                    {product.location || "Chưa có"}
                                                                                </p>
                                                                            </div>


                                                                            {/* Khách đặt */}
                                                                            {/* <div className="py-3 border-b border-gray-200">
                                                                            <p className="text-[13px] text-gray-500">
                                                                                Khách đặt
                                                                            </p>

                                                                            <p className="mt-2 text-gray-800">
                                                                                {product.ordered}
                                                                            </p>
                                                                        </div> */}


                                                                            {/* Thời gian tạo */}
                                                                            {/* <div className="py-3 border-b border-gray-200">
                                                                            <p className="text-[13px] text-gray-500">
                                                                                Thời gian tạo
                                                                            </p>

                                                                            <p className="mt-2 text-gray-800">
                                                                                {product.createdAt}
                                                                            </p>
                                                                        </div> */}


                                                                            {/* Dự kiến hết hàng */}
                                                                            {/* <div className="py-3 border-b border-gray-200">
                                                                            <p className="text-[13px] text-gray-500">
                                                                                Dự kiến hết hàng
                                                                            </p>

                                                                            <p className="mt-2 text-gray-800">
                                                                                {product.expectedOut || "Chưa có"}                                                                                   
                                                                            </p>
                                                                        </div> */}


                                                                            {/* Trạng thái */}
                                                                            {/* <div className="py-3 border-b border-gray-200">
                                                                            <p className="text-[13px] text-gray-500">
                                                                                Trạng thái
                                                                            </p>

                                                                            <p className="mt-2">
                                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[13px] font-medium">
                                                                                    {product.status}
                                                                                </span>
                                                                            </p>
                                                                        </div> */}


                                                                        </div>


                                                                        {/* Thêm thuộc tính */}
                                                                        <button type="button" className="mt-6 text-blue-600 hover:text-blue-700 font-semibold text-[18px]" >
                                                                            Thêm thuộc tính
                                                                        </button>
                                                                        <div className="border-t px-5 py-4 flex-shrink-0 flex items-center justify-between bg-white w-full">
                                                                            {/* Bên trái */}
                                                                            <div className="flex items-center gap-7">
                                                                                <button type="button" className="flex items-center gap-1 text-gray-700 hover:text-red-600" >
                                                                                    <Trash2 size={18} /> <span>Xóa</span>
                                                                                </button>
                                                                                <button type="button" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                                                                                    <Copy size={16} />
                                                                                    <span>Sao chép</span>
                                                                                </button>
                                                                            </div>
                                                                            {/* Bên phải */}
                                                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                                                <button type="button" onClick={() => { setActiveEditTab("info"); setShowEditModal(true); }}
                                                                                    className="flex items-center justify-center gap-1 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium whitespace-nowrap">
                                                                                    <PencilLine size={16} />
                                                                                    <span>Chỉnh sửa</span>
                                                                                </button>
                                                                                <button type="button" className="flex items-center justify-center gap-1 px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
                                                                                    <Printer size={16} />
                                                                                    <span>In tem mã</span>
                                                                                </button>
                                                                                <button type="button" className="flex items-center justify-center gap-1 px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
                                                                                    <Printer size={16} />
                                                                                    <span>Thêm hàng hóa cùng loại</span>
                                                                                </button>
                                                                                <button type="button" className="w-[42px] h-[40px] border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center flex-shrink-0">
                                                                                    <Ellipsis size={20} />
                                                                                </button>
                                                                            </div>
                                                                            {showEditModal && (
                                                                                <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-3">
                                                                                    <div className="bg-white w-full max-w-[1200px] max-h-[95vh] rounded-xl shadow-2xl overflow-hidden flex flex-col">
                                                                                        {/* Header */}
                                                                                        <div className="h-[64px] flex items-center justify-between px-6 flex-shrink-0">
                                                                                            <h2 className="text-[20px] font-semibold text-gray-800">
                                                                                                Sửa hàng hóa
                                                                                            </h2>

                                                                                            <button type="button" onClick={() => setShowEditModal(false)}
                                                                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
                                                                                                <X size={20} />
                                                                                            </button>
                                                                                        </div>

                                                                                        {/* Tabs */}
                                                                                        <div className="h-[43px] px-6 border-b border-gray-200 flex items-end flex-shrink-0">
                                                                                            <button type="button" onClick={() => setActiveEditTab("info")}
                                                                                                className={`h-[43px] px-0 mr-8 text-[14px] relative ${activeEditTab === "info" ? "text-blue-600 font-medium" : "text-gray-700"}`}>
                                                                                                Thông tin
                                                                                                {activeEditTab === "info" && (
                                                                                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
                                                                                                )}
                                                                                            </button>

                                                                                            <button type="button" onClick={() => setActiveEditTab("description")}
                                                                                                className={`h-[43px] px-0 text-[14px] relative ${activeEditTab === "description" ? "text-blue-600 font-medium" : "text-gray-700"}`} >
                                                                                                Mô tả
                                                                                                {activeEditTab === "description" && (
                                                                                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
                                                                                                )}
                                                                                            </button>
                                                                                        </div>

                                                                                        <div className="flex-1 overflow-y-auto">
                                                                                            {activeEditTab === "info" && (
                                                                                                <div className="p-6">
                                                                                                    <div className="grid grid-cols-[1fr_1fr_230px] gap-6">
                                                                                                        <div>
                                                                                                            <label className="block text-[13px] text-gray-700 mb-1">
                                                                                                                Mã hàng
                                                                                                            </label>
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                defaultValue={product.code}
                                                                                                                onChange={(e) => {
                                                                                                                    // cập nhật mã hàng sau
                                                                                                                }}
                                                                                                                className="w-full h-[34px] px-3 border border-blue-500 rounded-lg outline-none text-[14px]"
                                                                                                            />
                                                                                                        </div>

                                                                                                        {/* Mã vạch */}
                                                                                                        <div>
                                                                                                            <label className="block text-[13px] text-gray-700 mb-1">
                                                                                                                Mã vạch
                                                                                                            </label>

                                                                                                            <input
                                                                                                                type="text"
                                                                                                                defaultValue={product.barcode}
                                                                                                                placeholder="Nhập mã vạch"
                                                                                                                className="w-full h-[34px] px-3 border border-gray-300 rounded-lg outline-none text-[14px] focus:border-blue-500"
                                                                                                            />
                                                                                                        </div>


                                                                                                        {/* Hình ảnh */}
                                                                                                        <div className="flex gap-2">
                                                                                                            <div className="relative w-[180px] h-[180px] border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 group">
                                                                                                                {productImages[0] ? (
                                                                                                                    productImages[0].startsWith("http") ||
                                                                                                                        productImages[0].startsWith("blob:") ? (
                                                                                                                        <img
                                                                                                                            src={productImages[0]}
                                                                                                                            alt={product.image}
                                                                                                                            className="w-full h-full object-contain"
                                                                                                                        />
                                                                                                                    ) : (
                                                                                                                        <span className="text-[70px]">
                                                                                                                            {productImages[0]}
                                                                                                                        </span>
                                                                                                                    )
                                                                                                                ) : (
                                                                                                                    <ImageIcon size={40} className="text-gray-300" />
                                                                                                                )}
                                                                                                                {/* Xóa ảnh chính */}
                                                                                                                {productImages[0] && (
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        onClick={() => {
                                                                                                                            setProductImages((prev) =>
                                                                                                                                prev.filter((_, index) => index !== 0)
                                                                                                                            );
                                                                                                                        }}
                                                                                                                        title="Xóa ảnh" className=" absolute top-[-1px] right-[-1px]  w-[20px] h-[20px] rounded-full bg-white border border-gray-400 flex items-center  justify-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 hover:text-black z-10 " >
                                                                                                                        <X size={14} strokeWidth={2} />
                                                                                                                    </button>
                                                                                                                )}
                                                                                                            </div>
                                                                                                            {/* ================= ẢNH PHỤ ================= */}
                                                                                                            <div className="flex flex-col gap-2">
                                                                                                                {/* Input chọn file - ẩn */}
                                                                                                                <input
                                                                                                                    ref={fileInputRef}
                                                                                                                    type="file"
                                                                                                                    accept="image/*"
                                                                                                                    className="hidden"
                                                                                                                    onChange={(e) => {
                                                                                                                        const file = e.target.files?.[0];
                                                                                                                        if (!file) return;
                                                                                                                        // Tạo URL tạm để hiển thị ảnh
                                                                                                                        const imageUrl = URL.createObjectURL(file);
                                                                                                                        setProductImages((prev) => {
                                                                                                                            // Tối đa 4 ảnh
                                                                                                                            if (prev.length >= 5) {
                                                                                                                                return prev;
                                                                                                                            }
                                                                                                                            return [...prev, imageUrl];
                                                                                                                        });
                                                                                                                        // Cho phép chọn lại cùng file
                                                                                                                        e.target.value = "";
                                                                                                                    }}
                                                                                                                />


                                                                                                                {/* ================= ẢNH 2 ================= */}
                                                                                                                {productImages[1] ? (
                                                                                                                    <div className="relative w-[42px] h-[42px] group cursor-pointer"
                                                                                                                        onClick={() => {
                                                                                                                            setProductImages((prev) => {
                                                                                                                                const newImages = [...prev];
                                                                                                                                [newImages[0], newImages[1]] = [newImages[1], newImages[0],];
                                                                                                                                return newImages;
                                                                                                                            });
                                                                                                                        }}>
                                                                                                                        <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                                                                                                            <img src={productImages[1]} alt="Ảnh 2" className="w-full h-full object-cover" />
                                                                                                                        </div>
                                                                                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                                                                                            Ảnh đại diện hàng hóa
                                                                                                                        </div>

                                                                                                                        {/* Xóa */}
                                                                                                                        <button
                                                                                                                            type="button"
                                                                                                                            onClick={() => {
                                                                                                                                setProductImages((prev) =>
                                                                                                                                    prev.filter((_, index) => index !== 1)
                                                                                                                                );
                                                                                                                            }}
                                                                                                                            title="Xóa ảnh" className=" absolute -top-2 -right-2 w-[18px] h-[18px] rounded-full bg-white border border-gray-400 flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 hover:text-black z-10 ">
                                                                                                                            <X size={11} />
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                ) : (

                                                                                                                    /* Chưa có ảnh 2 => hiện + */
                                                                                                                    <button type="button" onClick={() => fileInputRef.current?.click()}
                                                                                                                        className=" w-[42px] h-[42px] border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 ">
                                                                                                                        <Plus size={20} />
                                                                                                                    </button>
                                                                                                                )}
                                                                                                                {productImages[2] ? (
                                                                                                                    <div className="relative w-[42px] h-[42px] group"
                                                                                                                        onClick={() => {
                                                                                                                            setProductImages((prev) => {
                                                                                                                                const newImages = [...prev];
                                                                                                                                [newImages[0], newImages[2]] = [newImages[2], newImages[0],];
                                                                                                                                return newImages;
                                                                                                                            });
                                                                                                                        }}>
                                                                                                                        <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                                                                                                            <img src={productImages[2]} alt="Ảnh 3" className="w-full h-full object-cover" />
                                                                                                                        </div>
                                                                                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                                                                                            Ảnh đại diện hàng hóa
                                                                                                                        </div>
                                                                                                                        <button type="button" onClick={() => { setProductImages((prev) => prev.filter((_, index) => index !== 2)); }}
                                                                                                                            title="Xóa ảnh" className=" absolute -top-2 -right-2 w-[18px] h-[18px] rounded-full bg-white border  border-gray-400 flex items-center justify-center  text-gray-600 opacity-0 group-hover:opacity-100  transition-opacity hover:bg-gray-100 hover:text-black  z-10 ">
                                                                                                                            <X size={11} />
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                ) : productImages.length === 2 ? (
                                                                                                                    <button type="button" onClick={() => fileInputRef.current?.click()}
                                                                                                                        className=" w-[42px]  h-[42px] border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 " >
                                                                                                                        <Plus size={20} />
                                                                                                                    </button>
                                                                                                                ) : (
                                                                                                                    <div className="w-[42px] h-[42px] border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                                                                                                        <ImageIcon
                                                                                                                            size={22}
                                                                                                                            className="text-gray-300"
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                )}

                                                                                                                {/* ================= ẢNH 4 ================= */}
                                                                                                                {productImages[3] ? (
                                                                                                                    <div className="relative w-[42px] h-[42px] group"
                                                                                                                        onClick={() => {
                                                                                                                            setProductImages((prev) => {
                                                                                                                                const newImages = [...prev];
                                                                                                                                [newImages[0], newImages[3]] = [newImages[3], newImages[0],];
                                                                                                                                return newImages;
                                                                                                                            });
                                                                                                                        }}>
                                                                                                                        <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                                                                                                            <img src={productImages[3]} alt="Ảnh 4" className="w-full h-full object-cover" />
                                                                                                                        </div>
                                                                                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                                                                                            Ảnh đại diện hàng hóa
                                                                                                                        </div>
                                                                                                                        <button type="button" onClick={() => { setProductImages((prev) => prev.filter((_, index) => index !== 3)); }}
                                                                                                                            title="Xóa ảnh" className=" absolute -top-2 -right-2 w-[18px] h-[18px] rounded-full bg-white  border border-gray-400 flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 hover:text-black z-10 " >
                                                                                                                            <X size={11} />
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                ) : productImages.length === 3 ? (
                                                                                                                    <button type="button" onClick={() => fileInputRef.current?.click()}
                                                                                                                        className="  w-[42px] h-[42px]  border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50" >
                                                                                                                        <Plus size={20} />
                                                                                                                    </button>
                                                                                                                ) : (
                                                                                                                    <div className="w-[42px] h-[42px] border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                                                                                                        <ImageIcon
                                                                                                                            size={22}
                                                                                                                            className="text-gray-300"
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                )}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    {/* Tên hàng */}
                                                                                                    <div className="mt-4">
                                                                                                        <label className="block text-[13px] text-gray-700 mb-1">
                                                                                                            Tên hàng
                                                                                                        </label>

                                                                                                        <input
                                                                                                            type="text"
                                                                                                            defaultValue={product.name}
                                                                                                            className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-[14px] outline-none focus:border-blue-500"
                                                                                                        />
                                                                                                    </div>


                                                                                                    {/* Nhóm hàng + thương hiệu */}
                                                                                                    <div className="grid grid-cols-2 gap-6 mt-4">

                                                                                                        {/* Nhóm hàng */}
                                                                                                        <div>
                                                                                                            <div className="flex justify-between mb-1">
                                                                                                                <label className="text-[13px] text-gray-700">
                                                                                                                    Nhóm hàng
                                                                                                                </label>

                                                                                                                <button
                                                                                                                    type="button"
                                                                                                                    className="text-blue-600 text-[13px]"
                                                                                                                >
                                                                                                                    Tạo mới
                                                                                                                </button>
                                                                                                            </div>

                                                                                                            <select
                                                                                                                defaultValue={product.group}
                                                                                                                className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-[14px]"
                                                                                                            >
                                                                                                                <option value={product.group}>
                                                                                                                    {product.group}
                                                                                                                </option>
                                                                                                            </select>
                                                                                                        </div>


                                                                                                        {/* Thương hiệu */}
                                                                                                        <div>
                                                                                                            <div className="flex justify-between mb-1">
                                                                                                                <label className="text-[13px] text-gray-700">
                                                                                                                    Thương hiệu
                                                                                                                </label>

                                                                                                                <button
                                                                                                                    type="button"
                                                                                                                    className="text-blue-600 text-[13px]"
                                                                                                                >
                                                                                                                    Tạo mới
                                                                                                                </button>
                                                                                                            </div>

                                                                                                            <select
                                                                                                                defaultValue={product.brand}
                                                                                                                className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-[14px]"
                                                                                                            >
                                                                                                                <option value="">
                                                                                                                    Chọn thương hiệu
                                                                                                                </option>

                                                                                                                {product.brand && (
                                                                                                                    <option value={product.brand}>
                                                                                                                        {product.brand}
                                                                                                                    </option>
                                                                                                                )}
                                                                                                            </select>
                                                                                                        </div>

                                                                                                    </div>


                                                                                                    {/* Giá vốn, giá bán */}
                                                                                                    <div className="border border-gray-200 rounded-lg p-4 mt-5">

                                                                                                        <div className="flex items-center justify-between mb-4">
                                                                                                            <h3 className="font-semibold text-gray-800">
                                                                                                                Giá vốn, giá bán
                                                                                                            </h3>

                                                                                                            <ChevronUp size={18} />
                                                                                                        </div>

                                                                                                        <div className="grid grid-cols-2 gap-6">

                                                                                                            {/* Giá vốn */}
                                                                                                            <div>
                                                                                                                <label className="block text-[13px] mb-1">
                                                                                                                    Giá vốn
                                                                                                                </label>

                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    defaultValue={product.costPrice.toLocaleString("vi-VN")}
                                                                                                                    className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-right outline-none"
                                                                                                                />
                                                                                                            </div>


                                                                                                            {/* Giá bán */}
                                                                                                            <div>
                                                                                                                <div className="flex items-center gap-2 mb-1">
                                                                                                                    <label className="text-[13px]">
                                                                                                                        Giá bán
                                                                                                                    </label>

                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="text-blue-600 text-[13px]"
                                                                                                                    >
                                                                                                                        Thiết lập giá
                                                                                                                    </button>
                                                                                                                </div>

                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    defaultValue={product.salePrice.toLocaleString("vi-VN")}
                                                                                                                    className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-right outline-none"
                                                                                                                />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>


                                                                                                    {/* Tồn kho */}
                                                                                                    <div className="border border-gray-200 rounded-lg p-4 mt-4">
                                                                                                        <h3 className="font-semibold text-gray-800">
                                                                                                            Tồn kho
                                                                                                        </h3>
                                                                                                        <p className="text-[12px] text-gray-500 mt-1 mb-4">
                                                                                                            Quản lý số lượng tồn kho và định mức tồn.
                                                                                                            Khi tồn kho chạm đến định mức, bạn sẽ nhận
                                                                                                            được cảnh báo.
                                                                                                        </p>

                                                                                                        <div className="grid grid-cols-3 gap-6">

                                                                                                            {/* Tồn kho */}
                                                                                                            <div>
                                                                                                                <label className="block text-[13px] mb-1">
                                                                                                                    Tồn kho
                                                                                                                </label>

                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    defaultValue={product.stock.toLocaleString("vi-VN")}
                                                                                                                    className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-right"
                                                                                                                />
                                                                                                            </div>


                                                                                                            {/* Định mức thấp nhất */}
                                                                                                            <div>
                                                                                                                <label className="block text-[13px] mb-1">
                                                                                                                    Định mức tồn thấp nhất
                                                                                                                </label>

                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    defaultValue={product.minStock}
                                                                                                                    className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-right"
                                                                                                                />
                                                                                                            </div>


                                                                                                            {/* Định mức cao nhất */}
                                                                                                            <div>
                                                                                                                <label className="block text-[13px] mb-1">
                                                                                                                    Định mức tồn cao nhất
                                                                                                                </label>

                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    defaultValue={product.maxStock}
                                                                                                                    className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-right"
                                                                                                                />
                                                                                                            </div>

                                                                                                        </div>
                                                                                                    </div>


                                                                                                    {/* Vị trí, trọng lượng */}
                                                                                                    <div className="border border-gray-200 rounded-lg p-4 mt-4">

                                                                                                        <h3 className="font-semibold text-gray-800">
                                                                                                            Vị trí, trọng lượng
                                                                                                        </h3>

                                                                                                        <p className="text-[12px] text-gray-500 mt-1 mb-4">
                                                                                                            Quản lý việc sắp xếp kho, vị trí bán hàng
                                                                                                            hoặc trọng lượng hàng hóa
                                                                                                        </p>

                                                                                                        <div className="grid grid-cols-2 gap-6">

                                                                                                            {/* Vị trí */}
                                                                                                            <div>
                                                                                                                <div className="flex justify-between mb-1">
                                                                                                                    <label className="text-[13px]">
                                                                                                                        Vị trí
                                                                                                                    </label>

                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="text-blue-600 text-[13px]"
                                                                                                                    >
                                                                                                                        Tạo mới
                                                                                                                    </button>
                                                                                                                </div>

                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    defaultValue={product.location}
                                                                                                                    placeholder="Chọn vị trí"
                                                                                                                    className="w-full h-[34px] px-3 border border-gray-300 rounded-lg"
                                                                                                                />
                                                                                                            </div>


                                                                                                            {/* Trọng lượng */}
                                                                                                            <div>
                                                                                                                <label className="block text-[13px] mb-1">
                                                                                                                    Trọng lượng
                                                                                                                </label>

                                                                                                                <div className="flex">
                                                                                                                    <input
                                                                                                                        type="text"
                                                                                                                        defaultValue="0"
                                                                                                                        className="flex-1 h-[34px] px-3 border border-gray-300 rounded-l-lg text-right"
                                                                                                                    />
                                                                                                                    <select className="w-[90px] h-[34px] border border-l-0 border-gray-300 rounded-r-lg">
                                                                                                                        <option>g</option>
                                                                                                                        <option>kg</option>
                                                                                                                    </select>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    {/* Quản lý theo đơn vị tính và thuộc tính */}
                                                                                                    <div className="border border-gray-200 rounded-lg p-4 mt-4">
                                                                                                        <div className="flex items-center justify-between">
                                                                                                            <h3 className="font-semibold text-gray-800 text-[17px]">
                                                                                                                Quản lý theo đơn vị tính và thuộc tính
                                                                                                            </h3>
                                                                                                            <button type="button" className="text-gray-700 hover:text-blue-600" >
                                                                                                                <ChevronUp size={16} />
                                                                                                            </button>
                                                                                                        </div>
                                                                                                        {/* Đơn vị tính */}
                                                                                                        <div className="mt-5">
                                                                                                            <h4 className="text-[13px] font-semibold text-gray-800 text-[15px]">
                                                                                                                Đơn vị tính
                                                                                                            </h4>

                                                                                                            <p className="text-[13px] text-gray-500 mt-1">
                                                                                                                Thêm đơn vị bán hoặc nhập như chai, lọc, thùng. Đặt công thức quy đổi
                                                                                                                để tính nhanh giá và tồn kho. Ví dụ: 1 lốc = 4 chai, 1 thùng = 20 lốc.
                                                                                                            </p>

                                                                                                            {/* Đơn vị cơ bản */}
                                                                                                            <div className="flex items-end gap-6 mt-5">

                                                                                                                {/* Tên đơn vị cơ bản */}
                                                                                                                <div className="w-[210px]">
                                                                                                                    <label className="block text-[13px] mb-1">
                                                                                                                        Tên đơn vị cơ bản
                                                                                                                    </label>

                                                                                                                    <input
                                                                                                                        type="text"
                                                                                                                        value={productUnits[product.id]?.baseUnit || ""}
                                                                                                                        onChange={(e) => {
                                                                                                                            setProductUnits((prev) => ({
                                                                                                                                ...prev,
                                                                                                                                [product.id]: {
                                                                                                                                    ...(prev[product.id] || {
                                                                                                                                        baseUnit: "",
                                                                                                                                        basePrice: "",
                                                                                                                                        additionalUnits: [],
                                                                                                                                    }),
                                                                                                                                    baseUnit: e.target.value,
                                                                                                                                },
                                                                                                                            }));
                                                                                                                        }}
                                                                                                                        placeholder="Nhập tên đơn vị cơ bản"
                                                                                                                        className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-[13px] outline-none focus:border-blue-500"
                                                                                                                    />
                                                                                                                </div>

                                                                                                                {/* Giá bán */}
                                                                                                                <div className="w-[120px]">
                                                                                                                    <label className="block text-[13px] mb-1">
                                                                                                                        Giá bán
                                                                                                                    </label>

                                                                                                                    <input
                                                                                                                        type="text"
                                                                                                                        value={productUnits[product.id]?.basePrice || ""}
                                                                                                                        onChange={(e) => {
                                                                                                                            setProductUnits((prev) => ({
                                                                                                                                ...prev,
                                                                                                                                [product.id]: {
                                                                                                                                    ...(prev[product.id] || {
                                                                                                                                        baseUnit: "",
                                                                                                                                        basePrice: "",
                                                                                                                                        additionalUnits: [],
                                                                                                                                    }),
                                                                                                                                    basePrice: e.target.value,
                                                                                                                                },
                                                                                                                            }));
                                                                                                                        }}
                                                                                                                        placeholder="0"
                                                                                                                        className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-[13px] text-right outline-none focus:border-blue-500"
                                                                                                                    />
                                                                                                                </div>

                                                                                                                {/* Bán trực tiếp */}
                                                                                                                <label className="flex items-center gap-2 h-[34px] cursor-pointer">
                                                                                                                    <input
                                                                                                                        type="checkbox"
                                                                                                                        defaultChecked
                                                                                                                        className="w-[15px] h-[15px] accent-blue-600"
                                                                                                                    />

                                                                                                                    <span className="text-[13px]">
                                                                                                                        Bán trực tiếp
                                                                                                                    </span>
                                                                                                                </label>
                                                                                                            </div>

                                                                                                            {/* Các đơn vị thêm */}
                                                                                                            {productUnits[product.id]?.additionalUnits?.map((unit, index) => (
                                                                                                                <div
                                                                                                                    key={unit.id}
                                                                                                                    className="flex items-end gap-6 mt-4"
                                                                                                                >

                                                                                                                    {/* Tên đơn vị */}
                                                                                                                    <div className="w-[210px]">
                                                                                                                        <label className="block text-[13px] mb-1">
                                                                                                                            Tên đơn vị
                                                                                                                        </label>

                                                                                                                        <input
                                                                                                                            type="text"
                                                                                                                            value={unit.name}
                                                                                                                            onChange={(e) => {
                                                                                                                                const newUnits = [
                                                                                                                                    ...(productUnits[product.id]?.additionalUnits || [])
                                                                                                                                ];

                                                                                                                                newUnits[index] = {
                                                                                                                                    ...newUnits[index],
                                                                                                                                    name: e.target.value,
                                                                                                                                };

                                                                                                                                setProductUnits((prev) => ({
                                                                                                                                    ...prev,
                                                                                                                                    [product.id]: {
                                                                                                                                        ...(prev[product.id] || {
                                                                                                                                            baseUnit: "",
                                                                                                                                            basePrice: "",
                                                                                                                                            additionalUnits: [],
                                                                                                                                        }),
                                                                                                                                        additionalUnits: newUnits,
                                                                                                                                    },
                                                                                                                                }));
                                                                                                                            }}
                                                                                                                            placeholder="Nhập tên đơn vị"
                                                                                                                            className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-[13px] outline-none focus:border-blue-500"
                                                                                                                        />
                                                                                                                    </div>

                                                                                                                    {/* Dấu = */}
                                                                                                                    <div className="flex items-center justify-center w-[15px] h-[34px]">
                                                                                                                        <span className="text-[15px]">
                                                                                                                            =
                                                                                                                        </span>
                                                                                                                    </div>

                                                                                                                    {/* Quy đổi */}
                                                                                                                    <div className="w-[140px]">
                                                                                                                        <label className="block text-[13px] mb-1">
                                                                                                                            Quy đổi
                                                                                                                        </label>

                                                                                                                        <div className="flex h-[34px]">

                                                                                                                            <input
                                                                                                                                type="text"
                                                                                                                                value={unit.conversion}
                                                                                                                                onChange={(e) => {
                                                                                                                                    const newUnits = [
                                                                                                                                        ...(productUnits[product.id]?.additionalUnits || [])
                                                                                                                                    ];

                                                                                                                                    newUnits[index] = {
                                                                                                                                        ...newUnits[index],
                                                                                                                                        conversion: e.target.value,
                                                                                                                                    };

                                                                                                                                    setProductUnits((prev) => ({
                                                                                                                                        ...prev,
                                                                                                                                        [product.id]: {
                                                                                                                                            ...(prev[product.id] || {
                                                                                                                                                baseUnit: "",
                                                                                                                                                basePrice: "",
                                                                                                                                                additionalUnits: [],
                                                                                                                                            }),
                                                                                                                                            additionalUnits: newUnits,
                                                                                                                                        },
                                                                                                                                    }));
                                                                                                                                }}
                                                                                                                                className="w-[70px] px-3 border border-gray-300 rounded-l-lg text-[13px] text-right outline-none focus:border-blue-500"
                                                                                                                            />

                                                                                                                            <div className="flex items-center justify-center px-2 min-w-[70px] border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 text-[13px]">
                                                                                                                                {productUnits[product.id]?.baseUnit || "đơn vị"}
                                                                                                                            </div>

                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    {/* Giá bán */}
                                                                                                                    <div className="w-[120px]">
                                                                                                                        <label className="block text-[13px] mb-1">
                                                                                                                            Giá bán
                                                                                                                        </label>

                                                                                                                        <input
                                                                                                                            type="text"
                                                                                                                            value={unit.price}
                                                                                                                            onChange={(e) => {
                                                                                                                                const newUnits = [
                                                                                                                                    ...(productUnits[product.id]?.additionalUnits || [])
                                                                                                                                ];

                                                                                                                                newUnits[index] = {
                                                                                                                                    ...newUnits[index],
                                                                                                                                    price: e.target.value,
                                                                                                                                };

                                                                                                                                setProductUnits((prev) => ({
                                                                                                                                    ...prev,
                                                                                                                                    [product.id]: {
                                                                                                                                        ...(prev[product.id] || {
                                                                                                                                            baseUnit: "",
                                                                                                                                            basePrice: "",
                                                                                                                                            additionalUnits: [],
                                                                                                                                        }),
                                                                                                                                        additionalUnits: newUnits,
                                                                                                                                    },
                                                                                                                                }));
                                                                                                                            }}
                                                                                                                            className="w-full h-[34px] px-3 border border-gray-300 rounded-lg text-[13px] text-right outline-none focus:border-blue-500"
                                                                                                                        />
                                                                                                                    </div>

                                                                                                                    {/* Bán trực tiếp */}
                                                                                                                    <label className="flex items-center gap-2 h-[34px] cursor-pointer">

                                                                                                                        <input
                                                                                                                            type="checkbox"
                                                                                                                            checked={unit.directSale}
                                                                                                                            onChange={(e) => {
                                                                                                                                const newUnits = [
                                                                                                                                    ...(productUnits[product.id]?.additionalUnits || [])
                                                                                                                                ];

                                                                                                                                newUnits[index] = {
                                                                                                                                    ...newUnits[index],
                                                                                                                                    directSale: e.target.checked,
                                                                                                                                };

                                                                                                                                setProductUnits((prev) => ({
                                                                                                                                    ...prev,
                                                                                                                                    [product.id]: {
                                                                                                                                        ...(prev[product.id] || {
                                                                                                                                            baseUnit: "",
                                                                                                                                            basePrice: "",
                                                                                                                                            additionalUnits: [],
                                                                                                                                        }),
                                                                                                                                        additionalUnits: newUnits,
                                                                                                                                    },
                                                                                                                                }));
                                                                                                                            }}
                                                                                                                            className="w-[15px] h-[15px] accent-blue-600"
                                                                                                                        />

                                                                                                                        <span className="text-[13px]">
                                                                                                                            Bán trực tiếp
                                                                                                                        </span>

                                                                                                                    </label>

                                                                                                                    {/* Xóa */}
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        onClick={() => {
                                                                                                                            setProductUnits((prev) => ({
                                                                                                                                ...prev,
                                                                                                                                [product.id]: {
                                                                                                                                    ...(prev[product.id] || {
                                                                                                                                        baseUnit: "",
                                                                                                                                        basePrice: "",
                                                                                                                                        additionalUnits: [],
                                                                                                                                    }),
                                                                                                                                    additionalUnits:
                                                                                                                                        prev[product.id]?.additionalUnits.filter(
                                                                                                                                            (item) => item.id !== unit.id
                                                                                                                                        ) || [],
                                                                                                                                },
                                                                                                                            }));
                                                                                                                        }}
                                                                                                                        className="w-[34px] h-[34px] flex items-center justify-center text-gray-500 hover:text-red-500"
                                                                                                                    >
                                                                                                                        <Trash2 />
                                                                                                                    </button>

                                                                                                                </div>
                                                                                                            ))}

                                                                                                            {/* Thêm đơn vị */}
                                                                                                            <button
                                                                                                                type="button"
                                                                                                                onClick={() => {
                                                                                                                    const currentProduct = productUnits[product.id];
                                                                                                                    // Chưa nhập đơn vị cơ bản
                                                                                                                    if (!currentProduct?.baseUnit?.trim()) {
                                                                                                                        alert("Bạn chưa nhập đơn vị cơ bản");
                                                                                                                        return;
                                                                                                                    }
                                                                                                                    setProductUnits((prev) => ({
                                                                                                                        ...prev,
                                                                                                                        [product.id]: {
                                                                                                                            ...(prev[product.id] || {
                                                                                                                                baseUnit: "",
                                                                                                                                basePrice: "",
                                                                                                                                additionalUnits: [],
                                                                                                                            }),
                                                                                                                            additionalUnits: [
                                                                                                                                ...(prev[product.id]?.additionalUnits || []),
                                                                                                                                {
                                                                                                                                    id: Date.now(),
                                                                                                                                    name: "",
                                                                                                                                    conversion: "1",
                                                                                                                                    price: prev[product.id]?.basePrice || "",
                                                                                                                                    directSale: true,
                                                                                                                                },
                                                                                                                            ],
                                                                                                                        },
                                                                                                                    }));
                                                                                                                }}
                                                                                                                className="flex items-center gap-1 mt-4 text-blue-600 text-[13px] hover:text-blue-700">
                                                                                                                <span className="text-[20px] leading-none">
                                                                                                                    +
                                                                                                                </span>
                                                                                                                <span className="text-[16px] font-semibold">
                                                                                                                    Thêm đơn vị
                                                                                                                </span>
                                                                                                            </button>
                                                                                                        </div>

                                                                                                        {/* Đường kẻ */}
                                                                                                        <div className="border-t border-gray-200 mt-8 pt-7">
                                                                                                            <h4 className="text-[15px] font-semibold text-gray-800">
                                                                                                                Thuộc tính
                                                                                                            </h4>
                                                                                                            <p className="text-[13px] text-gray-500 mt-1">
                                                                                                                Thêm đặc điểm như hương vị, dung tích, màu sắc
                                                                                                            </p>
                                                                                                            <div className="mt-5">
                                                                                                                <div className="flex items-center gap-2">
                                                                                                                    {/* Chọn thuộc tính */}
                                                                                                                    <div className="relative w-[210px]">
                                                                                                                        <button
                                                                                                                            type="button"
                                                                                                                            onClick={() => setShowAttribute(!showAttribute)}
                                                                                                                            className="w-full h-[34px] px-3 border border-blue-500 rounded-lg text-[13px] outline-none bg-white flex items-center justify-between" >
                                                                                                                            <span className={attribute ? "text-gray-800" : "text-gray-400"}>
                                                                                                                                {productAttributes[product.id] || "Chọn thuộc tính"}
                                                                                                                            </span>
                                                                                                                            <span className="text-gray-500">
                                                                                                                                {showAttribute ? (
                                                                                                                                    <ChevronUp className="w-4 h-4" />
                                                                                                                                ) : (
                                                                                                                                    <ChevronDown className="w-4 h-4" />
                                                                                                                                )}
                                                                                                                            </span>
                                                                                                                        </button>
                                                                                                                        {/* Danh sách thuộc tính */}
                                                                                                                        {showAttribute && (
                                                                                                                            <div className="absolute z-[100] top-[38px] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                                                                                                                                {/* Các thuộc tính đã tạo */}
                                                                                                                                {attributes.map((item) => (
                                                                                                                                    <button
                                                                                                                                        key={item}
                                                                                                                                        type="button"
                                                                                                                                        onClick={() => { setProductAttributes((prev) => ({ ...prev, [product.id]: item })); setShowAttribute(false); }}
                                                                                                                                        className="w-full h-[38px] px-3 text-left text-[13px] hover:bg-blue-50 flex items-center justify-between" >
                                                                                                                                        <span>{item}</span>
                                                                                                                                        {attribute === item && (
                                                                                                                                            <Check className="w-4 h-4 text-blue-600" />
                                                                                                                                        )}
                                                                                                                                    </button>
                                                                                                                                ))}

                                                                                                                                {/* Chưa có thuộc tính */}
                                                                                                                                {attributes.length === 0 && (
                                                                                                                                    <div className="px-3 py-3 text-[13px] text-gray-400">
                                                                                                                                        Chưa có thuộc tính
                                                                                                                                    </div>
                                                                                                                                )}
                                                                                                                                {/* Tạo thuộc tính mới */}
                                                                                                                                <button
                                                                                                                                    type="button"
                                                                                                                                    onClick={() => {
                                                                                                                                        setShowAttribute(false);
                                                                                                                                        setShowModal(true);
                                                                                                                                    }}
                                                                                                                                    className="w-full h-[40px] px-3 text-left text-[13px] text-blue-600 border-t border-gray-200 hover:bg-blue-50">
                                                                                                                                    + Tạo thuộc tính mới
                                                                                                                                </button>
                                                                                                                            </div>
                                                                                                                        )}
                                                                                                                    </div>
                                                                                                                    {/* Giá trị thuộc tính */}
                                                                                                                    <input type="text" placeholder="Nhập giá trị"
                                                                                                                        value={productAttributeValues[product.id] || ""} onChange={(e) => { setProductAttributeValues((prev) => ({ ...prev, [product.id]: e.target.value, })); }}
                                                                                                                        className="flex-1 h-[34px] px-3 border border-gray-300 rounded-lg text-[13px] outline-none focus:border-blue-500" />
                                                                                                                    {/* Xóa */}
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="w-[34px] h-[34px] flex items-center justify-center border border-gray-300 rounded-lg text-gray-500 hover:text-red-500 hover:border-red-300">
                                                                                                                        <Trash2 className="w-4 h-4" />
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            {/* Thêm thuộc tính */}
                                                                                                            <button type="button" className="flex items-center gap-1 mt-4 text-blue-600 text-[13px] hover:text-blue-700" >
                                                                                                                <span className="text-[20px] leading-none">+</span>
                                                                                                                <span className="text-[16px] font-semibold">Thêm thuộc tính</span>
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    {/* Hàng cùng loại */}
                                                                                                    {productUnits[product.id]?.baseUnit?.trim() &&
                                                                                                        productAttributes[product.id] &&
                                                                                                        productAttributeValues[product.id]?.trim() && (
                                                                                                            <div className="border-t border-gray-200 mt-8 pt-7">
                                                                                                                <div className="flex items-center justify-between mb-4">
                                                                                                                    <h4 className="text-[15px] font-semibold text-gray-800">
                                                                                                                        Hàng cùng loại
                                                                                                                    </h4>
                                                                                                                    <button type="button" className="text-blue-600 text-[13px] flex items-center gap-1">
                                                                                                                        <Tag className="w-4 h-4" />
                                                                                                                        Thiết lập giá
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                                <div className="overflow-x-auto">
                                                                                                                    <table className="w-full min-w-[1100px] border-collapse">
                                                                                                                        <thead>
                                                                                                                            <tr className="bg-gray-100 h-[42px]">
                                                                                                                                <th className="px-3 text-left text-[13px] font-semibold">
                                                                                                                                    Giá trị thuộc tính
                                                                                                                                </th>
                                                                                                                                <th className="px-3 text-left text-[13px] font-semibold">
                                                                                                                                    Đơn vị
                                                                                                                                </th>
                                                                                                                                <th className="px-3 text-left text-[13px] font-semibold">
                                                                                                                                    Quy đổi
                                                                                                                                </th>
                                                                                                                                <th className="px-3 text-left text-[13px] font-semibold">
                                                                                                                                    Mã hàng
                                                                                                                                </th>
                                                                                                                                <th className="px-3 text-left text-[13px] font-semibold">
                                                                                                                                    Mã vạch
                                                                                                                                </th>
                                                                                                                                <th className="px-3 text-left text-[13px] font-semibold">
                                                                                                                                    Giá vốn
                                                                                                                                </th>
                                                                                                                                <th className="px-3 text-left text-[13px] font-semibold">
                                                                                                                                    Giá bán
                                                                                                                                </th>
                                                                                                                                <th></th>
                                                                                                                            </tr>
                                                                                                                        </thead>
                                                                                                                        <tbody>

                                                                                                                            {/* Đơn vị cơ bản */}
                                                                                                                            <tr className="border-b border-gray-200">
                                                                                                                                <td className="px-3 py-2 text-[13px]">
                                                                                                                                    {productAttributeValues[product.id]}
                                                                                                                                </td>
                                                                                                                                <td className="px-3 py-2 text-[13px]">
                                                                                                                                    {productUnits[product.id]?.baseUnit}
                                                                                                                                </td>
                                                                                                                                <td className="px-3 py-2">
                                                                                                                                    <div className="w-[140px] h-[36px] bg-gray-100 rounded-lg flex items-center justify-end px-3 text-[13px]">
                                                                                                                                        1
                                                                                                                                    </div>
                                                                                                                                </td>
                                                                                                                                {/* Mã hàng */}
                                                                                                                                <td className="px-3 py-2">
                                                                                                                                    <input type="text" className="w-[175px] h-[36px] px-3 border border-gray-300 rounded-lg text-[13px]" />
                                                                                                                                </td>
                                                                                                                                {/* Mã vạch */}
                                                                                                                                <td className="px-3 py-2">
                                                                                                                                    <input type="text" className="w-[175px] h-[36px] px-3 border border-gray-300 rounded-lg text-[13px]" />
                                                                                                                                </td>

                                                                                                                                {/* Giá vốn */}
                                                                                                                                <td className="px-3 py-2">
                                                                                                                                    <input type="text" className="w-[130px] h-[36px] px-3 border border-gray-300 rounded-lg text-[13px] text-right" />
                                                                                                                                </td>

                                                                                                                                {/* Giá bán */}
                                                                                                                                <td className="px-3 py-2">
                                                                                                                                    <input
                                                                                                                                        type="text"
                                                                                                                                        value={productUnits[product.id]?.basePrice || ""}
                                                                                                                                        onChange={(e) => {
                                                                                                                                            setProductUnits((prev) => ({
                                                                                                                                                ...prev,
                                                                                                                                                [product.id]: {
                                                                                                                                                    ...(prev[product.id] || {
                                                                                                                                                        baseUnit: "",
                                                                                                                                                        basePrice: "",
                                                                                                                                                        additionalUnits: [],
                                                                                                                                                    }),
                                                                                                                                                    basePrice: e.target.value,
                                                                                                                                                },
                                                                                                                                            }));
                                                                                                                                        }}
                                                                                                                                        className="w-[140px] h-[36px] px-3 border border-gray-300 rounded-lg text-[13px] text-right"
                                                                                                                                    />
                                                                                                                                </td>
                                                                                                                                <td></td>
                                                                                                                            </tr>
                                                                                                                            {/* Các đơn vị thêm */}
                                                                                                                            {productUnits[product.id]?.additionalUnits?.map(
                                                                                                                                (unit) => (
                                                                                                                                    <tr key={unit.id} className="border-b border-gray-200"  >
                                                                                                                                        {/* Giá trị thuộc tính */}
                                                                                                                                        <td className="px-3 py-2 text-[13px]">
                                                                                                                                            {productAttributeValues[product.id]}
                                                                                                                                        </td>
                                                                                                                                        {/* Đơn vị */}
                                                                                                                                        <td className="px-3 py-2 text-[13px]">
                                                                                                                                            {unit.name}
                                                                                                                                        </td>
                                                                                                                                        {/* Quy đổi */}
                                                                                                                                        <td className="px-3 py-2">
                                                                                                                                            <div className="w-[140px] h-[36px] bg-gray-100 rounded-lg flex items-center justify-end px-3 text-[13px]">
                                                                                                                                                {unit.conversion}
                                                                                                                                            </div>
                                                                                                                                        </td>
                                                                                                                                        {/* Mã hàng */}
                                                                                                                                        <td className="px-3 py-2">
                                                                                                                                            <input type="text" className="w-[175px] h-[36px] px-3 border border-gray-300 rounded-lg text-[13px]" />
                                                                                                                                        </td>

                                                                                                                                        {/* Mã vạch */}
                                                                                                                                        <td className="px-3 py-2">
                                                                                                                                            <input type="text" className="w-[175px] h-[36px] px-3 border border-gray-300 rounded-lg text-[13px]" />
                                                                                                                                        </td>

                                                                                                                                        {/* Giá vốn */}
                                                                                                                                        <td className="px-3 py-2">
                                                                                                                                            <input type="text" className="w-[130px] h-[36px] px-3 border border-gray-300 rounded-lg text-[13px] text-right" />
                                                                                                                                        </td>
                                                                                                                                        {/* Giá bán */}
                                                                                                                                        <td className="px-3 py-2">
                                                                                                                                            <input
                                                                                                                                                type="text"
                                                                                                                                                value={unit.price}
                                                                                                                                                onChange={(e) => {

                                                                                                                                                    const newUnits = [
                                                                                                                                                        ...(productUnits[product.id]
                                                                                                                                                            ?.additionalUnits || [])
                                                                                                                                                    ];

                                                                                                                                                    const index =
                                                                                                                                                        newUnits.findIndex(
                                                                                                                                                            (item) =>
                                                                                                                                                                item.id === unit.id
                                                                                                                                                        );

                                                                                                                                                    if (index === -1) return;

                                                                                                                                                    newUnits[index] = {
                                                                                                                                                        ...newUnits[index],
                                                                                                                                                        price: e.target.value,
                                                                                                                                                    };

                                                                                                                                                    setProductUnits((prev) => ({
                                                                                                                                                        ...prev,
                                                                                                                                                        [product.id]: {
                                                                                                                                                            ...(prev[product.id] || {
                                                                                                                                                                baseUnit: "",
                                                                                                                                                                basePrice: "",
                                                                                                                                                                additionalUnits: [],
                                                                                                                                                            }),
                                                                                                                                                            additionalUnits:
                                                                                                                                                                newUnits,
                                                                                                                                                        },
                                                                                                                                                    }));
                                                                                                                                                }}
                                                                                                                                                className="w-[140px] h-[36px] px-3 border border-gray-300 rounded-lg text-[13px] text-right"
                                                                                                                                            />
                                                                                                                                        </td>

                                                                                                                                        {/* Xóa */}
                                                                                                                                        <td className="px-2">
                                                                                                                                            <button
                                                                                                                                                type="button"
                                                                                                                                                onClick={() => {

                                                                                                                                                    setProductUnits((prev) => ({
                                                                                                                                                        ...prev,
                                                                                                                                                        [product.id]: {
                                                                                                                                                            ...(prev[product.id] || {
                                                                                                                                                                baseUnit: "",
                                                                                                                                                                basePrice: "",
                                                                                                                                                                additionalUnits: [],
                                                                                                                                                            }),

                                                                                                                                                            additionalUnits:
                                                                                                                                                                prev[
                                                                                                                                                                    product.id
                                                                                                                                                                ]?.additionalUnits.filter(
                                                                                                                                                                    (item) =>
                                                                                                                                                                        item.id !==
                                                                                                                                                                        unit.id
                                                                                                                                                                ) || [],
                                                                                                                                                        },
                                                                                                                                                    }));
                                                                                                                                                }}
                                                                                                                                                className="w-[34px] h-[34px] flex items-center justify-center text-gray-500 hover:text-red-500" >
                                                                                                                                                <Trash2 className="w-4 h-4" />
                                                                                                                                            </button>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                ))}
                                                                                                                        </tbody>
                                                                                                                    </table>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        )}
                                                                                                </div>
                                                                                            )}
                                                                                            {showModal && (
                                                                                                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                                                                                                    {/* nền tối */}
                                                                                                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />

                                                                                                    {/* modal */}
                                                                                                    <div className="relative w-[500px] bg-white rounded-lg shadow-xl">

                                                                                                        {/* Header */}
                                                                                                        <div className="flex items-center justify-between px-5 py-4 border-b">
                                                                                                            <h3 className="text-[16px] font-semibold">
                                                                                                                Tạo thuộc tính
                                                                                                            </h3>

                                                                                                            <button
                                                                                                                type="button"
                                                                                                                onClick={() => setShowModal(false)}
                                                                                                                className="text-gray-500 hover:text-gray-800 text-xl"
                                                                                                            >
                                                                                                                ×
                                                                                                            </button>
                                                                                                        </div>


                                                                                                        {/* Nội dung */}
                                                                                                        <div className="p-5">

                                                                                                            <label className="block text-[13px] mb-1">
                                                                                                                Tên thuộc tính
                                                                                                            </label>

                                                                                                            <input
                                                                                                                type="text"
                                                                                                                id="newAttribute"
                                                                                                                placeholder="Nhập tên thuộc tính"
                                                                                                                className="w-full h-[36px] px-3 border border-gray-300 rounded-lg text-[13px] outline-none focus:border-blue-500"
                                                                                                            />

                                                                                                        </div>


                                                                                                        {/* Footer */}
                                                                                                        <div className="flex justify-end gap-2 px-5 py-4 border-t">

                                                                                                            <button
                                                                                                                type="button"
                                                                                                                onClick={() => setShowModal(false)}
                                                                                                                className="h-[36px] px-4 border border-gray-300 rounded-lg text-[13px]"
                                                                                                            >
                                                                                                                Bỏ qua
                                                                                                            </button>
                                                                                                            <button type="button"
                                                                                                                onClick={() => {
                                                                                                                    const input = document.getElementById(
                                                                                                                        "newAttribute"
                                                                                                                    ) as HTMLInputElement;
                                                                                                                    const name = input.value.trim();
                                                                                                                    if (!name) {
                                                                                                                        alert("Vui lòng nhập tên thuộc tính");
                                                                                                                        return;
                                                                                                                    }
                                                                                                                    setAttributes([
                                                                                                                        ...attributes,
                                                                                                                        name
                                                                                                                    ]);
                                                                                                                    setAttribute(name);
                                                                                                                    setShowModal(false);
                                                                                                                }}
                                                                                                                className="h-[36px] px-5 bg-blue-600 text-white rounded-lg text-[13px]">
                                                                                                                Xong
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}


                                                                                            {activeEditTab === "description" && (
                                                                                                <div className="p-6">
                                                                                                    <div className="border border-gray-200 rounded-lg p-4">
                                                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                                            Mô tả
                                                                                                        </label>

                                                                                                        <textarea
                                                                                                            rows={8}
                                                                                                            placeholder="Nhập mô tả hàng hóa..."
                                                                                                            className="w-full border border-gray-300 rounded-lg p-3 resize-none outline-none focus:border-blue-500"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}

                                                                                        </div>

                                                                                        {/* Footer */}
                                                                                        <div className="h-[64px] border-t border-gray-200 flex items-center justify-end gap-3 px-6 flex-shrink-0">

                                                                                            <button type="button" onClick={() => setShowEditModal(false)}
                                                                                                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                                                                                Bỏ qua
                                                                                            </button>

                                                                                            <button type="button"
                                                                                                onClick={() => {
                                                                                                    // TODO: lưu sản phẩm
                                                                                                    setShowEditModal(false);
                                                                                                }}
                                                                                                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                                                                                Lưu
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {activeTab === "stockCard" && (
                                                                    <div className="p-5 w-full overflow-hidden">
                                                                        <div className="w-full overflow-x-auto">
                                                                            <table className="w-full border-collapse text-[14px]">
                                                                                <thead>
                                                                                    <tr className="h-[40px] bg-gray-100 text-gray-800">
                                                                                        <th className="px-3 text-left font-semibold whitespace-nowrap">
                                                                                            Chứng từ
                                                                                        </th>
                                                                                        <th className="px-3 text-left font-semibold whitespace-nowrap">
                                                                                            Thời gian
                                                                                        </th>
                                                                                        <th className="px-3 text-left font-semibold whitespace-nowrap">
                                                                                            Loại giao dịch
                                                                                        </th>
                                                                                        <th className="px-3 text-right font-semibold whitespace-nowrap">
                                                                                            Giá GD
                                                                                            <span className="ml-1 inline-flex items-center justify-center w-[17px] h-[17px] rounded-full border border-gray-500 text-[11px]">
                                                                                                i
                                                                                            </span>
                                                                                        </th>
                                                                                        <th className="px-3 text-right font-semibold whitespace-nowrap">
                                                                                            Giá vốn
                                                                                        </th>
                                                                                        <th className="px-3 text-right font-semibold whitespace-nowrap">
                                                                                            Số lượng
                                                                                        </th>
                                                                                        <th className="px-3 text-right font-semibold whitespace-nowrap">
                                                                                            Tồn cuối
                                                                                        </th>
                                                                                        <th className="px-3 text-left font-semibold whitespace-nowrap">
                                                                                            Đối tác
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {stockCardData.map((item) => (
                                                                                        <tr key={item.code} className="h-[45px] border-b border-gray-200">
                                                                                            <td className="px-3 text-blue-600 whitespace-nowrap">
                                                                                                {item.code}
                                                                                            </td>
                                                                                            <td className="px-3 whitespace-nowrap">
                                                                                                {item.time}
                                                                                            </td>
                                                                                            <td className="px-3 whitespace-nowrap">
                                                                                                {item.type}
                                                                                            </td>
                                                                                            <td className="px-3 text-right whitespace-nowrap">
                                                                                                {item.transactionPrice !== ""
                                                                                                    ? item.transactionPrice.toLocaleString()
                                                                                                    : ""}
                                                                                            </td>
                                                                                            <td className="px-3 text-right whitespace-nowrap">
                                                                                                {item.costPrice.toLocaleString()}
                                                                                            </td>
                                                                                            <td className="px-3 text-right whitespace-nowrap">
                                                                                                {item.quantity.toLocaleString()}
                                                                                            </td>
                                                                                            <td className="px-3 text-right whitespace-nowrap">
                                                                                                {item.endingStock.toLocaleString()}
                                                                                            </td>
                                                                                            <td className="px-3 whitespace-nowrap">
                                                                                                {item.partner}
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>

                                                                        <div className="border-t mt-0 px-3 py-5">
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleExportExcel}
                                                                                className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                                                            >
                                                                                <FileInput size={18} />
                                                                                <span>Xuất file</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {activeTab === "inventory" && (
                                                                    <div className="p-5 w-full overflow-hidden">
                                                                        <div className="w-full overflow-x-auto">
                                                                            <table className="w-full border-collapse text-[14px]">
                                                                                <thead>
                                                                                    <tr className="h-[40px] bg-gray-100 text-gray-800">
                                                                                        <th className="px-3 text-left font-semibold whitespace-nowrap">
                                                                                            Chi nhánh
                                                                                        </th>
                                                                                        <th className="px-3 text-right font-semibold whitespace-nowrap">
                                                                                            Tồn kho
                                                                                        </th>
                                                                                        <th className="px-3 text-right font-semibold whitespace-nowrap">
                                                                                            KH đặt
                                                                                        </th>
                                                                                        <th className="px-3 text-left font-semibold whitespace-nowrap">
                                                                                            Dự kiến hết hàng
                                                                                        </th>
                                                                                        <th className="px-3 text-left font-semibold whitespace-nowrap">
                                                                                            Trạng thái
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr className="h-[45px] border-b border-gray-200">
                                                                                        <td className="px-3">
                                                                                        </td>
                                                                                        <td className="px-3 text-right">
                                                                                            1,093
                                                                                        </td>
                                                                                        <td className="px-3 text-right">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3">
                                                                                        </td>
                                                                                        <td className="px-3">
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr className="h-[55px]">
                                                                                        <td className="px-3 text-gray-700">
                                                                                            Chi nhánh trung tâm
                                                                                        </td>
                                                                                        <td className="px-3 text-right">
                                                                                            1,093
                                                                                        </td>
                                                                                        <td className="px-3 text-right">
                                                                                            0
                                                                                        </td>
                                                                                        <td className="px-3">
                                                                                            1735 ngày
                                                                                        </td>
                                                                                        <td className="px-3">
                                                                                            <span className="inline-flex items-center px-2 py-1 rounded bg-green-50 text-green-700 text-[13px]">
                                                                                                Đang kinh doanh
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {showDescriptionModal && (
                                                                    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50">
                                                                        <div className="w-[900px] max-w-[95%] bg-white rounded-xl shadow-xl">
                                                                            <div className="flex items-center justify-between px-6 py-4 border-b">
                                                                                <h2 className="text-lg font-semibold">
                                                                                    Chỉnh sửa mô tả
                                                                                </h2>
                                                                                <button type="button" onClick={() => setShowDescriptionModal(false)}
                                                                                    className="text-gray-500 hover:text-gray-800" >
                                                                                    <X size={20} />
                                                                                </button>
                                                                            </div>
                                                                            <div className="p-6">
                                                                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                                                                    <div className="bg-gray-100 px-4 py-2 font-semibold">
                                                                                        Mô tả
                                                                                    </div>
                                                                                    <textarea defaultValue="bánh mỳ này rất ngon" className="w-full h-[150px] p-4 outline-none resize-none" placeholder="Nhập mô tả..." />
                                                                                </div>
                                                                                <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
                                                                                    <div className="bg-gray-100 px-4 py-2 font-semibold">
                                                                                        Mẫu ghi chú (hóa đơn, đặt hàng)
                                                                                    </div>
                                                                                    <textarea defaultValue="hello ngon lắm ghi chú đặt hàng" className="w-full h-[120px] p-4 outline-none resize-none" placeholder="Nhập ghi chú đặt hàng..." />
                                                                                </div>

                                                                            </div>
                                                                            <div className="flex items-center justify-between px-6 py-4 border-t">
                                                                                <div className="flex items-center gap-2">
                                                                                    <input type="checkbox" id="sellDirectly" className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                                                                    <label htmlFor="sellDirectly" className="text-sm text-gray-700 cursor-pointer" >
                                                                                        Bán trực tiếp
                                                                                    </label>
                                                                                    <div className="relative group">
                                                                                        <Info size={16} className="text-gray-500 cursor-help" />
                                                                                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-[220px] px-3 py-2 text-xs text-white bg-gray-800 rounded-lg shadow-lg z-50">
                                                                                            Cho phép sản phẩm được bán trực tiếp.
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex justify-end gap-2">
                                                                                    <button type="button" onClick={() => setShowDescriptionModal(false)}
                                                                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" >
                                                                                        Bỏ qua
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            // Sau này gọi API cập nhật ở đây
                                                                                            setShowDescriptionModal(false);
                                                                                        }}
                                                                                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                                                        Lưu
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
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