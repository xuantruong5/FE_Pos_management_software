import ClientHeader from "@/components/clients/client.hearder";
import Clientfooter from "@/components/clients/client.footer";
import ClientSideBar from "@/components/clients/client.sidebar";


const Pospage =  () => {
    return (
        <div className="min-h-screen flex flex-col">
           
            <ClientHeader />

        
            <div className="flex flex-1">
                
                <ClientSideBar />

               
                <main className="flex-1 p-4">
                    Nội dung POS ở đây
                </main>
            </div>

           
            <Clientfooter />
        </div>
    )
} 
export default Pospage;

