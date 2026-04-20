import Edit from '@/components/dashboard/order/Edit/Edit';
import { cookies } from 'next/headers';
import react from 'react';

const page = async ({params}) => {
    const { id } = await params;

    return (
        <div>
            <Edit id={id}/>
        </div>
    )
};
export default page;