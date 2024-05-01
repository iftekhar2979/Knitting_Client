"use client"
import { DataTable } from "../company/DataTable"
import { columns } from "./columns"
import { useGetProductQuery } from "@/lib/features/Product/productApi"
import Loading from "@/components/utils/Loading"
import Error from "@/components/utils/Error"

export default function Products() {
    const { data, isLoading, error, isError } = useGetProductQuery()
    if (isLoading) {
            return <Loading />
        }
        console.log(data)
    if (isError) {
        return <Error data={"Failed to Fetching Products !!!"} />
    }
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}



