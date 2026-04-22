"use client"
import SideBar from "@/components/dashboard/SideBar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import { setDashboardMenu, setSidebarVisibility } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export default function Layout({ children }) {
  const dispatch=useAppDispatch()
  const { isSidebarOpenOnDashboard } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setSidebarVisibility(true));
    return () => {
      dispatch(setDashboardMenu());
    };
  }, [dispatch]);
  return (
    <>
      <main className="flex">
        {isSidebarOpenOnDashboard && <SideBar></SideBar>}
        <section className="flex-1 flex flex-col min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
          <TopNavbar />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </section>
      </main>

    </>
  )
}