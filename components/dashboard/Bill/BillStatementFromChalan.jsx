"use client"
import { Button } from '@/components/ui/button'
import Loading from '@/components/utils/Loading'
import { companyInformation } from '@/contents/companyInformation'
import MakingDollarConvert from '@/hooksAndFunctions/numberToWord'
import { useGetBillForSingleOrderQuery, useUpdateBillNumberbyChalanMutation } from '@/lib/features/delivery/deliveryApi'
// import { useUpdateBillNumberbyChalanMutation } from '@/lib/features/Invoice/invoiceApi'
import { format } from 'date-fns'
// import { useGetSingleBillQuery } from '@/lib/features/Invoice/invoiceApi'
import React, { useState } from 'react'

export default function BillStatementFromChalan({ id }) {
    const { data, isLoading, isError } = useGetBillForSingleOrderQuery(id)
    const [updateBillNumberByChalan] = useUpdateBillNumberbyChalanMutation()
    const [state, setState] = useState("")
    const [edit, setEdit] = useState(false)

    if (isLoading) {
        return <Loading />
    }
    let order;
    if (data) {
        order = data?.order
    }

    const date = new Date()
    let thisYear = date.getFullYear()
    let billNumber = !data?.billNumber ? `TCKF-${data?.order?.company?.shortForm}-${data?.id}/${thisYear}` : data?.billNumber
    // console.log(data)
    let amount = data?.deliveredQuantity * data?.unitPrice || 0
    const handlePrint = () => {
        window.print()
    }
    const handleUpdate = () => {
        updateBillNumberByChalan({ id, billNumber: state })
    }
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    #main-nav,
                    #side-nav {
                        display: none !important;
                    }

                    body * {
                        visibility: hidden !important;
                    }

                    .bill-statement-print-section,
                    .bill-statement-print-section * {
                        visibility: visible !important;
                    }

                    .bill-statement-print-section {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: #ffffff !important;
                    }

                    .bill-statement-no-print {
                        display: none !important;
                    }
                }
            `}} />
            <section className="bill-statement-print-section">
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
                                <div className="flex "> <span className="ml-2 widthHeading">Date </span> <span className='ml-[5px]'> : {format(new Date(data?.createdAt), "PP")}</span></div>
                            </div>
                            <div ><span className="ml-2 widthHeading mt-2">To</span> <span className=''>: {data?.order.company.companyName}</span>
                            </div>
                            <div ><span className="ml-2 widthHeading mt-2">Address</span>  <span className=''>: {data?.order.company.location}</span>
                            </div>
                            <div ><span className="ml-2 widthHeading mt-2">Season</span> <span className=''>: {data?.order.season} </span>
                            </div>
                        </div>

                        <div className='flex justify-between mt-2 '>
                            {/* <div className="flex "><span className="ml-2 widthHeading">Bill Number </span> <span className='ml-[5px]'> : {billbillDetails.billNumber}</span></div> */}
                            {!edit ? <h2 className="" onClick={() => setEdit(true)}>Bill Number : {billNumber} </h2> : <div className=''>Bill Number : <input type='text' onChange={(e) => setState(e.target.value)} onBlur={handleUpdate} defaultValue={billNumber} /></div>}
                        </div>
                    </div>
                </div>
                <table className={`b_b text-center  text-[12pt] w-[1000px]`}>
                    <thead>
                        <tr >
                            <th className='b_b text-center w-32'>Fabrics</th>
                            <th className='b_b text-center w-20'>Date</th>
                            <th className='b_b text-center w-16'>Chalan Number</th>
                            <th className='b_b text-center w-20'> Quantity</th>
                            <th className='b_b text-center w-16'> Buyer</th>
                            <th className='b_b text-center w-36'> Order Info.</th>
                            <th className='b_b text-center w-16'> Unit Price (BDT)</th>
                            <th className='b_b text-center w-16'> Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr >
                            <td className='b_b text-center'>{data?.order.fabricsName}</td>
                            <td className='b_b text-center'>{format(new Date(data?.createdAt), "PP")}</td>
                            <td className='b_b text-center'>{data?.id}</td>
                            <td className='b_b text-center'>{data?.deliveredQuantity}</td>
                            <td className='b_b text-center'>{data?.order?.buyer?.buyerName}</td>
                            <td className='b_b text-center'>

                                <ol className="text-[10pt] text-left ml-1">
                                    <li className="border-b">SB NO : {data?.order?.sbNumber}</li>
                                    <li className="border-b">PO NO : {data?.order?.programNumber}</li>
                                    <li className="border-b">Job NO : {data?.order?.jobNumber}</li>
                                    <li>BO NO : {data?.order?.bookingNumber}</li>
                                </ol>
                            </td>
                            <td className='b_b text-center'>{data?.unitPrice}</td>
                            <td className='b_b text-center'>{data?.unitPrice * data?.deliveredQuantity || 0}</td>
                        </tr>
                        <tr key="" className=''>
                            <td></td>
                            <td></td>
                            <td className='text-center text-md font-semibold'>Total</td>
                            <td className='text-center b_b text-center text-md font-semibold'>{data?.deliveredQuantity}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='text-center b_b text-center text-md font-semibold'>{data?.unitPrice * data?.deliveredQuantity || 0}</td>
                        </tr>
                    </tbody>
                </table>

                <h2 className="font-semibold text-[11pt] mt-4 text-black italic">( In Words: {MakingDollarConvert(amount)?.toUpperCase()} TAKA ONLY )</h2>
                <section className="w-full pt-4 mt-14">
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
                <div className='text-right bill-statement-no-print'>
                    <Button onClick={handlePrint}>Print this out!</Button>
                </div>
            </section>
        </>
    )
}
