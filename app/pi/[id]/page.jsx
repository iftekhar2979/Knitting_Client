import { PiStatement } from '@/components/dashboard/perfromaInvoices/PiStatement';
import react from 'react';

const page = ({ params: { id } }) => {
 
    return (
        <>

            <PiStatement id={id} />
            </>
    )
};
export default page;