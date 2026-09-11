"use client";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CircleHelp, FileDown, FileInput, List, Plus, Printer, Search, Settings, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

const ImportPage = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // thời gian 
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState({ type: "month", value: "this_month", });
    const timeOptions = {
        day: [
            { label: "Hôm nay", value: "today" },
            { label: "Hôm qua", value: "yesterday" },
        ],

        week: [
            { label: "Tuần này", value: "this_week" },
            { label: "Tuần trước", value: "last_week" },
            { label: "7 ngày qua", value: "last_7_days" },
        ],

        month: [
            { label: "Tháng này", value: "this_month" },
            { label: "Tháng trước", value: "last_month" },
            { label: "Tháng này (âm lịch)", value: "this_lunar_month" },
            { label: "Tháng trước (âm lịch)", value: "last_lunar_month" },
            { label: "30 ngày qua", value: "last_30_days" },
        ],

        quarter: [
            { label: "Quý này", value: "this_quarter" },
            { label: "Quý trước", value: "last_quarter" },
        ],

        year: [
            { label: "Năm nay", value: "this_year" },
            { label: "Năm trước", value: "last_year" },
            { label: "Năm nay (âm lịch)", value: "this_lunar_year" },
            { label: "Năm trước (âm lịch)", value: "last_lunar_year" },
        ],
    };

    // tùy chỉnh 
    const [createdTime, setCreatedTime] = useState("all");
    const [showCreatedCustomPicker, setShowCreatedCustomPicker] = useState(false);
    const [createdFromDate, setCreatedFromDate] = useState("");
    const [createdToDate, setCreatedToDate] = useState("");

    // dữ liệu mẫu 
    const importData = [
        {
            id: 1,
            code: "PN000047",
            returnCode: "",
            time: "03/09/2026 10:08",
            createdTime: "03/09/2026 10:08",
            updatedDate: "03/09/2026 10:10",
            supplierCode: "NCC000001",
            supplier: "Công Ty TNHH Trường Sơn",
            branch: "Chi nhánh trung tâm",
            receiver: "Nguyễn Văn An",
            creator: "Nguyễn Văn An",
            totalQty: 120,
            itemCount: 8,
            totalAmount: "2,880,000",
            discount: "100,000",
            payableSupplier: "2,780,000",
            paymentDiscount: "0",
            paidSupplier: "2,780,000",
            note: "Nhập hàng định kỳ",
            status: "Đã nhập hàng",
            eInvoice: "Chưa có",
        },
        {
            id: 2,
            code: "PN000046",
            returnCode: "",
            time: "03/09/2026 10:01",
            createdTime: "03/09/2026 10:01",
            updatedDate: "03/09/2026 10:03",
            supplierCode: "NCC0001",
            supplier: "Công ty TNHH Citigo",
            branch: "Chi nhánh trung tâm",
            receiver: "Trần Văn Bình",
            creator: "Trần Văn Bình",
            totalQty: 65,
            itemCount: 5,
            totalAmount: "1,950,000",
            discount: "50,000",
            payableSupplier: "1,900,000",
            paymentDiscount: "0",
            paidSupplier: "1,900,000",
            note: "Nhập bổ sung hàng",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 3,
            code: "PN000045",
            returnCode: "",
            time: "02/09/2026 10:00",
            createdTime: "02/09/2026 10:00",
            updatedDate: "02/09/2026 10:02",
            supplierCode: "NCC0004",
            supplier: "Đại lý Hồng Phúc",
            branch: "Chi nhánh trung tâm",
            receiver: "Lê Thị Hoa",
            creator: "Lê Thị Hoa",
            totalQty: 80,
            itemCount: 6,
            totalAmount: "3,200,000",
            discount: "200,000",
            payableSupplier: "3,000,000",
            paymentDiscount: "100,000",
            paidSupplier: "2,900,000",
            note: "Hàng khuyến mãi",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 4,
            code: "PN000044",
            returnCode: "",
            time: "01/09/2026 09:58",
            createdTime: "01/09/2026 09:58",
            updatedDate: "01/09/2026 10:00",
            supplierCode: "NCC0004",
            supplier: "Đại lý Hồng Phúc",
            branch: "Chi nhánh số 2",
            receiver: "Phạm Minh Tuấn",
            creator: "Phạm Minh Tuấn",
            totalQty: 45,
            itemCount: 4,
            totalAmount: "1,800,000",
            discount: "0",
            payableSupplier: "1,800,000",
            paymentDiscount: "0",
            paidSupplier: "1,000,000",
            note: "Chưa thanh toán đủ",
            status: "Đã nhập hàng",
            eInvoice: "Chưa có",
        },
        {
            id: 5,
            code: "PN000043",
            returnCode: "",
            time: "31/08/2026 09:57",
            createdTime: "31/08/2026 09:57",
            updatedDate: "31/08/2026 10:01",
            supplierCode: "NCC0002",
            supplier: "Công ty Hoàng Gia",
            branch: "Chi nhánh trung tâm",
            receiver: "Nguyễn Văn An",
            creator: "Nguyễn Văn An",
            totalQty: 100,
            itemCount: 10,
            totalAmount: "4,500,000",
            discount: "300,000",
            payableSupplier: "4,200,000",
            paymentDiscount: "200,000",
            paidSupplier: "4,000,000",
            note: "Nhập hàng tháng 8",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 6,
            code: "PN000042",
            returnCode: "",
            time: "30/08/2026 09:57",
            createdTime: "30/08/2026 09:57",
            updatedDate: "30/08/2026 10:00",
            supplierCode: "NCC0003",
            supplier: "Công ty Pharmedic",
            branch: "Chi nhánh số 2",
            receiver: "Trần Văn Bình",
            creator: "Trần Văn Bình",
            totalQty: 75,
            itemCount: 7,
            totalAmount: "2,750,000",
            discount: "150,000",
            payableSupplier: "2,600,000",
            paymentDiscount: "0",
            paidSupplier: "2,600,000",
            note: "",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 7,
            code: "PN000041",
            returnCode: "TH000012",
            time: "29/08/2026 09:56",
            createdTime: "29/08/2026 09:56",
            updatedDate: "29/08/2026 10:05",
            supplierCode: "NCC0001",
            supplier: "Công ty TNHH Citigo",
            branch: "Chi nhánh trung tâm",
            receiver: "Lê Thị Hoa",
            creator: "Lê Thị Hoa",
            totalQty: 50,
            itemCount: 5,
            totalAmount: "2,000,000",
            discount: "100,000",
            payableSupplier: "1,900,000",
            paymentDiscount: "0",
            paidSupplier: "1,900,000",
            note: "Có hàng trả nhập",
            status: "Đã nhập hàng",
            eInvoice: "Chưa có",
        },
        {
            id: 8,
            code: "PN000040",
            returnCode: "",
            time: "28/08/2026 09:55",
            createdTime: "28/08/2026 09:55",
            updatedDate: "28/08/2026 10:00",
            supplierCode: "NCC0004",
            supplier: "Đại lý Hồng Phúc",
            branch: "Chi nhánh số 2",
            receiver: "Phạm Minh Tuấn",
            creator: "Phạm Minh Tuấn",
            totalQty: 90,
            itemCount: 8,
            totalAmount: "3,600,000",
            discount: "250,000",
            payableSupplier: "3,350,000",
            paymentDiscount: "150,000",
            paidSupplier: "3,200,000",
            note: "Nhập hàng tiêu dùng",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 9,
            code: "PN000039",
            returnCode: "",
            time: "27/08/2026 09:55",
            createdTime: "27/08/2026 09:55",
            updatedDate: "27/08/2026 10:02",
            supplierCode: "NCC0004",
            supplier: "Đại lý Hồng Phúc",
            branch: "Chi nhánh trung tâm",
            receiver: "Nguyễn Văn An",
            creator: "Nguyễn Văn An",
            totalQty: 35,
            itemCount: 3,
            totalAmount: "1,250,000",
            discount: "0",
            payableSupplier: "1,250,000",
            paymentDiscount: "0",
            paidSupplier: "1,250,000",
            note: "",
            status: "Đã nhập hàng",
            eInvoice: "Chưa có",
        },
        {
            id: 10,
            code: "PN000038",
            returnCode: "",
            time: "26/08/2026 09:54",
            createdTime: "26/08/2026 09:54",
            updatedDate: "26/08/2026 10:01",
            supplierCode: "NCC0004",
            supplier: "Đại lý Hồng Phúc",
            branch: "Chi nhánh số 2",
            receiver: "Trần Văn Bình",
            creator: "Trần Văn Bình",
            totalQty: 110,
            itemCount: 9,
            totalAmount: "4,850,000",
            discount: "350,000",
            payableSupplier: "4,500,000",
            paymentDiscount: "0",
            paidSupplier: "4,000,000",
            note: "Còn nợ nhà cung cấp",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 11,
            code: "PN000037",
            returnCode: "",
            time: "25/08/2026 09:53",
            createdTime: "25/08/2026 09:53",
            updatedDate: "25/08/2026 10:00",
            supplierCode: "NCC0004",
            supplier: "Đại lý Hồng Phúc",
            branch: "Chi nhánh trung tâm",
            receiver: "Lê Thị Hoa",
            creator: "Lê Thị Hoa",
            totalQty: 60,
            itemCount: 6,
            totalAmount: "2,400,000",
            discount: "100,000",
            payableSupplier: "2,300,000",
            paymentDiscount: "100,000",
            paidSupplier: "2,200,000",
            note: "Thanh toán qua chuyển khoản",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 12,
            code: "PN000036",
            returnCode: "",
            time: "24/08/2026 09:51",
            createdTime: "24/08/2026 09:51",
            updatedDate: "24/08/2026 09:59",
            supplierCode: "NCC0002",
            supplier: "Công ty Hoàng Gia",
            branch: "Chi nhánh trung tâm",
            receiver: "Phạm Minh Tuấn",
            creator: "Phạm Minh Tuấn",
            totalQty: 130,
            itemCount: 12,
            totalAmount: "5,600,000",
            discount: "400,000",
            payableSupplier: "5,200,000",
            paymentDiscount: "200,000",
            paidSupplier: "5,000,000",
            note: "Nhập số lượng lớn",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 13,
            code: "PN000035",
            returnCode: "",
            time: "23/08/2026 09:50",
            createdTime: "23/08/2026 09:50",
            updatedDate: "23/08/2026 09:58",
            supplierCode: "NCC0003",
            supplier: "Công ty Pharmedic",
            branch: "Chi nhánh số 2",
            receiver: "Nguyễn Văn An",
            creator: "Nguyễn Văn An",
            totalQty: 40,
            itemCount: 4,
            totalAmount: "1,600,000",
            discount: "50,000",
            payableSupplier: "1,550,000",
            paymentDiscount: "0",
            paidSupplier: "1,550,000",
            note: "",
            status: "Đã nhập hàng",
            eInvoice: "Chưa có",
        },
        {
            id: 14,
            code: "PN000034",
            returnCode: "",
            time: "22/08/2026 09:49",
            createdTime: "22/08/2026 09:49",
            updatedDate: "22/08/2026 09:55",
            supplierCode: "NCC0004",
            supplier: "Đại lý Hồng Phúc",
            branch: "Chi nhánh trung tâm",
            receiver: "Trần Văn Bình",
            creator: "Trần Văn Bình",
            totalQty: 85,
            itemCount: 7,
            totalAmount: "3,400,000",
            discount: "200,000",
            payableSupplier: "3,200,000",
            paymentDiscount: "100,000",
            paidSupplier: "3,100,000",
            note: "Đã đối chiếu hàng",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
        {
            id: 15,
            code: "PN000033",
            returnCode: "",
            time: "21/08/2026 09:48",
            createdTime: "21/08/2026 09:48",
            updatedDate: "21/08/2026 09:54",
            supplierCode: "NCC0002",
            supplier: "Công ty Hoàng Gia",
            branch: "Chi nhánh số 2",
            receiver: "Lê Thị Hoa",
            creator: "Lê Thị Hoa",
            totalQty: 55,
            itemCount: 5,
            totalAmount: "2,150,000",
            discount: "150,000",
            payableSupplier: "2,000,000",
            paymentDiscount: "0",
            paidSupplier: "2,000,000",
            note: "Nhập hàng thực phẩm",
            status: "Đã nhập hàng",
            eInvoice: "Chưa có",
        },
        {
            id: 16,
            code: "PN000032",
            returnCode: "",
            time: "20/08/2026 09:47",
            createdTime: "20/08/2026 09:47",
            updatedDate: "20/08/2026 09:52",
            supplierCode: "NCC0003",
            supplier: "Công ty Pharmedic",
            branch: "Chi nhánh trung tâm",
            receiver: "Phạm Minh Tuấn",
            creator: "Phạm Minh Tuấn",
            totalQty: 70,
            itemCount: 6,
            totalAmount: "2,900,000",
            discount: "100,000",
            payableSupplier: "2,800,000",
            paymentDiscount: "0",
            paidSupplier: "2,500,000",
            note: "Còn tiền chưa thanh toán",
            status: "Đã nhập hàng",
            eInvoice: "Đã có",
        },
    ];
    // phân trang 
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const totalPages = Math.ceil(importData.length / pageSize);
    const currentImports = importData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
    // tíng tổng 
    const totalAmount = importData.reduce(
        (total, item) =>
            total + Number(String(item.totalAmount || "0").replace(/,/g, "")),
        0
    );
    // nút checkbox
    const [selectedImports, setSelectedImports] = useState<number[]>([]);

    // danh sách cột 
    // Danh sách cột
    const columns = [
        "Mã nhập hàng",
        "Mã trả hàng nhập",
        "Thời gian",
        "Thời gian tạo",
        "Ngày cập nhật",
        "Mã NCC",
        "Nhà cung cấp",
        "Chi nhánh",
        "Người nhập",
        "Người tạo",
        "Tổng số lượng",
        "Số lượng mặt hàng",
        "Tổng tiền hàng",
        "Giảm giá",
        "Cần trả NCC",
        "Chiết khấu thanh toán",
        "Tiền đã trả NCC",
        "Ghi chú",
        "Trạng thái",
        "Số hóa đơn đầu vào",
    ];
    const [showColumns, setShowColumns] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(columns);


    return (
        <div className="min-h-screen ">
            <div className="px-30">
                {/* Header */}
                <div className="px-10 h-[60px] flex items-center justify-between">
                    {/* Bên trái */}
                    <div className="w-[240px] shrink-0">
                        <h1 className="text-[23px] font-bold text-gray-900">
                            Nhập hàng
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
                                <div className="absolute top-[46px] left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-[100]" onClick={(e) => e.stopPropagation()} >
                                    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                                        {/* Nội dung */}
                                        <div className="p-4">
                                            <input type="text" placeholder="Theo mã phiếu nhập "
                                                className="w-full h-[40px] px-3 mb-[10px] border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500" />
                                            <input type="text" placeholder="Theo mã , tên hàng"
                                                className="w-full h-[40px] px-3 mb-[10px] border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500" />
                                            <input type="text" placeholder="Theo mã , tên NCC"
                                                className="w-full h-[40px] px-3 mb-[10px] border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500" />

                                            {isExpanded && (
                                                <div>
                                                    <input type="text" placeholder="Theo ghi chú "
                                                        className="w-full h-[40px] px-3 mb-[10px] border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500" />
                                                    <input type="text" placeholder="Theo ghi chú hàng hóa "
                                                        className="w-full h-[40px] px-3 mb-[10px] border border-gray-300 rounded-lg outline-none text-[15px] focus:border-blue-500" />
                                                </div>

                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="border-t border-gray-200 p-3 flex justify-end gap-2">
                                            <button type="button" onClick={() => setIsExpanded(!isExpanded)} className="h-[40px] px-3 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg   hover:bg-gray-200" >
                                                {isExpanded ? "Thu gọn" : "Mở rộng"}
                                            </button>
                                            <button type="button" className="h-[40px] px-3 bg-blue-600 text-white  font-semibold rounded-lg  hover:bg-blue-700 mb-2 " >
                                                Tìm kiếm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Bên phải */}
                    {selectedImports.length > 0 ? (
                        <div className="ml-auto flex items-center gap-3">
                            {/* Số lượng đã chọn */}
                            <span className="text-[16px] font-semibold text-gray-700 ml-4">
                                Đã chọn {selectedImports.length}
                            </span>
                            {/* Bỏ chọn */}
                            <button type="button" onClick={() => setSelectedImports([])} className="w-[32px] h-[32px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600" >
                                <X size={18} />
                            </button>

                            {/* Xuất file */}
                            <button type="button" onClick={() => { console.log("Xuất file:", selectedImports); }}
                                className="h-[40px] px-3.5 rounded-lg border border-gray-300 bg-white flex items-center gap-1.5 text-[18px] text-black hover:bg-gray-200 font-semibold  " >
                                <FileInput size={18} />
                                Xuất file
                            </button>
                            {/* In */}
                            <button type="button" onClick={() => { console.log("In:", selectedImports); }}
                                className="h-[40px] px-3.5 rounded-lg border border-gray-300 bg-white flex items-center gap-1.5 text-[18px] text-black hover:bg-gray-200 font-semibold  " >
                                <Printer size={18} />
                                In
                            </button>

                        </div>
                    ) : (
                        <div className="ml-auto flex items-center gap-2">
                            {/* Nhập hàng */}
                            <button type="button" className="h-[40px] px-3 rounded-lg border border-blue-600 text-blue-600 bg-white flex items-center gap-1.5 text-[17px] font-bold hover:bg-blue-50" >
                                <Plus size={18} />
                                <span>Nhập hàng</span>
                            </button>

                            {/* Xuất file */}
                            <button type="button" className="h-[40px] px-3 rounded-lg border border-gray-300 bg-white text-gray-700 flex items-center gap-1.5 text-[17px] font-bold hover:bg-gray-50" >
                                <FileInput size={18} />
                                <span>Xuất file</span>
                                <ChevronDown size={16} />
                            </button>

                            {/* Danh sách cột */}
                            <div className="relative">
                                <button type="button" onClick={() => setShowColumns(!showColumns)}
                                    className={`w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50 ${showColumns ? "bg-gray-100" : ""}`} >
                                    <List size={20} />
                                </button>
                                {showColumns && (
                                    <>
                                        {/* Overlay */}
                                        <div className="fixed inset-0 z-[9998]" onClick={() => setShowColumns(false)} />
                                        {/* Popup */}
                                        <div
                                            className="absolute top-[46px] right-0 w-[400px] bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] p-3" onClick={(e) => e.stopPropagation()} >
                                            <div className="grid grid-cols-2 gap-x-6">
                                                {columns.map((column) => (
                                                    <label key={column} className="flex items-center gap-2 h-[36px] cursor-pointer text-[15px] text-gray-700 whitespace-nowrap" >
                                                        <input type="checkbox" checked={selectedColumns.includes(column)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSelectedColumns((prev) => [
                                                                        ...prev,
                                                                        column,
                                                                    ]);
                                                                } else {
                                                                    setSelectedColumns((prev) =>
                                                                        prev.filter(
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
                                    </>
                                )}
                            </div>

                            {/* Cài đặt */}
                            <button type="button" className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                                <Settings size={19} />
                            </button>

                            {/* Trợ giúp */}
                            <button type="button" className="w-[40px] h-[40px] rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-50" >
                                <CircleHelp size={19} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Phần nội dung phía dưới */}
                <div className="px-9 flex gap-4">
                    {/* SIDEBAR BỘ LỌC */}
                    <div className="w-[285px] shrink-0 bg-white rounded-lg border border-gray-100 shadow-sm p-3">
                        {/* Trạng thái */}
                        <div className="mb-5">
                            <h3 className="text-[18px] font-semibold text-gray-900 mb-5">
                                Trạng thái
                            </h3>
                            {/* Phiếu tạm */}
                            <label className="flex items-center gap-2 mb-3 cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                <span className="text-[17px] text-gray-700">
                                    Phiếu tạm
                                </span>
                            </label>

                            {/* Đã nhập hàng */}
                            <label className="flex items-center gap-2 mb-3 cursor-pointer mb-4">
                                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                <span className="text-[17px] text-gray-700">
                                    Đã nhập hàng
                                </span>
                            </label>

                            {/* Đã hủy */}
                            <label className="flex items-center gap-2 cursor-pointer ">
                                <input type="checkbox" className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                <span className="text-[17px] text-gray-700">
                                    Đã hủy
                                </span>
                            </label>
                        </div>
                        {/* Thời gian */}
                        <div className="mb-5  ">
                            <h3 className="text-[18px] font-semibold text-gray-900 mb-5 mt-6">
                                Thời gian
                            </h3>
                            {/* Tháng này */}
                            <div className="relative">
                                {/* Ô thời gian */}
                                <label className="flex items-center gap-2 mb-5 cursor-pointer" onClick={() => setShowTimePicker(true)} >
                                    <input type="radio" name="time" checked={createdTime !== "custom"} readOnly className="w-4 h-4 accent-blue-600 cursor-pointer" />

                                    <div className="flex-1 h-[40px] border border-blue-500 rounded-lg flex items-center justify-between px-3 bg-white">
                                        <span className="text-[16px] text-gray-700">
                                            {
                                                timeOptions[selectedTime.type].find(item => item.value === selectedTime.value)?.label
                                            }
                                        </span>

                                        <ChevronRight size={17} className="text-gray-500" />
                                    </div>
                                </label>
                                {/* POPUP */}
                                {showTimePicker && (
                                    <>
                                        {/* Click bên ngoài để đóng */}
                                        <div className="fixed inset-0 z-[9998]" onClick={() => setShowTimePicker(false)} />

                                        <div className="absolute left-[calc(100%+10px)] top-[-110px] z-[9999] w-[735px] bg-white rounded-xl shadow-xl border border-gray-200 p-5" onClick={(e) => e.stopPropagation()}>
                                            <div className="grid grid-cols-5 gap-7">
                                                {/* THEO NGÀY */}
                                                <div>
                                                    <h3 className="font-semibold text-[15px] text-gray-800 mb-3">
                                                        Theo ngày
                                                    </h3>
                                                    <div className="flex flex-col items-start gap-2">
                                                        {timeOptions.day.map((item) => (
                                                            <button
                                                                key={item.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedTime({
                                                                        type: "day",
                                                                        value: item.value,
                                                                    });
                                                                    setShowTimePicker(false);
                                                                    setCreatedTime("preset");
                                                                }}
                                                                className={` px-3 py-[6px] rounded-full border text-[16px] transition
                                                                 ${selectedTime.type === "day" && selectedTime.value === item.value ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"} `} >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* THEO TUẦN */}
                                                <div>
                                                    <h3 className="font-semibold text-[15px] text-gray-800 mb-3">
                                                        Theo tuần
                                                    </h3>

                                                    <div className="flex flex-col items-start gap-2">
                                                        {timeOptions.week.map((item) => (
                                                            <button key={item.value} type="button"
                                                                onClick={() => {
                                                                    setSelectedTime({
                                                                        type: "week",
                                                                        value: item.value,
                                                                    });
                                                                    setShowTimePicker(false);
                                                                    setCreatedTime("preset");
                                                                }}
                                                                className={`px-3 py-[6px] rounded-full border text-[16px] transition
                                                                ${selectedTime.type === "week" && selectedTime.value === item.value ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                                                                    }`} >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* THEO THÁNG */}
                                                <div>
                                                    <h3 className="font-semibold text-[15px] text-gray-800 mb-3">
                                                        Theo tháng
                                                    </h3>

                                                    <div className="flex flex-col items-start gap-2">
                                                        {timeOptions.month.map((item) => (
                                                            <button key={item.value} type="button"
                                                                onClick={() => {
                                                                    setSelectedTime({
                                                                        type: "month",
                                                                        value: item.value,
                                                                    });
                                                                    setShowTimePicker(false);
                                                                    setCreatedTime("preset");
                                                                }}
                                                                className={` px-3 py-[6px] rounded-full border text-[16px] transition
                                                                ${selectedTime.type === "month" && selectedTime.value === item.value ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"} `} >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* THEO QUÝ */}
                                                <div>
                                                    <h3 className="font-semibold text-[15px] text-gray-800 mb-3">
                                                        Theo quý
                                                    </h3>
                                                    <div className="flex flex-col items-start gap-2">
                                                        {timeOptions.quarter.map((item) => (
                                                            <button key={item.value} type="button"
                                                                onClick={() => {
                                                                    setSelectedTime({
                                                                        type: "quarter",
                                                                        value: item.value,
                                                                    });
                                                                    setShowTimePicker(false);
                                                                    setCreatedTime("preset");
                                                                }}
                                                                className={` px-3 py-[6px] rounded-full border text-[16px] transition
                                                                ${selectedTime.type === "quarter" && selectedTime.value === item.value ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                                                                    }`} >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* THEO NĂM */}
                                                <div>
                                                    <h3 className="font-semibold text-[15px] text-gray-800 mb-3">
                                                        Theo năm
                                                    </h3>
                                                    <div className="flex flex-col items-start gap-2">
                                                        {timeOptions.year.map((item) => (
                                                            <button key={item.value} type="button"
                                                                onClick={() => {
                                                                    setSelectedTime({
                                                                        type: "year",
                                                                        value: item.value,
                                                                    });
                                                                    setShowTimePicker(false);
                                                                    setCreatedTime("preset");
                                                                }}
                                                                className={` px-3 py-[6px] rounded-full border text-[16px] transition
                                                                 ${selectedTime.type === "year" && selectedTime.value === item.value ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"} `} >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>


                            {/* Tùy chỉnh */}
                            <div className="relative">
                                <label className="flex items-center gap-2 cursor-pointer" onClick={() => { setCreatedTime("custom"); setShowCreatedCustomPicker(true); }} >
                                    {/* Radio */}
                                    <button type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCreatedTime("custom");
                                            setShowCreatedCustomPicker(true);
                                        }}
                                        className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center shrink-0 ${createdTime === "custom" ? "border-blue-600" : "border-gray-400"}`}>
                                        {createdTime === "custom" && (
                                            <span className="w-[8px] h-[8px] rounded-full bg-blue-600" />
                                        )}
                                    </button>
                                    {/* Ô Tùy chỉnh */}
                                    <div className={`flex-1 h-[40px] border rounded-lg flex items-center justify-between px-3 bg-white ${createdTime === "custom" ? "border-blue-500" : "border-gray-300"}`} >
                                        <span
                                            className={`text-[16px] ${createdFromDate && createdToDate ? "text-gray-700" : "text-gray-500"}`} >
                                            {createdFromDate && createdToDate
                                                ? `${new Date(createdFromDate).toLocaleDateString(
                                                    "vi-VN"
                                                )} - ${new Date(createdToDate).toLocaleDateString(
                                                    "vi-VN"
                                                )}`
                                                : "Tùy chỉnh"}
                                        </span>
                                        <CalendarDays size={17} className="text-gray-500" />
                                    </div>
                                </label>

                                {/* POPUP TÙY CHỈNH */}
                                {showCreatedCustomPicker && (
                                    <>
                                        {/* Overlay */}
                                        <div className="fixed inset-0 z-[9998]" onClick={() => setShowCreatedCustomPicker(false)} />

                                        {/* Popup */}
                                        <div className="absolute left-[calc(100%+10px)] top-[-5px] z-[9999] w-[400px] bg-white rounded-xl shadow-xl border border-gray-200 p-4" onClick={(e) => e.stopPropagation()} >
                                            {/* Header */}
                                            <div className="text-[15px] font-medium text-gray-700 mb-4">
                                                Chọn khoảng thời gian
                                            </div>
                                            {/* Ngày */}
                                            <div className="flex gap-3 mb-4">
                                                <div className="flex-1">
                                                    <label className="block text-[14px] text-gray-600 mb-1">
                                                        Từ ngày
                                                    </label>
                                                    <input type="date" value={createdFromDate} onChange={(e) => {
                                                        setCreatedFromDate(e.target.value);
                                                        // Nếu ngày đến nhỏ hơn ngày bắt đầu
                                                        if (
                                                            createdToDate &&
                                                            e.target.value > createdToDate
                                                        ) {
                                                            setCreatedToDate("");
                                                        }
                                                    }}
                                                        className="w-full h-[40px] border border-gray-300 rounded-lg px-2 text-[14px] outline-none focus:border-blue-500" />
                                                </div>

                                                <div className="flex-1">
                                                    <label className="block text-[14px] text-gray-600 mb-1">
                                                        Đến ngày
                                                    </label>

                                                    <input type="date" value={createdToDate} min={createdFromDate} onChange={(e) => { setCreatedToDate(e.target.value); }}
                                                        className="w-full h-[40px] border border-gray-300 rounded-lg px-2 text-[14px] outline-none focus:border-blue-500" />
                                                </div>
                                            </div>

                                            {/* Hiển thị khoảng đã chọn */}
                                            <div className="bg-gray-50 rounded-lg px-3 py-2 mb-4 text-[14px] text-gray-600">
                                                <span>Từ ngày: </span>
                                                <span className="font-semibold text-gray-800">
                                                    {createdFromDate
                                                        ? new Date(
                                                            createdFromDate
                                                        ).toLocaleDateString("vi-VN")
                                                        : "--/--/----"}
                                                </span>
                                                <span className="mx-2">-</span>
                                                <span>Đến ngày: </span>

                                                <span className="font-semibold text-gray-800">
                                                    {createdToDate
                                                        ? new Date(
                                                            createdToDate
                                                        ).toLocaleDateString("vi-VN")
                                                        : "--/--/----"}
                                                </span>
                                            </div>
                                            {/* Button */}
                                            <div className="flex justify-end gap-2">
                                                <button type="button"
                                                    onClick={() => {
                                                        setCreatedFromDate("");
                                                        setCreatedToDate("");
                                                        setCreatedTime("all");
                                                        setShowCreatedCustomPicker(false);
                                                    }}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg text-[14px] text-gray-700 hover:bg-gray-50" >
                                                    Bỏ qua
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={
                                                        !createdFromDate ||
                                                        !createdToDate
                                                    }
                                                    onClick={() => {
                                                        setCreatedTime("custom");
                                                        setShowCreatedCustomPicker(false);
                                                    }}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[14px] disabled:bg-gray-300 disabled:cursor-not-allowed" >
                                                    Áp dụng
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Người tạo */}
                        <div className="mb-5 mt-7">
                            <h3 className="text-[18px] font-semibold text-gray-900 mb-5">
                                Người tạo
                            </h3>

                            <button type="button" className="w-full h-[40px] border border-gray-300 rounded-lg px-3 flex items-center text-left text-[15px] text-gray-400 bg-white hover:border-gray-400" >
                                Chọn người tạo
                            </button>
                        </div>
                        {/* Số hóa đơn đầu vào */}
                        <div className="mb-5">
                            <h3 className="text-[18px] font-semibold text-gray-900 mb-5">
                                Số hóa đơn đầu vào
                            </h3>

                            <input type="text" placeholder="Theo số hóa đơn đầu vào" className="w-full h-[40px] border border-gray-300 rounded-lg px-3 outline-none text-[15px] text-gray-700 placeholder:text-gray-400 focus:border-blue-500" />
                        </div>

                        {/* Người nhập */}
                        <div>
                            <h3 className="text-[18px] font-semibold text-gray-900 mb-5">
                                Người nhập
                            </h3>

                            <button type="button" className="w-full h-[40px] border border-gray-300 rounded-lg px-3 flex items-center text-left text-[15px] text-gray-400 bg-white hover:border-gray-400 mb-5" >
                                Chọn người nhập
                            </button>
                        </div>
                    </div>
                    {/* KHU VỰC BẢNG BÊN PHẢI */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* BẢNG */}
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1000px] border-collapse">
                                    {/* HEADER */}
                                    <thead>
                                        <tr className="bg-[#e8f3ff] border-b border-blue-200 h-[40px]">
                                            {/* Checkbox */}
                                            <th className="w-[42px] px-2">
                                                <div className="flex justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            currentImports.length > 0 &&
                                                            currentImports.every((item) =>
                                                                selectedImports.includes(item.id)
                                                            )
                                                        }
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                // Chọn tất cả dòng đang hiển thị
                                                                setSelectedImports((prev) => [
                                                                    ...new Set([
                                                                        ...prev,
                                                                        ...currentImports.map((item) => item.id),
                                                                    ]),
                                                                ]);
                                                            } else {
                                                                // Bỏ chọn tất cả dòng đang hiển thị
                                                                setSelectedImports((prev) =>
                                                                    prev.filter(
                                                                        (id) =>
                                                                            !currentImports.some(
                                                                                (item) => item.id === id
                                                                            )
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                        className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                                </div>
                                            </th>
                                            {/* Star */}
                                            <th className="w-[42px] px-1">
                                                <div className="flex justify-center">
                                                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500" >
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                    </svg>
                                                </div>
                                            </th>
                                            {/* 1. Mã nhập hàng */}
                                            {selectedColumns.includes("Mã nhập hàng") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Mã nhập hàng
                                                </th>
                                            )}

                                            {/* 2. Mã trả hàng nhập */}
                                            {selectedColumns.includes("Mã trả hàng nhập") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Mã trả hàng nhập
                                                </th>
                                            )}

                                            {/* 3. Thời gian */}
                                            {selectedColumns.includes("Thời gian") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Thời gian
                                                </th>
                                            )}

                                            {selectedColumns.includes("Thời gian tạo") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Thời gian tạo
                                                </th>
                                            )}

                                            {selectedColumns.includes("Ngày cập nhật") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Ngày cập nhật
                                                </th>
                                            )}

                                            {selectedColumns.includes("Mã NCC") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Mã NCC
                                                </th>
                                            )}

                                            {selectedColumns.includes("Nhà cung cấp") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Nhà cung cấp
                                                </th>
                                            )}

                                            {selectedColumns.includes("Chi nhánh") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Chi nhánh
                                                </th>
                                            )}

                                            {selectedColumns.includes("Người nhập") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Người nhập
                                                </th>
                                            )}

                                            {selectedColumns.includes("Người tạo") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Người tạo
                                                </th>
                                            )}

                                            {selectedColumns.includes("Tổng số lượng") && (
                                                <th className="text-right px-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Tổng số lượng
                                                </th>
                                            )}

                                            {selectedColumns.includes("Số lượng mặt hàng") && (
                                                <th className="text-right px-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Số lượng mặt hàng
                                                </th>
                                            )}

                                            {selectedColumns.includes("Tổng tiền hàng") && (
                                                <th className="text-right px-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Tổng tiền hàng
                                                </th>
                                            )}

                                            {selectedColumns.includes("Giảm giá") && (
                                                <th className="text-right px-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Giảm giá
                                                </th>
                                            )}

                                            {selectedColumns.includes("Cần trả NCC") && (
                                                <th className="text-right px-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Cần trả NCC
                                                </th>
                                            )}

                                            {selectedColumns.includes("Chiết khấu thanh toán") && (
                                                <th className="text-right px-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Chiết khấu thanh toán
                                                </th>
                                            )}

                                            {selectedColumns.includes("Tiền đã trả NCC") && (
                                                <th className="text-right px-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Tiền đã trả NCC
                                                </th>
                                            )}

                                            {selectedColumns.includes("Ghi chú") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Ghi chú
                                                </th>
                                            )}

                                            {selectedColumns.includes("Trạng thái") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Trạng thái
                                                </th>
                                            )}

                                            {selectedColumns.includes("Số hóa đơn đầu vào") && (
                                                <th className="text-left px-3 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                                    Số hóa đơn đầu vào
                                                </th>
                                            )}
                                        </tr>
                                    </thead>

                                    {/* BODY */}
                                    <tbody>
                                        {/* DÒNG TỔNG */}
                                        <tr className="h-[34px] border-b border-gray-200 bg-white">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            
                                            <td className="text-right px-4 font-semibold text-[14px] text-gray-800">
                                                {totalAmount.toLocaleString("vi-VN")}
                                            </td>
                                            <td></td>
                                            <td className="text-right px-4 font-semibold text-[14px] text-gray-800">
                                                {totalAmount.toLocaleString("vi-VN")}
                                            </td>
                                        </tr>
                                        {currentImports.map((item) => (
                                            <tr key={item.id} className="h-[45px] border-b border-gray-200 hover:bg-gray-50" >
                                                {/* Checkbox */}
                                                <td className="px-2">
                                                    <div className="flex justify-center">
                                                        <input type="checkbox" checked={selectedImports.includes(item.id)}
                                                            onChange={() => {
                                                                setSelectedImports((prev) =>
                                                                    prev.includes(item.id)
                                                                        ? prev.filter((id) => id !== item.id)
                                                                        : [...prev, item.id]
                                                                );
                                                            }}
                                                            className="w-4 h-4 accent-blue-600 cursor-pointer" />
                                                    </div>
                                                </td>
                                                {/* Star */}
                                                <td className="px-1">
                                                    <div className="flex justify-center">
                                                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 hover:text-yellow-500 cursor-pointer">
                                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                        </svg>
                                                    </div>
                                                </td>
                                                {selectedColumns.includes("Mã nhập hàng") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.code}
                                                    </td>
                                                )}

                                                {/* 2. Mã trả hàng nhập */}
                                                {selectedColumns.includes("Mã trả hàng nhập") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.returnCode || "-"}
                                                    </td>
                                                )}

                                                {/* 3. Thời gian */}
                                                {selectedColumns.includes("Thời gian") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.time}
                                                    </td>
                                                )}

                                                {/* 4. Thời gian tạo */}
                                                {selectedColumns.includes("Thời gian tạo") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.createdTime}
                                                    </td>
                                                )}

                                                {/* 5. Ngày cập nhật */}
                                                {selectedColumns.includes("Ngày cập nhật") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.updatedDate}
                                                    </td>
                                                )}

                                                {/* 6. Mã NCC */}
                                                {selectedColumns.includes("Mã NCC") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.supplierCode}
                                                    </td>
                                                )}

                                                {/* 7. Nhà cung cấp */}
                                                {selectedColumns.includes("Nhà cung cấp") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.supplier}
                                                    </td>
                                                )}

                                                {/* 8. Chi nhánh */}
                                                {selectedColumns.includes("Chi nhánh") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.branch}
                                                    </td>
                                                )}

                                                {/* 9. Người nhập */}
                                                {selectedColumns.includes("Người nhập") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.receiver}
                                                    </td>
                                                )}

                                                {/* 10. Người tạo */}
                                                {selectedColumns.includes("Người tạo") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.creator}
                                                    </td>
                                                )}

                                                {/* 11. Tổng số lượng */}
                                                {selectedColumns.includes("Tổng số lượng") && (
                                                    <td className="px-4 text-right text-[15px] text-gray-800 whitespace-nowrap">
                                                        {Number(item.totalQty || 0).toLocaleString("vi-VN")}
                                                    </td>
                                                )}

                                                {/* 12. Số lượng mặt hàng */}
                                                {selectedColumns.includes("Số lượng mặt hàng") && (
                                                    <td className="px-4 text-right text-[15px] text-gray-800 whitespace-nowrap">
                                                        {Number(item.itemCount || 0).toLocaleString("vi-VN")}
                                                    </td>
                                                )}

                                                {/* 13. Tổng tiền hàng */}
                                                {selectedColumns.includes("Tổng tiền hàng") && (
                                                    <td className="px-4 text-right text-[15px] text-gray-800 whitespace-nowrap">
                                                        {Number(
                                                            String(item.totalAmount || "0").replace(/,/g, "")
                                                        ).toLocaleString("vi-VN")}
                                                    </td>
                                                )}

                                                {/* 14. Giảm giá */}
                                                {selectedColumns.includes("Giảm giá") && (
                                                    <td className="px-4 text-right text-[15px] text-gray-800 whitespace-nowrap">
                                                        {Number(
                                                            String(item.discount || "0").replace(/,/g, "")
                                                        ).toLocaleString("vi-VN")}
                                                    </td>
                                                )}

                                                {/* 15. Cần trả NCC */}
                                                {selectedColumns.includes("Cần trả NCC") && (
                                                    <td className="px-4 text-right text-[15px] text-gray-800 whitespace-nowrap">
                                                        {Number(
                                                            String(item.payableSupplier || "0").replace(/,/g, "")
                                                        ).toLocaleString("vi-VN")}
                                                    </td>
                                                )}

                                                {/* 16. Chiết khấu thanh toán */}
                                                {selectedColumns.includes("Chiết khấu thanh toán") && (
                                                    <td className="px-4 text-right text-[15px] text-gray-800 whitespace-nowrap">
                                                        {Number(
                                                            String(item.paymentDiscount || "0").replace(/,/g, "")
                                                        ).toLocaleString("vi-VN")}
                                                    </td>
                                                )}

                                                {/* 17. Tiền đã trả NCC */}
                                                {selectedColumns.includes("Tiền đã trả NCC") && (
                                                    <td className="px-4 text-right text-[15px] text-gray-800 whitespace-nowrap">
                                                        {Number(
                                                            String(item.paidSupplier || "0").replace(/,/g, "")
                                                        ).toLocaleString("vi-VN")}
                                                    </td>
                                                )}

                                                {/* 18. Ghi chú */}
                                                {selectedColumns.includes("Ghi chú") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.note || "-"}
                                                    </td>
                                                )}

                                                {/* 19. Trạng thái */}
                                                {selectedColumns.includes("Trạng thái") && (
                                                    <td className="px-3">
                                                        <span className="inline-flex items-center px-2 py-[4px] rounded bg-green-100 text-green-600 text-[15px] whitespace-nowrap">
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                )}

                                                {/* 20. Số hóa đơn đầu vào */}
                                                {selectedColumns.includes("Số hóa đơn đầu vào") && (
                                                    <td className="px-3 text-[15px] text-gray-800 whitespace-nowrap">
                                                        {item.eInvoice || "-"}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* PAGINATION */}
                            <div className="h-[48px] flex items-center justify-between px-3 border-t border-gray-200">
                                {/* Bên trái */}
                                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                                    <span>Hiển thị</span>
                                    <select value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        className="h-[32px] border border-gray-300 rounded-lg px-2 outline-none bg-white cursor-pointer" >
                                        <option value={15}>15 dòng</option>
                                        <option value={30}>30 dòng</option>
                                        <option value={50}>50 dòng</option>
                                    </select>

                                </div>

                                {/* Bên phải */}
                                <div className="flex items-center gap-3">

                                    {/* First */}
                                    <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="text-gray-700 disabled:opacity-40" >
                                        <ChevronsLeft size={18} />
                                    </button>

                                    {/* Previous */}
                                    <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="text-gray-700 disabled:opacity-40 text-[18px]" >
                                        <ChevronLeft size={18} />
                                    </button>

                                    {/* Page */}
                                    <button type="button" className="w-[36px] h-[32px] rounded-lg border border-gray-300 bg-white text-[14px]" >
                                        {currentPage}
                                    </button>

                                    {/* Next */}
                                    <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="text-gray-700 disabled:opacity-40 text-[18px]">
                                        <ChevronRight size={18} />
                                    </button>

                                    {/* Last */}
                                    <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)} className="text-gray-700 disabled:opacity-40">
                                        <ChevronsRight size={18} />
                                    </button>
                                    <span className="text-[13px] text-gray-600 ml-1">
                                        {(currentPage - 1) * pageSize + 1}
                                        {" - "}
                                        {Math.min(
                                            currentPage * pageSize,
                                            importData.length
                                        )}
                                        {" trong "}
                                        {importData.length} giao dịch
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportPage;