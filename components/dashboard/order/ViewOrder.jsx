"use client"

import { useGetOrderQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";
import Loading from "@/components/utils/Loading";
import Error from "@/components/utils/Error";

const ViewOrder = (props) => {
    const {data,isLoading,isError,error}=useGetOrderQuery()
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <Error data={data}/>
    }
    return (
        <>
             <DataTable columns={columns} data={data} searchingValue={"orderNumber"} placeholder={"Filter with Order Number..."}>
                </DataTable>
        </>
    )
};
export default ViewOrder;