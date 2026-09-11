"use client";

import ClientHeader from "@/components/clients/client.hearder";
import Clientfooter from "@/components/clients/client.footer";
import ClientSideBar from "@/components/clients/client.sidebar";
import Normalsale from "@/components/Pos/NormalSale";
// import Quicksale from "@/components/Pos/QuickSale";
import { usePosStore } from "@/store/pos.store";
import Quicksale from "@/components/Pos/QuickSale";
import Deliverysale from "@/components/Pos/DeliverySale";




const Pospage =  () => {
    const mode = usePosStore((s) => s.mode);

    return (
        <div className="min-h-screen flex flex-col">
           
            <ClientHeader />

        
            <div className="flex flex-1">
                
                <ClientSideBar />

               
                <main className="flex-1 p-4 bg-[#f3f4f6]">
                    {mode === "quick" && <Quicksale />}

                    {mode === "normal" && <Normalsale />}

                    {mode === "delivery" && <Deliverysale />}
                </main>
            </div>

           
            <Clientfooter />
        </div>
    )
} 
export default Pospage;

