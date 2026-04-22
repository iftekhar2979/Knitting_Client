import React from 'react';
import PopularList from './PopularList';

const PopularCard = ({ cardItems }) => {
    const { category, listItem } = cardItems;

    return (
        <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-100 shadow-sm transition-all hover:shadow-md h-full flex flex-col">
            <div className="flex items-center justify-between mb-5 px-1">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">{category}</h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">Top Entries</span>
            </div>
            
            <div className="flex-1 space-y-1">
                {listItem && listItem.length > 0 ? (
                    listItem.map((list, index) => (
                        <PopularList key={list.id || index} listItems={list} />
                    ))
                ) : (
                    <p className="text-xs text-gray-400 italic text-center py-4">No data available</p>
                )}
            </div>
        </div>
    )
};

export default PopularCard;