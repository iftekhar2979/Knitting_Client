"use client"
import DetailsInfo from '@/components/dashboard/order/SingleOrder/Details/DetailsInfo';
import { OrderDetails } from '@/components/dashboard/order/SingleOrder/Details/OrderDetails';
import Loading from '@/components/utils/Loading';
import { getData } from '@/hooksAndFunctions/getApi';
import {  useGetSingleOrderDetailsQuery } from '@/lib/features/orderDetailis/orderDetailsApi';

const  Details = ({id}) => {
    const {data,isLoading}=useGetSingleOrderDetailsQuery(id)
    if(isLoading) return <Loading/>
 
    return (
        <div>
           {data? <DetailsInfo data={data}/>: <OrderDetails id={id}/>}
        </div>
    )
};
export default Details;