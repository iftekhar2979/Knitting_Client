import { getData } from "@/hooksAndFunctions/getApi";
import { format } from "date-fns";


const singleOrder = async ({ params: { id } }) => {
    const data = await getData(`http://localhost:8000/order/${id}`, { next: { revalidate: 100, tags: ["Company"] } })
    const { companyName, company: { location }, buyerName,targetDate, orderNumber, status, pmNumber, poNumber, season, boNumber, invoiceNumber, orderQuantity, restQuantity, fabricsName, orderedDate } = data
    return (
        <div>
            <h2 className="text-center text-3xl underline">Order Information of {orderNumber}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div className="my-4 border rounded-md shadow-sm p-10">
                    <h2 className="py-2 px-4">Company Name : <span className="border-b py-2 px-4">{companyName}</span></h2>
                    <h2 className="py-2 px-4">Location : <span className="border-b py-2 px-4">{location}</span></h2>
                    <h2 className="py-2 px-4">Buyer  : <span className="border-b py-2 px-4">{buyerName}</span></h2>
                    <h2 className="py-2 px-4">Ordered Date : <span className="border-b py-2 px-4">{format(orderedDate, "PP")}</span></h2>
                    <h2 className="py-2 px-4">Target Date : <span className="border-b py-2 px-4">{format(targetDate, "PP")}</span></h2>
                </div>
                <div className="my-4 border rounded-md shadow-sm p-10 ">
                    <h2 className="py-2 px-4">Season  : <span className="border-b py-2 px-4 text-bold">{season}</span> </h2>
                    <h2 className="py-2 px-4">Order Number  : <span className="border-b py-2 px-4">{orderNumber}</span></h2>
                    <h2 className="py-2 px-4">Invoice ID: <span className="border-b py-2 px-4 text-bold">{invoiceNumber}</span> </h2>
                    <h2 className="py-2 px-4">Purchase Order ID: <span className="border-b py-2 px-4 text-bold">{poNumber}</span> </h2>
                    <h2 className="py-2 px-4">P.M ID: <span className="border-b py-2 px-4 text-bold">{pmNumber}</span> </h2>
                    <h2 className="py-2 px-4">B.O ID: <span className="border-b py-2 px-4 text-bold">{boNumber}</span> </h2>
                </div>
                <div className="my-2 border rounded-md shadow-sm p-10 ">
                    <h2 className="py-2 px-4">Fabrics Name  : <span className="border-b py-2 px-4">{fabricsName}</span></h2>
                    <h2 className="py-2 px-4">Total Order Quantity: <span className="border-b py-2 px-4 text-bold">{orderQuantity}</span> KG</h2>
                    <h2 className="py-2 px-4">Delivered Quantity  : <span className="border-b py-2 px-4 text-bold">{orderQuantity - restQuantity}</span> KG</h2>
                    <h2 className="py-2 px-4">Rest of Quantity  : <span className="border-b py-2 px-4 text-bold">{restQuantity}</span> KG</h2>
                </div>
                <div className="my-2 border rounded-md shadow-sm p-10 ">
                    <h2 className="py-2 px-4">Status  : <span className="border-b py-2 px-4">{status}</span></h2>
                    
                </div>

            </div>
        </div>
    )
};
export default singleOrder;