import React from 'react';
import { BiSolidShoppingBag } from 'react-icons/bi';

const PopularList = ({ listItems }) => {
    const { title, count } = listItems;
    
    return (
        <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 last:border-0">
            <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-gray-700 truncate group-hover:text-emerald-600 transition-colors">
                    {title}
                </span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Verified Segment</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-sm ring-1 ring-gray-100 group-hover:ring-emerald-100 group-hover:bg-emerald-50/30 transition-all">
                <BiSolidShoppingBag size={14} className="text-emerald-500" />
                <span className="text-xs font-black text-gray-900 tabular-nums">{count}</span>
            </div>
        </div>
    )
};

export default PopularList;