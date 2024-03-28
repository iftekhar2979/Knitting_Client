import AllDeliveryLists from '@/components/dashboard/order/SingleOrder/allDeliveryList/AlldeliveryLists';
import DeliveryList from '@/components/dashboard/order/SingleOrder/delivery/DeliveryList';
import react from 'react';
export const metadata = {
    title: "Delivery List of Teritiary Colour Knit",
    description: "Delivery List of Teritiary Colour Knit",
  };
const page = (props) => {
    return (
        <div>
            <AllDeliveryLists/>
        </div>
    )
};
export default page;