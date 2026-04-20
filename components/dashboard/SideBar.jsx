'use client'
import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    HiOutlineHome, 
    HiOutlineOfficeBuilding, 
    HiOutlinePlusCircle, 
    HiOutlineDocumentAdd, 
    HiOutlineClipboardList, 
    HiOutlineTruck, 
    HiOutlineCreditCard, 
    HiOutlineCurrencyDollar, 
    HiOutlineCube,
    HiOutlineLogout,
    HiOutlineLightningBolt,
    HiX
} from "react-icons/hi";
import SingleLink from './Product/SingleLink';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { removeCredentials, setSidebarOnDesboard } from '@/lib/features/user/userSlice';
import { useLogoutMutation } from '@/lib/features/user/userApiSlice';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const companySection = [
    { id: 510, routeName: "addCompany", value: "Add Company", icon: <HiOutlinePlusCircle /> },
    { id: 511, routeName: "company", value: "Company List", icon: <HiOutlineOfficeBuilding /> }
];
const orderSection = [
    { id: 512, routeName: "addOrder", value: "Add Order", icon: <HiOutlineDocumentAdd /> },
    { id: 513, routeName: "order", value: "Order List", icon: <HiOutlineClipboardList /> },
    { id: 514, routeName: "deliveryList", value: "Delivery List", icon: <HiOutlineTruck /> }
];
const billSection = [
    { id: 515, routeName: "createInvoices", value: "Create Invoice", icon: <HiOutlineCreditCard /> },
    { id: 516, routeName: "performaInvoices", value: "Statements", icon: <HiOutlineCurrencyDollar /> }
];
const productSection = [
    { id: 519, routeName: "product", value: "Products", icon: <HiOutlineCube /> }
];

const SideBar = () => {
    const pathName = usePathname();
    const router = useRouter()
    const [selectedRoute, setSelectedRoute] = useState("");
    const { userInfo, isSidebarOpenOnDashboard } = useAppSelector((state) => state.user);

    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()

    const handleLogOut = () => {
        logout().then(() => {
            dispatch(removeCredentials())
            router.push('/')
        })
    }

    useEffect(() => {
        const currentRoute = pathName.split("/")[2] || "dashboard";
        setSelectedRoute(currentRoute);
    }, [pathName]);

    const handleCloseSidebar = () => {
        dispatch(setSidebarOnDesboard(isSidebarOpenOnDashboard));
    }

    const userName = userInfo?.data?.name || "Guest User";
    const userRole = userInfo?.data?.isAdmin ? "Administrator" : "User";
    const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);

    return (
        <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col h-screen w-64 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 shadow-sm relative z-50 overflow-hidden"
            id="side-nav"
        >
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-6 py-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <HiOutlineLightningBolt size={24} />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-lg font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                        TERTIARY <span className="text-emerald-600">KNIT</span>
                    </h1>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Industrial ERP</span>
                </div>
                <button className="sm:hidden ml-auto p-1.5 hover:bg-gray-100 rounded-lg text-gray-500" onClick={handleCloseSidebar}>
                    <HiX size={20} />
                </button>
            </div>

            {/* Navigation Sections */}
            <div className="flex-1 px-4 py-4 space-y-8 overflow-y-auto no-scrollbar scroll-smooth">
                {/* Dashboard Section */}
                <div className="space-y-1">
                    <label className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">General</label>
                    <Link href="/dashboard" className="group block">
                        <div className={`
                            flex items-center px-4 py-2.5 transition-all duration-300 rounded-xl
                            ${selectedRoute === "dashboard" 
                                ? "bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-500/10 font-bold" 
                                : "text-gray-500 hover:text-emerald-500 hover:bg-emerald-50/50"
                            }
                        `}>
                            <HiOutlineHome className={`text-xl ${selectedRoute === "dashboard" ? "text-emerald-500" : "text-gray-400 group-hover:text-emerald-500"}`} />
                            <span className="mx-3 text-[13px] font-semibold tracking-tight">Overview</span>
                        </div>
                    </Link>
                </div>

                {/* Company Section */}
                <div className="space-y-1">
                    <label className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Organization</label>
                    {companySection.map((item) => (
                        <SingleLink key={item.id} item={item} selectedRoute={selectedRoute} isSidebarOpen={true} />
                    ))}
                </div>

                {/* Order Section */}
                <div className="space-y-1">
                    <label className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Operations</label>
                    {orderSection.map((item) => (
                        <SingleLink key={item.id} item={item} selectedRoute={selectedRoute} isSidebarOpen={true} />
                    ))}
                </div>

                {/* Bill Section (Admin Only) */}
                {userInfo?.data?.isAdmin && (
                    <div className="space-y-1">
                        <label className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Finance</label>
                        {billSection.map((item) => (
                            <SingleLink key={item.id} item={item} selectedRoute={selectedRoute} isSidebarOpen={true} />
                        ))}
                    </div>
                )}

                {/* Product Section */}
                <div className="space-y-1">
                    <label className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Inventory</label>
                    {productSection.map((item) => (
                        <SingleLink key={item.id} item={item} selectedRoute={selectedRoute} isSidebarOpen={true} />
                    ))}
                </div>
            </div>

            {/* User Profile Hook */}
            <div className="px-4 py-6 border-t border-gray-50 bg-gray-50/30">
                <div className="flex items-center gap-3 p-2 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100">
                    <Avatar className="h-10 w-10 ring-2 ring-emerald-50 border-white">
                        <AvatarImage src={null} />
                        <AvatarFallback className="bg-emerald-600 text-white font-bold text-xs">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-bold text-gray-900 truncate">{userName}</span>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider leading-none mt-0.5">{userRole}</span>
                    </div>
                    <button 
                        onClick={handleLogOut}
                        className="ml-auto p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        title="Sign Out"
                    >
                        <HiOutlineLogout size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default SideBar;
