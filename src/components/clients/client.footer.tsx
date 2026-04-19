"use client"

import { usePosStore } from "@/store/pos.store"
import { Clock, TruckElectric, Zap } from "lucide-react"

const Clientfooter = () => {
    const mode = usePosStore((s) => s.mode)
    const setMode = usePosStore((s) => s.setMode)

    const itemClass = (value: string) =>
        `flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition
    ${mode === value
            ? "bg-blue-100 text-blue-600 font-semibold"
            : "text-gray-600 hover:bg-gray-100"
        }`

    return (
        <div className="w-full">
            <div className="bg-white  shadow-sm border px-5 py-4 flex items-center justify-between text-lg  ">

                <div className="flex gap-3 ml-4">
                    <div onClick={() => setMode("quick")} className={itemClass("quick")}>
                        <Zap /> Bán nhanh
                    </div>

                    <div onClick={() => setMode("normal")} className={itemClass("normal")}>
                        <Clock /> Bán thường
                    </div>

                    <div onClick={() => setMode("delivery")} className={itemClass("delivery")}>
                        <TruckElectric /> Giao hàng
                    </div>
                </div>


                <div className="flex items-center gap-3">


                    <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full">

                        <div className="p-2 rounded-full bg-white hover:bg-gray-100 cursor-pointer">
                            💬
                        </div>

                        <div className="flex items-center gap-2 text-blue-600 font-semibold">
                            📞 0813559551
                        </div>

                    </div>

                    <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
                        ❓
                    </div>


                    <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold cursor-pointer">
                        T
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Clientfooter