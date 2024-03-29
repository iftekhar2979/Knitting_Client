import { PiStatement } from '@/components/dashboard/perfromaInvoices/PiStatement';
import react from 'react';

const page = ({ params: { id } }) => {
 
    return (
        <div className='mx-2'>

            <PiStatement id={id} />
        </div>
    )
};
export default page;