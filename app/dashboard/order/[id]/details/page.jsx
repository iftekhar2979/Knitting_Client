"use client"
import DetailsInfo from '@/components/dashboard/order/SingleOrder/Details/DetailsInfo';
import { OrderDetails } from '@/components/dashboard/order/SingleOrder/Details/OrderDetails';
import Loading from '@/components/utils/Loading';
import { getData } from '@/hooksAndFunctions/getApi';
import {  useGetSingleOrderDetailsQuery } from '@/lib/features/orderDetailis/orderDetailsApi';

const  page = ({params}) => {
    const {data,isLoading}=useGetSingleOrderDetailsQuery(params.id)
    if(isLoading) return <Loading/>
 
    return (
        <div>
           {data? <DetailsInfo data={data}/>: <OrderDetails id={params.id}/>}
        </div>
    )
};
export default page;