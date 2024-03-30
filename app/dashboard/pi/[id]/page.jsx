import { PiStatement } from '@/components/dashboard/perfromaInvoices/PiStatement';
import react from 'react';
let piNumber=""
export const metadata = {
    title: `PI Number ${piNumber}`,
    description: "Orders of Teritiary Colour Knit",
  };
const page = ({ params: { id } }) => {
    piNumber=id
    return (
        <>
            <PiStatement id={id} />
            </>
    )
};
export default page;