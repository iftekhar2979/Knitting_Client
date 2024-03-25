"use client"
import { DataTable } from '@/components/dashboard/company/DataTable';
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetAllDeliveryQuery, } from '@/lib/features/delivery/deliveryApi';
import { columns } from './columns';

const AllDeliveryLists = ({}) => {

    const {data,isLoading,isError}=useGetAllDeliveryQuery()
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <Error/>
    }
    return (
        <>
     <DataTable columns={columns} data={data} searchingValue={"id"} placeholder={"Filter With Chalan No..."}> 
      </DataTable>
        </>
    )
};
export default AllDeliveryLists;