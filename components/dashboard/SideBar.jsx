'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FaBuildingColumns } from "react-icons/fa6";
import { BsBuildingAdd } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import { CiViewList, CiDeliveryTruck, CiViewTable } from "react-icons/ci";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BiCreditCard } from "react-icons/bi";
import SingleLink from './Product/SingleLink';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { removeCredentials, setSidebarOnDesboard } from '@/lib/features/user/userSlice';
import { useLogoutMutation } from '@/lib/features/user/userApiSlice';
import { FiX } from 'react-icons/fi';

const companySection = [
    { id: 510, routeName: "addCompany", value: "Add Company", icon: <BsBuildingAdd /> },
    { id: 511, routeName: "company", value: "Company List", icon: <FaBuildingColumns /> }
];
const orderSection = [
    { id: 512, routeName: "addOrder", value: "Add Order", icon: <IoDocumentSharp /> },
    { id: 513, routeName: "order", value: "Order List", icon: <CiViewList /> },
    { id: 514, routeName: "deliveryList", value: "Delivery List", icon: <CiDeliveryTruck /> }
];
const billSection = [
    { id: 515, routeName: "createInvoices", value: "Create Invoice", icon: <BiCreditCard /> },
    { id: 516, routeName: "performaInvoices", value: "Bills", icon: <LiaFileInvoiceDollarSolid /> },
    // { id: 517, routeName: "bills", value: "Bills", icon: <RiBillLine /> }
];
const productSection = [
    // { id: 518, routeName: "analytics", value: "Analytics", icon: <IoAnalyticsOutline /> },
    { id: 519, routeName: "product", value: "Products", icon: <CiViewList /> }
];
const dashboardSection = [
    { id: 520, routeName: "dashboard", value: "Dashboard", icon: <MdDashboardCustomize /> }
];

import { motion } from 'framer-motion';

const SideBar = () => {
    const pathName = usePathname();
    const router = useRouter()
    const [selectedRoute, setSelectedRoute] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { userInfo, isSidebarOpenOnDashboard } = useAppSelector((state) => state.user);

    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()

    const handleLogOut = () => {
        logout().then(res => {
            dispatch(removeCredentials())
            router.push('/')
        })
    }
    useEffect(() => {
        let currentRoute = pathName.split("/")[2]
        setSelectedRoute(currentRoute);
    }, [pathName, handleLogOut]);

    const handleCloseSidebar = () => {
        dispatch(setSidebarOnDesboard(isSidebarOpenOnDashboard));
    }


    return (
        <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`flex flex-col h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-100 sm:pl-6 relative`}
        >
            <div className="flex flex-col justify-between flex-1 mt-6">
                <div className="absolute right-4 top-2 sm:hidden">
                    <FiX size={24} className="cursor-pointer text-gray-500" onClick={handleCloseSidebar} />
                </div>
                <nav className=" space-y-2">
                    <div className="space-y-3">
                        <label className={`px-3 text-xs text-inactive uppercase font-bold dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Analytics</label>
                        <Link href={`/dashboard`}>
                            <div className={`flex my-1 items-center px-3 py-2 text-gray-500 transition-colors ${!selectedRoute && "bg-active-color text-white rounded-md"} duration-300 transform rounded-lg dark:text-gray-200 hover:bg-purple-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-white`}>
                                <MdDashboardCustomize />
                                {isSidebarOpen && <span className="mx-2 text-sm font-medium">Dashboard</span>}
                            </div>
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <label className={`px-3 text-xs text-inactive font-bold uppercase dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Company</label>
                        {companySection.map((item) => (
                            <SingleLink key={item.id} item={item} selectedRoute={selectedRoute} isSidebarOpen={isSidebarOpen} />
                        ))}
                    </div>
                    <div className="space-y-3">
                        <label className={`px-3 text-xs text-inactive uppercase font-bold dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Product</label>
                        {productSection.map((item) => (
                            <SingleLink key={item.id} item={item} selectedRoute={selectedRoute} isSidebarOpen={isSidebarOpen} />
                        ))}
                    </div>
                    <div className="space-y-3">
                        <label className={`px-3 text-xs text-inactive uppercase font-bold dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Orders</label>
                        {orderSection.map((item) => (
                            <SingleLink key={item.id} item={item} selectedRoute={selectedRoute} isSidebarOpen={isSidebarOpen} />
                        ))}
                    </div>
                    {userInfo?.data?.isAdmin &&
                        <div className="space-y-3">
                            <label className={`px-3 text-xs text-inactive uppercase font-bold dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Invoice</label>
                            {billSection.map((item) => (
                                <SingleLink key={item.id} item={item} selectedRoute={selectedRoute} isSidebarOpen={isSidebarOpen} />
                            ))}
                        </div>
                    }
                    {
                        userInfo ? <Button onClick={handleLogOut} className="bg-active-color w-full mt-4">Log Out</Button> : ""
                    }
                </nav>
            </div>
        </motion.div>
    );
};

export default SideBar;
