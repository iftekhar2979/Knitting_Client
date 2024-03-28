"use client"
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetPerformaInvoiceListQuery } from '@/lib/features/Invoice/invoiceApi';
import react from 'react';
import { DataTable } from '../company/DataTable';
import { columns } from './columns';

const PIList = (props) => {
    const {data,isLoading,isError,error}=useGetPerformaInvoiceListQuery()
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <Error data={"Fetching Data Error !!! Please try again and contact your software Provider"}/>
    }
    return (
        <>
        <DataTable columns={columns} data={data} searchingValue={"piNumber"} placeholder={"Filter with PI Number..."}>
           </DataTable>
   </>
    )
};
export default PIList;