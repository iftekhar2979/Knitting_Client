"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, 
    Info, 
    Briefcase, 
    Phone, 
    LayoutDashboard, 
    Menu, 
    X,
    User,
    ArrowRight
} from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { Button } from './ui/button';

const Navbar = () => {
    const pathname = usePathname();
    const { userInfo } = useAppSelector((state) => state.user);
    const [isScrolled, setIsScrolled] = useState(false);
    const isDashboard = pathname.startsWith('/dashboard');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'About', href: '/about', icon: Info },
        { name: 'Services', href: '/service', icon: Briefcase },
        { name: 'Contact', href: '/contact', icon: Phone },
    ];

    // Don't show this main navbar inside the dashboard if you prefer the dedicated dashboard sidebar
    // However, the user asked for a global navbar. For now, I'll keep the logic but style it beautifully.

    return (
        <>
            {/* Desktop Navbar - Top Sticky */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
                isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-100 py-3' : 'bg-transparent py-6'
            }`}>
                <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                    <Link href="/" className="flex items-center group">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white mr-3 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            <span className="font-black text-xl">T</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900 leading-none">
                            TERTIARY <span className="text-emerald-600">KNIT</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-10">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-emerald-600 relative group ${
                                            pathname === link.href ? 'text-emerald-600' : 'text-gray-500'
                                        }`}
                                    >
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                                            pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`} />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="h-6 w-px bg-gray-200 mx-2" />

                        {userInfo ? (
                            <Link href="/dashboard">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold px-6 h-11 shadow-lg shadow-emerald-200 flex gap-2">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-gray-600 font-bold hover:text-emerald-600 hover:bg-emerald-50 rounded-xl">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold px-6 h-11 shadow-lg shadow-emerald-200 flex gap-2 group">
                                        Request Quote
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Header (Logo Only) */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-50 py-4 px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white mr-2">
                        <span className="font-black">T</span>
                    </div>
                    <span className="text-lg font-black tracking-tight text-gray-900">
                        TERTIARY <span className="text-emerald-600">KNIT</span>
                    </span>
                </Link>
                {userInfo && (
                    <Link href="/dashboard">
                         <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                            <User className="w-4 h-4" />
                        </div>
                    </Link>
                )}
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 p-2 flex justify-around items-center">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                className="relative flex flex-col items-center p-3 transition-all active:scale-90"
                            >
                                <motion.div
                                    animate={isActive ? { scale: 1.1, color: '#10b981' } : { scale: 1, color: '#9ca3af' }}
                                    className="z-10"
                                >
                                    <link.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                </motion.div>
                                
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-emerald-500/10 rounded-2xl"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className={`text-[10px] mt-1 font-bold ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                    
                    {!userInfo && (
                        <Link href="/login" className="flex flex-col items-center p-3">
                            <User size={22} className="text-gray-400" />
                            <span className="text-[10px] mt-1 font-bold text-gray-500">Account</span>
                        </Link>
                    )}
                    
                    {userInfo && (
                        <Link href="/dashboard" className={`relative flex flex-col items-center p-3 ${isDashboard ? 'text-emerald-400' : 'text-gray-500'}`}>
                            <LayoutDashboard size={22} />
                            <span className="text-[10px] mt-1 font-bold">Panel</span>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;