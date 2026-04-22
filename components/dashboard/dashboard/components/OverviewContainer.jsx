import { icons } from 'lucide-react';
import react from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { GiDress, GiFactory } from 'react-icons/gi';
import OverviewCard from './OverviewCard';
import { useGetCompanyFabricsAndOrderCountQuery } from '@/lib/features/dashboard/dashboardApi';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/components/utils/Loading';

const OverviewContainer = (props) => {
    const {range}=useAppSelector(state=>state.dashboard)
    const {data,isLoading,isError}=useGetCompanyFabricsAndOrderCountQuery(range)
    
    if(isLoading){
        return <Loading/>
    }

    const overviewCards = [
        {
            id: 1001,
            title: "Total Companies",
            icon: <GiFactory size={24} />,
            count: data?.companyCount || 0,
            color: "emerald"
        },
        {
            id: 1002,
            title: "Fabric Variants",
            icon: <GiDress size={24} />,
            count: data?.fabricCount || 0,
            color: "blue"
        },
        {
            id: 1003,
            title: "Active Orders",
            icon: <FaCartShopping size={24} />,
            count: data?.orderCount || 0,
            color: "orange"
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {
                overviewCards?.map(card => <OverviewCard key={card.id} cardItem={card} />)
            }
        </div>
    )
};
export default OverviewContainer;