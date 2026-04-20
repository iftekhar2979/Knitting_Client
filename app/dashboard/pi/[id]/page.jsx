
import BillStatement from '@/components/dashboard/Bill/BillStatement';
import { PiStatement } from '@/components/dashboard/perfromaInvoices/PiStatement';
import react from 'react';
let piNumber=""
export const metadata = {
    title: `Bill Number ${piNumber}`,
    description: "Orders of Teritiary Colour Knit",
  };
const page = async ({ params }) => {
    const { id } = await params;
    piNumber=id
    return (
        <>
        <BillStatement id={id}/>
            {/* <PiStatement id={id} /> */}
        </>
    )
};
export default page;