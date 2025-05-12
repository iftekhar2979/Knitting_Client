"use client"
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetPerformaInvoiceListQuery } from '@/lib/features/Invoice/invoiceApi';
import react, { useState } from 'react';
import { DataTable } from '../company/DataTable';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const PIList = (props) => {
    const [pageIndex, setPageIndex] = useState(0); // 0-based index
    const [pageSize, setPageSize] = useState(50);

  
    const { data, isLoading, isError, error } = useGetPerformaInvoiceListQuery({
      page: pageIndex + 1,
      limit: pageSize,
    }, {
      refetchOnMountOrArgChange: true,
    });
  
    const pathname=usePathname()
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <Error data={"Fetching Data Error !!! Please try again and contact your software Provider"}/>
    }
    console.log(pathname)
    return (
        <>
<div className="border flex items-center">
  <Link href="/dashboard/performaInvoices" className={`py-2 px-4 border-l ${pathname === "/dashboard/performaInvoices" ? "bg-green-400 text-white" : ""}`}>
      Order Bill
  </Link>

  <Link href="/dashboard/performaInvoices/bills" className={`px-4 border-l py-2 ${pathname === "/dashboard/performaInvoices/bill" ? "bg-green-400 text-white" : ""}`}>
      Chalan Bill
  </Link>
</div>
<DataTable
      columns={columns}
      data={data?.data || []}
      total={data?.total || 0}
      pageIndex={pageIndex}
      pageSize={pageSize}
      onPageChange={setPageIndex}
      onPageSizeChange={setPageSize}
      searchingValue={"billNumber"}
      placeholder={"Filter with PI Number.."}
    />

        {/* <DataTable columns={columns} data={data} searchingValue={"piNumber"} placeholder={"Filter with PI Number..."}>
           </DataTable> */}
   </>
    )
};
export default PIList;