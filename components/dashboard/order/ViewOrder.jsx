"use client"

import { useGetOrderQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";

const ViewOrder = (props) => {
    const {data,isLoading,isError,error}=useGetOrderQuery()
    if(isLoading){
        return "Loading..."
    }
    return (
        <>
             <DataTable columns={columns} data={data} />
        </>
    )
};
export default ViewOrder;