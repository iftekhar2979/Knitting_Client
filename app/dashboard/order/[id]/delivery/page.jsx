import ShowChalan from '@/components/dashboard/chalan/ShowChalan';

import DeliveryList from '@/components/dashboard/order/SingleOrder/delivery/DeliveryList';


const page = async ({params}) => {
    const { id } = await params;
    return (
        <div>
            <DeliveryList id={id}/>
           <ShowChalan/>
        </div>
    )
};

export default page;