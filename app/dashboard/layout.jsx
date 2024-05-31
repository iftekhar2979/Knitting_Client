import Navbar from "@/components/Navbar";
import SideBar from "@/components/dashboard/SideBar";

export default function Layout({ children }) {
  return (
    <>
    <Navbar bg={`nav-back`}></Navbar>
     <main className="flex">
    <SideBar></SideBar>
    <section className="w-full">
     {children}
    </section>
     </main>
   
    </>
    )
  }