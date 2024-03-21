import { DataTable } from '@/components/dashboard/company/DataTable';
import { columns } from '@/components/dashboard/order/SingleOrder/delivery/columns';
import { getData } from '@/hooksAndFunctions/getApi';
import react from 'react';

const page = async ({params}) => {
    console.log(params)
    const data = await getData(`http://localhost:8000/order/delivery/${params.id}`,{ next: { revalidate: 1, tags: ["Delivery"] } })
    // console.log(data)
    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
};
export default page;