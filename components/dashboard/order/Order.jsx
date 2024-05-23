"use client"
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetSingleOrderQuery } from '@/lib/features/order/orderApi';
import react from 'react';
import QuantityInfo from './SingleOrder/QuantityInfo';
import { format } from 'date-fns';

const Order = ({ id }) => {
    const { data, isLoading, isError } = useGetSingleOrderQuery(id)

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error data={"Sorry , there is something wrong with server"} />
    }
    const { companyName, company = {}, buyerName, targetDate, orderNumber, programNumber, jobNumber, season, bookingNumber, sbNumber, fabricsName, orderedDate } = data
    return (
        <div>
            <h2 className="text-center text-3xl underline font-serif">Order Information of {orderNumber}</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 font-serif">
                <div className="my-4 border rounded-md shadow-sm p-10">
                    <h2 className="py-2 px-4">Company Name : <span className="border-b py-2 px-4 font-extrabold">{companyName}</span></h2>
                    <h2 className="py-2 px-4">Location : <span className="border-b py-2 px-4">{company?.location}</span></h2>
                    <h2 className="py-2 px-4">Buyer  : <span className="border-b py-2 px-4 font-extrabold ">{buyerName}</span></h2>
                    <h2 className="py-2 px-4 ">Fabric Type : <span className="border-b py-2 px-4 selection:bg-pink-300 font-extrabold">{fabricsName}</span></h2>
                    <h2 className="py-2 px-4">Ordered Date : <span className="border-b py-2 px-4 ">{format(orderedDate, "PP")}</span></h2>
                    <h2 className="py-2 px-4">Target Date : <span className="border-b py-2 px-4">{format(targetDate, "PP")}</span></h2>
                </div>
                <div className="my-4 border rounded-md shadow-sm p-10 ">
                    <h2 className="py-2 px-4">Season : <span className="border-b py-2 px-4 text-bold font-extrabold">{season}</span> </h2>
                    <h2 className="py-2 px-4">Order No : <span className="border-b py-2 px-4 font-extrabold">{orderNumber}</span></h2>
                    <h2 className="py-2 px-4">SB No : <span className="border-b py-2 px-4 text-bold font-extrabold">{sbNumber}</span> </h2>
                    <h2 className="py-2 px-4">Job No : <span className="border-b py-2 px-4 text-bold">{jobNumber}</span> </h2>
                    <h2 className="py-2 px-4">Program No : <span className="border-b py-2 px-4 text-bold">{programNumber}</span> </h2>
                    <h2 className="py-2 px-4">Booking No : <span className="border-b py-2 px-4 text-bold">{bookingNumber}</span> </h2>
                </div>
            </div>

            <QuantityInfo id={id} />
        </div>
    )
};
export default Order;