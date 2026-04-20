import AddProduct from "@/components/dashboard/Product/AddProduct";
import Products from "@/components/dashboard/Product/Products";
import { data } from "autoprefixer";
export const metadata = {
   title: "Product of Teritiary Colour Knit",
   description: "Product of Teritiary Colour Knit",
 };
const page = () => {
   
    return (
        <section className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-brand-green tracking-tight sm:text-4xl">
                    Fabric Inventory Management
                </h1>
                <p className="mt-3 text-lg text-gray-500 max-w-2xl">
                    Add new fabric types and manage your existing inventory. Keep track of all fabric specifications in one place.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 sticky top-8">
                    <AddProduct />
                </div>
                
                <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-xl font-semibold text-gray-800">List of Fabric Types</h2>
                    </div>
                    <div className="p-2">
                        <Products />
                    </div>
                </div>
            </div>
        </section>
    )
};



export default page;