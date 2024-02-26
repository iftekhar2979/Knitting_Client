import { getData } from "@/hooksAndFunctions/getApi"
import { DataTable } from "../company/DataTable"
import { columns } from "./columns"



export default async function Products() {
    const data = await getData('http://localhost:8000/product/fabrics',{ next: { revalidate: 1, tags: ["Company"] } })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}



