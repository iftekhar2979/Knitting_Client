'use client'
import React from 'react';
import { 
    HiOutlineSearch, 
    HiOutlineBell, 
    HiOutlineLogout,
    HiOutlineMenuAlt2
} from "react-icons/hi";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { removeCredentials, setSidebarVisibility } from '@/lib/features/user/userSlice';
import { useLogoutMutation } from '@/lib/features/user/userApiSlice';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopNavbar = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { userInfo, isSidebarOpenOnDashboard } = useAppSelector((state) => state.user);
    const [logout] = useLogoutMutation();

    const handleLogOut = () => {
        logout().then(() => {
            dispatch(removeCredentials());
            router.push('/');
        });
    };

    const toggleSidebar = () => {
        dispatch(setSidebarVisibility(!isSidebarOpenOnDashboard));
    };

    const userName = userInfo?.data?.name || "Guest User";
    const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);

    return (
        <header id="main-nav" className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 sm:px-6 print:hidden">
            <div className="flex items-center gap-4 flex-1">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden" 
                    onClick={toggleSidebar}
                >
                    <HiOutlineMenuAlt2 size={20} />
                </Button>
                
                <div className="relative w-full max-w-md hidden md:block">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                        placeholder="Search for orders, products..." 
                        className="pl-10 bg-gray-50/50 border-none focus-visible:ring-emerald-500/20 rounded-xl"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                    <HiOutlineBell size={22} />
                    <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </Button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-gray-800">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[13px] font-bold text-gray-900 dark:text-white leading-none">{userName}</span>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">
                            {userInfo?.data?.isAdmin ? "Admin" : "User"}
                        </span>
                    </div>
                    
                    <Avatar className="h-9 w-9 ring-2 ring-emerald-50 border-white">
                        <AvatarImage src={null} />
                        <AvatarFallback className="bg-emerald-600 text-white font-bold text-xs">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>

                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleLogOut}
                        className="text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all ml-1"
                        title="Sign Out"
                    >
                        <HiOutlineLogout size={20} />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
