"use client"

import { create } from "zustand"

export type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
}

export type OrderType = "invoice" | "order"
export type Mode = "quick" | "normal" | "delivery"

export type Invoice = {
    id: number
    items: CartItem[]
    total: number
    orderType: OrderType
}

type PosState = {
    invoices: Invoice[]
    currentInvoiceId: number | null
    mode: Mode

    addInvoice: () => void
    addOrder: () => void
    deleteInvoice: (id: number) => void
    switchInvoice: (id: number) => void

    toggleOrderType: (id: number) => void
    setMode: (mode: Mode) => void

    addProduct: (
        invoiceId: number,
        product: Omit<CartItem, "quantity">
    ) => void

    removeProduct: (
        invoiceId: number,
        productId: number
    ) => void

    updateQuantity: (
        invoiceId: number,
        productId: number,
        quantity: number
    ) => void
}

export const usePosStore = create<PosState>((set) => {
    const firstInvoice: Invoice = {
        id: Date.now(),
        items: [],
        total: 0,
        orderType: "invoice",
    }

    return {
        invoices: [firstInvoice],
        currentInvoiceId: firstInvoice.id,

        mode: "normal",

        addInvoice: () =>
            set((state) => {
                const newInvoice: Invoice = {
                    id: Date.now(),
                    items: [],
                    total: 0,
                    orderType: "invoice",
                }

                return {
                    invoices: [...state.invoices, newInvoice],
                    currentInvoiceId: newInvoice.id,
                }
            }),

        addOrder: () =>
            set((state) => {
                const newOrder: Invoice = {
                    id: Date.now(),
                    items: [],
                    total: 0,
                    orderType: "order",
                }

                return {
                    invoices: [...state.invoices, newOrder],
                    currentInvoiceId: newOrder.id,
                }
            }),

        deleteInvoice: (id) =>
            set((state) => {
                if (state.invoices.length <= 1) {
                    return state
                }

                const newInvoices = state.invoices.filter(
                    (inv) => inv.id !== id
                )

                return {
                    invoices: newInvoices,
                    currentInvoiceId: newInvoices[0]?.id ?? null,
                }
            }),

        switchInvoice: (id) =>
            set({
                currentInvoiceId: id,
            }),

        toggleOrderType: (id) =>
            set((state) => ({
                invoices: state.invoices.map((inv) =>
                    inv.id === id
                        ? {
                              ...inv,
                              orderType:
                                  inv.orderType === "invoice"
                                      ? "order"
                                      : "invoice",
                          }
                        : inv
                ),
            })),

        setMode: (mode) =>
            set({
                mode,
            }),

        addProduct: (invoiceId, product) =>
            set((state) => ({
                invoices: state.invoices.map((inv) => {
                    if (inv.id !== invoiceId) {
                        return inv
                    }

                    const exist = inv.items.find(
                        (item) => item.id === product.id
                    )

                    if (exist) {
                        const updatedItems = inv.items.map((item) =>
                            item.id === product.id
                                ? {
                                      ...item,
                                      quantity:
                                          item.quantity + 1,
                                  }
                                : item
                        )

                        return {
                            ...inv,
                            items: updatedItems,
                            total: updatedItems.reduce(
                                (sum, item) =>
                                    sum +
                                    item.price *
                                        item.quantity,
                                0
                            ),
                        }
                    }

                    const updatedItems = [
                        ...inv.items,
                        {
                            ...product,
                            quantity: 1,
                        },
                    ]

                    return {
                        ...inv,
                        items: updatedItems,
                        total: updatedItems.reduce(
                            (sum, item) =>
                                sum +
                                item.price *
                                    item.quantity,
                            0
                        ),
                    }
                }),
            })),

        removeProduct: (invoiceId, productId) =>
            set((state) => ({
                invoices: state.invoices.map((inv) => {
                    if (inv.id !== invoiceId) {
                        return inv
                    }

                    const updatedItems = inv.items.filter(
                        (item) =>
                            item.id !== productId
                    )

                    return {
                        ...inv,
                        items: updatedItems,
                        total: updatedItems.reduce(
                            (sum, item) =>
                                sum +
                                item.price *
                                    item.quantity,
                            0
                        ),
                    }
                }),
            })),

        updateQuantity: (
            invoiceId,
            productId,
            quantity
        ) =>
            set((state) => ({
                invoices: state.invoices.map((inv) => {
                    if (inv.id !== invoiceId) {
                        return inv
                    }

                    const updatedItems = inv.items.map(
                        (item) =>
                            item.id === productId
                                ? {
                                      ...item,
                                      quantity:
                                          quantity < 1
                                              ? 1
                                              : quantity,
                                  }
                                : item
                    )

                    return {
                        ...inv,
                        items: updatedItems,
                        total: updatedItems.reduce(
                            (sum, item) =>
                                sum +
                                item.price *
                                    item.quantity,
                            0
                        ),
                    }
                }),
            })),
    }
})