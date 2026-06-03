"use client";
import { Plus, List, Funnel, Image as ImageIcon, Search, Trash2, } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Drawer, Input, Tree } from "antd";
import { SearchOutlined } from "@mui/icons-material";

const products = [
    { images: "https://cdn.hstatic.net/products/1000193091/ang-ren-thua-vinahardware-wood-screws_437d9b6e5ec448e1aafc27754bbaab35_0f28a25e03d04774af9d23c0f3a8db71.jpg", name: "Vít đầu bằng răng thưa M4", price: "12000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Sữa rửa mặt Kose Nhật 220g", price: "95000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "P/S kem đánh răng trà xanh 180g", price: "35000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Lương khô hạt dinh dưỡng 80g", price: "10000" },
    { images: "michinh.jpg", name: "Mì chính Ajinomoto Nhật 1kg", price: "185000" },
    { images: "xitvime.jpg", name: "Xịt môi trường Vime Frondog", price: "78000" },
    { images: "khaydasilicon1.jpg", name: "Khay đá silicon 14 viên", price: "45000" },
    { images: "mangboc.jpg", name: "Màng bọc thực phẩm PVC", price: "25000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Túi thơm Hygiene đen 8ml", price: "32000" },
    { images: "keosocola.jpg", name: "Kẹo socola sữa Popit", price: "18000" },
    { images: "nuocnghe.jpg", name: "Nước nghệ Hàn Quốc Curcumin", price: "65000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Kẹo thạch Zai Zai", price: "22000" },
    { images: "satuoi.jpg", name: "Sả tươi 500g", price: "15000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Sealect cá ngừ ngâm dầu", price: "42000" },
    { images: "mauacrylic.jpg", name: "Màu dạ acrylic 60 màu", price: "99000" },
    { images: "banhbao.jpg", name: "Bánh bao Thọ Phát trái đào", price: "28000" },
    { images: "khaydasilicon2.jpg", name: "Khay đá silicon 213", price: "50000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Sủi cảo tôm thịt Cholimex", price: "55000" },
    { images: "kiwi.jpg", name: "Kiwi vàng New Zealand 3.5kg", price: "320000" },
    { images: "suadac.jpg", name: "Sữa đặc Ông Thọ trắng", price: "29000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Kẹo dẻo cốt trái cây xoài", price: "27000" },
    { images: "coca.jpg", name: "Coca Cola lon 330ml", price: "12000" },
    { images: "pepsi.jpg", name: "Pepsi chai 1.5L", price: "18000" },
    { images: "banhquy.jpg", name: "Bánh quy bơ hộp thiếc", price: "89000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Cà phê hòa tan G7", price: "45000" },
    { images: "traxanh.jpg", name: "Trà xanh đóng chai 500ml", price: "10000" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Nước suối Aquafina", price: "8000" },
    { images: "mytom.jpg", name: "Mì tôm Hảo Hảo", price: "4500" },
    { images: "https://wowmart.vn/wp-content/uploads/2015/07/sua-rua-mat-lam-trang-da-kose-softymo-white-nhat-ban-190g-220g-knc.jpg", name: "Dầu ăn Simply 1L", price: "52000" },
    { images: "duong.jpg", name: "Đường trắng Biên Hòa 1kg", price: "24000" }
];

const treeData = [
    {
        title: "Tất Cả",
        key: "0",
        children: [{} as any],
    },
    {
        title: "Bánh, kẹo, snack",
        key: "1",
        children: [
            {
                title: "Bánh",
                key: "1-1",
            },
            {
                title: "Kẹo",
                key: "1-2",
                children: [
                    {
                        title: "Kẹo dẻo, kẹo marshmallow",
                        key: "1-2-1",
                    },
                    {
                        title: "Socola",
                        key: "1-2-2",
                    },
                ],
            },
            {
                title: "Mứt, thạch, rong biển",
                key: "1-3",
                children: [
                    {
                        title: "Rau câu, thạch",
                        key: "1-3-1",
                    },
                ],
            },
        ],
    },
    {
        title: "Chăm sóc cá nhân",
        key: "2",
        children: [
            {
                title: "Chăm sóc tóc",
                key: "2-1",
            },
            {
                title: "Chăm sóc da",
                key: "2-2",
            },
            {
                title: "Vệ sinh cá nhân",
                key: "2-3",
                children: [
                    {
                        title: "Kem đánh răng",
                        key: "2-3-1",
                    },
                    {
                        title: "Bàn chải đánh răng",
                        key: "2-3-2",
                    },
                ],
            },
        ],
    },
    {
        title: "Chăm sóc nhà cửa",
        key: "3",
        children: [
            {
                title: "Nước giặt",
                key: "3-1",
            },
            {
                title: "Nước rửa chén",
                key: "3-2",
            },
            {
                title: "Vệ sinh nhà cửa",
                key: "3-3",
                children: [
                    {
                        title: "Nước lau sàn",
                        key: "3-3-1",
                    },
                    {
                        title: "Nước tẩy rửa",
                        key: "3-3-2",
                    },
                ],
            },
        ],
    },
    {
        title: "Chăm sóc thú cưng",
        key: "4",
        children: [
            {
                title: "Thức ăn cho chó",
                key: "4-1",
            },
            {
                title: "Thức ăn cho mèo",
                key: "4-2",
            },
            {
                title: "Phụ kiện thú cưng",
                key: "4-3",
            },
        ],
    },
    {
        title: "Dầu ăn, nước chấm, gia vị",
        key: "5",
        children: [
            {
                title: "Dầu ăn",
                key: "5-1",
            },
            {
                title: "Nước mắm",
                key: "5-2",
            },
            {
                title: "Gia vị",
                key: "5-3",
                children: [
                    {
                        title: "Muối",
                        key: "5-3-1",
                    },
                    {
                        title: "Đường",
                        key: "5-3-2",
                    },
                ],
            },
        ],
    },
    {
        title: "Đồ uống",
        key: "6",
        children: [
            {
                title: "Nước ngọt",
                key: "6-1",
            },
            {
                title: "Nước suối",
                key: "6-2",
            },
            {
                title: "Trà, cà phê",
                key: "6-3",
                children: [
                    {
                        title: "Trà đóng chai",
                        key: "6-3-1",
                    },
                    {
                        title: "Cà phê hòa tan",
                        key: "6-3-2",
                    },
                ],
            },
        ],
    },
    {
        title: "Gạo, Bột và thực phẩm khô",
        key: "7",
        children: [
            {
                title: "Gạo",
                key: "7-1",
            },
            {
                title: "Bột",
                key: "7-2",
            },
            {
                title: "Mì, nui",
                key: "7-3",
                children: [
                    {
                        title: "Mì gói",
                        key: "7-3-1",
                    },
                    {
                        title: "Nui",
                        key: "7-3-2",
                    },
                ],
            },
        ],
    },
    {
        title: "Nhà Cửa Đời Sống",
        key: "8",
        children: [
            {
                title: "Đồ gia dụng",
                key: "8-1",
            },
            {
                title: "Dụng cụ nhà bếp",
                key: "8-2",
            },
            {
                title: "Đồ dùng sinh hoạt",
                key: "8-3",
            },
        ],
    },
    {
        title: "Rau, Củ, Trái Cây",
        key: "9",
        children: [
            {
                title: "Rau xanh",
                key: "9-1",
            },
            {
                title: "Củ",
                key: "9-2",
            },
            {
                title: "Trái cây",
                key: "9-3",
                children: [
                    {
                        title: "Trái cây nội địa",
                        key: "9-3-1",
                    },
                    {
                        title: "Trái cây nhập khẩu",
                        key: "9-3-2",
                    },
                ],
            },
        ],
    },
    {
        title: "Sữa, sản phẩm từ sữa",
        key: "10",
        children: [
            {
                title: "Sữa tươi",
                key: "10-1",
            },
            {
                title: "Sữa chua",
                key: "10-2",
            },
            {
                title: "Phô mai",
                key: "10-3",
            },
        ],
    },
    {
        title: "Thịt, Trứng, Thủy Hải Sản",
        key: "11",
        children: [
            {
                title: "Thịt heo",
                key: "11-1",
            },
            {
                title: "Thịt bò",
                key: "11-2",
            },
            {
                title: "Hải sản",
                key: "11-3",
                children: [
                    {
                        title: "Cá",
                        key: "11-3-1",
                    },
                    {
                        title: "Tôm",
                        key: "11-3-2",
                    },
                ],
            },
        ],
    },
    {
        title: "Thực phẩm đông mát",
        key: "12",
        children: [
            {
                title: "Thực phẩm đông lạnh",
                key: "12-1",
            },
            {
                title: "Kem",
                key: "12-2",
            },
            {
                title: "Xúc xích, chả",
                key: "12-3",
            },
        ],
    },
];


const Normalsale = () => {
    const [openaddCustomer, setOpenaddCustomer] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "invoice">("general");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [taxCode, setTaxCode] = useState("");
    const [openFilter, setOpenFilter] = useState(false);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

    const productAreaRef = useRef<HTMLDivElement>(null);
    const [itemsPerPage, setItemsPerPage] = useState(21);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const calculateItemsPerPage = () => {
            if (!productAreaRef.current) return;
            const width = productAreaRef.current.clientWidth;
            const height = productAreaRef.current.clientHeight;
            const CARD_WIDTH = 152;
            const CARD_HEIGHT = 162;
            const cols = Math.max(
                1,
                Math.floor(width / CARD_WIDTH)
            );
            const rows = Math.max(
                1,
                Math.floor(height / CARD_HEIGHT)
            );
            setItemsPerPage(cols * rows);
        };
        calculateItemsPerPage();
        window.addEventListener("resize", calculateItemsPerPage);
        return () => {
            window.removeEventListener(
                "resize",
                calculateItemsPerPage
            );
        };
    }, []);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const getAllExpandableKeys = (nodes: any[]): React.Key[] => { // cua loc
        let keys: React.Key[] = [];

        nodes.forEach((node) => {
            if (node.children?.length) {
                keys.push(node.key);
                keys.push(...getAllExpandableKeys(node.children));
            }
        });

        return keys;
    };

    const getAllKeys = (nodes: any[]): React.Key[] => { // cua loc
        let keys: React.Key[] = [];

        nodes.forEach((node) => {
            if (node.key) keys.push(node.key);

            if (node.children?.length) {
                keys.push(...getAllKeys(node.children));
            }
        });

        return keys;
    };

    const allKeys = getAllKeys(treeData).filter((k) => k !== "0"); // cua loc

    return (
        <div
            style={{
                display: "flex",
                gap: "12px",
                height: "83vh",
                padding: "10px",

            }}
        >
            {/* Left */}
            <div
                style={{
                    flex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {/* Card 1 */}
                <div
                    style={{
                        flex: 1,
                        // background: "#fff",
                        borderRadius: "12px",
                        padding: "16px",
                        // boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                >
                    Danh sách sản phẩm đã chọn
                </div>

                {/* Card 2 */}
                <div
                    style={{
                        height: "80px",
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                >
                    <input
                        type="text"
                        placeholder="📝 Ghi chú đơn hàng"
                        style={{
                            flex: 1,
                            height: "40px",
                            border: "1px  #d1d5db",
                            borderRadius: "8px",
                            padding: "0 12px",
                            outline: "none",
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            minWidth: "280px",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Tổng tiền hàng</span>
                        <span style={{ fontWeight: "bold" }}>0 ₫</span>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div
                style={{
                    flex: 1,
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "15px"
                }}>
                    <div style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        background: "#f3f4f6",
                        borderRadius: "10px",
                        padding: "0 10px",
                        height: "48px",
                    }}>
                        <Search size={18} color="#6b7280" />
                        <input
                            type="text"
                            placeholder="Tìm khách hàng (F4)"
                            style={{
                                flex: 1,
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                marginLeft: "8px",
                                fontSize: "14px",
                            }}
                        />
                        <button
                            onClick={() => setOpenaddCustomer(true)}
                            style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                border: "none",
                                background: "#e5e7eb",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",

                            }}
                        >
                            <Plus size={18} />
                        </button>
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
                    </div>
                    <List
                        size={22}
                        style={{ cursor: "pointer" }}
                        onClick={() => setOpenFilter(true)}
                    />
                    <Drawer
                        title={
                            <span
                                style={{
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                }}
                            >
                                Lọc theo nhóm hàng
                            </span>
                        }
                        placement="right"
                        size="large"
                        open={openFilter}
                        onClose={() => setOpenFilter(false)}
                        closable={{
                            placement: "end",
                        }}

                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-6">
                                <label className="font-medium text-lg min-w-[120px]">
                                    Nhóm hàng
                                </label>

                                <Input
                                    placeholder="Tìm nhóm hàng"
                                    prefix={<SearchOutlined className="text-gray-400" />}
                                    style={{
                                        width: "100%",
                                        height: "40px",
                                        border: "none",
                                        boxShadow: "none",
                                        borderRadius: "12px",
                                        backgroundColor: "#F3F4F6",
                                        fontSize: "18px",
                                        paddingLeft: "10px",
                                    }}
                                />
                            </div>
                            <div className="flex-1 overflow-y-auto custom-tree">
                                <Tree
                                    checkable
                                    treeData={treeData}
                                    showLine={false}
                                    checkedKeys={checkedKeys}
                                    expandedKeys={expandedKeys}
                                    onCheck={(checked, info) => {
                                        let keys = checked as React.Key[];

                                        // Click "Tất Cả"
                                        if (info.node.key === "0") {
                                            if (info.checked) {
                                                setCheckedKeys(["0", ...allKeys]);
                                            } else {
                                                setCheckedKeys([]);
                                            }
                                            return;
                                        }

                                        // Nếu tất cả nhóm khác đều được chọn
                                        const isAllSelected = allKeys.every((k) =>
                                            keys.includes(k)
                                        );

                                        if (isAllSelected) {
                                            setCheckedKeys(["0", ...allKeys]);
                                        } else {
                                            setCheckedKeys(keys.filter((k) => k !== "0"));
                                        }
                                    }}

                                    onExpand={(keys, info) => {
                                        if (info.node.key === "0") {
                                            if (info.expanded) {
                                                setExpandedKeys([
                                                    "0",
                                                    ...getAllExpandableKeys(treeData),
                                                ]);
                                            } else {
                                                setExpandedKeys([]);
                                            }
                                        } else {
                                            setExpandedKeys(keys);
                                        }
                                    }}


                                />
                            </div>
                            <div className="border-t pt-5 flex justify-between items-center">
                                <button className=" flex items-center gap-2 text-blue-600 font-medium text-lg "
                                    onClick={() => setCheckedKeys([])}>
                                    <Trash2 size={20} />
                                    Xóa chọn tất cả
                                </button>

                                <div className="flex gap-4">
                                    <button
                                        className="px-8 py-3 border border-blue-500 text-blue-600 rounded-xl text-lg"
                                        onClick={() => setOpenFilter(false)}
                                    >
                                        Bỏ qua
                                    </button>

                                    <button className="px-8 py-3 bg-blue-600 text-white rounded-xl text-lg">
                                        Xong
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Drawer>

                    <Funnel
                        size={22}
                        style={{ cursor: "pointer" }}
                    />

                    <ImageIcon
                        size={22}
                        style={{ cursor: "pointer" }}
                    />
                </div>



                <div
                    ref={productAreaRef}
                    style={{
                        flex: 1,
                        overflowY: "hidden",
                    }}
                >
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                        gap: "12px",
                    }}
                    >
                        {currentProducts.map((item, index) => (
                            <div key={index}
                                style={{

                                    padding: "10px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    height: "150px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                <img
                                    src={item.images}
                                    alt={item.name}
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "cover",
                                    }}>
                                </img>
                                <div
                                    style={{
                                        flex: 1,
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                    }}
                                >{item.name}</div>
                                <div style={{ color: "#1976d2", fontWeight: "bold" }}>
                                    {item.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "15px",
                        gap: "20px",
                    }}
                >
                    {/* Pagination */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                border: "none",
                                background: "#f1f1f1",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            ◀
                        </button>

                        <span
                            style={{
                                fontSize: "19px",
                            }}
                        >
                            {currentPage}/{totalPages}
                        </span>

                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.min(totalPages, p + 1))
                            }
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                border: "none",
                                background: "#f1f1f1",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            ▶
                        </button>
                    </div>

                    {/* Button thanh toán */}
                    <button
                        style={{
                            flex: 1,
                            maxWidth: "500px",
                            height: "55px",
                            border: "none",
                            borderRadius: "14px",
                            background: "#1976d2",
                            color: "#fff",
                            fontSize: "26px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        THANH TOÁN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Normalsale;