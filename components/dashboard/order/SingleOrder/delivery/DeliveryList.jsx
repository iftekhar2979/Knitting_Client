"use client"
import { DataTable } from '@/components/dashboard/company/DataTable';
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetAllDeliveryforAnSingleOrderQuery } from '@/lib/features/delivery/deliveryApi';
import react from 'react';
import { columns } from './columns';

const DeliveryList = ({id}) => {
    const {data,isLoading,isError}=useGetAllDeliveryforAnSingleOrderQuery(id)
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <Error/>
    }
    return (
        <>
         <DataTable columns={columns} data={data} searchingValue={"deliveredQuantity"} placeholder={"Filter With Delivered Quantity..."}/>
        </>
    )
};
export default DeliveryList;