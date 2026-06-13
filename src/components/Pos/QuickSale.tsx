


import { useEffect, useRef, useState } from "react";
import { Search, Plus } from "lucide-react";
const Quicksale = () => {
  const [openaddCustomer, setOpenaddCustomer] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "invoice">("general");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [taxCode, setTaxCode] = useState("");
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
        <div className="customer-search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            className="customer-search"
            placeholder="Tìm khách hàng (F4)"
          />
          <button
            className="openaddCustomer add-customer-btn"
            onClick={() => setOpenaddCustomer(true)}>
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