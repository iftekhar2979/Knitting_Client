'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FaBuildingColumns } from "react-icons/fa6";
import { BsBuildingAdd } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import { CiViewList, CiDeliveryTruck, CiViewTable } from "react-icons/ci";
import { IoAnalyticsOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BiCreditCard } from "react-icons/bi";
import SingleLink from './Product/SingleLink';
import dashboard from '@/app/dashboard/page';
import { useAppSelector } from '@/lib/hooks';

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

const SideBar = () => {
    const pathName = usePathname();
    const [selectedRoute, setSelectedRoute] = useState();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { userInfo } = useAppSelector((state) => state.user);
    const sidebarRef = useRef(null);

    useEffect(() => {
        let currentRoute=pathName.split("/")[2]
        setSelectedRoute(currentRoute);
       
    }, [pathName]);
    return (
        <div ref={sidebarRef} className={`flex flex-col h-screen   hidden md:block bg-white dark:bg-gray-900 ${isSidebarOpen ? "w-44 pl-8" : "w-32 pl-4"}`}>
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6">
                    <div className="space-y-3">
                        <label className={`px-3 text-xs text-black uppercase font-bold dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Analytics</label>
                        <Link href={`/dashboard`}>
                            <div  className={`flex my-1 items-center px-3 py-2 text-gray-500 transition-colors ${!selectedRoute && "bg-purple-700 text-white rounded-md"} duration-300 transform rounded-lg dark:text-gray-200 hover:bg-purple-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-white`}>
                                <MdDashboardCustomize />
                                {isSidebarOpen && <span className="mx-2 text-sm font-medium">Dashboard</span>}
                            </div>
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <label className={`px-3 text-xs text-black font-bold uppercase dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Company</label>
                        {companySection.map((item) => (
                            <SingleLink key={item.id} item={item} selectedRoute={selectedRoute}  isSidebarOpen={isSidebarOpen} />
                        ))}
                    </div>
                    <div className="space-y-3">
                        <label className={`px-3 text-xs text-black uppercase font-bold dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Product</label>
                        {productSection.map((item) => (
                            <SingleLink key={item.id} item={item} selectedRoute={selectedRoute}  isSidebarOpen={isSidebarOpen} />
                        ))}
                    </div>
                    <div className="space-y-3">
                        <label className={`px-3 text-xs text-black uppercase font-bold dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Orders</label>
                        {orderSection.map((item) => (
                            <SingleLink key={item.id} item={item} selectedRoute={selectedRoute}  isSidebarOpen={isSidebarOpen} />
                        ))}
                    </div>
                    {userInfo?.data?.isAdmin &&
                        <div className="space-y-3">
                            <label className={`px-3 text-xs text-black uppercase font-bold dark:text-gray-400 ${!isSidebarOpen && "hidden"}`}>Invoice</label>
                            {billSection.map((item) => (
                                <SingleLink key={item.id} item={item} selectedRoute={selectedRoute}  isSidebarOpen={isSidebarOpen} />
                            ))}
                        </div>
                    }
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
