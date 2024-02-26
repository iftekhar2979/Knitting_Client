"use client"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
const Navbar = (props) => {
    return (

        <Menubar>
            <MenubarMenu className="hover:bg-gray-200 py-4">
                <MenubarTrigger>Details</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Yarn Details</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Delivery Details</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
};
export default Navbar;