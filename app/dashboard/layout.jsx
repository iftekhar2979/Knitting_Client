"use client"
import SideBar from "@/components/dashboard/SideBar";
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
        <section className="w-full min-h-screen">
          {children}
        </section>
      </main>

    </>
  )
}