"use client"

import Link from "next/link";

const SingleLink = ({ item, selectedRoute, isSidebarOpen }) => {
    return (
        <Link href={`/dashboard/${item.routeName}`}>
            <div className={`flex my-1 items-center px-3 py-2 text-gray-500 transition-colors ${selectedRoute === item.routeName && "bg-purple-700 text-white rounded-md"} duration-300 transform rounded-lg dark:text-gray-200 hover:bg-purple-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-white`}>
                {item.icon}
                {isSidebarOpen && <span className="mx-2 text-sm font-medium">{item.value}</span>}
            </div>
        </Link>
    );
};

export default SingleLink;