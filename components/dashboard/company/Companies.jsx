"use client"
import { useGetCompanyQuery } from "@/lib/features/company/companyApi"
// import { useGetCompanyQuery } from "@/lib/features/apiSlice"
import { Payment, columns } from "./columns"
import { DataTable } from "./DataTable"
import { LoaderIcon } from "lucide-react"
import Loading from "@/components/utils/Loading"
import Error from "@/components/utils/Error"


export default  function Companies() {
  const {data,isLoading,error,isError} =useGetCompanyQuery()
  if(isLoading){
    return <Loading/>
  }
  if(isError){
   return <Error data={"Fetching Data Error!! Please Try Again and Contact to Provider"}/> 
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Partner Companies</h2>
      </div>
      <div className="p-2 overflow-x-auto">
        <DataTable columns={columns} data={data} searchingValue={"companyName"} placeholder={"Filter With Company..."}/>
      </div>
    </div>
  )
}
