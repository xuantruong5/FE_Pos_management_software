import { Plus, List, Funnel, Image as ImageIcon, Search, } from "lucide-react";
const Normalsale = () => {
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
                    </div>
                    <List
                        size={22}
                        style={{ cursor: "pointer" }}
                    />

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
                    style={{
                        flex: 1,
                        overflowY: "auto",
                    }}
                >
                    Danh sách sản phẩm...
                </div>

                <button
                    style={{
                        height: "60px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#1976d2",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    THANH TOÁN
                </button>
            </div>
        </div>
    );
};

export default Normalsale;