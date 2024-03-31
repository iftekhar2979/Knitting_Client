
const TermsAndCondition = (props) => {
    return (
        <div className='mx-2 calibri'>
            <table >
                <tbody className='leading-3 text-black' contentEditable='true'>
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt] leading-3">Payment </td>
                        <td><span className="font-semibold text-md">:</span>
                            <span className="text-[10pt] ml-[5px] "> L/C at 90 days sight</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">Delivery </td>
                        <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px] "> Within 30 days after L/C date.</span></td>
                    </tr>
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">L/C Status</td>
                        <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px] "> Goods will be delivered against irrevocable & transferable</span></td>
                    </tr>
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">Maturity date</td>
                        <td><span className="font-semibold text-md">:</span> <span className="text-[10pt] ml-[3px] "> To be calculated from the date of delivery challan</span></td>
                    </tr>
                   
                   
                    
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">Advising Bank</td>
                        <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px] "> JAMUNA BANK LTD, KONABARI BRANCH, KONABARI, GAZIPUR, BANGLADESH.<br/> <span className='ml-[12px]'>  SWIFT No : JAMUBDDHTFP </span></span></td>
                    
                    </tr>
                    
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">Validity </td>
                        <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px] "> 15 days from date issue</span></td>
                    </tr>
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">Currency for Payment</td>
                        <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px]  "> In US Dollar</span></td>
                    </tr>
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">Packing</td>
                        <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px]  "> Standart Size</span></td>
                    </tr>

                   
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">Part Shipment </td>
                        {/* <td className="w-36 font-bold flex items-start text-[10pt]">H.S Code</td> */}
                        <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px] "> Allowed</span></td>
                        {/* <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px] ">6245.45.00 & 6560.13.15</span></td> */}
                    </tr>
                    <tr>
                        <td className="w-36 font-bold flex items-start text-[10pt]">VAT Reg. No.</td>
                        {/* <td className="w-36 font-bold flex items-start text-[10pt]">BIN NO</td> */}
                        <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px] "> 001156807-0103</span>
                        {/* <td><span className="font-semibold text-md">:</span><span className="text-[10pt] ml-[5px] ">25456451-242</span> */}
                        </td>
                    </tr>

                </tbody>
            </table>
           
            {/* <img src={signature} alt="" /> */}
        </div>

    )
};
export default TermsAndCondition;