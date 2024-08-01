"use client"

import { Title } from "@radix-ui/react-dialog";
import PopularCard from "./PopularCard";
import { useGetDashboardPopularTableQuery } from "@/lib/features/dashboard/dashboardApi";
import Loading from "@/components/utils/Loading";

// const cardItems = [
//     {
//         id: 1501,
//         category: "Company",
//         listItem: [
//             { id: 555, title: "Grapics Textitle", count: 50 },
//             { id: 556, title: "Grapics Textitle", count: 50 },
//             { id: 557, title: "Grapics Textitle", count: 50 }]
//     },
//     {
//         id: 1502,
//         category: "Buyer",
//         listItem: [
//             { id: 566, title: "Grapics Textitle", count: 50 },
//             { id: 567, title: "Grapics Textitle", count: 50 },
//             { id: 568, title: "Grapics Textitle", count: 50 }]
//     },
//     {
//         id: 1503,
//         category: "Fabrics",
//         listItem: [
//             { id: 569, title: "Grapics Textitle", count: 50 },
//             { id: 570, title: "Grapics Textitle", count: 50 },
//             { id: 571, title: "Grapics Textitle", count: 50 }]
//     },
// ]
const PopularContainer = () => {
    const {data:cardItems,isLoading,isError}=useGetDashboardPopularTableQuery()
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 p-4 border-rad-2 my-4 bg-inactive shadow-md">
            {
                cardItems?.map(card => <PopularCard key={card.key} category={card?.category} cardItems={card} />)
            }
            {/* <div className="bg-white border-rad p-4">
                <h2 className=" font-bold text-xl   "> Buyer</h2>
                <ol className="pt-4">
                    <li>
                        <div>
                            <h2>GTL-1</h2>
                            <div className="flex justify-between">

                                <BiSolidShoppingBag size={18} className="text-active" />
                                <span className="text-sm text-active font-bold">02</span>
                            </div>
                        </div>
                        <hr />

                    </li>
                    <li>
                        <div>
                            <h2>MFL-Bestseller</h2>
                            <div className="flex justify-between">

                                <BiSolidShoppingBag size={18} className="text-active" />
                                <span className="text-sm text-active font-bold">02</span>
                            </div>
                        </div>
                        <hr />

                    </li>
                    <li>
                        <div>
                            <h2>TAL-1</h2>
                            <div className="flex justify-between">

                                <BiSolidShoppingBag size={18} className="text-active" />
                                <span className="text-sm text-active font-bold">02</span>
                            </div>
                        </div>
                        <hr />

                    </li>

                </ol>
            </div>

            <div className="bg-white border-rad p-4">
                <h2 className=" font-bold text-xl   "> Fabrics</h2>
                <ol className="pt-4">
                    <li>
                        <div>
                            <h2>Yarn</h2>
                            <div className="flex justify-between">

                                <BiSolidShoppingBag size={18} className="text-active" />
                                <span className="text-sm text-active font-bold">02</span>
                            </div>
                        </div>
                        <hr />

                    </li>
                    <li>
                        <div>
                            <h2>Polystar</h2>
                            <div className="flex justify-between">

                                <BiSolidShoppingBag size={18} className="text-active" />
                                <span className="text-sm text-active font-bold">02</span>
                            </div>
                        </div>
                        <hr />

                    </li>
                    <li>
                        <div>
                            <h2>Lycra</h2>
                            <div className="flex justify-between">

                                <BiSolidShoppingBag size={18} className="text-active" />
                                <span className="text-sm text-active font-bold">02</span>
                            </div>
                        </div>
                        <hr />

                    </li>

                </ol>
            </div> */}
        </div>

    )
};
export default PopularContainer;