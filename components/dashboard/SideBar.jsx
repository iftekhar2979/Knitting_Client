'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBuildingColumns } from "react-icons/fa6";
import { BsBuildingAdd } from "react-icons/bs";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import { IoAnalyticsOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BiCreditCard } from "react-icons/bi";
const companySection = [
    {

        routeName: "addCompany",
        value: "Add Company",
        icon:<BsBuildingAdd />
    },
    {
        routeName: "company",
        value: "Company List",
        icon:<FaBuildingColumns />
    }
]
const orderSection = [
    {

        routeName: "addOrder",
        value: "Add Order",
        icon:<IoDocumentSharp />
    },
    {
        routeName: "order",
        value: "Order List",
        icon:<CiViewList/>
    },
    {
        routeName: "deliveryList",
        value: "Delivery List",
        icon:<CiDeliveryTruck/>
    }
]
const billSection = [
    {

        routeName: "createInvoices",
        value: "Create Invoice",
        icon:<BiCreditCard />
    },
    {
        routeName: "pi",
        value: "Performa Invoices",
        icon:<LiaFileInvoiceDollarSolid/>
    },
    {
        routeName: "bills",
        value: "Bills",
        icon:<RiBillLine/>
    }
]
const productSection = [
    {
        routeName: "analytics",
        value: "Analytics",
        icon:<IoAnalyticsOutline/>
    },
    {

        routeName: "product",
        value: "Products",
        icon:<CiViewList/>
    },

]
const dashboardSection = [
    {
        routeName: "dashboard",
        value: "Dashboard",
        icon:<MdDashboardCustomize/>
    },


]


const SideBar = (props) => {
    const pathName = usePathname()
    const [selectedRoute, setSelectedRoute] = useState()

    useEffect(() => {
        setSelectedRoute(pathName.split("/")[2])
    }, [pathName])
  

    return (
        <divside className="flex flex-col w-44  h-screen pl-8 hidden  md:block  bg-white  dark:bg-gray-900">
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-black uppercase font-bold dark:text-gray-400">analytics</label>
                        {
                            dashboardSection?.map((item, index) => {
                                return (
                                    <Link href={`/dashboard`}> <div className={`flex my-1 items-center px-3 py-2 text-gray-500 transition-colors ${selectedRoute === item.routeName && "bg-purple-700 text-white rouded-md"} duration-300 transform rounded-lg dark:text-gray-200 hover:bg-purple-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-white`} >
                                      {item.icon}
                                        <span className="mx-2 text-sm font-medium">{item.value}</span>
                                    </div></Link>
                                )
                            })
                        }

                    </div>
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-black font-bold uppercase dark:text-gray-400">Company</label>
                        {
                            companySection?.map((item, index) => {
                                return (
                                    <Link href={`/dashboard/${item.routeName}`}> <div className={`flex my-1 items-center px-3 py-2 text-gray-500 transition-colors ${selectedRoute === item.routeName && "bg-purple-700 text-white rouded-md"} duration-300 transform rounded-lg dark:text-gray-200 hover:bg-purple-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-white`} >
                                          {item.icon}
                                        <span className="mx-2 text-sm font-medium">{item.value}</span>
                                    </div></Link>
                                )
                            })
                        }
                    </div>
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-black uppercase font-bold dark:text-gray-400">Product</label>
                        {
                            productSection?.map((item, index) => {
                                return (
                                    <Link href={`/dashboard/${item.routeName}`}> <div className={`flex my-1 items-center px-3 py-2 text-gray-500 transition-colors ${selectedRoute === item.routeName && "bg-purple-700 text-white rouded-md"} duration-300 transform rounded-lg dark:text-gray-200 hover:bg-purple-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-white`} >
                                       {item.icon}
                                        <span className="mx-2 text-sm font-medium">{item.value}</span>
                                    </div></Link>
                                )
                            })
                        }
                    </div>
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-black uppercase font-bold dark:text-gray-400">Orders</label>
                        {
                            orderSection?.map((item, index) => {
                                return (
                                    <Link href={`/dashboard/${item.routeName}`}> <div className={`flex my-1 items-center px-3 py-2 text-gray-500 transition-colors ${selectedRoute === item.routeName && "bg-purple-700 text-white rouded-md"} duration-300 transform rounded-lg dark:text-gray-200 hover:bg-purple-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-white`} >
                                          {item.icon}
                                        <span className="mx-2 text-sm font-medium">{item.value}</span>
                                    </div></Link>
                                )
                            })
                        }

                    </div>

                    <div className="space-y-3 ">
                        <label className="px-3 text-xs text-black uppercase font-bold dark:text-gray-400">Invoice</label>
                        
                        {
                            billSection?.map((item, index) => {
                                return (
                                    <Link href={`/dashboard/${item.routeName}`}> <div className={`flex my-1 items-center px-3 py-2 text-gray-500 transition-colors ${selectedRoute === item.routeName && "bg-purple-700 text-white rouded-md"} duration-300 transform rounded-lg dark:text-gray-200 hover:bg-purple-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-white`} >
                                          {item.icon}
                                        <span className="mx-2 text-sm font-medium">{item.value}</span>
                                    </div></Link>
                                )
                            })
                        }
                        
                    </div>
                </nav>
            </div>
        </divside>
    )
};
export default SideBar;