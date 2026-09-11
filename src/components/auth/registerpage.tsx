"use client";
import { useEffect, useState } from "react";
import { X, ChevronDown, RefreshCw, } from "lucide-react";
const RegisterPage = () => {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("Việt Nam");
    const [captcha, setCaptcha] = useState("");
    const [agree, setAgree] = useState(false);
    // lấy tỉnh và thành phố 
    const [provinces, setProvinces] = useState<any[]>([]);
    const [area, setArea] = useState("");
    // Mã captcha demo
    const [captchaCode, setCaptchaCode] = useState("1056");
    const refreshCaptcha = () => { const newCode = Math.floor(1000 + Math.random() * 9000); setCaptchaCode(String(newCode)); };
    const handleSubmit = () => {
        if (!fullName || !phone || !area || !captcha) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (captcha !== captchaCode) {
            alert("Mã xác thực không đúng");
            return;
        }
        if (!agree) {
            alert("Vui lòng đồng ý với điều khoản sử dụng");
            return;
        }
        console.log({
            fullName,
            phone,
            country,
            area,
            captcha,
        });
    };
    useEffect(() => {
        const getProvinces = async () => {
            try {
                const response = await fetch(
                    "https://provinces.open-api.vn/api/v2/"
                );
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error("Lỗi lấy danh sách tỉnh/thành:", error);
            }
        };
        getProvinces();
    }, []);

    return (
        <main className="min-h-screen w-full bg-[#f7faff]">
            <div className="flex min-h-screen w-full">
                {/* =====================================================
                    BÊN TRÁI - BACKGROUND
                ====================================================== */}
                <section className=" relative hidden min-h-screen w-[44%]  overflow-hidden lg:block">
                    {/* ẢNH BACKGROUND */}
                    <img src="/images/backgrounds/backgrounds2.jpg" alt="Background" className=" absolute inset-0 h-full w-full object-cover object-center " />
                    {/* LỚP MÀU XANH */}
                    <div className=" absolute inset-0 bg-[#0067bd]/[0.85] " />
                    {/* Nội dung bên trái */}
                    <div className=" relative  z-10  flex  h-full min-h-screen flex-col items-center justify-center px-8 text-center text-white " >
                        <h1 className=" max-w-[600px] text-[50px]  font-bold leading-[1.35] tracking-[-0.5px] " >
                            Quản lý dễ dàng
                            <br />
                            Bán hàng đơn giản
                        </h1>
                        <div className="mt-5 flex items-center">
                            <span className="mr-2 h-[1px] w-[10px] bg-white" />
                            <p className="text-[15px] font-semibold">
                                Hỗ trợ đăng ký 0813 559 551
                            </p>
                            <span className="ml-2 h-[1px] w-[10px] bg-white" />
                        </div>
                    </div>
                </section>
                {/* =====================================================BÊN PHẢI - FORM REGISTER ====================================================== */}
                <section className="relative flex min-h-screen flex-1 justify-center bg-[#f8fbff] px-6 py-10 lg:px-12 " >
                    {/* NÚT CLOSE */}
                    {/* <button type="button" className=" absolute right-5 top-7 text-[#697586] transition hover:text-[#222] " >
                        <X size={25} strokeWidth={2.5} />
                    </button> */}

                    {/* FORM CONTAINER */}
                    <div className=" w-full max-w-[590px] pt-[42px] lg:pt-[45px]" >
                        {/* TITLE */}
                        <h2 className=" mb-[31px] text-center text-[30px] font-bold text-[#111827] " >
                            Tạo Tài Khoản
                        </h2>
                        {/* ================================================= HỌ TÊN ================================================== */}
                        <div className="mb-[11px]">
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nhập họ tên"
                                className=" h-[50px] w-full rounded-[7px] border border-[#cbd2da] bg-white px-[12px] text-[15px] text-[#333] outline-none placeholder:text-[#9aa5b1] focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff]/20 " />
                        </div>

                        {/* ================================================= SỐ ĐIỆN THOẠI ================================================== */}
                        <div className=" mb-[11px] flex h-[50px] overflow-hidden rounded-[7px] border border-[#cbd2da] bg-white " >
                            {/* Country */}
                            <button type="button" className=" flex w-[68px] shrink-0 items-center justify-center gap-2 border-r border-[#e0e4e8] " >
                                <img src="/images/logo/VietNam.jpg" alt="Vietnam" className="h-[18px] w-[26px] object-cover" />
                                <ChevronDown size={14} className="text-[#667085]" />
                            </button>

                            {/* Phone */}
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="091 234 56 78" className=" min-w-0 flex-1 bg-transparent px-[13px] text-[14px] outline-none placeholder:text-[#9aa5b1] " />
                        </div>
                        {/* ================================================= QUỐC GIA ================================================== */}
                        <div className="relative mb-[11px]">
                            <div className=" h-[50px]  w-full rounded-[7px] border border-[#cbd2da] bg-white px-[12px] pt-[5px] "  >
                                <div className="text-[13px] leading-[13px] text-[#344054] mb-1">
                                    Quốc gia đang kinh doanh
                                </div>
                                <div className="text-[15px] font-medium text-[#111827]">
                                    {country}
                                </div>
                            </div>
                            <ChevronDown size={16} className=" absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] " />
                        </div>
                        {/* ================================================= TỈNH / THÀNH PHỐ ================================================== */}
                        <div className="relative mb-[11px]">
                            <select value={area} onChange={(e) => setArea(e.target.value)}
                                className={` h-[50px] w-full appearance-none rounded-[7px] border border-[#cbd2da] bg-white px-[12px] text-[16px] outline-none focus:border-[#1677ff] ${area ? "text-[#111827]" : "text-[#9aa5b1]"} `} >
                                <option value="">
                                    Chọn khu vực
                                </option>

                                {provinces.map((province) => (
                                    <option key={province.code} value={province.code} >
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={16} className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] " />
                        </div>
                        {/* ================================================= CAPTCHA ================================================== */}
                        <div className=" mb-[10px] flex items-center gap-[12px] " >
                            <div className=" flex  min-w-[290px] items-center gap-[9px] " >
                                <span className=" text-[16px] font-semibold text-[#475467]" >
                                    Mã xác thực
                                </span>
                                {/* CAPTCHA */}
                                <div className=" flex  h-[37px]  w-[70px] items-center justify-center overflow-hidden bg-[#eeeeee] " >
                                    <span className=" select-none text-[21px] font-black tracking-[-2px] text-[#111] "
                                        style={{ fontFamily: "monospace", transform: "rotate(-2deg)", }} >
                                        {captchaCode}
                                    </span>
                                </div>
                                {/* Refresh */}
                                <button type="button" onClick={refreshCaptcha}
                                    className="  flex  h-[34px] w-[34px] items-center justify-center rounded-full bg-[#dbeafe] text-[#1478e8] transition hover:bg-[#bfdbfe] " >
                                    <RefreshCw size={19} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* CAPTCHA INPUT */}
                            <input type="text" value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Nhập mã xác thực"
                                className=" h-[44px] min-w-0 flex-1 rounded-[7px]  border  border-[#cbd2da] bg-white px-[12px] text-[14px] outline-none placeholder:text-[#9aa5b1] focus:border-[#1677ff]  " />
                        </div>

                        {/* ================================================= ĐIỀU KHOẢN ================================================== */}
                        <label className=" mb-[22px] flex cursor-pointer items-start gap-[8px] text-[14px] text-[#344054] " >
                            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
                                className=" mt-[2px] h-[18px]  w-[18px] shrink-0 cursor-pointeraccent-[#1677ff] " />
                            <span className="leading-[20px]">
                                Tôi đã đọc và đồng ý
                                <a href="#" onClick={(e) => e.preventDefault()}
                                    className=" font-medium text-[#0675ed] hover:underline " >
                                    Điều khoản sử dụng dịch vụ
                                </a>
                                <span className="mx-1">
                                    &
                                </span>
                                <a href="#" onClick={(e) => e.preventDefault()}
                                    className=" font-medium text-[#0675ed] hover:underline " >
                                    Chính sách bảo mật
                                </a>
                                <span className="ml-1">
                                    của hệ thống
                                </span>
                            </span>
                        </label>
                        {/* ================================================= CONTINUE BUTTON ================================================== */}
                        <div className="flex justify-end">
                            <button type="button" onClick={handleSubmit}
                                className=" flex h-[54px] min-w-[130px] items-center justify-center rounded-full bg-[#087df5] px-7 text-[18px] font-bold text-white shadow-sm transition hover:bg-[#006fe5] active:scale-[0.98] " >
                                Tiếp tục
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default RegisterPage;