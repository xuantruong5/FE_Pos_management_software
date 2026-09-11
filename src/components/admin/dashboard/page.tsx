"use client";

import { useState } from "react";
import { DollarSign, RotateCcw, ChevronDown, Check, Monitor, ShoppingBag, ClipboardCheck, Download,} from "lucide-react";

const SumDashboard = () => {
 
    const [selectedRange, setSelectedRange] = useState("Tháng này");
    const [selectedTab, setSelectedTab] = useState("Theo ngày");
    const [productMetric, setProductMetric] = useState("Theo doanh thu thuần");
    const [productRange, setProductRange] = useState("Tháng này");
    const [customerRange, setCustomerRange] = useState("Tháng này");
    const [openRange, setOpenRange] = useState(false);
    const [openProductMetric, setOpenProductMetric] = useState(false);
    const [openProductRange, setOpenProductRange] = useState(false);
    const [openCustomerRange, setOpenCustomerRange] = useState(false);


    const ranges = [
        "Hôm nay",
        "Hôm qua",
        "7 ngày qua",
        "Tháng này",
        "Tháng trước",
    ];

  

    const chartData = [
        { day: "01", value: 0 },
        { day: "02", value: 0 },
        { day: "03", value: 0 },
        { day: "04", value: 0 },
        { day: "05", value: 0 },
        { day: "06", value: 0 },
        { day: "07", value: 0 },
        { day: "08", value: 0 },
        { day: "09", value: 0 },
        { day: "10", value: 0 },
        { day: "11", value: 0 },
        { day: "12", value: 0 },
        { day: "13", value: 0 },
        { day: "14", value: 0 },
        { day: "15", value: 0 },
        { day: "16", value: 70000 },
    ];

    const maxValue = 70000;

    

    const productData = [
        {
            name: "Bánh mì Staff chà bông 55gr",
            revenue: 70000,
            quantity: 35,
        },
        {
            name: "Cà phê sữa",
            revenue: 52000,
            quantity: 28,
        },
        {
            name: "Nước suối",
            revenue: 40000,
            quantity: 25,
        },
        {
            name: "Bánh ngọt",
            revenue: 32000,
            quantity: 20,
        },
        {
            name: "Trà đào",
            revenue: 25000,
            quantity: 17,
        },
    ];

    

    const customerData = [
        {
            name: "Nguyễn Văn A",
            phone: "0901234567",
            total: 1500000,
        },
        {
            name: "Trần Thị B",
            phone: "0912345678",
            total: 1200000,
        },
    ];

    

    const activities = [
        {
            name: "tra my",
            action: "vừa bán đơn hàng với giá trị",
            value: "10,000",
            time: "11 phút trước",
            type: "sale",
        },
        {
            name: "tra my",
            action: "vừa thực hiện kiểm hàng",
            value: "",
            time: "12 phút trước",
            type: "check",
        },
        {
            name: "Hương - Kế Toán",
            action: "vừa bán đơn hàng với giá trị",
            value: "0",
            time: "2 giờ trước",
            type: "sale",
        },
        {
            name: "Hương - Kế Toán",
            action: "vừa nhập hàng với giá trị",
            value: "0",
            time: "2 giờ trước",
            type: "import",
        },
        {
            name: "Hương - Kế Toán",
            action: "vừa bán đơn hàng với giá trị",
            value: "0",
            time: "một ngày trước",
            type: "sale",
        },
        {
            name: "Hương - Kế Toán",
            action: "vừa nhập hàng với giá trị",
            value: "0",
            time: "một ngày trước",
            type: "import",
        },
        {
            name: "Hương - Kế Toán",
            action: "vừa nhập hàng với giá trị",
            value: "0",
            time: "một ngày trước",
            type: "import",
        },
        {
            name: "Hương - Kế Toán",
            action: "vừa nhập hàng với giá trị",
            value: "0",
            time: "một ngày trước",
            type: "import",
        },
    ];

  

    const ActivityIcon = ({ type }: { type: string }) => {
        if (type === "sale") {
            return <ShoppingBag size={16} />;
        }

        if (type === "check") {
            return <ClipboardCheck size={16} />;
        }

        return <Download size={16} />;
    };

   

    return (
        <div className="min-h-screen bg-[#f5f6f7] p-4 md:p-5">
            <div className="mx-auto">
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">               
                    <div className="min-w-0">
                        <div className="mb-4 rounded-xl bg-white px-6 py-5 shadow-sm">
                            <h2 className="mb-5 text-[16px] font-semibold text-gray-900">
                                Kết quả bán hàng hôm nay
                            </h2>
                            <div className="grid grid-cols-2">
                                <div className="flex items-center gap-4 border-r">

                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1890ff] text-white">
                                        <DollarSign
                                            size={13}
                                            strokeWidth={2.5}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-gray-600">
                                            Doanh thu
                                        </p>
                                        <p className="mt-1 text-[18px] font-bold text-gray-900">
                                            70,000
                                        </p>
                                        <p className="text-[12px] text-gray-400">
                                            3 hóa đơn
                                        </p>
                                    </div>
                                </div>                        
                                <div className="flex items-center gap-4 pl-5">
                                    <div className="flex h-5 w-5 items-center justify-center rounded bg-[#ff7a00] text-white">
                                        <RotateCcw
                                            size={12}
                                            strokeWidth={3}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-gray-600">
                                            Trả hàng
                                        </p>
                                        <p className="mt-1 text-[18px] font-bold text-gray-900">
                                            0
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="rounded-xl bg-white px-6 py-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-semibold text-gray-900">
                                        Doanh thu thuần
                                    </span>
                                    <span className="rounded-md bg-[#eaf4ff] px-2.5 py-1 text-[14px] font-semibold text-[#087df5]">
                                        70,000
                                    </span>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenRange(!openRange) }                                            
                                        className={`flex h-7 items-center gap-1 rounded-md border bg-white px-2.5 text-[12px] ${openRange
                                                ? "border-[#1677ff] text-[#1677ff]"
                                                : "border-gray-300 text-gray-700"
                                            }`}
                                    >
                                        {selectedRange}
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform ${openRange
                                                    ? "rotate-180"
                                                    : ""
                                                }`}
                                        />
                                    </button>

                                    {openRange && (
                                        <div className="absolute right-0 top-8 z-[100] w-[140px] overflow-hidden rounded-lg bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                                            {ranges.map((range) => (
                                                <button
                                                    key={range}
                                                    onClick={() => {
                                                        setSelectedRange(
                                                            range
                                                        );
                                                        setOpenRange(false);
                                                    }}
                                                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-[13px] hover:bg-[#f5faff] ${selectedRange ===
                                                            range
                                                            ? "bg-[#eef7ff]"
                                                            : ""
                                                        }`}
                                                >
                                                    <span>
                                                        {range}
                                                    </span>

                                                    {selectedRange ===
                                                        range && (
                                                            <Check
                                                                size={18}
                                                                strokeWidth={2.5}
                                                                className="text-[#1677ff]"
                                                            />
                                                        )}
                                                </button>
                                            ))}

                                        </div>
                                    )}

                                </div>

                            </div>

                            {/* TABS */}

                            <div className="mt-6 flex gap-7 border-b border-gray-100">

                                {[
                                    "Theo ngày",
                                    "Theo giờ",
                                    "Theo thứ",
                                ].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() =>
                                            setSelectedTab(tab)
                                        }
                                        className={`relative pb-3 text-[13px] ${selectedTab === tab
                                                ? "font-medium text-[#1677ff]"
                                                : "text-gray-600"
                                            }`}
                                    >
                                        {tab}

                                        {selectedTab === tab && (
                                            <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#1677ff]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-10">
                                <div className="relative h-[340px]">
                                    <div className="absolute inset-0 flex flex-col justify-between">
                                        {[
                                            70000,
                                            63000,
                                            56000,
                                            49000,
                                            42000,
                                            35000,
                                            28000,
                                            21000,
                                            14000,
                                            7000,
                                            0,
                                        ].map((value) => (
                                            <div
                                                key={value}
                                                className="relative flex items-center"
                                            >
                                                <span className="w-[42px] shrink-0 text-right text-[11px] text-gray-500">
                                                    {value === 0
                                                        ? "0"
                                                        : `${value / 1000}k`}
                                                </span>
                                                <div className="ml-3 h-px flex-1 bg-[#e5e7eb]" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-0 left-[55px] right-0 top-0 flex items-end">
                                        {chartData.map((item) => {
                                            const height =
                                                maxValue === 0
                                                    ? 0
                                                    : (item.value /
                                                        maxValue) *
                                                    100;
                                            return (
                                                <div
                                                    key={item.day}
                                                    className="relative flex h-full flex-1 flex-col items-center justify-end"
                                                >
                                                    <div
                                                        className="w-[25px] max-w-[70%] bg-[#087df5] transition-all duration-300 hover:bg-[#0066d6]"
                                                        style={{
                                                            height: `${height}%`,
                                                        }}
                                                    />

                                                    <span className="absolute bottom-[-19px] text-[11px] text-gray-600">
                                                        {item.day}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <div className="rounded-xl bg-white px-6 py-5 shadow-sm">                    
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[14px] font-semibold text-gray-900">
                                        Top 10 hàng bán chạy
                                    </h2>
                                    <div className="flex items-center gap-3">                                     
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenProductMetric( !openProductMetric )}
                                                className={`flex h-7 items-center gap-1 rounded-md border bg-white px-2.5 text-[12px] ${openProductMetric
                                                        ? "border-[#1677ff] text-[#1677ff]"
                                                        : "border-gray-300 text-gray-700"
                                                    }`}
                                            >
                                                {productMetric}
                                                <ChevronDown
                                                    size={14}
                                                    className={`transition-transform ${openProductMetric
                                                            ? "rotate-180"
                                                            : ""
                                                        }`}
                                                />
                                            </button>
                                            {openProductMetric && (
                                                <div className="absolute right-0 top-8 z-[100] w-[175px] overflow-hidden rounded-lg bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                                                    {[
                                                        "Theo doanh thu thuần",
                                                        "Theo số lượng",
                                                    ].map((item) => (
                                                        <button
                                                            key={item}
                                                            onClick={() => {
                                                                setProductMetric(
                                                                    item
                                                                );
                                                                setOpenProductMetric(
                                                                    false
                                                                );
                                                            }}
                                                            className={`flex w-full items-center justify-between px-4 py-3 text-left text-[13px] hover:bg-[#f5faff] ${productMetric ===
                                                                    item
                                                                    ? "bg-[#eef7ff]"
                                                                    : ""
                                                                }`}
                                                        >
                                                            <span>
                                                                {item}
                                                            </span>

                                                            {productMetric ===
                                                                item && (
                                                                    <Check
                                                                        size={18}
                                                                        strokeWidth={
                                                                            2.5
                                                                        }
                                                                        className="text-[#1677ff]"
                                                                    />
                                                                )}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <button onClick={() => setOpenProductRange( !openProductRange)}                                                                                              
                                                className={`flex h-7 items-center gap-1 rounded-md border bg-white px-2.5 text-[12px] ${openProductRange
                                                        ? "border-[#1677ff] text-[#1677ff]"
                                                        : "border-gray-300 text-gray-700"
                                                    }`}
                                            >
                                                {productRange}

                                                <ChevronDown
                                                    size={14}
                                                    className={`transition-transform ${openProductRange
                                                            ? "rotate-180"
                                                            : ""
                                                        }`}
                                                />
                                            </button>
                                            {openProductRange && (
                                                <div className="absolute right-0 top-8 z-[100] w-[140px] overflow-hidden rounded-lg bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                                                    {ranges.map((range) => (
                                                        <button
                                                            key={range}
                                                            onClick={() => { setProductRange( range ); setOpenProductRange( false );}}
                                                            className={`flex w-full items-center justify-between px-4 py-3 text-left text-[13px] hover:bg-[#f5faff] ${productRange ===
                                                                    range
                                                                 ? "bg-[#eef7ff]" : "" }`} >
                                                            <span>
                                                                {range}
                                                            </span>

                                                            {productRange ===
                                                                range && (
                                                                    <Check
                                                                        size={18}
                                                                        strokeWidth={
                                                                            2.5
                                                                        }
                                                                        className="text-[#1677ff]"
                                                                    />
                                                                )}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="relative h-[600px]">
                                        <div className="absolute bottom-0 left-[45px] right-0 top-0 flex justify-between">
                                            {[0, 20, 40, 60, 80].map(
                                                (value) => (
                                                    <div
                                                        key={value}
                                                        className="relative h-full border-l border-gray-200"
                                                    >
                                                        <span className="absolute bottom-[-25px] left-0 -translate-x-1/2 text-[11px] text-gray-600">
                                                            {value === 0
                                                                ? "0"
                                                                : `${value}k`}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 left-[45px] right-0 top-0 flex flex-col justify-center">
                                            {productData.map((item) => {
                                                const value =
                                                    productMetric ===
                                                        "Theo số lượng"
                                                        ? item.quantity
                                                        : item.revenue;
                                                const max =
                                                    productMetric ===
                                                        "Theo số lượng"
                                                        ? 35
                                                        : 70000;
                                                const width =
                                                    (value / max) * 100;
                                                return (
                                                    <div
                                                        key={item.name}
                                                        className="mb-6"
                                                    >
                                                        <div className="mb-1 text-[12px] text-gray-600">
                                                            {item.name}
                                                        </div>
                                                        <div className="relative h-[36px]">
                                                            <div
                                                                className="h-full bg-[#087df5] transition-all duration-500"
                                                                style={{
                                                                    width: `${width}%`,
                                                                }}
                                                            />
                                                            <span
                                                                className="absolute top-1/2 -translate-y-1/2 text-[12px] text-gray-700"
                                                                style={{
                                                                    left: `calc(${width}% + 8px)`,
                                                                }}
                                                            >
                                                                {productMetric ===
                                                                    "Theo số lượng"
                                                                    ? value
                                                                    : `${(
                                                                        value /
                                                                        1000
                                                                    ).toFixed(
                                                                        0
                                                                    )}k`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl bg-white px-6 py-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[14px] font-semibold text-gray-900">
                                        Top 10 khách mua nhiều nhất
                                    </h2>
                                    <div className="relative">
                                        <button
                                            onClick={() =>
                                                setOpenCustomerRange(
                                                    !openCustomerRange
                                                )
                                            }
                                            className={`flex h-7 items-center gap-1 rounded-md border bg-white px-2.5 text-[12px] ${openCustomerRange
                                                    ? "border-[#1677ff] text-[#1677ff]"
                                                    : "border-gray-300 text-gray-700"
                                                }`}
                                        >
                                            {customerRange}

                                            <ChevronDown
                                                size={14}
                                                className={`transition-transform ${openCustomerRange
                                                        ? "rotate-180"
                                                        : ""
                                                    }`}
                                            />
                                        </button>

                                        {openCustomerRange && (
                                            <div className="absolute right-0 top-8 z-[100] w-[140px] overflow-hidden rounded-lg bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">

                                                {ranges.map((range) => (
                                                    <button
                                                        key={range}
                                                        onClick={() => {
                                                            setCustomerRange(
                                                                range
                                                            );
                                                            setOpenCustomerRange(
                                                                false
                                                            );
                                                        }}
                                                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-[13px] hover:bg-[#f5faff] ${customerRange ===
                                                                range
                                                                ? "bg-[#eef7ff]"
                                                                : ""
                                                            }`}
                                                    >
                                                        <span>
                                                            {range}
                                                        </span>

                                                        {customerRange ===
                                                            range && (
                                                                <Check
                                                                    size={18}
                                                                    strokeWidth={
                                                                        2.5
                                                                    }
                                                                    className="text-[#1677ff]"
                                                                />
                                                            )}
                                                    </button>
                                                ))}

                                            </div>
                                        )}

                                    </div>

                                </div>                       
                                {customerData.length === 0 ? (
                                    <div className="flex h-[500px] flex-col items-center justify-center">
                                        <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#edf5ff]">
                                            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border-2 border-[#6eafff] text-[#1677ff]">
                                                <ClipboardCheck
                                                    size={28}
                                                    strokeWidth={1.8}
                                                />
                                            </div>
                                        </div>
                                        <p className="mt-5 text-[14px] text-gray-600">
                                            Chưa có dữ liệu
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mt-6 space-y-3">
                                        {customerData.map(
                                            ( customer, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between border-b border-gray-100 py-3"
                                                >
                                                    <div>
                                                        <p className="text-[13px] font-medium text-gray-900">
                                                            {
                                                                customer.name
                                                            }
                                                        </p>
                                                        <p className="text-[12px] text-gray-400">
                                                            {
                                                                customer.phone
                                                            }
                                                        </p>
                                                    </div>
                                                    <span className="text-[13px] font-semibold text-[#1677ff]">
                                                        {customer.total.toLocaleString()}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>        
                    <div className="h-fit overflow-hidden rounded-xl bg-white shadow-sm">
                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff7ed] text-[#ff7a00]">
                                    <Monitor size={16} />
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold text-gray-900">
                                        Có 1 hoạt động đăng nhập
                                    </p>
                                    <p className="text-[14px] font-semibold text-gray-900">
                                        khác thường cần kiểm tra.
                                    </p>
                                </div>
                            </div>
                            <ChevronDown
                                size={18}
                                className="text-gray-700"
                            />
                        </div>
                        <div className="max-h-[710px] overflow-y-auto px-4">
                            {activities.map(
                                (activity, index) => (
                                    <div
                                        key={index}
                                        className="relative flex gap-3 border-b border-gray-100 py-4 last:border-b-0"
                                    >                       
                                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-gray-500">
                                            <ActivityIcon
                                                type={
                                                    activity.type
                                                }
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[14px] leading-5 text-[#0066d6]">
                                                <span className="font-medium">
                                                    {
                                                        activity.name
                                                    }
                                                </span>{" "}
                                                {
                                                    activity.action
                                                }{" "}
                                                {activity.value && (
                                                    <span className="font-medium text-gray-900">
                                                        {
                                                            activity.value
                                                        }
                                                    </span>
                                                )}
                                            </p>
                                            <p className="mt-1 text-[12px] text-gray-400">
                                                {
                                                    activity.time
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SumDashboard;