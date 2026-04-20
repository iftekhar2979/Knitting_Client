"use client"
import Link from "next/link";
import React from "react";

const SingleLink = ({ item, selectedRoute, isSidebarOpen }) => {
    const isActive = selectedRoute === item.routeName;
    
    return (
        <Link href={`/dashboard/${item.routeName}`} className="group block">
            <div className={`
                flex items-center px-4 py-2.5 transition-all duration-300 transform rounded-xl my-0.5
                ${isActive 
                    ? "bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-500/10 shadow-emerald-500/5 font-bold" 
                    : "text-gray-500 hover:text-emerald-500 hover:bg-emerald-50/50"
                }
            `}>
                <div className={`text-xl transition-colors ${isActive ? "text-emerald-500" : "text-gray-400 group-hover:text-emerald-500"}`}>
                    {item.icon}
                </div>
                {isSidebarOpen && (
                    <span className="mx-3 text-[13px] font-semibold tracking-tight whitespace-nowrap">
                        {item.value}
                    </span>
                )}
                {isActive && isSidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
            </div>
        </Link>
    );
};

export default SingleLink;