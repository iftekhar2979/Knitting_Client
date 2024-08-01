import { setRange } from '@/lib/features/dashboard/dashboardSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import react from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';

const SelectTime = (props) => {
    const {range}=useAppSelector(state=>state.dashboard)
    const dispatch=useAppDispatch()
    
    return (
        <div className="px-4 flex items-center text-sm" >
            <select className='border-none bg-transparent' onChange={(e)=>dispatch(setRange(e.target.value))}>
                <option selected={range===""} value={''}>All Time</option>
                <option selected={range==='last24Hours'} value={'last24Hours'}>Last 24 Hours</option>
                <option selected={range==='thisWeek'} value={'thisweek'}>This Week</option>
                <option selected={range==='thisMonth'} value={'thisMonth'}>This Month</option>
                <option selected={range==='thisYear'} value={'thisYear'}>This Year</option>
            </select>
            {/* <span className="mx-2">All Time</span>
                        <BsFillTriangleFill className="text-inactive" style={{ transform: "rotate(180deg)" }} /> */}
        </div>
    )
};
export default SelectTime;