"use client"
import { useAddOrderMutation, useGetOrderQuery, useGetSingleOrderForEditQuery, useGetSingleOrderQuery } from "@/lib/features/order/orderApi"

import EditOrder from "./EditOrder"
import Loading from "@/components/utils/Loading"
import Error from "@/components/utils/Error"
import Link from "next/link"
import { Building2, User, Shirt } from "lucide-react"


function Edit({ id }) {


  const { data, isLoading, isError: insertingOrderError } = useGetSingleOrderForEditQuery(id)
  if (isLoading) {
    return <Loading />
  }
  return (
    <>

      <div className="my-8 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-emerald-900/50 dark:bg-gray-900">
        <div className="flex flex-col md:flex-row md:items-center divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">
          <div className="flex-1 p-6 flex items-center gap-4 group hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</p>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{data?.company?.companyName}</h2>
            </div>
          </div>

          <div className="flex-1 p-6 flex items-center gap-4 group hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Buyer</p>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{data?.buyer?.buyerName}</h2>
            </div>
          </div>

          <div className="flex-1 p-6 flex items-center gap-4 group hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fabrics</p>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{data?.fabricsName}</h2>
            </div>
          </div>
        </div>
      </div>
      <EditOrder id={id} data={data} />
    </>

  )
}
export default Edit