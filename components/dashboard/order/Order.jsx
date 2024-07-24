"use client"
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetSingleOrderQuery } from '@/lib/features/order/orderApi';
import react from 'react';
import QuantityInfo from './SingleOrder/QuantityInfo';
import { format } from 'date-fns';
import { MdBuild, MdBuildCircle, MdBusinessCenter, MdLocationCity, MdLocationPin, MdSell } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Order = ({ id }) => {
    const { data, isLoading, isError } = useGetSingleOrderQuery(id)

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error data={"Sorry , there is something wrong with server"} />
    }
    const { companyName, company = {}, status, buyerName, targetDate, orderNumber, programNumber, jobNumber, season, bookingNumber, sbNumber, fabricsName, orderedDate } = data
    return (
        <section>
            <div className='flex justify-between py-4 text-inactive'>
                <div>

                    <h2 className='font-bold text-xl'>Order ID : {orderNumber}</h2>
                    <h2 className="">Status  : <span className="border-b ">{status}</span></h2>
                </div>
                <div className=''>

                    <Button className="bg-white text-gray-900 hover:bg-gray-500 hover:text-gray-100 border h-8 "><Link href={`/dashboard/order/${id}/edit`}>Edit</Link></Button>
                    <Button className="bg-white text-gray-900 hover:bg-gray-500 hover:text-gray-100 border h-8 mx-4">Issues</Button>
                </div>

            </div>
            <div className="flex flex-col md:flex-row font-mono justify-between  ">
                <div className='border w-full md:w-[35%] px-4 md:px-4 my-4'>

                    <div className='flex items-center py-4 border-b' >
                        <MdBusinessCenter size={40} />
                        <h2 className=" font-semibold text-2xl pl-2 text-inactive"> {companyName}</h2>
                    </div>
                    <div>
                        <div className='flex items-center py-4 '>
                            <div className='flex p-2'>
                                <MdLocationPin size={20} />
                                <h2 className=" font-semibold text-lg text-inactive"> {company?.location}</h2>
                            </div>
                            <div className='flex p-2 px-2'>
                                <MdSell size={20} />
                                <h2 className="px-4 font-semibold text-lg text-inactive"> {buyerName}</h2>
                            </div>
                        </div>

                    </div>

                </div>
                <div className=' grid  grid-cols-2  gap-2 md:grid-cols-4  '>
                    <div className=' grid grid-rows-2 px-2 m-4 md:m-2  '>
                        <div className='h-[100%] flex flex-col  '>
                            <h2 className="">Creation Date </h2>
                            <p> <span className="text-inactive">{format(orderedDate, "PP")}</span></p>
                        </div>
                        <div className='h-[100%] flex flex-col  '>
                            <h2 className="">Fabric Type</h2>
                            <p> <span className="text-inactive">{fabricsName}</span></p>
                        </div>

                    </div>
                    <div className='grid grid-rows-2 px-2 m-4 md:m-2  '>
                        <div className='h-[100%] flex flex-col  '>
                            <h2 className="">Season</h2>
                            <p> <span className="text-inactive">{season}</span></p>
                        </div>
                        <div className='h-[100%] flex flex-col  '>
                            <h2 className=""> Target Date</h2>
                            <p> <span className="text-inactive">{format(targetDate, "PP")}</span></p>
                        </div>
                    </div>
                    <div className='grid grid-rows-2 px-2 m-4 md:m-2  '>
                        <div className='h-[100%] flex flex-col  '>
                            <h2 className="">SB No.</h2>

                            <p> <span className="text-inactive">{sbNumber ? sbNumber : "_________"}</span></p>
                        </div>
                        <div className='h-[100%] flex flex-col  '>
                            <h2 className="">Job No.</h2>
                            <p> <span className="text-inactive">{jobNumber ? jobNumber : "_________"}</span></p>
                        </div>
                    </div>
                    <div className='grid grid-rows-2 px-2 m-4 md:m-2 '>
                        <div className='h-[100%] flex flex-col  '>
                            <h2 className="">Season</h2>
                            <p> <span className="text-inactive">{programNumber ? programNumber : "_________"}</span></p>
                        </div>
                        <div className='h-[100%] flex flex-col  '>
                            <h2 className="">Booking No.</h2>

                            <p> <span className="text-inactive">{bookingNumber ? bookingNumber : "_________"}</span></p>
                        </div>

                    </div>

                    {/* <h2 className="">Target Date : <span className="border-b "></span></h2> */}
                </div>
            </div>

            {/* <h2 className="text-center text-3xl underline font-serif">Order Information of {orderNumber}</h2> */}

            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 font-serif"> */}

            {/* <div className="my-4 border rounded-md shadow-sm p-10">
                    <h2 className="">Company Name : <span className="border-b  font-extrabold">{companyName}</span></h2>
                    <h2 className="">Location : <span className="border-b ">{company?.location}</span></h2>
                    <h2 className="">Buyer  : <span className="border-b  font-extrabold ">{buyerName}</span></h2>
                    <h2 className=" ">Fabric Type : <span className="border-b  selection:bg-pink-300 font-extrabold">{fabricsName}</span></h2>
                    <h2 className="">Ordered Date : <span className="border-b  ">{format(orderedDate, "PP")}</span></h2>
                    <h2 className="">Target Date : <span className="border-b ">{format(targetDate, "PP")}</span></h2>
                </div>
                <div className="my-4 border rounded-md shadow-sm p-10 ">
                    <h2 className="">Season : <span className="border-b  text-bold font-extrabold">{season}</span> </h2>
                    <h2 className="">Order No : <span className="border-b  font-extrabold">{orderNumber}</span></h2>
                    <h2 className="">SB No : <span className="border-b  text-bold font-extrabold">{sbNumber}</span> </h2>
                    <h2 className="">Job No : <span className="border-b  text-bold">{jobNumber}</span> </h2>
                    <h2 className="">Program No : <span className="border-b  text-bold">{programNumber}</span> </h2>
                    <h2 className="">Booking No : <span className="border-b  text-bold">{bookingNumber}</span> </h2>
                </div> */}
            {/* </div> */}

            <QuantityInfo id={id} />
        </section>
    )
};
export default Order;