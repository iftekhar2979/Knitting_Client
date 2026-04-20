import { setRange } from '@/lib/features/dashboard/dashboardSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
const SelectTime = (props) => {
    const {range}=useAppSelector(state=>state.dashboard)
    const dispatch=useAppDispatch()
    return (
        <div className="px-4 flex items-center text-sm" >
            <select 
                className='border-none bg-transparent' 
                value={range} 
                onChange={(e) => dispatch(setRange(e.target.value))}
            >
                <option value=''>All Time</option>
                <option value='last24Hours'>Last 24 Hours</option>
                <option value='thisWeek'>This Week</option>
                <option value='thisMonth'>This Month</option>
                <option value='thisYear'>This Year</option>
            </select>
            {/* <span className="mx-2">All Time</span>
                        <BsFillTriangleFill className="text-inactive" style={{ transform: "rotate(180deg)" }} /> */}
        </div>
    )
};
export default SelectTime;