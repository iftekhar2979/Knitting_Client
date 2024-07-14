"use client"
import { format } from "date-fns";
const BillTable = ({ data }) => {
  return (
    <>
      <table className={`b_b text-center mx-8 text-[12pt] w-[1000px]`}>
        <thead>
          <tr >
            <th className='b_b text-center w-32'>Fabrics</th>
            <th className='b_b text-center w-20'>Date</th>
            <th className='b_b text-center w-16'>Chalan Number</th>
            <th className='b_b text-center w-20'> Quantity</th>
            <th className='b_b text-center w-16'> Buyer</th>
            <th className='b_b text-center w-36'> Order Info.</th>
            <th className='b_b text-center w-16'> Unit Price</th>
            <th className='b_b text-center w-16'> Price</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((item, index) => {
              return (
                <>
                  <tr key={item.fabricsName}>
                    <td rowSpan={item.deliveryDetails.length} className='b_b text-center'>{item.fabricsName}</td>
                    <td className='b_b text-center'>{item.deliveryDetails[0].createdAt && format(new Date(item.deliveryDetails[0].createdAt), 'PP')}</td>
                    <td className='b_b text-center'>{item.deliveryDetails[0].id}</td>
                    <td className='b_b text-center'>{item.deliveryDetails[0].deliveredQuantity.toLocaleString()}</td>
                    <td rowSpan={item.deliveryDetails.length} className='b_b text-center'>{item.buyerName}</td>
                    <td rowSpan={item.deliveryDetails.length} className='b_b text-center'>

                      <ol className="text-[10pt] text-left ml-1">
                        <li className="border-b">SB NO : {item.sbNumber}</li>
                        <li className="border-b">PO NO : {item.programNumber}</li>
                        <li className="border-b">Job NO : {item.jobNumber}</li>
                        <li>BO NO : {item.bookingNumber}</li>
                      </ol>
                    </td>
                    <td rowSpan={item.deliveryDetails.length} className='b_b text-center'>{item.billDetails.unitPrice}</td>
                    <td  className='b_b text-center'>{item.deliveryDetails[0].deliveredQuantity * item.billDetails.unitPrice}</td>
                  </tr>

                  {item.deliveryDetails.slice(1).map((info, subIndex) => (
                    <>
                      <tr key={`${item.fabricsName}-${subIndex}`} className='b_b text-center ' >
                        <td className='b_b text-center'>{info.createdAt && format(new Date(info.createdAt), 'PP')}</td>
                        <td className='b_b text-center'> {info.id}</td>
                        <td className='b_b text-center'>{info.deliveredQuantity.toLocaleString()}</td>
                        <td  className='b_b text-center'>{info.deliveredQuantity * item.billDetails.unitPrice}</td>
                      </tr>
                    </>
                  ))}
                  <tr key="" className=''>
                    <td></td>
                    <td></td>
                    <td className='text-center text-md font-semibold'>Total</td>
                    <td className='text-center b_b text-center text-md font-semibold'>{item.deliveredQuantity.toLocaleString()}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='text-center b_b text-center text-md font-semibold'>{item.billDetails.amount.toLocaleString()}</td>
                  </tr>
                </>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
};
export default BillTable;