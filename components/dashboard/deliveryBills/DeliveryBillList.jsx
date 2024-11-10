"use client"
import { useGetAllDeliveryBillsQuery } from '@/lib/features/delivery/deliveryApi'
import React from 'react'
import { DataTable } from '../company/DataTable'
import Loading from '@/components/utils/Loading'
import { columns } from './columns'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DeliveryBillList() {
    const {data,isLoading,isError,error}=useGetAllDeliveryBillsQuery()
    const pathname=usePathname()
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <Error data={"Fetching Data Error !!! Please try again and contact your software Provider"}/>
    }
  return (
   <>
   <div className="border flex items-center">
  <Link href="/dashboard/performaInvoices" className={`py-2 px-4 border-l ${pathname === "/dashboard/performaInvoices" ? "bg-green-400 text-white" : ""}`}>
      Order Bill
  </Link>

  <Link href="/dashboard/performaInvoices/bills" className={`px-4 border-l py-2 ${pathname === "/dashboard/performaInvoices/bills" ? "bg-green-400 text-white" : ""}`}>
      Chalan Bill
  </Link>
</div>
   <DataTable columns={columns} data={data} />
   
   </>
  )
}
