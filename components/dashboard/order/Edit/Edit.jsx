"use client"
import { useAddOrderMutation, useGetOrderQuery, useGetSingleOrderForEditQuery, useGetSingleOrderQuery } from "@/lib/features/order/orderApi"

import EditOrder from "./EditOrder"
import Loading from "@/components/utils/Loading"
import Error from "@/components/utils/Error"
import Link from "next/link"


 function Edit({id}) {
 

    const {data,isLoading,isError:insertingOrderError}=useGetSingleOrderForEditQuery(id)
if(isLoading){
    return <Loading/>
}
    return (
     <>

     {/* {data?.restQuantity ===data?.orderQuantity   ? */}
     <>
      <div className="my-4 border rounded-md shadow-sm p-10">
                    <h2 className="py-2 px-4">Company Name : <span className="border-b py-2 px-4 font-extrabold">{data?.company?.companyName}</span></h2>
                    <h2 className="py-2 px-4">Buyer  : <span className="border-b py-2 px-4 font-extrabold ">{data?.buyer?.buyerName}</span></h2>
                    <h2 className="py-2 px-4 ">Fabrics Name  : <span className="border-b py-2 px-4 selection:bg-pink-300 font-extrabold">{data?.fabricsName}</span></h2>
                   
     </div>
     <EditOrder id={id} data={data}/>
     </>
  
  
     </>
    )
}
export default Edit