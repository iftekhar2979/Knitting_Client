import AddYarnDetails from '@/components/dashboard/order/SingleOrder/yarnDetails/AddYarnDetails';
import YarnDetailsInfo from "@/components/dashboard/order/SingleOrder/yarnDetails/YarnDetailsInfo.jsx"
import { FaPlus, FaListUl } from "react-icons/fa";

const yarnDetails = async ({ params }) => {
    const { id } = await params;
    return (
        <div className="container mx-auto px-4 space-y-12 py-10">
            <header className="space-y-2 text-center md:text-left border-b pb-8 border-slate-100">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">Yarn Management</h1>
                <p className="text-muted-foreground font-medium">Track supplier receipts, process losses, and returns for Order #{id}</p>
            </header>

            <section className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-green/20 rounded-full hidden md:block" />
                <div className="flex items-center gap-2 mb-6 px-2">
                    <div className="p-2 bg-brand-green text-white rounded-lg shadow-sm">
                        <FaPlus size={14} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-700">New Receipt</h2>
                </div>
                <AddYarnDetails id={id} />
            </section>
            
            <section className="relative pt-6">
                <div className="absolute -left-4 top-6 bottom-0 w-1 bg-slate-200 rounded-full hidden md:block" />
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="p-2 bg-slate-800 text-white rounded-lg shadow-sm">
                        <FaListUl size={14} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-700">Inventory Status</h2>
                </div>
                <YarnDetailsInfo id={id} />
            </section>
        </div>
    )
};

export default yarnDetails;


