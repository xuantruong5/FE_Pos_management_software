"use client";
import { useState } from "react";
import { Eye, EyeOff, BarChart3, ShoppingCart, ChevronDown, } from "lucide-react";
const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberLogin, setRememberLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = (type: "manage" | "sale") => {
        console.log("Login type:", type);
        console.log({
            username,
            password,
            rememberLogin,
        });
    };
    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/backgrounds/backgrounds.webp')", }} />

            {/* ================= DARK OVERLAY ================= */}
            <div className="absolute inset-0 bg-black/65" />
            {/* ================= LOGIN CONTENT ================= */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-20">
                {/* LOGIN BOX */}
                <div className="w-full max-w-[530px] overflow-hidden rounded-[15px] bg-white shadow-2xl">
                    {/* ================= FORM ================= */}
                    <div className="px-[22px] pb-[50px] pt-[50px]">
                        {/* LOGO */}
                        <div className="mb-[30px] flex justify-center">
                            <div className="flex items-center gap-2">
                                {/* Nếu logo của bạn nằm trong public/images/logo */}
                                <img src="/images/logo/logo.png" alt="XuanTruong" className="h-[50px] w-auto object-contain"
                                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                {/* fallback nếu chưa có logo */}

                                <div className="hidden items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-blue-500" />
                                    <span className="text-[30px] font-bold text-[#073b78]">
                                        XuanTruong
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* USERNAME */}
                        <div className="mb-[17px]">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tên đăng nhập"
                                className=" h-[45px] w-full rounded-[7px] border border-[#d5d9df] bg-white px-[14px] text-[15px] text-[#333] outline-none transition placeholder:text-[#999] focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff]/20 " />
                        </div>
                        {/* PASSWORD */}
                        <div className="relative mb-[30px]">
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu"
                                className=" h-[45px] w-full rounded-[7px] border border-[#d5d9df] bg-white px-[14px] pr-[42px]text-[15px]  text-[#333] outline-none transition placeholder:text-[#999] focus:border-[#1677ff] focus:ring-1focus:ring-[#1677ff]/20" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className=" absolute right-[12px] top-1/2 -translate-y-1/2 text-[#5f6b7a] transition hover:text-[#1677ff] " >
                                {showPassword ? (
                                    <EyeOff size={17} />
                                ) : (
                                    <Eye size={17} />
                                )}
                            </button>
                        </div>
                        {/* REMEMBER + FORGOT */}
                        <div className="flex items-center text-[15px]">
                            {/* Remember */}
                            <label className="flex cursor-pointer items-center gap-[7px] text-[#555]">
                                <input type="checkbox" checked={rememberLogin} onChange={(e) => setRememberLogin(e.target.checked)} className=" h-[14px] w-[14px] cursor-pointer accent-[#1677ff] " />

                                <span>Duy trì đăng nhập</span>
                            </label>
                            {/* Divider */}
                            <span className="mx-[10px] h-[15px] w-px bg-[#ddd]" />
                            {/* Forgot password */}
                            <button type="button" className=" text-[#1677ff] transition  hover:text-[#005ccc] " >
                                Quên mật khẩu?
                            </button>
                        </div>
                    </div>
                    {/* ================= LOGIN BUTTONS ================= */}
                    <div className="flex h-[50px]">
                        {/* QUẢN LÝ */}
                        <button type="button" onClick={() => handleLogin("manage")}
                            className="  flex flex-1 items-center justify-center  gap-[7px] bg-[#087df5] text-[18px] font-semibold text-white transition hover:bg-[#006fe5] active:bg-[#0066d6]" >
                            <BarChart3 size={18} strokeWidth={2.5} />
                            <span>Quản lý</span>
                        </button>

                        {/* BÁN HÀNG */}
                        <button type="button" onClick={() => handleLogin("sale")}
                            className=" flex flex-1  items-center justify-center gap-[7px] bg-[#00be3f] text-[18px] font-semibold text-white transition hover:bg-[#00ad39] active:bg-[#009e34] " >
                            <ShoppingCart size={18} strokeWidth={2.5} />
                            <span>Bán hàng</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* ================= FOOTER ================= */}
            <div className="  absolute  bottom-[18px]  left-1/2 z-20 flex -translate-x-1/2 items-center  gap-[18px]  whitespace-nowrap text-[13px] text-white" >
                {/* Support */}
                <div className="flex items-center gap-[7px]">
                    <span className="text-[20px]">◔</span>
                    <span>Hỗ trợ: 0813 559 551</span>
                </div>

                {/* Language */}
                <div className="flex items-center gap-[8px]">
                    <img src="/images/logo/VietNam.jpg" alt="Vietnam" className="h-[18px] w-[26px] object-cover" />
                    <span>Tiếng Việt</span>
                    <ChevronDown size={14} />
                </div>
            </div>

        </main>
    );
};

export default LoginPage;