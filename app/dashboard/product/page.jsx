import AddProduct from "@/components/dashboard/Product/AddProduct";
import Products from "@/components/dashboard/Product/Products";
import { data } from "autoprefixer";

const page = () => {
   
    return (
       <section className="flex justify-center items-center flex-col">
         <AddProduct/>
         <div className="my-10">
            <h1 className="text-xl font-bold shadow-sm px-4 py-4 ">List of Fabrics Types</h1>
            <Products/>
         </div>
       </section>
    )
};



export default page;