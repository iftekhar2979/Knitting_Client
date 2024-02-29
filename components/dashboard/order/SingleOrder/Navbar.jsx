"use client"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";
import { useRouter } from "next/router";
const Navbar = ({id}) => {

    return (

        <Menubar>
           <Link href={`/dashboard/order/${id}`}><MenubarMenu className="hover:bg-gray-200 py-4">
            <MenubarTrigger>Order Information</MenubarTrigger>
            </MenubarMenu></Link>
             <Link href={`/dashboard/order/${id}/details`}><MenubarMenu className="hover:bg-gray-200 py-4">
            <MenubarTrigger>Details</MenubarTrigger>
            </MenubarMenu></Link>
            <Link href={`/dashboard/order/${id}/yarnDetails`}> <MenubarMenu>
                <MenubarTrigger>Yarn Details</MenubarTrigger>
            </MenubarMenu></Link>
            <MenubarMenu>
                <MenubarTrigger>Delivery Details</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
};
export default Navbar;