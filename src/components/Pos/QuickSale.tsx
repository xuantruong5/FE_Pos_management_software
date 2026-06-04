import React from 'react';
const Quicksale = () => {
  return (
    <div className="quicksale">
      {/* Khu vực sản phẩm */}
      <div className="quicksale-left">
        <div className="product-area">
          {/* Danh sách sản phẩm */}
        </div>

        <div className="note-box">
          <input
            type="text"
            placeholder="🖊 Ghi chú đơn hàng"
          />
        </div>
      </div>

      {/* Thanh toán */}
      <div className="quicksale-right">
        <div className="payment-header">
          <div>xuanmai123</div>
          <div>04/06/2026 18:18</div>
        </div>

        <input
          className="customer-search"
          placeholder="🔍 Tìm khách hàng (F4)"
        />

        <div className="summary">
          <div>
            <span>Tổng tiền hàng</span>
            <span>0</span>
          </div>

          <div>
            <span>Giảm giá</span>
            <span>0</span>
          </div>

          <div className="total">
            <span>Khách cần trả</span>
            <span>0</span>
          </div>
        </div>

        <div className="bank-box">
          <p>Bạn chưa có tài khoản ngân hàng</p>
          <button>+ Thêm tài khoản</button>
        </div>

        <button className="payment-btn">
          THANH TOÁN
        </button>
      </div>
    </div>
  );
};

export default Quicksale;