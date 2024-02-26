import { AddOrder } from '@/components/dashboard/addOrder/AddOrder';
import react from 'react';

const page = (props) => {
    return (
        <section className='flex justify-center flex-col'>
            <div className='text-3xl font-semibold '>
                <h2>Add New Order Here</h2>
            </div>
            <div>
                <AddOrder/>
            </div>
        </section>
    )
};
export default page;