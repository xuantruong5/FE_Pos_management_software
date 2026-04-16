"use client"

import { useState } from "react"
import { usePosStore } from "@/store/pos.store"
import { ScanBarcode, CirclePlus, ArrowLeftRight, X, CircleChevronDown, ChevronDown, Handbag } from 'lucide-react';
import { Printer, ShoppingBag } from "heroicons-react";
import ReplyIcon  from '@mui/icons-material/Reply';
import LoopIcon from '@mui/icons-material/Loop';
import MenuIcon from '@mui/icons-material/Menu';


const ClientHeader = () => {
    const {
        addInvoice,
        deleteInvoice,
        addOrder,
        invoices,
        currentInvoiceId,
        quantity,
        setQuantity,
        setEditingQty,
        toggleOrderType,
        switchInvoice,


    } = usePosStore()

    const [tempQty, setTempQty] = useState(quantity.toString())
    const currentInvoice = invoices.find(inv => inv.id === currentInvoiceId)

    const [isEditingBox, setIsEditingBox] = useState(false)
    const [boxValue, setBoxValue] = useState("")
    const [openMenu, setOpenMenu] = useState(false)

    const handleBlur = () => {
        const num = Number(tempQty)
        setQuantity(num > 0 ? num : 1)
        setEditingQty(false)
    }

    const handleBoxBlur = () => {
        setIsEditingBox(false)
    }
    const currentIndex = invoices.findIndex(
        (inv) => inv.id === currentInvoiceId
    )
    const getIndex = (type, id) => {
        return (
            invoices
                .filter(i => i.orderType === type)
                .findIndex(i => i.id === id) + 1
        )
    }


    return (
        <div className="flex items-center gap-3 bg-blue-600 px-4 py-3 text-white">

            <input
                placeholder="Tìm hàng hóa (F3)"
                className="bg-white text-black px-3 py-2 rounded w-[300px] outline-none"
            />

            {!isEditingBox ? (
                <div
                    onClick={() => setIsEditingBox(true)}
                    className="0 p-2 rounded cursor-pointer flex items-center justify-center w-[40px]"
                >
                    <ScanBarcode />
                </div>
            ) : (
                <input
                    autoFocus
                    value={boxValue}
                    onChange={(e) => setBoxValue(e.target.value)}
                    onBlur={handleBoxBlur}
                    onClick={() => setIsEditingBox(false)}
                    onKeyDown={(e) => e.key === "Enter" && handleBoxBlur()}
                    className="bg-white text-black px-2 py-2 rounded w-[80px] outline-none"

                />
            )}

            <div className="flex items-center gap-2">
                {invoices.map((inv, index) => {
                    const isActive = inv.id === currentInvoiceId


                    return (
                        <div
                            key={inv.id}
                            onClick={() => switchInvoice(inv.id)}
                            className={`relative group flex items-center px-3 py-2 rounded  cursor-pointer
            ${isActive ? "bg-white text-black" : "bg-blue-500 text-white"}`}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleOrderType(inv.id)
                                }}
                            >
                                <ArrowLeftRight className="text-blue-500 mr-2" />
                            </button>

                            <span className={`font-semibold ${inv.orderType !== "invoice" ? "text-yellow-500" : ""}`}>
                                {inv.orderType === "invoice"
                                    ? `Hóa đơn ${getIndex("invoice", inv.id)}`
                                    : `Đặt hàng ${getIndex("order", inv.id)}`
                                }
                            </span>


                            <div className="absolute top-full mt-1 left-0 
                bg-white text-black text-xs px-2 py-1 rounded shadow
                opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">

                                {inv.orderType === "invoice"
                                    ? "Chuyển sang Đặt hàng"
                                    : "Chuyển sang Hóa đơn"}
                            </div>

                            <X
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteInvoice(inv.id)
                                }}
                                className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
                            />
                        </div>
                    )
                })}

                <button onClick={addInvoice} className="px-3 py-2 rounded">
                    <CirclePlus />
                </button>
            </div>





            <div className="relative">
                <button
                    onClick={() => setOpenMenu(!openMenu)}
                    className="py-2 rounded"
                >
                    <ChevronDown />
                </button>

                {openMenu && (
                    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded shadow z-50 w-[180px]">
                        <div
                            onClick={() => {
                                addOrder()
                                setOpenMenu(false)
                            }}
                            className="px-3 py-2 hover:bg-blue-50 text-sm rounded flex items-center gap-2"
                        >
                            Thêm mới đặt hàng
                        </div>
                    </div>
                )}
            </div>



            <div className="ml-auto flex gap-4 items-center">
                <span> < ShoppingBag size={32} /> </span>
                <span><ReplyIcon size={32} /></span>
                <span><LoopIcon size={32}/></span>
                <span><Printer size={32}/></span>

                <span className="font-semibold">0987654321</span>

                <span><MenuIcon size={32}/></span>
            </div>
        </div>
    )
}

export default ClientHeader