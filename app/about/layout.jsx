import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
    return (
      <>
       <main className="">
      <Navbar bg={'nav-back'}/>
      <section className="w-full">
       {children}
      </section>
       </main>
     
      </>
      )
    }