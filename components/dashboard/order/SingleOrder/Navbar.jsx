"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    HiOutlineInformationCircle, 
    HiOutlineClipboardList, 
    HiOutlineCube, 
    HiOutlineTruck 
} from "react-icons/hi";

const orderRoutes = [
    {
        id: 401,
        routeName: "",
        value: "Order Info",
        icon: HiOutlineInformationCircle
    },
    {
        id: 402,
        routeName: "details",
        value: "Production",
        icon: HiOutlineClipboardList
    },
    {
        id: 403,
        routeName: "yarnDetails",
        value: "Yarn Hub",
        icon: HiOutlineCube
    },
    {
        id: 406,
        routeName: "delivery",
        value: "Logistics",
        icon: HiOutlineTruck
    },
];

const Navbar = ({ id }) => {
    const pathName = usePathname();
    const [selectedRoute, setSelectedRoute] = useState("");

    useEffect(() => {
        const segments = pathName.split("/");
        // Assuming path is /dashboard/order/[id]/[routeName]
        // If it's /dashboard/order/[id], segments[4] will be undefined
        setSelectedRoute(segments[4] || "");
    }, [pathName]);

    return (
        <nav className="w-full mb-6 mt-2">
            <div className="inline-flex flex-wrap items-center bg-gray-50/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-100 shadow-sm gap-1">
                {orderRoutes.map((item) => {
                    const isActive = item.routeName === selectedRoute;
                    const Icon = item.icon;
                    
                    return (
                        <Link 
                            key={item.id} 
                            href={`/dashboard/order/${id}${item.routeName ? `/${item.routeName}` : ""}`}
                            className={`
                                flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                                ${isActive 
                                    ? "bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-500/10 scale-[1.02]" 
                                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
                                }
                            `}
                        >
                            <Icon className={`text-lg transition-colors ${isActive ? "text-emerald-500" : "text-gray-400 group-hover:text-gray-600"}`} />
                            <span className="whitespace-nowrap">{item.value}</span>
                            {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;