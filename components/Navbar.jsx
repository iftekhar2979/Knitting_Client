'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   

    return (
        <nav className="bg-white border-gray-200  dark:bg-gray-900  relative">
            <div className="container flex flex-wrap justify-between items-center mx-auto shadow-sm py-4">
                <a href="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Tertiary Colour Knit Fabrics</span>
                </a>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
                    aria-expanded={isMenuOpen}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                {/* Mobile Menu */}
                <div
                    className={`${isMenuOpen ? 'block' : 'hidden'
                        } absolute top-full left-0 right-0 z-10 p-5 bg-white shadow-md lg:hidden border`}
                    style={{ animation: isMenuOpen ? 'slideDown 0.5s ease-out' : '' }}
                >
                    <ul className="flex flex-col items-center justify-center space-y-2 text-black border">
                        <li><Link href="/"  className="text-black hover:text-purple-700 cursor-pointer">Home</Link></li>
                         <li><Link href="/service" className="text-black hover:text-purple-700 cursor-pointer ">Services</Link></li>
                        <li><Link href="/about" className="text-black hover:text-purple-700 cursor-pointer">About</Link></li>
                         <li><Link href="/contact"  className="text-black hover:text-purple-700 cursor-pointer">Contact</Link></li>
                        <li><Link href="/dashboard" className="text-black hover:text-purple-700 cursor-pointer">Dashboard</Link></li>
                    </ul>
                </div>
                {/* Desktop Menu */}
                <div className="hidden lg:block ">
                    <ul className="flex flex-row items-center justify-center py-2 space-x-8 text-black ">
                    <li><Link href="/"  className="text-black hover:text-purple-700 cursor-pointer">Home</Link></li>
                         <li><Link href="/service" className="text-black hover:text-purple-700 cursor-pointer ">Services</Link></li>
                        <li><Link href="/about" className="text-black hover:text-purple-700 cursor-pointer">About</Link></li>
                         <li><Link href="/contact"  className="text-black hover:text-purple-700 cursor-pointer">Contact</Link></li>
                        <li><Link href="/dashboard" className="text-black hover:text-purple-700 cursor-pointer">Dashboard</Link></li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
