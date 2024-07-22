"use client"
import { companyInformation } from '@/contents/companyInformation';
import { useGetSingleBillQuery } from '@/lib/features/Invoice/invoiceApi';
import React, { useEffect, useState } from 'react';
import BillTable from './BillTable';
import Loading from '@/components/utils/Loading';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import useDocumentTitle from '@/hooksAndFunctions/useDocumentTitle';

const BillStatement = ({ id }) => {

    const { data: bill, isLoading, isError } = useGetSingleBillQuery(id);
    let [block, setBlock] = useState(false)
    useDocumentTitle(`Bill Number ${bill ? bill[0]?.billDetails.billNumber : ""}`)
    useEffect(() => {
        // Safely attempt to get the elements
        const nav = document.getElementsByClassName("nav-back relative")[0];
        const footer = document.getElementsByClassName("px-4 py-8 dark:bg-gray-100 dark:text-gray-600")[0];
        // Check if elements exist before trying to modify them
        if (block) {
            if (nav) nav.classList.add("hidden");
            if (footer) footer.classList.add("hidden");
        }
        return () => {
            // Check again when cleaning up
            if (nav) nav.classList.remove("hidden");
            if (footer) footer.classList.remove("hidden");
        };
    }, [block])
    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error loading bill data.</div>;
    }

    const handlePrint = () => {

        setBlock(true)
        setTimeout(() => {
            setBlock(false)
            window.print()
        }, 10);
    }

    return (
        <div>
            <section className='backgroundWaterMark'>
                <div className='leading-4 text-black timesNewRoman'>
                    <div className="mx-2 flex justify-around">
                        <nav className='flex flex-col justify-center'>
                            <div className="flex justify-center items-center">
                                <img src="https://i.postimg.cc/FKc8pPqQ/tertiary.jpg" alt="" className="h-[68px] w-[65px] pt-[7px]" />
                                <h2 className='text-center text-4xl font-bold timesNewRoman piHeading'>{companyInformation?.name}</h2>
                            </div>
                            <h5 className='text-center text-md italic piHeading timesNewRoman mt-1'>{companyInformation?.intro}</h5>
                        </nav>
                    </div>
                    <h1 style={{ width: '100%', height: '1px', backgroundColor: 'black', margin: "2px", marginBottom: '4px' }} className="mt-2"></h1>
                    <h1 style={{ width: '100%', height: '1px', backgroundColor: 'black' }}></h1>
                    <div className='mx-6 my-4'>


                        <div className='flex justify-between mt-2 '>
                            <div className="flex "> <span className="ml-2 widthHeading">Date </span> <span className='ml-[5px]'> : {format(new Date(bill[0].billDetails.createdAt), 'dd-MM-yyyy')}</span></div>
                        </div>
                        <div className='flex justify-between mt-2 '>
                            <div className="flex "> <span className="ml-2 widthHeading">Bill Number </span> <span className='ml-[5px]'> : {bill[0].billDetails.billNumber}</span></div>
                        </div>
                        <div ><span className="ml-2 widthHeading mt-2">To</span> <span className=''>: {bill[0]?.companyName}</span>
                        </div>
                        <div ><span className="ml-2 widthHeading mt-2">Address</span>  <span className=''>: {bill[0]?.company?.location}</span>
                        </div>
                        <div ><span className="ml-2 widthHeading mt-2">Season</span> <span className=''>: {bill[0].season} </span>
                        </div>
                    </div>
                </div>
                <BillTable data={bill} />
                <div className='text-right'>
                    <Button className={`${block && 'hidden'}`} onClick={handlePrint}>Print this out!</Button>
                </div>
            </section>
        </div>
    );
};

export default BillStatement;
