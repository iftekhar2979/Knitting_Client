import ShowChalan from '@/components/dashboard/chalan/ShowChalan';

import DeliveryList from '@/components/dashboard/order/SingleOrder/delivery/DeliveryList';


const page = ({params}) => {
 
    return (
        <div>
            <DeliveryList id={params.id}/>
           <ShowChalan/>
        </div>
    )
};

export default page;