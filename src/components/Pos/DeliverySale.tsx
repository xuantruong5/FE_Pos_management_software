import { Pencil, Search, Plus, ChevronDown, MapPin, Package, } from "lucide-react";
const Deliverysale = () => {
    return (
        <div className="delivery-sale">
            <div className="delivery-left">
                <div className="product-area"></div>
                <div className="order-summary">
                    <div className="note">
                        <Pencil size={18} />
                        <span>Ghi chú đơn hàng</span>
                    </div>

                    <div className="summary">
                        <div className="row">
                            <span>Tổng tiền hàng</span>
                            <span>0</span>
                        </div>

                        <div className="row total">
                            <span>Khách cần trả</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="delivery-center">
                <div className="header">
                    <span>xuanmai123</span>
                    <span>04/06/2026 23:31</span>
                </div>

                <div className="customer-search">
                    <Search size={18} />
                    <input placeholder="Tìm khách hàng (F4)" />
                    <Plus size={20} />
                </div>

                <div className="phone-row">
                    <span>+84999777555</span>
                    <ChevronDown size={18} />
                </div>

                <p className="warning">
                    Vui lòng thêm địa chỉ lấy hàng mới
                </p>

                <div className="address-section">
                    <div className="address-row">
                        <MapPin size={18} color="green" />
                        <input placeholder="Tên người nhận" />
                        <input placeholder="Số điện thoại" />
                    </div>

                    <input
                        className="full-input"
                        placeholder="Địa chỉ chi tiết (Số nhà, ngõ, đường)"
                    />

                    <input className="full-input" placeholder="Khu vực" />

                    <input className="full-input" placeholder="Phường/Xã" />

                    <div className="package-row">
                        <Package size={18} />
                        <span>1 kiện</span>
                    </div>

                    <div className="size-row">
                        <input defaultValue="500" />
                        <span>gram</span>

                        <input defaultValue="10" />
                        <span>×</span>

                        <input defaultValue="10" />
                        <span>×</span>

                        <input defaultValue="10" />
                        <span>cm</span>
                    </div>

                    <input
                        className="full-input"
                        placeholder="Ghi chú cho bưu tá"
                    />
                </div>

                <div className="cod-footer">
                    <div>
                        <strong>Thu hộ tiền (COD)</strong>
                    </div>

                    <div className="cod-right">
                        <input type="checkbox" />
                        <strong>0</strong>
                    </div>
                </div>
            </div>
            <div className="delivery-right">
                <div className="tabs">
                    <button className="tab active">🚚 Cổng KiotViet</button>
                    <button className="tab">🏠 Tự giao hàng</button>
                </div>

                <div className="partner-section">
                    <label>Đối tác giao hàng</label>

                    <div className="partner-select">
                        <span>Chọn đối tác</span>
                        <ChevronDown size={18} />
                        <Plus size={18} />
                    </div>
                </div>

                <button className="payment-btn">
                    THANH TOÁN
                </button>
            </div>
        </div>
    )
}
export default Deliverysale;