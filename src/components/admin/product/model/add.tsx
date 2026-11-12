
"use client";

import React, { useRef, useState } from "react";
import { X, ChevronDown, ChevronUp, Plus, Tag, Image as ImageIcon, Info, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, IndentIncrease, Link, Bold, Italic, Underline, Pin, Trash2, Pencil, } from "lucide-react";

const addProduct = ({ onClose }: { onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState("info");
    const [showPrice, setShowPrice] = useState(true);
    const [showStock, setShowStock] = useState(true);
    const [showLocation, setShowLocation] = useState(true);
    const [showUnit, setShowUnit] = useState(true);
    const [directSale, setDirectSale] = useState(true);
    const [images, setImages] = useState<{ id: string; file: File; url: string }[]>([]);
    const [mainImage, setMainImage] = useState<{ id: string; file: File; url: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    // tạo nhóm hàng 
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // thuong hieu 
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [brandName, setBrandName] = useState("");
    const [brands, setBrands] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState("");

    // vị trí 
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [locationName, setLocationName] = useState("");
    const [locations, setLocations] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState("");


    // giá bán 
    const [price, setPrice] = useState("0");
    const [baseUnit, setBaseUnit] = useState("");
    const [units, setUnits] = useState<
        { id: number; name: string; conversion: string; price: string; directSale: boolean; }[]
    >([]);


    // thuộc tính 
    const [showAttributeModal, setShowAttributeModal] = useState(false);
    const [attributeName, setAttributeName] = useState("");
    const [attributes, setAttributes] = useState<string[]>([]);
    const [showAttributeDropdown, setShowAttributeDropdown] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState("");
    const [attributeValue, setAttributeValue] = useState("");
    const [attributeRows, setAttributeRows] = useState([{ id: 1, selected: "", value: "" }]);
    const [openAttributeDropdown, setOpenAttributeDropdown] = useState<number | null>(null);
    const [attributeRowIdForCreate, setAttributeRowIdForCreate] = useState<number | null>(null);

    // chỉnh sửa thuộc tính 
    const [showEditAttributeModal, setShowEditAttributeModal] = useState(false);
    const [editingAttribute, setEditingAttribute] = useState("");
    const [editAttributeName, setEditAttributeName] = useState("");
    const [showDeleteAttributeModal, setShowDeleteAttributeModal] = useState(false);

    const handleImages = (type: string, value: any) => {
        if (type === "add") {
            const files = Array.from(value as FileList).filter(file =>
                file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024
            );
            setImages(prev => {
                const newImages = files.slice(0, 4 - prev.length).map(file => ({
                    id: crypto.randomUUID(),
                    file,
                    url: URL.createObjectURL(file)
                }));
                const updated = [...prev, ...newImages];
                setMainImage(current => current || updated[0] || null);
                return updated;
            });
        }
        if (type === "main") {
            setMainImage(value);
        }
        if (type === "delete") {
            setImages(prev => {
                const updated = prev.filter(img => img.id !== value);
                setMainImage(current =>
                    current?.id === value ? updated[0] || null : current
                );
                return updated;
            });
        }
    };




    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[1200px] h-[95vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">

                {/* HEADER */}
                <div className="px-6 pt-4 shrink-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Tạo hàng hóa
                        </h2>
                        <button onClick={onClose}>
                            <X size={21} className="text-gray-500 hover:text-black" />
                        </button>
                    </div>
                    {/* TAB */}
                    <div className="flex gap-8 mt-5 border-b border-gray-200">
                        <button onClick={() => setActiveTab("info")}
                            className={`pb-3 text-sm ${activeTab === "info" ? "text-blue-600 border-b-2 border-blue-600 font-medium" : "text-gray-600"}`}  >
                            Thông tin
                        </button>
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`pb-3 text-sm ${activeTab === "description"
                                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                                : "text-gray-600"
                                }`}
                        >
                            Mô tả
                        </button>
                    </div>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {activeTab === "info" ? (
                        <>
                            {/* THÔNG TIN CƠ BẢN */}
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_220px] gap-x-5 gap-y-3 mb-5">
                                {/* MÃ HÀNG */}
                                <div>
                                    <label className="block text-[13px] mb-1.5">
                                        Mã hàng
                                    </label>
                                    <input placeholder="Tự động" className="w-full h-[35px] px-3 border rounded-lg text-sm outline-none focus:border-blue-500" />
                                </div>
                                {/* MÃ VẠCH */}
                                <div>
                                    <label className="block text-[13px] mb-1.5">
                                        Mã vạch
                                    </label>
                                    <input placeholder="Nhập mã vạch" className="w-full h-[35px] px-3 border rounded-lg text-sm outline-none focus:border-blue-500" />
                                </div>

                                {/* HÌNH ẢNH */}

                                {/* HÌNH ẢNH */}
                                <div className="lg:row-span-3 flex gap-1 h-[180px]">

                                    {/* ẢNH CHÍNH */}
                                    <div className="flex-1 min-w-0 border border-dashed border-gray-300 rounded-lg bg-gray-50 relative overflow-hidden">

                                        {mainImage ? (
                                            <>
                                                <img src={mainImage.url} className="w-full h-full object-contain" alt="Ảnh chính" />
                                                <button type="button" onClick={() => handleImages("delete", mainImage.id)} className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"  >
                                                    <X size={15} />
                                                </button>
                                            </>
                                        ) : (
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center" >
                                                <ImageIcon size={35} className="text-gray-300 mb-3" />
                                                <span className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
                                                    Thêm ảnh
                                                </span>
                                                <span className="text-xs text-gray-500 mt-2">
                                                    Mỗi ảnh không quá 2 MB
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                    {/* ẢNH PHỤ */}
                                    <div className="w-[42px] shrink-0 flex flex-col gap-1">
                                        {images.filter(img => img.id !== mainImage?.id).map(img => (
                                            <div key={img.id} className="relative w-[42px] h-[42px] border rounded-lg overflow-hidden group" >
                                                <img src={img.url} className="w-full h-full object-cover" alt="Ảnh phụ" />
                                                {/* GHIM ẢNH CHÍNH */}
                                                <button type="button" onClick={() => handleImages("main", img)} className="absolute bottom-0 right-0 bg-white/90 rounded-tl p-0.5 opacity-0 group-hover:opacity-100" title="Đặt làm ảnh chính" >
                                                    <Pin size={12} className="text-blue-600" />
                                                </button>

                                                {/* XÓA ẢNH */}
                                                <button type="button" onClick={() => handleImages("delete", img.id)} className="absolute top-0 right-0 bg-white rounded-bl p-0.5 opacity-0 group-hover:opacity-100" >
                                                    <X size={11} className="text-red-500" />
                                                </button>
                                            </div>
                                        ))}

                                        {/* NÚT THÊM */}
                                        {images.length < 4 && (
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-[42px] h-[42px] border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100" >
                                                <Plus size={20} />
                                            </button>
                                        )}
                                    </div>

                                    {/* INPUT FILE */}
                                    <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => { handleImages("add", e.target.files); e.target.value = ""; }} />
                                </div>


                                {/* TÊN HÀNG */}
                                <div className="lg:col-span-2">
                                    <label className="block text-[13px] mb-1.5">
                                        Tên hàng
                                    </label>
                                    <input placeholder="Bắt buộc" className="w-full h-[35px] px-3 border rounded-lg text-sm outline-none focus:border-blue-500" />
                                </div>

                                {/* NHÓM HÀNG */}
                                <div>
                                    <div className="flex justify-between mb-1.5">
                                        <label className="text-[13px]">
                                            Nhóm hàng
                                        </label>
                                        <button type="button" onClick={() => setShowCategoryModal(true)} className="text-blue-600 text-xs" >
                                            Tạo mới
                                        </button>
                                    </div>

                                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full h-[39px] px-2 border rounded-lg text-sm outline-none">
                                        <option value="">Chọn nhóm hàng (Bắt buộc)</option>
                                        {categories.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* THƯƠNG HIỆU */}
                                <div>
                                    <div className="flex justify-between mb-1.5">
                                        <label className="text-[13px]">
                                            Thương hiệu
                                        </label>

                                        <button type="button" onClick={() => setShowBrandModal(true)} className="text-blue-600 text-xs" >
                                            Tạo mới
                                        </button>
                                    </div>

                                    <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full h-[39px] px-2 border rounded-lg text-sm outline-none" >
                                        <option value="">Chọn thương hiệu</option>
                                        {brands.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                            </div>

                            {/* MODAL TẠO NHÓM HÀNG */}
                            {showCategoryModal && (
                                <div className="fixed inset-0 z-[10000] bg-black/40 flex items-start justify-center pt-[7px] px-4">
                                    <div className="bg-white w-full max-w-[520px] rounded-xl shadow-2xl overflow-hidden">

                                        {/* HEADER */}
                                        <div className="px-6 py-5 flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Tạo nhóm hàng
                                            </h2>

                                            <button type="button" onClick={() => setShowCategoryModal(false)} >
                                                <X size={21} className="text-gray-500 hover:text-black" />
                                            </button>
                                        </div>

                                        {/* BODY */}
                                        <div className="px-6 pb-7 space-y-3">
                                            {/* TÊN NHÓM */}
                                            <div>
                                                <label className="block text-[13px] mb-1.5">
                                                    Tên nhóm
                                                </label>
                                                <input autoFocus value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="" className="w-full h-[33px] px-3 border border-blue-500 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                            </div>

                                            {/* NHÓM CHA */}
                                            <div>
                                                <label className="block text-[13px] mb-1.5">
                                                    Nhóm cha
                                                </label>

                                                <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} className="w-full h-[33px] px-3 border rounded-lg text-sm outline-none focus:border-blue-500" >
                                                    <option value="">Chọn nhóm hàng</option>
                                                    {categories.map((item, index) => (
                                                        <option key={index} value={item}>
                                                            {item}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>

                                        {/* FOOTER */}
                                        <div className="border-t px-6 py-3 flex justify-end gap-2">
                                            <button type="button" onClick={() => { setShowCategoryModal(false); setCategoryName(""); setParentCategory(""); }}
                                                className="px-4 h-[40px] border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50" >
                                                Bỏ qua
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!categoryName.trim()) {
                                                        alert("Vui lòng nhập tên nhóm hàng!");
                                                        return;
                                                    }

                                                    const name = categoryName.trim();
                                                    setCategories(prev => [...prev, name]);
                                                    setSelectedCategory(name);
                                                    setCategoryName("");
                                                    setParentCategory("");
                                                    setShowCategoryModal(false);
                                                }}
                                                className="px-4 h-[40px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"  >
                                                Lưu
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            )}
                            {/* MODAL TẠO THƯƠNG HIỆU */}
                            {showBrandModal && (
                                <div className="fixed inset-0 z-[10000] bg-black/40 flex items-start justify-center pt-[7px] px-4">
                                    <div className="bg-white w-full max-w-[450px] rounded-xl shadow-2xl overflow-hidden">
                                        {/* HEADER */}
                                        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Tạo thương hiệu
                                            </h2>
                                            <button type="button" onClick={() => setShowBrandModal(false)} >
                                                <X size={21} className="text-gray-500 hover:text-black" />
                                            </button>
                                        </div>

                                        {/* BODY */}
                                        <div className="px-6 pb-7">
                                            <label className="block text-[13px] mb-1.5">
                                                Tên thương hiệu
                                            </label>
                                            <input autoFocus value={brandName} onChange={(e) => setBrandName(e.target.value)} className="w-full h-[33px] px-3 border border-blue-500 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                        </div>

                                        {/* FOOTER */}
                                        <div className="border-t px-6 py-3 flex justify-end gap-2">
                                            <button type="button" onClick={() => { setShowBrandModal(false); setBrandName(""); }}
                                                className="px-4 h-[40px] border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50" >
                                                Bỏ qua
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!brandName.trim()) {
                                                        alert("Vui lòng nhập tên thương hiệu!");
                                                        return;
                                                    }
                                                    const name = brandName.trim();
                                                    if (brands.includes(name)) {
                                                        alert("Thương hiệu đã tồn tại!");
                                                        return;
                                                    }
                                                    setBrands(prev => [...prev, name]);
                                                    setSelectedBrand(name);
                                                    setBrandName("");
                                                    setShowBrandModal(false);
                                                }}
                                                className="px-4 h-[40px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700" >
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* GIÁ VỐN, GIÁ BÁN */}
                            <div className="border border-gray-200 rounded-lg mb-4">
                                <div onClick={() => setShowPrice(!showPrice)} className="px-3 py-3 flex items-center justify-between cursor-pointer" >
                                    <h3 className="text-sm font-semibold">
                                        Giá vốn, giá bán
                                    </h3>
                                    {showPrice ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                                </div>
                                {showPrice && (
                                    <div className="px-3 pb-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[550px]">
                                            <div>
                                                <label className="block text-[13px] mb-1.5">
                                                    Giá vốn
                                                </label>
                                                <input type="number" defaultValue="0" className="w-full h-[39px] px-3 border rounded-lg text-right outline-none" />
                                            </div>

                                            <div>
                                                <div className="flex justify-between mb-1.5">
                                                    <label className="text-[13px]">
                                                        Giá bán
                                                    </label>
                                                    <button className="flex items-center gap-2 text-blue-600 text-xs">
                                                        <Tag size={15} />
                                                        Thiết lập giá
                                                    </button>
                                                </div>
                                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-[39px] px-3 border rounded-lg text-right outline-none" />
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* TỒN KHO */}
                            <div className="border border-gray-200 rounded-lg mb-4">
                                <div onClick={() => setShowStock(!showStock)} className="px-3 py-3 flex items-center justify-between cursor-pointer" >
                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            Tồn kho
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Quản lý số lượng tồn kho và định mức tồn. Khi tồn kho chạm đến định mức, bạn sẽ nhận được cảnh báo từ KiotViet.
                                        </p>
                                    </div>
                                    {showStock ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                                </div>

                                {showStock && (
                                    <div className="px-3 pb-5">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-[13px] mb-1.5">
                                                    Tồn kho
                                                </label>
                                                <input type="number" defaultValue="0" className="w-full h-[39px] px-3 border rounded-lg text-right outline-none" />
                                            </div>

                                            <div>
                                                <label className="block text-[13px] mb-1.5">
                                                    Định mức tồn thấp nhất
                                                </label>
                                                <input type="number" defaultValue="0" className="w-full h-[39px] px-3 border rounded-lg text-right outline-none" />
                                            </div>

                                            <div>
                                                <label className="block text-[13px] mb-1.5">
                                                    Định mức tồn cao nhất
                                                </label>
                                                <input type="number" defaultValue="0" className="w-full h-[39px] px-3 border rounded-lg text-right outline-none" />
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* VỊ TRÍ, TRỌNG LƯỢNG */}
                            <div className="border border-gray-200 rounded-lg mb-4">
                                <div onClick={() => setShowLocation(!showLocation)}
                                    className="px-3 py-3 flex items-center justify-between cursor-pointer" >
                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            Vị trí, trọng lượng
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Quản lý việc sắp xếp kho, vị trí bán hàng hoặc trọng lượng hàng hóa
                                        </p>
                                    </div>

                                    {showLocation ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                                </div>

                                {showLocation && (
                                    <div className="px-3 pb-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <div className="flex justify-between mb-1.5">
                                                    <label className="text-[13px]">
                                                        Vị trí
                                                    </label>

                                                    <button type="button" onClick={() => setShowLocationModal(true)} className="text-blue-600 text-xs" >
                                                        Tạo mới
                                                    </button>
                                                </div>
                                                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full h-[39px] px-3 border rounded-lg text-sm outline-none focus:border-blue-500" >
                                                    <option value="">Chọn vị trí</option>
                                                    {locations.map((item, index) => (
                                                        <option key={index} value={item}>
                                                            {item}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[13px] mb-1.5">
                                                    Trọng lượng
                                                </label>
                                                <div className="flex">
                                                    <input type="number" defaultValue="0" className="w-full h-[39px] px-3 border rounded-l-lg text-right outline-none" />
                                                    <select className="w-[115px] border rounded-r-lg px-2 text-sm">
                                                        <option>g</option>
                                                        <option>kg</option>
                                                        <option>ml</option>
                                                        <option>l</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* MODAL TẠO VỊ TRÍ */}
                            {showLocationModal && (
                                <div className="fixed inset-0 z-[10000] bg-black/40 flex items-start justify-center pt-[7px] px-4">
                                    <div className="bg-white w-full max-w-[450px] rounded-xl shadow-2xl overflow-hidden">
                                        {/* HEADER */}
                                        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Tạo vị trí
                                            </h2>
                                            <button type="button" onClick={() => setShowLocationModal(false)}  >
                                                <X size={21} className="text-gray-500 hover:text-black" />
                                            </button>
                                        </div>
                                        {/* BODY */}
                                        <div className="px-6 pb-7">
                                            <label className="block text-[13px] mb-1.5">
                                                Vị trí
                                            </label>
                                            <input autoFocus value={locationName} onChange={(e) => setLocationName(e.target.value)} className="w-full h-[33px] px-3 border border-blue-500 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                        </div>

                                        {/* FOOTER */}
                                        <div className="border-t px-6 py-3 flex justify-end gap-2">
                                            <button type="button" onClick={() => { setShowLocationModal(false); setLocationName(""); }}
                                                className="px-4 h-[40px] border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"  >
                                                Bỏ qua
                                            </button>

                                            <button type="button"
                                                onClick={() => {
                                                    const name = locationName.trim();
                                                    if (!name) {
                                                        alert("Vui lòng nhập vị trí!");
                                                        return;
                                                    }
                                                    if (locations.includes(name)) {
                                                        alert("Vị trí đã tồn tại!");
                                                        return;
                                                    }
                                                    setLocations(prev => [...prev, name]);
                                                    setSelectedLocation(name);
                                                    setLocationName("");
                                                    setShowLocationModal(false);
                                                }}
                                                className="px-4 h-[40px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700" >
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* QUẢN LÝ ĐƠN VỊ TÍNH VÀ THUỘC TÍNH */}
                            <div className="border border-gray-200 rounded-lg mb-4">
                                <div onClick={() => setShowUnit(!showUnit)} className="px-3 py-3 flex items-center justify-between cursor-pointer" >
                                    <h3 className="text-sm font-semibold">
                                        Quản lý theo đơn vị tính và thuộc tính
                                    </h3>
                                    {showUnit ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                                </div>

                                {showUnit && (
                                    <div className="px-3 pb-5">
                                        {/* ĐƠN VỊ TÍNH */}

                                        <div className="mb-6">

                                            <h4 className="text-xs font-medium mb-2">
                                                Đơn vị tính
                                            </h4>

                                            <p className="text-xs text-gray-500 mb-3">
                                                Thêm đơn vị bán hoặc nhập như chai, lốc, thùng.
                                                Đặt công thức quy đổi để tính nhanh giá và tồn kho.
                                                Ví dụ: 1 lốc = 4 chai, 1 thùng = 20 lốc.
                                            </p>

                                            <p className="text-xs text-amber-700 mb-6">
                                                Lưu Ý : bạn phải nhập đơn vị cơ bản trước mới thêm được đơn vị mới
                                            </p>

                                            {/* TIÊU ĐỀ */}
                                            <div className="flex flex-wrap gap-4 mb-3">
                                                <span className="text-xs w-[218px]">
                                                    Tên đơn vị cơ bản
                                                </span>
                                                <span className="text-xs w-[120px]">
                                                    Giá bán
                                                </span>
                                                <span className="text-xs">
                                                    Bán trực tiếp
                                                </span>
                                            </div>

                                            {/* ĐƠN VỊ CƠ BẢN */}
                                            <div className="flex flex-wrap items-center gap-3">
                                                <input placeholder="Nhập tên đơn vị cơ bản" value={baseUnit} onChange={(e) => setBaseUnit(e.target.value)} className="w-[210px] h-[36px] px-3 border rounded-lg text-sm outline-none focus:border-blue-500" />
                                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-[120px] h-[36px] px-3 border rounded-lg text-sm text-right outline-none" />

                                                <label className="flex items-center gap-2 text-sm">
                                                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
                                                    Bán trực tiếp
                                                </label>

                                            </div>

                                            {/* DANH SÁCH ĐƠN VỊ THÊM */}
                                            {units.map((unit) => (
                                                <div key={unit.id} className="flex flex-wrap items-end gap-3 mt-4 pt-4 border-t border-dashed"  >

                                                    {/* TÊN ĐƠN VỊ */}
                                                    <div className="w-[210px]">
                                                        <label className="block text-xs mb-1.5">
                                                            Tên đơn vị
                                                        </label>
                                                        <input placeholder="Tên đơn vị" value={unit.name}
                                                            onChange={(e) =>
                                                                setUnits(prev => prev.map(item =>
                                                                    item.id === unit.id
                                                                        ? { ...item, name: e.target.value }
                                                                        : item
                                                                ))
                                                            }
                                                            className="w-full h-[36px] px-3 border rounded-lg text-sm outline-none focus:border-blue-500"
                                                        />
                                                    </div>

                                                    {/* DẤU BẰNG */}
                                                    <span className="text-sm mb-2">
                                                        =
                                                    </span>

                                                    {/* GIÁ TRỊ QUY ĐỔI */}
                                                    <div className="w-[140px]">
                                                        <label className="block text-xs mb-1.5">
                                                            Giá trị quy đổi
                                                        </label>

                                                        <div className="flex items-center border rounded-lg h-[36px] px-2">
                                                            <input type="number" min="0.01" value={unit.conversion}
                                                                onChange={(e) =>
                                                                    setUnits(prev => prev.map(item =>
                                                                        item.id === unit.id
                                                                            ? { ...item, conversion: e.target.value }
                                                                            : item
                                                                    ))
                                                                }
                                                                className="w-full text-sm text-right outline-none"
                                                            />

                                                            <span className="text-sm ml-2 whitespace-nowrap">
                                                                {baseUnit}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* GIÁ BÁN */}
                                                    <div className="w-[120px]">
                                                        <label className="block text-xs mb-1.5">
                                                            Giá bán
                                                        </label>
                                                        <input type="number" value={unit.price}
                                                            onChange={(e) =>
                                                                setUnits(prev => prev.map(item =>
                                                                    item.id === unit.id
                                                                        ? { ...item, price: e.target.value }
                                                                        : item
                                                                ))
                                                            }
                                                            className="w-full h-[36px] px-3 border rounded-lg text-sm text-right outline-none"
                                                        />
                                                    </div>

                                                    {/* BÁN TRỰC TIẾP */}
                                                    <label className="flex items-center gap-2 text-sm h-[36px]">
                                                        <input type="checkbox" checked={unit.directSale}
                                                            onChange={(e) =>
                                                                setUnits(prev => prev.map(item =>
                                                                    item.id === unit.id
                                                                        ? { ...item, directSale: e.target.checked }
                                                                        : item
                                                                ))
                                                            }
                                                            className="w-4 h-4 accent-blue-600"
                                                        />
                                                        Bán trực tiếp
                                                    </label>

                                                    {/* XÓA */}
                                                    <button type="button" onClick={() => setUnits(prev => prev.filter(item => item.id !== unit.id))}
                                                        className="ml-auto mb-2 text-gray-500 hover:text-red-500" >
                                                        <Trash2 size={18} />
                                                    </button>

                                                </div>
                                            ))}

                                            {/* THÊM ĐƠN VỊ */}
                                            <button type="button" disabled={!baseUnit.trim()}
                                                onClick={() => {
                                                    setUnits(prev => [
                                                        ...prev,
                                                        {
                                                            id: Date.now() + Math.random(),
                                                            name: "",
                                                            conversion: "1",
                                                            price: price,
                                                            directSale: true
                                                        }
                                                    ]);
                                                }}
                                                className={`flex items-center gap-2 text-sm mt-4 ${baseUnit.trim()
                                                    ? "text-blue-600 hover:text-blue-700"
                                                    : "text-gray-400 cursor-not-allowed"
                                                    }`}
                                            >
                                                <Plus size={18} />
                                                Thêm đơn vị
                                            </button>

                                        </div>



                                        {/* THUỘC TÍNH */}
                                        <div className="border-t border-gray-200 pt-6">
                                            <h4 className="text-xs font-medium mb-1">
                                                Thuộc tính
                                            </h4>
                                            <p className="text-xs text-gray-500 mb-6">
                                                Thêm đặc điểm như hương vị, dung tích, màu sắc
                                            </p>
                                            {/* DANH SÁCH DÒNG THUỘC TÍNH */}
                                            <div className="space-y-3">
                                                {attributeRows.map((row) => (
                                                    <div key={row.id} className="flex items-start gap-2">
                                                        {/* CHỌN THUỘC TÍNH */}
                                                        <div className="relative w-[210px] shrink-0">
                                                            {/* NÚT DROPDOWN */}
                                                            <button type="button" onClick={() => setOpenAttributeDropdown(openAttributeDropdown === row.id ? null : row.id)}
                                                                className={`w-full h-[33px] px-3 border rounded-lg flex items-center justify-between text-sm bg-white transition-colors ${openAttributeDropdown === row.id ? "border-blue-500" : "border-gray-300 hover:border-blue-400"}`} >
                                                                <span className={row.selected ? "text-gray-900" : "text-gray-500"}>
                                                                    {row.selected || "Chọn thuộc tính"}
                                                                </span>
                                                                <ChevronDown size={16} className={`transition-transform ${openAttributeDropdown === row.id ? "rotate-180" : ""}`} />
                                                            </button>

                                                            {/* MENU DROPDOWN */}
                                                            {openAttributeDropdown === row.id && (
                                                                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden mb-10 ">
                                                                    <div className="max-h-[180px] overflow-y-auto">

                                                                        {/* CHỌN THUỘC TÍNH */}
                                                                        <button type="button"
                                                                            onClick={() => {
                                                                                setAttributeRows(prev =>
                                                                                    prev.map(item =>
                                                                                        item.id === row.id
                                                                                            ? { ...item, selected: "", value: "" }
                                                                                            : item
                                                                                    )
                                                                                );
                                                                                setOpenAttributeDropdown(null);
                                                                            }}
                                                                            className={`w-full px-4 py-2.5 flex items-center justify-between text-sm text-left hover:bg-gray-50  ${!row.selected ? "bg-blue-50" : ""}`}  >
                                                                            <span>Chọn thuộc tính</span>
                                                                            {!row.selected && (<span className="text-blue-600">✓</span>)}
                                                                        </button>
                                                                        {/* DANH SÁCH THUỘC TÍNH */}

                                                                        {/* DANH SÁCH THUỘC TÍNH */}
                                                                        {attributes.map((item, index) => {
                                                                            const isDuplicate = attributeRows.some(
                                                                                other => other.id !== row.id &&
                                                                                    other.selected === item
                                                                            );

                                                                            const isSelected = row.selected === item;

                                                                            return (
                                                                                <div
                                                                                    key={index}
                                                                                    className={`group flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${isDuplicate
                                                                                        ? "text-gray-300"
                                                                                        : "text-gray-800 hover:bg-blue-50"
                                                                                        } ${isSelected ? "bg-blue-50" : ""
                                                                                        }`}
                                                                                >
                                                                                    {/* TÊN THUỘC TÍNH */}
                                                                                    <button
                                                                                        type="button"
                                                                                        disabled={isDuplicate}
                                                                                        onClick={() => {
                                                                                            if (isDuplicate) {
                                                                                                alert(
                                                                                                    "Thuộc tính này đã có trong hàng hóa. Xin vui lòng chọn thuộc tính khác."
                                                                                                );
                                                                                                return;
                                                                                            }

                                                                                            setAttributeRows(prev =>
                                                                                                prev.map(other =>
                                                                                                    other.id === row.id
                                                                                                        ? {
                                                                                                            ...other,
                                                                                                            selected: item,
                                                                                                            value: ""
                                                                                                        }
                                                                                                        : other
                                                                                                )
                                                                                            );

                                                                                            setOpenAttributeDropdown(null);
                                                                                        }}
                                                                                        className="flex-1 text-left"
                                                                                    >
                                                                                        {item}
                                                                                    </button>

                                                                                    {/* TICK VÀ BÚT CHỈNH SỬA */}
                                                                                    <div className="flex items-center justify-center w-6">

                                                                                        {/* DẤU TÍCH */}
                                                                                        {isSelected && (
                                                                                            <span className="text-blue-600 font-bold group-hover:hidden">
                                                                                                ✓
                                                                                            </span>
                                                                                        )}

                                                                                        {/* BÚT CHỈNH SỬA */}
                                                                                        <button
                                                                                            type="button"
                                                                                            title="Sửa thuộc tính"
                                                                                            onClick={() => {
                                                                                                setEditingAttribute(item);
                                                                                                setEditAttributeName(item);
                                                                                                setShowAttributeDropdown(null);
                                                                                                setShowEditAttributeModal(true);
                                                                                            }}
                                                                                            className="hidden group-hover:flex items-center justify-center text-blue-600 hover:text-blue-800"
                                                                                        >
                                                                                            <Pencil size={16} />
                                                                                        </button>

                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}


                                                                    </div>

                                                                    {/* TẠO THUỘC TÍNH MỚI */}
                                                                    <div className="border-t border-gray-100">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setAttributeRowIdForCreate(row.id);
                                                                                setAttributeName("");
                                                                                setOpenAttributeDropdown(null);
                                                                                setShowAttributeModal(true);
                                                                            }}
                                                                            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors " >
                                                                            + Tạo thuộc tính mới
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            )}

                                                        </div>


                                                        {/* NHẬP GIÁ TRỊ */}
                                                        <div className="flex-1 flex h-[33px] border rounded-lg overflow-hidden">
                                                            <input
                                                                value={row.value}
                                                                onChange={(e) =>
                                                                    setAttributeRows(prev =>
                                                                        prev.map(item =>
                                                                            item.id === row.id
                                                                                ? { ...item, value: e.target.value }
                                                                                : item
                                                                        )
                                                                    )
                                                                }
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                                placeholder="Nhập giá trị thuộc tính và enter"
                                                                disabled={!row.selected}
                                                                className="flex-1 min-w-0 px-3 text-sm outline-none disabled:bg-gray-100"
                                                            />

                                                            <button type="button" disabled={!row.selected} className="px-3 text-xs border-l text-gray-500 hover:bg-gray-50 disabled:bg-gray-100" >
                                                                Chọn nhanh
                                                            </button>

                                                        </div>

                                                        {/* XÓA DÒNG */}
                                                        <button type="button" onClick={() => setAttributeRows(prev => prev.filter(item => item.id !== row.id))}
                                                            className="w-9 h-[33px] border rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500" >
                                                            <Trash2 size={17} />
                                                        </button>

                                                    </div>
                                                ))}

                                            </div>

                                            {/* THÊM THUỘC TÍNH */}
                                            <button type="button"
                                                onClick={() =>
                                                    setAttributeRows(prev => [
                                                        ...prev,
                                                        {
                                                            id: Date.now() + Math.random(),
                                                            selected: "",
                                                            value: ""
                                                        }
                                                    ])
                                                }
                                                className="flex items-center gap-2 text-blue-600 text-sm mt-4 hover:text-blue-700 "  >
                                                <Plus size={17} />
                                                Thêm thuộc tính
                                            </button>

                                        </div>


                                    </div>
                                )}
                            </div>


                            {/* MODAL TẠO THUỘC TÍNH */}
                            {showAttributeModal && (
                                <div className="fixed inset-0 z-[10002] bg-black/40 flex items-start justify-center pt-[7px] px-4">
                                    <div className="bg-white w-full max-w-[660px] rounded-xl shadow-2xl overflow-hidden">
                                        {/* HEADER */}
                                        <div className="px-6 pt-5 pb-8 flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Tạo thuộc tính
                                            </h2>
                                            <button type="button" onClick={() => { setShowAttributeModal(false); setAttributeName(""); }} >
                                                <X size={21} className="text-gray-500 hover:text-black" />
                                            </button>
                                        </div>

                                        {/* BODY */}
                                        <div className="px-6 pb-7">
                                            <label className="block text-[13px] mb-1.5">
                                                Tên thuộc tính
                                            </label>

                                            <input
                                                autoFocus
                                                value={attributeName}
                                                onChange={(e) => setAttributeName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        const name = attributeName.trim();

                                                        if (!name) return;

                                                        if (attributes.includes(name)) {
                                                            alert("Thuộc tính đã tồn tại!");
                                                            return;
                                                        }

                                                        setAttributes(prev => [...prev, name]);
                                                        setAttributeName("");
                                                        setShowAttributeModal(false);
                                                    }
                                                }}
                                                placeholder="Ví dụ: Hương vị, Dung tích, Màu sắc" className="w-full h-[33px] px-3 border border-blue-500 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                        </div>

                                        {/* FOOTER */}
                                        <div className="border-t px-6 py-3 flex justify-end gap-2">
                                            <button type="button" onClick={() => { setShowAttributeModal(false); setAttributeName(""); }}
                                                className="px-4 h-[40px] border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50" >
                                                Bỏ qua
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const name = attributeName.trim();
                                                    if (!name) {
                                                        alert("Vui lòng nhập tên thuộc tính!");
                                                        return;
                                                    }
                                                    if (attributes.includes(name)) {
                                                        alert("Thuộc tính đã tồn tại!");
                                                        return;
                                                    }
                                                    setAttributes(prev => [...prev, name]);
                                                    setAttributeName("");
                                                    setShowAttributeModal(false);
                                                }}
                                                className="px-4 h-[40px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700" >
                                                Xong
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* MODAL SỬA THUỘC TÍNH */}
                            {showEditAttributeModal && (
                                <div className="fixed inset-0 z-[10003] bg-black/40 flex items-start justify-center pt-[23px] px-4">
                                    <div className="bg-white w-full max-w-[660px] rounded-xl shadow-2xl overflow-hidden">
                                        {/* HEADER */}
                                        <div className="px-6 pt-5 pb-8 flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Sửa thuộc tính
                                            </h2>
                                            <button type="button" onClick={() => { setShowEditAttributeModal(false); setEditAttributeName(""); }}>
                                                <X size={21} className="text-gray-500 hover:text-black" />
                                            </button>

                                        </div>

                                        {/* BODY */}
                                        <div className="px-6 pb-7">
                                            <label className="block text-[13px] mb-1.5">
                                                Tên thuộc tính
                                            </label>

                                            <input autoFocus value={editAttributeName} onChange={(e) => setEditAttributeName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); } }}
                                                className="w-full h-[33px] px-3 border border-blue-500 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500" />

                                        </div>

                                        {/* FOOTER */}
                                        <div className="border-t px-6 py-3 flex items-center justify-between">

                                            {/* XÓA */}
                                            <button type="button" onClick={() => setShowDeleteAttributeModal(true)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500">
                                                <Trash2 size={17} />
                                                Xóa
                                            </button>

                                            <div className="flex gap-2">

                                                {/* BỎ QUA */}
                                                <button type="button" onClick={() => { setShowEditAttributeModal(false); setEditAttributeName(""); }}
                                                    className="px-4 h-[40px] border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"  >
                                                    Bỏ qua
                                                </button>
                                                {/* XONG */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const name = editAttributeName.trim();

                                                        if (!name) {
                                                            alert("Vui lòng nhập tên thuộc tính!");
                                                            return;
                                                        }

                                                        const duplicate = attributes.some(
                                                            item =>
                                                                item !== editingAttribute &&
                                                                item.toLowerCase() === name.toLowerCase()
                                                        );

                                                        if (duplicate) {
                                                            alert("Tên thuộc tính đã tồn tại!");
                                                            return;
                                                        }

                                                        // Cập nhật danh sách thuộc tính
                                                        setAttributes(prev =>
                                                            prev.map(item =>
                                                                item === editingAttribute
                                                                    ? name
                                                                    : item
                                                            )
                                                        );

                                                        // Cập nhật những dòng đang sử dụng thuộc tính
                                                        setAttributeRows(prev =>
                                                            prev.map(item =>
                                                                item.selected === editingAttribute
                                                                    ? {
                                                                        ...item,
                                                                        selected: name
                                                                    }
                                                                    : item
                                                            )
                                                        );

                                                        setShowEditAttributeModal(false);
                                                        setEditAttributeName("");
                                                    }}
                                                    className="px-5 h-[40px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                                                >
                                                    Xong
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            )}


                            {/* MODAL XÁC NHẬN XÓA THUỘC TÍNH */}
                            {showDeleteAttributeModal && (
                                <div className="fixed inset-0 z-[10004] bg-black/40 flex items-center justify-center p-4">
                                    <div className="bg-white w-full max-w-[580px] rounded-xl shadow-2xl overflow-hidden">
                                        {/* HEADER */}
                                        <div className="px-6 py-5 flex items-center justify-between">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Xóa thuộc tính
                                            </h2>
                                            <button type="button"  onClick={() => setShowDeleteAttributeModal(false)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200" >
                                                <X size={19} className="text-gray-600" />
                                            </button>
                                        </div>
                                        {/* BODY */}
                                        <div className="px-6 py-4">
                                            <p className="text-sm text-gray-700">
                                                Bạn có muốn xóa thuộc tính {editingAttribute}?
                                            </p>
                                        </div>
                                        {/* FOOTER */}
                                        <div className="border-t border-gray-200 px-6 py-3 flex justify-end gap-2">
                                            <button type="button"  onClick={() => setShowDeleteAttributeModal(false)} className="px-4 h-[40px] border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"  >
                                                Bỏ qua
                                            </button>
                                            <button  type="button"
                                                onClick={() => {
                                                    setAttributes(prev =>
                                                        prev.filter(item => item !== editingAttribute)
                                                    );

                                                    setAttributeRows(prev =>
                                                        prev.map(item =>
                                                            item.selected === editingAttribute
                                                                ? {
                                                                    ...item,
                                                                    selected: "",
                                                                    value: ""
                                                                }
                                                                : item
                                                        )
                                                    );

                                                    setShowDeleteAttributeModal(false);
                                                    setShowEditAttributeModal(false);
                                                    setEditAttributeName("");
                                                }}
                                                className="px-5 h-[40px] bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                                            >
                                                Đồng ý
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            )}

                        </>

                    ) : (

                        /* TAB MÔ TẢ */
                        <div className="flex flex-col gap-5">

                            {/* MÔ TẢ */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden">

                                <div className="min-h-[52px] bg-gray-100 border-b flex items-center flex-wrap px-5 py-2 gap-1">

                                    <span className="text-xl font-semibold text-gray-800 mr-6">
                                        Mô tả
                                    </span>

                                    <select className="h-[36px] w-[172px] border rounded-lg px-2 bg-white text-sm">
                                        <option>Format</option>
                                        <option>Paragraph</option>
                                        <option>Heading 1</option>
                                        <option>Heading 2</option>
                                    </select>

                                    <div className="flex items-center gap-0.5 ml-1">
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <Bold size={19} />
                                        </button>
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <Italic size={19} />
                                        </button>
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <Underline size={19} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-0.5 ml-1">
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <AlignLeft size={19} />
                                        </button>
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <AlignCenter size={19} />
                                        </button>
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <AlignRight size={19} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-0.5 ml-1">
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <List size={19} />
                                        </button>
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <ListOrdered size={19} />
                                        </button>
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <IndentIncrease size={19} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-0.5 ml-1">
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <Link size={19} />
                                        </button>
                                        <button className="w-[39px] h-[39px] border rounded-md bg-gray-100 flex items-center justify-center">
                                            <ImageIcon size={19} />
                                        </button>
                                    </div>

                                </div>

                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="h-[200px] p-4 outline-none text-sm bg-white"
                                />

                            </div>

                            {/* MẪU GHI CHÚ */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden">

                                <div className="h-[63px] bg-gray-100 flex items-center px-5">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Mẫu ghi chú (hóa đơn, đặt hàng)
                                    </h3>
                                </div>

                                <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="h-[174px] p-4 outline-none text-sm bg-white"
                                />

                            </div>

                        </div>
                    )}

                </div>

                {/* FOOTER */}
                <div className="border-t border-gray-200 px-6 py-3 flex items-center justify-between shrink-0 bg-white">
                    <label className="flex items-center gap-2 text-sm text-gray-800">
                        <input type="checkbox" checked={directSale} onChange={e => setDirectSale(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                        Bán trực tiếp
                        <Info size={15} className="text-gray-500" />
                    </label>

                    <div className="flex items-center gap-2">
                        <button onClick={onClose} className="h-[40px] px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50" >
                            Bỏ qua
                        </button>
                        <button className="h-[40px] px-4 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                            Lưu & Tạo thêm hàng
                        </button>
                        <button className="h-[40px] w-[40px] border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                            <ChevronDown size={18} />
                        </button>
                        <button className="h-[40px] px-5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                            Lưu
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default addProduct;
