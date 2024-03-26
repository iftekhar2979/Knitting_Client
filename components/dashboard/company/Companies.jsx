
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} searchingValue={"companyName"} placeholder={"Filter With Company..."}/>
    </div>
  )
}
