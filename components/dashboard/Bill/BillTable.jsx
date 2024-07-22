"use client"
import { format } from "date-fns";
const BillTable = ({ data }) => {
  function mergeRows(data) {
    const mergedData = [];
    if (data) {

      [...data].forEach(item => {
        // Find if the fabricsName already exists in the mergedData
        let existingItem = mergedData.find(d => d.fabricsName === item.fabricsName);

        if (existingItem) {
          // Add the deliveredQuantity
          existingItem.deliveredQuantity += item.deliveredQuantity;

          // Merge deliveryDetails
          existingItem.deliveryDetails = [...existingItem.deliveryDetails, ...item.deliveryDetails];

          // Add other details without changing the billDetails
          existingItem.details.push({
            company: item.company,
            buyer: item.buyer,
            sbNumber: item.sbNumber,
            programNumber: item.programNumber,
            jobNumber: item.jobNumber,
            bookingNumber: item.bookingNumber,
            season: item.season,
          });
        } else {
          // If fabricsName does not exist, add the item to mergedData with a details property
          mergedData.push({
            fabricsName: item.fabricsName,
            deliveredQuantity: item.deliveredQuantity,
            deliveryDetails: [...item.deliveryDetails],
            billDetails: item.billDetails ? { ...item.billDetails } : null,
            details: [{
              company: item.company,
              buyer: item.buyer,
              sbNumber: item.sbNumber,
              programNumber: item.programNumber,
              jobNumber: item.jobNumber,
              bookingNumber: item.bookingNumber,
              season: item.season,
            }]
          });
        }
      });

    }

    return mergedData;
  }
  const mergedData = mergeRows(data);
  console.log(mergedData)
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
            mergedData?.map((item, index) => {
              return (
                <>
                  <tr key={item.fabricsName}>
                    <td rowSpan={item.deliveryDetails.length} className='b_b text-center'>{item.fabricsName}</td>
                    <td className='b_b text-center'>{item.deliveryDetails[0].createdAt && format(new Date(item.deliveryDetails[0].createdAt), 'PP')}</td>
                    <td className='b_b text-center'>{item.deliveryDetails[0].id}</td>
                    <td className='b_b text-center'>{item.deliveryDetails[0].deliveredQuantity.toLocaleString()}</td>
                    <td className='b_b text-center'>{item.deliveryDetails[0].order.buyerName}</td>
                    <td className='b_b text-center'>

                      <ol className="text-[10pt] text-left ml-1">
                        <li className="border-b">SB NO : {item.deliveryDetails[0].order.sbNumber}</li>
                        <li className="border-b">PO NO : {item.deliveryDetails[0].order.programNumber}</li>
                        <li className="border-b">Job NO : {item.deliveryDetails[0].order.jobNumber}</li>
                        <li>BO NO : {item.deliveryDetails[0].order.bookingNumber}</li>
                      </ol>
                    </td>
                    <td rowSpan={item.deliveryDetails.length} className='b_b text-center'>{item.billDetails?.unitPrice}</td>
                    <td className='b_b text-center'>{(item.deliveryDetails[0].deliveredQuantity * item.billDetails.unitPrice).toFixed(2)}</td>
                  </tr>

                  {item.deliveryDetails.slice(1).map((info, subIndex) => (
                    <>
                      <tr key={`${item.fabricsName}-${subIndex}`} className='b_b text-center ' >
                        <td className='b_b text-center'>{info.createdAt && format(new Date(info.createdAt), 'PP')}</td>
                        <td className='b_b text-center'> {info.id}</td>
                        <td className='b_b text-center'>{info.deliveredQuantity.toLocaleString()}</td>
                        <td className='b_b text-center'>{info.order.buyerName}</td>
                        <td className='b_b text-center'>
                          <ol className="text-[10pt] text-left ml-1">
                            <li className="border-b">SB NO : {info.order.sbNumber}</li>
                            <li className="border-b">PO NO : {info.order.programNumber}</li>
                            <li className="border-b">Job NO : {info.order.jobNumber}</li>
                            <li>BO NO : {info.order.bookingNumber}</li>
                          </ol>
                        </td>
                        <td className='b_b text-center'>{(info.deliveredQuantity * item.billDetails.unitPrice).toFixed(2)}</td>
                      </tr>
                    </>
                  ))}
                  {/* <tr key="" className=''>
                    <td></td>
                    <td></td>
                    <td className='text-center text-md font-semibold'></td>
                    <td className='text-center b_b text-center text-md font-semibold'>{item.deliveredQuantity.toLocaleString()}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='text-center b_b text-center text-md font-semibold'>{item.billDetails.amount.toFixed(2).toLocaleString()}</td>
                  </tr> */}
                </>
              )
            })
          }
          <tr key="" className=''>
            <td></td>
            <td></td>
            <td className='text-center text-md font-semibold'>Total</td>
            <td className='text-center b_b text-center text-md font-semibold'>{mergedData[0].billDetails.invoiceQuantity.toLocaleString()}</td>
            <td></td>
            <td></td>
            <td></td>
            <td className='text-center b_b text-center text-md font-semibold'>{mergedData[0].billDetails.invoiceAmount.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
};
export default BillTable;