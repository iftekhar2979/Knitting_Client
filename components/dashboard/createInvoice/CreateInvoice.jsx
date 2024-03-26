"use client"

import { useGetOrderQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";
import Loading from "@/components/utils/Loading";
import Error from "@/components/utils/Error";

const CreateInvoice = (props) => {
    const {data,isLoading,isError,error}=useGetOrderQuery()
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <Error data={"Fetching Data Error !!! Please try again and contact your software Provider"}/>
    }
    return (
        <>
             <DataTable columns={columns} data={data} searchingValue={"orderNumber"} placeholder={"Filter with Order Number..."}>
                </DataTable>
        </>
    )
};
export default CreateInvoice;