import SideBar from "@/components/dashboard/SideBar";

export default function Layout({ children }) {
  return (
    <>
     <main className="flex">
    <SideBar></SideBar>
    <section className="pl-8 w-full py-4">
     {children}
    </section>
     </main>
   
    </>
    )
  }