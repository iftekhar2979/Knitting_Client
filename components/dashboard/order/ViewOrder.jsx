"use client"

import { useGetOrderQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";
import Loading from "@/components/utils/Loading";
import Error from "@/components/utils/Error";
import { useEffect, useState } from "react";
import socket from '@/socketService.js';
import { useAppDispatch } from "@/lib/hooks";
import { setNotification } from "@/lib/features/user/userSlice";
const ViewOrder = (props) => {
    let {data,isLoading,isError,error}=useGetOrderQuery(undefined,{
        refetchOnMountOrArgChange:true
    })

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
export default ViewOrder;