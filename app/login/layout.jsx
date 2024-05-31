import Navbar from "@/components/Navbar";
import SideBar from "@/components/dashboard/SideBar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar bg={`nav-back`}></Navbar>
                {children}       
        </>
    )
}