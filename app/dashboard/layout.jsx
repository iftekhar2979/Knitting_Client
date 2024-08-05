"use client"
import Navbar from "@/components/Navbar";
import SideBar from "@/components/dashboard/SideBar";
import { setDashboardMenu } from "@/lib/features/user/userSlice";
import { useAppSelector ,useAppDispatch} from "@/lib/hooks";
import { useEffect } from "react";

export default function Layout({ children }) {
  const dispatch=useAppDispatch()
  const { isSidebarOpenOnDashboard } = useAppSelector((state) => state.user);

  useEffect(() => {
    return () => {
      // This function will be called when the component unmounts
      dispatch(setDashboardMenu());
    };
  }, [dispatch]);
  return (
    <>
      <Navbar bg={`nav-back`}></Navbar>
      <main className="flex">
        {isSidebarOpenOnDashboard && <SideBar></SideBar>}
        <section className="w-full">
          {children}
        </section>
      </main>

    </>
  )
}