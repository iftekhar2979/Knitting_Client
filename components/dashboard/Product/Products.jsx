import { DataTable } from "../company/DataTable"
import { columns } from "./columns"

async function getData() {
    const res = await fetch('http://localhost:8000/product/fabrics', { next: { revalidate: 1, tags: ["Company"] } })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Products() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}



