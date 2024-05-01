import Order from "@/components/dashboard/order/Order";
import Navbar from "@/components/dashboard/order/SingleOrder/Navbar";
import QuantityInfo from "@/components/dashboard/order/SingleOrder/QuantityInfo";
import { Button } from "@/components/ui/button";
import { getData } from "@/hooksAndFunctions/getApi";
import { format } from "date-fns";

export const metadata = {
    title: "Order of Teritiary Colour Knit",
    description: "Orders of Teritiary Colour Knit",
  };

const singleOrder = async ({ params: {id} }) => {
   
    return (
        <Order id={id}/>
    )
};
export default singleOrder;