"use client"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const orderRoutes = [
    {
        id:401,
        routeName: "",
        value: "Order Information"
    },
    {
        id:402,
        routeName: "details",
        value: "Detail"
    },
    {
        id:403,
        routeName: "yarnDetails",
        value: "Yarn"
    },
    {
        id:404,
        routeName: "delivery",
        value: "Delivery"
    },

]
const Navbar = ({ id }) => {
    const pathName = usePathname()
    const [selectedRoute, setSelectedRoute] = useState()

    useEffect(() => {
        setSelectedRoute(pathName.split("/")[4])
    }, [pathName])
   
    return (

        <Menubar>
            {
                orderRoutes?.map(item => {
                    if(item.routeName === ""){
                        return (
                            <Link href={`/dashboard/order/${id}`} key={item.id} className={`hover:bg-gray-200 hover:text-black  ${!selectedRoute && "bg-gray-200 text-black"} `}><MenubarMenu >
                            <MenubarTrigger>{item.value}</MenubarTrigger>
                        </MenubarMenu></Link>
                        )
                    }
                    return (
                        <Link href={`/dashboard/order/${id}/${item.routeName}`} key={item.id} className={`hover:bg-gray-200 hover:text-black  ${item.routeName === selectedRoute && "bg-gray-200 text-black"}`}><MenubarMenu >
                            <MenubarTrigger>{item.value}</MenubarTrigger>
                        </MenubarMenu></Link>
                    )
                })
            }

            {/* <Link href={`/dashboard/order/${id}/details`} className={`hover:bg-gray-200 hover:text-black py-4`}><MenubarMenu >
                <MenubarTrigger>Details</MenubarTrigger>
            </MenubarMenu></Link>
            <Link href={`/dashboard/order/${id}/yarnDetails`} className={`hover:bg-gray-200 hover:text-black py-4`}> <MenubarMenu >
                <MenubarTrigger>Yarn Details</MenubarTrigger>
            </MenubarMenu></Link>
            <MenubarMenu className={`hover:bg-purple-700 py-4`}>
                <MenubarTrigger>Delivery Details</MenubarTrigger>
            </MenubarMenu> */}
        </Menubar>
    )
};
export default Navbar;