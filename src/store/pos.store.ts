"use client"
import { create } from "zustand"

type Invoice = {
    id: number
    items: any[]
    total: number
    orderType: "invoice" | "order"
}

type Mode = "quick" | "normal" | "delivery"
type OrderType = "invoice" | "order"

type PosState = {
    invoices: Invoice[]
    currentInvoiceId: number | null
    mode: Mode


    quantity: number
    isEditingQty: boolean

    addInvoice: () => void
    addOrder: () => void
    switchInvoice: (id: number) => void
    setMode: (mode: Mode) => void

    toggleOrderType: (id: number) => void
    setQuantity: (q: number) => void
    setEditingQty: (v: boolean) => void
}
export const usePosStore = create<PosState>((set) => {
    const firstInvoice = {
        id: Date.now(),
        items: [],
        total: 0,
        orderType: "invoice" as const,
    }

    return {
        invoices: [firstInvoice],
        currentInvoiceId: firstInvoice.id,

        mode: "normal",

        quantity: 0,
        isEditingQty: false,

        addInvoice: () =>
            set((state) => {
                const newInvoice = {
                    id: Date.now(),
                    items: [],
                    total: 0,
                    orderType: "invoice" as const,
                }
                return {
                    invoices: [...state.invoices, newInvoice],
                    currentInvoiceId: newInvoice.id,
                }
            }),
        addOrder: () =>
            set((state) => {
                const newOrder = {
                    id: Date.now(),
                    items: [],
                    total: 0,
                    orderType: "order" as const,
                }
                return {
                    invoices: [...state.invoices, newOrder],
                    currentInvoiceId: newOrder.id,
                }
            }),
        deleteInvoice: (id: number) =>
            set((state) => {
                // ❗ luôn giữ ít nhất 1 hóa đơn
                if (state.invoices.length <= 1) return state

                const newInvoices = state.invoices.filter(inv => inv.id !== id)

                return {
                    invoices: newInvoices,
                    currentInvoiceId: newInvoices[0].id,
                }
            }),
        switchInvoice: (id) =>
            set(() => ({
                currentInvoiceId: id,
            })),

        toggleOrderType: (id: number) =>
            set((state) => ({
                invoices: state.invoices.map(inv =>
                    inv.id === id
                        ? {
                            ...inv,
                            orderType: inv.orderType === "invoice" ? "order" : "invoice"
                        }
                        : inv
                )
            })),

        setQuantity: (q) => set(() => ({ quantity: q })),

        setEditingQty: (v) => set(() => ({ isEditingQty: v })),

        setMode: (mode) => set(() => ({ mode })),
    }
})





