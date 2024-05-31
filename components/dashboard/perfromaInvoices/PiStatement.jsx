"use client"

import MakingDollarConvert from "@/hooksAndFunctions/numberToWord"
import { format } from "date-fns"
import TermsAndCondition from "./TermsAndCondition"
import { Button } from "@/components/ui/button"
import useDocumentTitle from "@/hooksAndFunctions/useDocumentTitle"

const { default: Loading } = require("@/components/utils/Loading")
const { useGetSinglePerformaInvoiceListQuery } = require("@/lib/features/Invoice/invoiceApi")
const { useState, useEffect } = require("react")

const headings = [
    { heading: 'S.L.', class: "w-12 text-center b_b text-[11pt] text-black mx-2" },
    { heading: "Description", class: "w-66 text-center b_b text-[11pt] text-black mx-2" },
    { heading: "Finish Dia", class: "w-60 text-center b_b text-[11pt] text-black mx-2" },
    { heading: 'Style', class: "w-24 text-center b_b text-[11pt] text-black mx-2" },
    { heading: 'Quantity', class: "w-32 text-right b_b text-[11pt] text-black px-2" },
    { heading: 'Unit Price', class: "w-28 text-center b_b text-[11pt] text-black " },
    { heading: 'Total Amount', class: "w-44 text-center b_b text-[11pt] text-black mx-2" },
]
const lastBorder = [
    { heading: '', class: "w-16 text-center b_b text-[11pt] text-black mx-2" },
    { heading: "Total", class: "w-60 text-center b_b text-[11pt] text-black mx-2" },
    { heading: "", class: "w-56 text-center b_b text-[11pt] text-black mx-2" },
    { heading: '', class: "w-24 text-center b_b text-[11pt] text-black mx-2" },
    { heading: 'Quantity', class: "w-32 text-right b_b text-[11pt] text-black px-2" },
    { heading: '', class: "w-28 text-center b_b text-[11pt] text-black mx-2" },
    { heading: 'Total Amount', class: "w-44 text-center b_b text-[11pt] text-black mx-2" },
]
export const PiStatement = ({ id }) => {

    const [edit, setEdit] = useState(false)
    const [state, setState] = useState(headings)
    let [block, setBlock] = useState(false)
    const [deliveryStatement, setDeliveryStatement] = useState(false)
    const [lastBordered, setlastBordered] = useState(lastBorder)
    const { data: singlePi, isLoading, isError } = useGetSinglePerformaInvoiceListQuery(id, {
        refetchOnMountOrArgChange: true
    })
    useDocumentTitle(`PI Number ${singlePi? singlePi[0]?.piNumber:""}`)
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
    }, [block]);
    
    if (isLoading) {
        return <Loading />
    }
    const { company, piNumber, buyer, fabricsName, style, totalPIAmount, totalPIQuantity, unitPrice, description, amount, finishDia, createdAt } = singlePi[0]
    const handleDel = (index) => {
        let item = state.filter((item, i) => i !== index)
        let itemSecond = lastBordered.filter((item, i) => i !== index)
        if (index == 2) {
            item[1].class = 'w-[448px] text-center b_b text-[11pt] text-black mx-2'
        }
        if (index == 3) {
            item[1].class = `w-[368px] text-center b_b text-[11pt] text-black mx-2`
        } if (index == 4) {
            item[1].class = `w-[368px] text-center b_b text-[11pt] text-black mx-2`
        }
        if (item.length === 6) {
            item[1].class = 'w-[496px] text-center b_b text-[11pt] text-black mx-2'
        }
        if (item.length === 5) {
            item[1].class = 'w-[704px] text-center b_b text-[11pt] text-black mx-2'
        }
        setState(item)
        setlastBordered(itemSecond)
    }
    const handlePrint = () => {

        setBlock(true)
        setTimeout(() => {
            setBlock(false)
            window.print()
        }, 10);
    }
    const handleEditChange = (e) => {
        console.log(e.target.value)

    }
    const handleSeason = (e) => {
        console.log(e.target.value)
    }
    let billOrProformaInvoice=(trueValues,falseValues)=>singlePi[0]?.billingWay==="Bill"?trueValues:falseValues
    return (
        <>
            {/* <section className='backgroundWaterMark'> */}
            <section className='backgroundWaterMark' >
                <> <div className='leading-4 text-black timesNewRoman'>
                    <div className="mx-2 flex justify-around">
                        {/* <img src={logo} alt="" className="h-20 " /> */}
                        <nav className='flex flex-col justify-center '>
                            <h2 className='text-center text-4xl font-bold  timesNewRoman piHeading ' >Tertiray Colour Knit Fabrics</h2>
                            <h5 className='text-center text-md italic piHeading timesNewRoman mt-1'>100% Export Oriented Knit Fabrics Manufacture & Supplier</h5>
                        </nav>
                    </div>
                    <h1 style={{ width: '100%', height: '1px', backgroundColor: 'black', margin: "2px", marginBottom: '4px' }}></h1>
                    <h1 style={{ width: '100%', height: '1px', backgroundColor: 'black' }}></h1>
                    <div className='text-center text-xl my-2 italic font-semibold leading-4  underline underLineOffset calibri'>{billOrProformaInvoice("Bill"," Proforma Invoice ")}<span style={{ width: '153px', height: '1px', backgroundColor: 'black' }}></span></div>
                    <div className='flex justify-between mt-2 '>
                        <div className="flex "> <span className="ml-2 widthHeading">Date </span> <span className='ml-[5px]'> : {format(new Date(createdAt), 'dd-MM-yyyy')}</span></div>
                        {!edit ? <span className="" onClick={() => setEdit(true)}>{billOrProformaInvoice("Bill Number : "," PI Number : ")}{piNumber}</span> : <div className=''> {billOrProformaInvoice("Bill Number : "," PI Number : ")}<input type='text' defaultValue={piNumber} onBlur={handleEditChange} /></div>}
                    </div>
                    <div ><span className="ml-2 widthHeading">To</span> <span className=''>: {company?.companyName}</span>
                    </div>
                    <div ><span className="ml-2 widthHeading">Address</span>  <span className=''>: {company?.location}</span>
                    </div>
                    <div ><span className="ml-2 widthHeading">Buyer</span>  <span className=''>: {buyer?.buyerName}</span>
                    </div>
                    <div ><span className="ml-2 widthHeading">Season</span> <span className=''>: <input type="text" defaultValue={singlePi[0]?.season} onBlur={handleSeason} /> </span>
                    </div>
                </div>
                    <div>
                        <table className="my-2 mx-2 b_b calibri" contentEditable='true' >
                            <thead className="border">
                                {
                                    state?.map((itemName, index) => {
                                        return (<th className={itemName.class} key={index} >{itemName.heading}
                                            <span className={`${block && 'hidden'} hover:bg-red-600 ml-6 cursor-pointer `} onClick={() => handleDel(index)}>X</span>
                                        </th>)
                                    })
                                }
                            </thead>
                            <tbody>

                                {
                                    singlePi?.map((item, i) => {
                                        const { fabricsName, description, style, totalQuantity, amount, unitPrice, finishDia } = item
                                        return (
                                            <>
                                                <tr className="border text-black"  >
                                                    {
                                                        state?.map((itemName, index) => {
                                                            const { heading } = itemName
                                                            switch (heading) {
                                                                case 'S.L.':
                                                                    return <td className={itemName.class} >{i + 1}</td>
                                                                    break;
                                                                case 'Description':

                                                                    return <td className={itemName.class} >{description}</td>
                                                                    break;
                                                                case 'Finish Dia':
                                                                    return <td className={itemName.class} >{finishDia}</td>
                                                                    break;
                                                                case 'Style':
                                                                    return <td className={itemName.class} >{style}</td>
                                                                    break;

                                                                case 'Quantity':
                                                                    return <><td className={itemName.class} >
                                                                        {totalQuantity}

                                                                    </td>
                                                                    </>
                                                                    break;
                                                                case 'Unit Price':
                                                                    return <td className={itemName.class} ><p className='flex justify-between mx-2'><span >$</span> <span>{unitPrice}</span></p></td>
                                                                    break;
                                                                case 'Total Amount':
                                                                    return <td className={itemName.class} ><p className='flex justify-between mx-2'><span >$</span> <span>{amount}</span></p></td>
                                                                    break;
                                                                default:
                                                                    return <td className={itemName.class} >{itemName.heading}</td>
                                                                    break;
                                                            }


                                                        })
                                                    }

                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                <tr className="border">
                                    {
                                        lastBordered?.map((itemName, index) => {
                                            if (itemName.heading === 'Quantity') {
                                                return <th className={itemName.class} key={index} style={{ marginLeft: '0.5rem' }}>{totalPIQuantity}</th>
                                            }
                                            if (itemName.heading === 'Total Amount') {
                                                return <th className={itemName.class} key={index}><p className='flex justify-between mx-2'><span className='font-normal'>$</span> <span>{totalPIAmount.toFixed(2)}</span></p></th>

                                            }
                                            return (<th className={itemName.class} key={index}>{itemName.heading}</th>)
                                        })
                                    }

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 className="mx-2 font-semibold text-[8pt] text-black italic">( In Words: {billOrProformaInvoice(" TAKA "," US DOLLAR ")} {MakingDollarConvert(totalPIAmount)?.toUpperCase()} ONLY )</h2>
                    <h2 className="mx-2 font-semibold underline text-[12pt] underLineOffset text-black mx-2">{billOrProformaInvoice("","Terms And Condition ")}</h2>

                 {/* {singlePi[0]?.billingWay==="Bill" ?"":  } */}
                 {billOrProformaInvoice("",<TermsAndCondition />)}
                </>

                <div className='text-right'>
                    <Button className={`${block && 'hidden'}`} onClick={handlePrint}>Print this out!</Button>
                </div>
            </section>
            <footer className="w-full pt-4">
                <div className='flex justify-between '>
                    <div >
                        <p className='text-[8pt] text-black'>Client Acceptance</p>
                        <p className='text-[7pt]  mt-14 text-black'>Authorised Signature</p>

                    </div>
                    <div className='text-[7pt] m-0'>
                        <p className='text-[8pt] text-black'>Tertiary Colour Knit Fabrics</p>
                        <ul>
                            {/* <img src={signature} alt="" className=' relative right-8' /> */}
                            <li className='text-center text-black'>Authorised Signature</li>
                        </ul>
                    </div>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: 'black' }}></div>
                <div className="container mx-auto text-center text-black mx-2">
                    <p className='text-center piHeading  font-semibold '>Mobile : 01711-344139 , 017160-19843 Mail : kamrul@tertiaryckf.com</p>
                    <p className='text-center piHeading font-semibold'>Near Rubel Pump ,Rajabari , Konabari , Gazipur</p>
                </div>
            </footer>
        </>
    )
}