"use client"

import Link from "next/link";

const SingleLink = ({ item, selectedRoute, isSidebarOpen }) => {
    return (
        <Link href={`/dashboard/${item.routeName}`}>
            <div className={`flex my-1 items-center  px-3 py-2  transition-colors ${selectedRoute === item.routeName ? "bg-active-color text-white rounded-md" :"bg-link-color "} duration-300 transform rounded-lg `}>
                {item.icon}
                {isSidebarOpen && <span className="mx-2 text-sm font-medium">{item.value}</span>}
            </div>
        </Link>
    );
};

export default SingleLink;