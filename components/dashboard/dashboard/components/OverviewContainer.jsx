import { icons } from 'lucide-react';
import react from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { GiDress, GiFactory } from 'react-icons/gi';
import OverviewCard from './OverviewCard';
import { useGetCompanyFabricsAndOrderCountQuery } from '@/lib/features/dashboard/dashboardApi';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/components/utils/Loading';

let overviewCards = [
    {
        id: 1001,
        title: "Company",
        icon: <GiFactory size={20} className="text-white" />,
        count: 500,
        className: "border w-full p-4 card-bg-1 border-rad  shadow-sm "
    },

    {
        id: 1002,
        title: "Fabrics",
        icon: <GiDress size={20} className="text-white" />,
        count: 100,
        className: "border w-full p-4 card-bg-2 border-rad  shadow-sm "
    },

    {
        id: 1003,
        title: "Order",
        icon: <FaCartShopping size={20} className='text-white' />,
        count: 1800,
        className: "border w-full p-4 card-bg-3 border-rad  shadow-sm "
    },
]

const OverviewContainer = (props) => {
    const {range}=useAppSelector(state=>state.dashboard)
    console.log(range)
    const {data,isLoading,isError}=useGetCompanyFabricsAndOrderCountQuery(range)
    if(isLoading){
        return <Loading/>
    }
   overviewCards[0].count=data?.companyCount
   overviewCards[1].count=data?.fabricCount
   overviewCards[2].count=data?.orderCount
    return (
        <div className="border p-4 grid grid-cols-1 md:grid-cols-3 gap-4  border-rad-2 bg-inactive">
            {
                overviewCards?.map(card => <OverviewCard key={card.id} cardItem={card} data={data} />)
            }
        </div>
    )
};
export default OverviewContainer;