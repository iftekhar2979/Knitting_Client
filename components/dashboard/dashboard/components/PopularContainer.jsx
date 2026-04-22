"use client"

import PopularCard from "./PopularCard";
import { useGetDashboardPopularTableQuery } from "@/lib/features/dashboard/dashboardApi";
import Loading from "@/components/utils/Loading";

const PopularContainer = () => {
    const {data:cardItems,isLoading,isError}=useGetDashboardPopularTableQuery()
    
    if(isLoading){
        return <Loading/>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                cardItems?.map(card => <PopularCard key={card.key} cardItems={card} />)
            }
        </div>
    )
};
export default PopularContainer;