"use client";
import { Pencil, Search, Plus, ChevronDown, MapPin, Package, Truck, Trash2, } from "lucide-react";
import { useState } from "react";
const Deliverysale = () => {
    const [openDiscount, setOpenDiscount] = useState(false);
    const [openaddCustomer, setOpenaddCustomer] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "invoice">("general");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [taxCode, setTaxCode] = useState("");


    const [codEnabled, setCodEnabled] = useState(false);

    // kiện hàng
    const [openPackageModal, setOpenPackageModal] = useState(false);
    const [packageType, setPackageType] = useState("single");
    const [packages, setPackages] = useState([
        {
            name: "",
            weight: "",
            length: "",
            width: "",
            height: "",
        },
    ]);
    const handleMultiPackage = () => {
        setPackageType("multiple");

        setPackages([
            {
                name: "",
                weight: "",
                length: "",
                width: "",
                height: "",
            },
            {
                name: "",
                weight: "",
                length: "",
                width: "",
                height: "",
            },
        ]);
    };
    const handleAddPackage = () => {
        setPackages((prev) => [
            ...prev,
            {
                name: "",
                weight: "",
                length: "",
                width: "",
                height: "",
            },
        ]);
    };



    return (
        <div className="delivery-sale">
            <div className="delivery-left">
                <div className="product-area"></div>
                <div className="order-footer">
                    <div className="note">
                        <Pencil size={18} />
                        <span>Ghi chú đơn hàng</span>
                    </div>
                    <div className="order-summary">
                        <div className="summary-row">
                            <span>Tổng tiền hàng</span>
                            <span>0</span>
                        </div>
                        <div className="summary-row discount-row"
                            onClick={() => setOpenDiscount(true)}>
                            <span>Giảm giá</span>
                            <span>0</span>

                            {openDiscount && (
                                <div className="discount-popup">
                                    <div className="discount-content">
                                        <span>Giảm giá</span>
                                        <div className="discount-input-box">
                                            <input type="text" />
                                            <button className="active-btn">VND</button>
                                            <button>%</button>
                                        </div>
                                    </div>
                                    <button
                                        className="close-popup"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenDiscount(false);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>


                        <div className="summary-row total">
                            <span>Khách cần trả</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CENTER */}
            <div className="delivery-center">
                <div className="center-header">
                    <div className="user-box">
                        <span>xuanmai123</span>
                        <ChevronDown size={18} />
                    </div>
                    <span className="time">
                        13/06/2026 21:07
                    </span>
                </div>
                <div className="search-customer">
                    <Search size={18} className="icon" />

                    <input
                        type="text"
                        placeholder="Tìm khách hàng (F4)"
                    />
                    <button
                        className="openaddCustomer add-customer-btn"
                        onClick={() => setOpenaddCustomer(true)}>
                        <Plus size={18} />
                    </button>

                </div>
                {openaddCustomer && (
                    <div
                        className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]"
                        onClick={() => setOpenaddCustomer(false)}
                    >
                        <div
                            style={{
                                width: "1250px",
                                height: "750px",
                                background: "#fff",
                                borderRadius: "16px",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center px-8 py-6 border-b">
                                <div>
                                    <span className="text-[20px] font-semibold">
                                        Thêm khách hàng
                                    </span>
                                    <span className="mx-2 text-gray-400">|</span>
                                    <span className="text-gray-500">
                                        Chi nhánh tạo: Chi nhánh trung tâm
                                    </span>
                                </div>

                                <button
                                    onClick={() => setOpenaddCustomer(false)}
                                    className="text-3xl text-gray-500 hover:text-black 
                                                            text-3xl
                                                            text-gray-500
                                                            hover:text-red-500
                                                            hover:rotate-90
                                                            transition-all
                                                            duration-300"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Tabs */}
                            <div style={{
                                display: "flex",
                                borderBottom: "1px solid #e5e5e5",
                            }}>
                                <button
                                    onClick={() => setActiveTab("general")}
                                    style={{
                                        padding: "16px 24px",
                                        border: "none",
                                        background: "transparent",
                                        color:
                                            activeTab === "general"
                                                ? "#1677ff"
                                                : "#555",
                                        borderBottom:
                                            activeTab === "general"
                                                ? "2px solid #1677ff"
                                                : "2px solid transparent",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                    }}>
                                    Thông tin chung
                                </button>

                                <button
                                    onClick={() => setActiveTab("invoice")}
                                    style={{
                                        padding: "16px 24px",
                                        border: "none",
                                        background: "transparent",
                                        color:
                                            activeTab === "invoice"
                                                ? "#1677ff"
                                                : "#555",
                                        borderBottom:
                                            activeTab === "invoice"
                                                ? "2px solid #1677ff"
                                                : "2px solid transparent",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                    }}>
                                    Thông tin xuất hóa đơn
                                </button>
                            </div>


                            {/* Content */}
                            <div style={{ padding: "30px" }}>
                                {activeTab === "general" ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "40px",
                                        }}
                                    >
                                        {/* Avatar */}
                                        <div
                                            style={{
                                                width: "180px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "120px",
                                                    height: "120px",
                                                    borderRadius: "50%",
                                                    background: "#eee",
                                                    overflow: "hidden",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {avatar ? (
                                                    <img
                                                        src={avatar}
                                                        alt="avatar"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: "50px" }}>👤</span>
                                                )}
                                            </div>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="avatar-upload"
                                                style={{ display: "none" }}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    setAvatar(URL.createObjectURL(file));
                                                }}
                                            />

                                            <button
                                                onClick={() =>
                                                    document
                                                        .getElementById("avatar-upload")
                                                        ?.click()
                                                }
                                                className="
                                                                        mt-5
                                                                        px-5
                                                                        py-2
                                                                        border
                                                                        border-blue-500
                                                                        text-blue-500
                                                                        rounded-lg
                                                                        transition-all
                                                                        duration-300
                                                                        hover:bg-blue-500
                                                                        hover:text-white
                                                                        hover:shadow-lg
                                                                        hover:-translate-y-1"
                                            >
                                                Chọn ảnh
                                            </button>
                                        </div>

                                        {/* Form */}
                                        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-6">

                                            <div>

                                                <label className="font-medium">

                                                    Mã khách hàng

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                    placeholder="Mã mặc định"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">Nhóm</label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Tên khách hàng

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                    placeholder="Bắt buộc"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Ngày sinh

                                                </label>

                                                <input

                                                    type="date"

                                                    className="w-full border-b outline-none py-2"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Điện thoại

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Email

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Địa chỉ

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                    placeholder="Số nhà, tòa nhà, ngõ, đường"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Facebook

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Khu vực

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                    placeholder="Chọn Tỉnh/TP - Quận/Huyện"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Ghi chú

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                />

                                            </div>



                                            <div>

                                                <label className="font-medium">

                                                    Phường xã

                                                </label>

                                                <input

                                                    className="w-full border-b outline-none py-2"

                                                    placeholder="Chọn Phường/Xã"

                                                />

                                            </div>

                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "24px 50px",
                                        }}
                                    >
                                        <div>
                                            <label
                                                style={{
                                                    display: "block",
                                                    marginBottom: "10px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Loại khách hàng
                                            </label>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "25px",
                                                }}
                                            >
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="customerType"
                                                        defaultChecked
                                                    />{" "}
                                                    Cá nhân
                                                </label>

                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="customerType"
                                                    />{" "}
                                                    Tổ chức/Hộ kinh doanh
                                                </label>
                                            </div>
                                        </div>

                                        <div></div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Tên người mua
                                            </label>
                                            <input
                                                className="flex-1 border-b outline-none py-2"
                                                placeholder="Nhập tên người mua"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Số CMND/CCCD
                                            </label>
                                            <input
                                                className="flex-1 border-b outline-none py-2"
                                                placeholder="Nhập CCCD/CMND"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Mã số thuế
                                            </label>

                                            <div className="flex flex-1 gap-2">
                                                <input
                                                    className="flex-1 border-b outline-none py-2"
                                                    placeholder="Nhập mã số thuế"
                                                    value={taxCode}
                                                    onChange={(e) => setTaxCode(e.target.value)}
                                                />

                                                <button
                                                    disabled={!taxCode.trim()}
                                                    className={`px-3 py-2 rounded-md text-white transition
                                                                                ${taxCode.trim()
                                                            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                                                            : "bg-gray-300 cursor-not-allowed"
                                                        }`}
                                                >
                                                    Tra cứu MST
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Số hộ chiếu
                                            </label>
                                            <input
                                                className="flex-1 border-b outline-none py-2"
                                                placeholder="Nhập số hộ chiếu"
                                            />
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <label className="w-36 font-medium text-gray-700 mt-2">
                                                Địa chỉ
                                            </label>
                                            <textarea
                                                className="flex-1 border-b outline-none"
                                                placeholder="Nhập địa chỉ"
                                                style={{
                                                    height: "70px",
                                                    resize: "none",
                                                }}
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                className="flex-1 border-b outline-none py-2"
                                                placeholder="email@example.com"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Tỉnh/Thành phố
                                            </label>
                                            <input
                                                className="flex-1 border-b outline-none py-2"
                                                placeholder="Chọn Tỉnh/Thành phố"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Số điện thoại
                                            </label>
                                            <input
                                                className="flex-1 border-b outline-none py-2"
                                                placeholder="Nhập số điện thoại"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Phường/Xã
                                            </label>
                                            <input
                                                className="flex-1 border-b outline-none py-2"
                                                placeholder="Chọn Phường/Xã"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                Tên ngân hàng
                                            </label>
                                            <select className="flex-1 border-b outline-none py-2 bg-transparent">
                                                <option>Chọn ngân hàng</option>
                                            </select>
                                        </div>

                                        <div></div>

                                        <div className="flex items-center gap-4">
                                            <label className="w-36 font-medium text-gray-700">
                                                STK ngân hàng
                                            </label>
                                            <input
                                                className="flex-1 border-b outline-none py-2"
                                                placeholder="Nhập số tài khoản"
                                            />
                                        </div>

                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="absolute bottom-8 right-10 flex gap-4">
                                <button
                                    onClick={() => setOpenaddCustomer(false)}
                                    className="px-8 py-3 border border-blue-500 text-blue-500 rounded-lg transition-all
                                                            duration-300
                                                            hover:bg-blue-50
                                                            hover:shadow-md
                                                            hover:-translate-y-0.5"
                                >
                                    Bỏ qua
                                </button>

                                <button className="px-10 py-3 bg-blue-600 text-white rounded-lg   transition-all
                                                        duration-300
                                                        hover:bg-blue-700
                                                        hover:shadow-xl
                                                        hover:scale-105
                                                        active:scale-95 ">
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="phone-section">
                    <div className="phone-input">
                        <div className="circle"></div>
                        <input defaultValue="+84978112233" />
                        <ChevronDown size={18} />
                    </div>
                    <span className="warning">
                        Vui lòng thêm địa chỉ lấy hàng mới
                    </span>
                </div>
                <div className="form-section">
                    <div className="double-input">
                        <div className="input-line">
                            <MapPin
                                size={18}
                                className="green"
                            />
                            <input placeholder="Tên người nhận" />
                        </div>
                        <div className="input-line">
                            <input placeholder="Số điện thoại" />
                        </div>
                    </div>
                    <div className="input-line">
                        <input placeholder="Địa chỉ chi tiết (Số nhà, ngõ, đường)" />
                    </div>

                    <div className="input-line">
                        <input placeholder="Khu vực" />
                    </div>

                    <div className="input-line">
                        <input placeholder="Phường/Xã" />
                    </div>

                    <div className="package-box">
                        <div className="package-left">
                            <Package size={18} />
                            <span>1 kiện</span>
                        </div>

                        <Pencil size={18} className="edit-icon" onClick={() => setOpenPackageModal(true)} />
                    </div>
                    {openPackageModal && (
                        <div
                            className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]"
                            onClick={() => setOpenPackageModal(false)}
                        >
                            <div
                                className="bg-white w-[auto] rounded-xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}>

                                <div className="flex justify-between items-center px-8 py-6 border-b">
                                    <h2 className="text-[25px] font-semibold">
                                        Thông tin kiện hàng
                                    </h2>

                                    <button className="text-3xl text-gray-500 hover:text-black text-3xl text-gray-500 hover:text-red-500 hover:rotate-90 transition-all duration-300"
                                        onClick={() => setOpenPackageModal(false)}>×
                                    </button>
                                </div>
                                <div className="px-8 py-6">
                                    <div className="flex items-center gap-8 text-[20px]">
                                        <span>Số lượng kiện:</span>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="radio"
                                                checked={packageType == "single"}
                                                onChange={() => {
                                                    setPackageType("single");
                                                    setPackages([{
                                                        name: "",
                                                        weight: "",
                                                        length: "",
                                                        width: "",
                                                        height: "",
                                                    },]);
                                                }} />
                                            Một kiện
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="radio"
                                                checked={packageType === "multiple"}
                                                onChange={handleMultiPackage} />
                                            Nhiều kiện
                                        </label>
                                    </div>
                                    {packageType == "single" && (
                                        <div className="mt-10 flex items-center gap-8 text-[17px]">
                                            <div className="flex items-center gap-4">
                                                <span className="font-medium">Trọng lượng:</span>

                                                <div className="border-b border-gray-300 w-[140px]">
                                                    <input type="text"
                                                        value={packages[0]?.weight}
                                                        onChange={(e) => {
                                                            const newPackages = [...packages];
                                                            newPackages[0].weight = e.target.value;
                                                            setPackages(newPackages);
                                                        }}
                                                        className="w-full outline-none text-center py-2"
                                                        placeholder="500" />
                                                </div>

                                                <select className="outline-none bg-transparent">
                                                    <option>gram</option>
                                                    <option>Kg</option>
                                                </select>

                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium">Kích thước:</span>
                                                {["length", "width", "height"].map((field, i) => (
                                                    <div key={field} className="flex items-center gap-2">
                                                        <div className="border-b border-gray-300 w-[120px]">
                                                            <input
                                                                type="text"
                                                                value={packages[0]?.[field]}
                                                                onChange={(e) => {
                                                                    const newPackages = [...packages];
                                                                    newPackages[0][field] =
                                                                        e.target.value;
                                                                    setPackages(newPackages);
                                                                }}
                                                                className="w-full outline-none text-center py-2"
                                                                placeholder="10"
                                                            />
                                                        </div>
                                                        {i !== 2 && (
                                                            <span className="text-gray-500">×</span>
                                                        )}
                                                    </div>
                                                ))}
                                                <select className="outline-none bg-transparent">
                                                    <option>cm</option>
                                                    <option>m</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    {packageType === "multiple" && (
                                        <div className="mt-8">
                                            <p className="text-[18px] text-gray-600 mb-5">
                                                ⓘ Các dịch vụ hỗ trợ đơn nhiều kiện:
                                                GHN - Hàng nặng, VTP - VCBO Hàng kiện
                                            </p>

                                            {/* Table Header */}
                                            <div className="bg-gray-100 rounded-t-xl px-6 py-4 grid grid-cols-[50px_1fr_1fr_1fr] items-center text-[20px] font-semibold">
                                                <div>STT</div>
                                                <div>Tên kiện *</div>

                                                <div className="flex items-center gap-2">
                                                    <span>Trọng lượng *</span>

                                                    <select className="border rounded px-2 py-1 text-[16px] font-normal">
                                                        <option value="gram">gram</option>
                                                        <option value="kg">kg</option>
                                                    </select>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span>Kích thước (Dài × Rộng × Cao) *</span>

                                                    <select className="border rounded px-2 py-1 text-[16px] font-normal">
                                                        <option value="cm">cm</option>
                                                        <option value="m">m</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Rows */}
                                            {packages.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="grid grid-cols-[50px_1fr_1fr_1fr_50px] items-center border-b px-6 py-5"
                                                >
                                                    {/* STT */}
                                                    <div>
                                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                                                            {index + 1}
                                                        </div>
                                                    </div>

                                                    {/* Name */}
                                                    <input
                                                        placeholder="Tên kiện"
                                                        value={item.name}
                                                        onChange={(e) => {
                                                            const updated = [...packages];
                                                            updated[index].name =
                                                                e.target.value;
                                                            setPackages(updated);
                                                        }}
                                                        className="outline-none border-b border-gray-300 py-2 text-[20px]"
                                                    />

                                                    {/* Weight */}
                                                    <input
                                                        placeholder="Trọng lượng"
                                                        value={item.weight}
                                                        onChange={(e) => {
                                                            const updated = [...packages];
                                                            updated[index].weight =
                                                                e.target.value;
                                                            setPackages(updated);
                                                        }}
                                                        className="outline-none border-b border-gray-300 py-2 text-[20px] mx-4"
                                                    />

                                                    {/* Size */}
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            placeholder="Dài"
                                                            className="border-b border-gray-300 outline-none w-[90px] text-center py-2"
                                                        />

                                                        ×

                                                        <input
                                                            placeholder="Rộng"
                                                            className="border-b border-gray-300 outline-none w-[90px] text-center py-2"
                                                        />

                                                        ×

                                                        <input
                                                            placeholder="Cao"
                                                            className="border-b border-gray-300 outline-none w-[90px] text-center py-2"
                                                        />
                                                    </div>
                                                    <div className="flex justify-center">
                                                        {packages.length > 2 && (
                                                            <button
                                                                onClick={() => {
                                                                    const updated = packages.filter(
                                                                        (_, i) => i !== index
                                                                    );
                                                                    setPackages(updated);
                                                                }}
                                                                className="text-gray-500 hover:text-red-500"
                                                            >
                                                                <Trash2 size={22} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Add package */}
                                            <button
                                                onClick={handleAddPackage}
                                                className="mt-6 border border-blue-600 text-blue-600 rounded-xl px-6 py-3 text-[18px] font-medium"
                                            >
                                                + Thêm kiện hàng
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="border-t px-8 py-5 flex justify-between items-center">
                                    <span className="text-[20px]">
                                        Tổng trọng lượng ({packages.length} kiện): 0 g
                                    </span>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setOpenPackageModal(false)}
                                            className="border border-gray-300 rounded-xl px-5 py-2 text-[17px] font-medium"
                                        >
                                            Bỏ qua
                                        </button>

                                        <button
                                            onClick={() => setOpenPackageModal(false)}
                                            className="bg-blue-600 text-white rounded-xl px-5 py-2 text-[17px] font-medium"
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}



                    <div className="size-box">
                        <input defaultValue="500" />
                        <span>gram</span>

                        <input defaultValue="10" />
                        <span>×</span>

                        <input defaultValue="10" />
                        <span>×</span>

                        <input defaultValue="10" />

                        <span>cm</span>
                    </div>
                    <div className="input-line">
                        <Pencil size={18} />
                        <input placeholder="Ghi chú cho bưu tá" />
                    </div>
                </div>
                <div className="cod-footer">
                    <div className="cod-left ">
                        <span className="text-[18px] font-bold">Thu hộ tiền (COD)</span>

                        <button
                            onClick={() => setCodEnabled(!codEnabled)}
                            className={`w-12 h-6 rounded-full relative transition-all ${
                                codEnabled ? "bg-blue-500" : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                                    codEnabled ? "left-6" : "left-0.5"
                                }`}
                            />
                        </button>
                    </div>
                    <span className=" text-[20px] font-bold ">
                        0
                    </span>
                </div>
            </div>

            <div className="delivery-right">
                <div className="tab-header">
                    <button className="tab-btn">
                        <Truck size={18} />
                        Cổng KiotViet
                    </button>
                    <button className="tab-btn active">
                        Tự giao hàng
                    </button>
                </div>

                <div className="partner-section">
                    <span>Đối tác giao hàng</span>
                    <div className="partner-select">
                        <span>Chọn đối tác</span>
                        <ChevronDown size={18} />
                    </div>
                    <Plus size={18} />
                </div>
                <div className="payment-footer">
                    <button className="pay-btn">
                        THANH TOÁN
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Deliverysale;