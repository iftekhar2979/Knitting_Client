"use client"
import { companyInformation } from '@/contents/companyInformation';
import { useGetSingleBillQuery, useUpdateBillNumberMutation } from '@/lib/features/Invoice/invoiceApi';
import React, { useEffect, useState } from 'react';
import BillTable from './BillTable';
import Loading from '@/components/utils/Loading';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import useDocumentTitle from '@/hooksAndFunctions/useDocumentTitle';
import MakingDollarConvert from "@/hooksAndFunctions/numberToWord"
const BillStatement = ({ id }) => {
    const { data: bill, isLoading, isError } = useGetSingleBillQuery(id);
    const [updateBillNumber]=useUpdateBillNumberMutation()
    let [block, setBlock] = useState(false)
    const [edit,setEdit]=useState(false)
    const [state,setState]=useState("")
    // useDocumentTitle(`Bill Number ${bill ? bill[0]?.billDetails?.billNumber : ""}`)
    useEffect(() => {
        // Safely attempt to get the elementss
        const nav = document.getElementsByClassName("nav-back relative")[0];
        const footer = document.getElementsByClassName("px-4 py-8 dark:bg-gray-100 dark:text-gray-600")[0];
        const sidebar= document.getElementsByClassName("flex flex-col h-screen bg-white dark:bg-gray-900  sm:pl-6")[0]
        // Check if elements exist before trying to modify them
        if (block) {
            if (nav) nav.classList.add("hidden");
            if (footer) footer.classList.add("hidden");
            if(sidebar) sidebar.classList.add("hidden")
        }
        return () => {
            // Check again when cleaning up
            if (nav) nav.classList.remove("hidden");
            if (footer) footer.classList.remove("hidden");
            if(sidebar) sidebar.classList.remove("hidden")
        };
    }, [block])
    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <div>Error loading bill data .</div>;
    
    }
    // console.log(bill);
    const handleUpdateBillNumber=()=>{
        updateBillNumber({id,billNumber:state})
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
            <section className='backgroundWaterMark bg-white'>
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
                    <div className='text-center text-4xl  italic font-semibold  underline underLineOffset calibri' >Bill <span style={{ width: '153px', height: '1px', backgroundColor: 'black' }}></span></div>
                   <div className="flex justify-between">
                    <div className=' my-4 '>
                        <div className='flex justify-between mt-2 '>
                            <div className="flex "> <span className="ml-2 widthHeading">Date </span> <span className='ml-[5px]'> : {format(new Date(bill[0]?.billDetails?.createdAt), 'PP')}</span></div>
                        </div>
                        <div ><span className="ml-2 widthHeading mt-2">To</span> <span className=''>: {bill[0]?.companyName}</span>
                        </div>
                        <div ><span className="ml-2 widthHeading mt-2">Address</span>  <span className=''>: {bill[0]?.company?.location}</span>
                        </div>
                        <div ><span className="ml-2 widthHeading mt-2">Season</span> <span className=''>: {bill[0].season} </span>
                        </div>
                    </div>

                    <div className='flex justify-between mt-2 '>
                            {/* <div className="flex "><span className="ml-2 widthHeading">Bill Number </span> <span className='ml-[5px]'> : {bill[0].billDetails.billNumber}</span></div> */}
                            {!edit ? <h2 class="" onClick={() => setEdit(true)}>Bill Number : {bill[0].billDetails.billNumber}</h2> : <div className=''>Bill Number : <input type='text' onBlur={handleUpdateBillNumber} onChange={(e)=>setState(e.target.value)} defaultValue={bill[0].billDetails.billNumber} /></div>}
                        </div>
                        </div>
                </div>


                <BillTable data={bill} />
                <h2 class="font-semibold text-[11pt] mt-4 text-black italic">( In Words: {MakingDollarConvert(bill[0].billDetails.invoiceAmount)?.toUpperCase()} TAKA ONLY )</h2>
                
                <section class="w-full pt-4 mt-14">
                    <div className='flex justify-between '>
                        <div className='flex items-end'>

                            <p className='overline'>Checked & Received by</p>
                        </div>
                        <div className='flex items-end flex-col'>
                            {/* <img src={storeManagerSignature} alt="store manager signature" className='w-28' /> */}
                            <p className='overline'>Store Manager</p>
                        </div>
                        <div className='flex items-end '> 

                            <p className='overline'>Factory Manager / 
                            Knitting Manager</p>
                        </div>
                        <div className='flex items-end flex-col'>
                                {/* <img src={authorestedSignature} alt="Hasan" className='w-28' /> */}
                                <p className='overline'>Authorized Signature</p>
                        </div>
                    </div>

                </section>
                
                <div className='text-right'>
                    <Button className={`${block && 'hidden'}`} onClick={handlePrint}>Print this out!</Button>
                </div>
            </section>
        </div>
    );
};

export default BillStatement;
