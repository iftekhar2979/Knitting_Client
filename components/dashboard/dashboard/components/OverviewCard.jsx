"use client"
import React from 'react';

const OverviewCard = ({ cardItem }) => {
    const { icon, title, count, color } = cardItem;

    const colorVariants = {
        emerald: "from-emerald-500 to-emerald-600 shadow-emerald-200 text-white",
        blue: "from-blue-500 to-blue-600 shadow-blue-200 text-white",
        orange: "from-orange-500 to-orange-600 shadow-orange-200 text-white"
    };

    const iconBgVariants = {
        emerald: "bg-white/20",
        blue: "bg-white/20",
        orange: "bg-white/20"
    };

    return (
        <div className={`relative overflow-hidden bg-gradient-to-br ${colorVariants[color]} p-6 rounded-3xl shadow-xl transition-transform duration-300 hover:scale-[1.02] cursor-default`}>
            {/* Background pattern */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${iconBgVariants[color]} backdrop-blur-sm flex items-center justify-center shadow-inner`}>
                    {icon}
                </div>
                
                <div>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest">{title}</p>
                    <h3 className="text-3xl font-black mt-1 tabular-nums">{count.toLocaleString()}</h3>
                </div>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-2 right-6 opacity-10">
                <div className="text-6xl font-black">{title.charAt(0)}</div>
            </div>
        </div>
    )
};

export default OverviewCard;