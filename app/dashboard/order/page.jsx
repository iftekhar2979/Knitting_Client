import ViewOrder from '@/components/dashboard/order/ViewOrder';
import react from 'react';
export const metadata = {
    title: "Order of Teritiary Colour Knit",
    description: "Orders of Teritiary Colour Knit",
  };
const page = () => {
    return (
        <div className='basis-1 '> 
            <ViewOrder/>
        </div>
    )
};
export default page;