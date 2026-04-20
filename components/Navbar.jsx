'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { 
    HiOutlineLogout, 
    HiOutlineUser, 
    HiOutlineSearch, 
    HiOutlineBell, 
    HiOutlineChevronRight,
    HiOutlineMenuAlt2,
    HiX
} from 'react-icons/hi';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useGetUserByIdQuery, useLogoutMutation } from '@/lib/features/user/userApiSlice';
import { removeCredentials, setCredentials, setSidebarOnDesboard } from '@/lib/features/user/userSlice';
import Notifications from './ui/Notifications';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

const Navbar = ({ bg }) => {
    const { userInfo, isSidebarOpenOnDashboard } = useAppSelector((state) => state.user);
    const { data: userInformation } = useGetUserByIdQuery();
    const [logout] = useLogoutMutation();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const pathName = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isDashboard = pathName.startsWith('/dashboard');

    useEffect(() => {
        if (userInformation) {
            dispatch(setCredentials(userInformation));
        }
    }, [userInformation]);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(removeCredentials());
            router.push('/');
        } catch (error) {
            dispatch(removeCredentials());
            router.push('/');
        }
    };

    const handleSidebarToggle = () => {
        dispatch(setSidebarOnDesboard(isSidebarOpenOnDashboard));
    };

    // Breadcrumb Logic
    const breadcrumbs = useMemo(() => {
        if (!isDashboard) return [];
        const paths = pathName.split('/').filter(p => p !== "");
        return paths.map((p, i) => {
            const url = `/${paths.slice(0, i + 1).join('/')}`;
            let label = p.charAt(0).toUpperCase() + p.slice(1);
            if (p === "dashboard") label = "Home";
            if (p.length > 20) label = "Detail"; // For IDs
            return { label, url, isLast: i === paths.length - 1 };
        });
    }, [pathName, isDashboard]);

    // --- Dashboard Header View ---
    if (isDashboard) {
        return (
            <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    {/* Sidebar Toggle for Mobile */}
                    <button 
                        onClick={handleSidebarToggle}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 sm:mr-2"
                    >
                        <HiOutlineMenuAlt2 size={22} />
                    </button>

                    {/* Breadcrumbs */}
                    <nav className="hidden sm:flex items-center gap-2 text-sm">
                        {breadcrumbs.map((bc, i) => (
                            <React.Fragment key={bc.url}>
                                {i > 0 && <HiOutlineChevronRight className="text-gray-300" size={14} />}
                                <Link 
                                    href={bc.url}
                                    className={`font-semibold transition-colors ${bc.isLast ? "text-emerald-700" : "text-gray-400 hover:text-gray-600"}`}
                                >
                                    {bc.label}
                                </Link>
                            </React.Fragment>
                        ))}
                    </nav>
                </div>

                {/* Dashboard Center - Search (UI Placeholder) */}
                <div className="hidden lg:flex flex-1 max-w-md mx-8 relative group">
                    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <Input 
                        placeholder="Global Search (Ctrl+K)"
                        className="w-full pl-10 h-10 bg-gray-50 border-none rounded-xl focus-visible:ring-emerald-500/20 focus-visible:ring-2 transition-all placeholder:text-gray-400 placeholder:font-medium text-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 rounded border border-gray-200 text-[10px] font-bold text-gray-400 bg-white shadow-sm">⌘</kbd>
                        <kbd className="px-1.5 py-0.5 rounded border border-gray-200 text-[10px] font-bold text-gray-400 bg-white shadow-sm">K</kbd>
                    </div>
                </div>

                {/* Global Actions */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Notifications user={userInfo?.data?.id} />
                        <Badge className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center bg-rose-500 text-[9px] font-black border-2 border-white">
                            3
                        </Badge>
                    </div>
                    
                    <div className="h-4 w-[1px] bg-gray-100 mx-1 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                            <HiOutlineUser size={20} />
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="p-2 hover:bg-rose-50 rounded-lg text-gray-400 hover:text-rose-500 transition-all"
                            title="Sign Out"
                        >
                            <HiOutlineLogout size={20} />
                        </button>
                    </div>
                </div>
            </header>
        );
    }

    // --- Public Navbar View ---
    return (
        <nav className={`${bg} relative bg-white border-b border-gray-100 py-4`} id="main-nav">
            <div className="container flex flex-wrap justify-between items-center mx-auto px-4 lg:px-8">
                <div className='flex items-center gap-4'>
                    <Link href={"/"} className="flex items-center group">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white mr-3 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            T
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900 leading-none">
                            TERTIARY <span className="text-emerald-600">KNIT</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Public Menu */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                    <ul className="flex flex-row items-center space-x-10 text-sm font-bold uppercase tracking-widest text-gray-500">
                        <li><Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link></li>
                        <li><Link href="/about" className="hover:text-emerald-600 transition-colors">About</Link></li>
                        <li><Link href="/service" className="hover:text-emerald-600 transition-colors">Services</Link></li>
                        <li><Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div className="flex items-center gap-4">
                    {userInfo ? (
                        <Link href="/dashboard">
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 px-6 rounded-xl shadow-lg shadow-emerald-500/20">
                                Go to Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2">
                             <Link href="/login">
                                <Button variant="ghost" className="font-bold text-gray-500 hover:text-emerald-600 hover:bg-emerald-50">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 px-6 rounded-xl shadow-lg shadow-emerald-500/20">
                                    Request Quote
                                </Button>
                            </Link>
                        </div>
                    )}
                    
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 transition-colors"
                    >
                        {isMenuOpen ? <HiX size={24} /> : <HiOutlineMenuAlt2 size={24} />}
                    </button>
                </div>

                {/* Mobile Public Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 p-6 bg-white shadow-xl lg:hidden border-t animate-in fade-in slide-in-from-top-4 duration-300">
                        <ul className="flex flex-col space-y-6">
                            <li><Link href="/" className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2 block">Home</Link></li>
                            <li><Link href="/about" className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2 block">About</Link></li>
                            <li><Link href="/service" className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2 block">Services</Link></li>
                            <li><Link href="/contact" className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2 block">Contact</Link></li>
                            {userInfo ? (
                                <li><Link href="/dashboard" className="text-lg font-bold text-emerald-600">Enter Dashboard</Link></li>
                            ) : (
                                <li><Link href="/login" className="text-lg font-bold text-emerald-600">Account Login</Link></li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
