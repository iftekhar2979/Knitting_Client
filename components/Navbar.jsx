'use client'
import { useGetUserByIdQuery, useLogoutMutation } from '@/lib/features/user/userApiSlice';
import { removeCredentials, setCredentials, setSidebarOnDesboard } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import '../app/globals.css';
import Notifications from './ui/Notifications';

const Navbar = ({ bg }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [sidebar, setSidebar] = useState(false)
    const { userInfo, path, notify, isSidebarOpenOnDashboard } = useAppSelector((state) => state.user);
    const { data: userInformation, isLoading } = useGetUserByIdQuery()
    const [logout] = useLogoutMutation();
    const router = useRouter();

    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const isDashboard = pathName.startsWith('/dashboard');
    const [selectedRoute, setSelectedRoute] = useState()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    // Filter paths based on requirements
    const filteredPath = isDashboard
        ? path?.filter(item => !['service', 'about', 'contact', 'dashboard'].includes(item))
        : path;

    // Determine if the links menu (desktop/mobile) should be shown
    // We remove the menu button (hamburger) entirely if on dashboard
    const showLinksMenu = !isDashboard;

    useEffect(() => {
        setLoading(true);
        if (userInformation) {
            dispatch(setCredentials(userInformation));
            setUser(userInformation.data.name);
            setLoading(false);
        }
    }, [userInformation, isMenuOpen]);

    useEffect(() => {
        let pathIndex = path.indexOf(pathName.split("/")[1])
        setSelectedRoute(pathName.split('/')[1])
    }, [pathName])

    const handleSideBar = () => {
        dispatch(setSidebarOnDesboard(isSidebarOpenOnDashboard))
    }

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(removeCredentials());
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
            dispatch(removeCredentials());
            router.push('/');
        }
    };
    return (

        <nav className={`${bg} relative bg-white border-b border-gray-100 py-4`} id="main-nav">
            <div className="container flex flex-wrap justify-between items-center mx-auto px-4 lg:px-8">
                <div className='flex items-center gap-4'>
                    {/* {isDashboard && (
                        <div className="mr-2">
                            {!isSidebarOpenOnDashboard ?
                                <IoMenu size={24} color='black' className='cursor-pointer' onClick={handleSideBar} />
                                :
                                <FiX size={24} color='black' className='cursor-pointer' onClick={handleSideBar} />
                            }
                        </div>
                    )} */}
                    <Link href={"/"} className="flex items-center">
                        <span className="text-2xl font-bold tracking-tight text-brand-green">Tertiary Knit</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className={`${showLinksMenu ? 'lg:block' : 'hidden'} hidden absolute left-1/2 -translate-x-1/2`}>
                    <ul className="flex flex-row items-center space-x-8 text-sm font-medium">
                        {filteredPath?.map((item, i) => {
                            const label = item.charAt(0).toUpperCase() + item.slice(1);
                            return (
                                <li key={i}>
                                    <Link
                                        href={`/${item}`}
                                        className={`transition-colors duration-200 hover:text-brand-green ${selectedRoute === item ? "text-brand-green border-b-2 border-brand-green pb-1" : "text-gray-500"}`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="flex items-center gap-4">
                    {userInfo ? (
                        <div className="flex items-center gap-3">
                            <Notifications user={userInfo?.data?.id} />
                            {!isDashboard && (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-brand-green transition-colors"
                                    >
                                        <FiUser className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        !isDashboard && (
                            <Link
                                href="/login"
                                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-brand-green transition-colors mr-2"
                            >
                                <FiUser className="w-4 h-4" />
                                Login
                            </Link>
                        )
                    )}
                    {!isDashboard && (
                        <Link
                            href="/contact"
                            className="hidden md:block bg-brand-green text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-brand-accent transition-all duration-300 shadow-sm"
                        >
                            Request Quote
                        </Link>
                    )}
                    {showLinksMenu && (
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 transition-colors"
                            aria-expanded={isMenuOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    )}
                </div>

                {/* Mobile Menu */}
                {showLinksMenu && (
                    <div
                        className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 z-50 p-6 bg-white shadow-xl lg:hidden border-t animate-in fade-in slide-in-from-top-4 duration-300`}
                    >
                        <ul className="flex flex-col space-y-4">
                            {filteredPath?.map((item, i) => (
                                <li key={i}>
                                    <Link
                                        href={`/${item}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2 text-lg font-medium text-gray-700 hover:text-brand-green transition-colors"
                                    >
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </Link>
                                </li>
                            ))}
                            {!isDashboard && (
                                userInfo ? (
                                    <>
                                        <li>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center gap-2 py-2 text-lg font-medium text-gray-700 hover:text-brand-green transition-colors"
                                            >
                                                <FiUser /> Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    handleLogout();
                                                }}
                                                className="flex items-center gap-2 py-2 text-lg font-medium text-red-500 hover:text-red-600 transition-colors"
                                            >
                                                <FiLogOut /> Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-2 py-2 text-lg font-medium text-gray-700 hover:text-brand-green transition-colors"
                                        >
                                            <FiUser /> Login
                                        </Link>
                                    </li>
                                )
                            )}
                            {!isDashboard && (
                                <li>
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block w-full text-center bg-brand-green text-white py-3 rounded-lg font-semibold mt-2"
                                    >
                                        Request Quote
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
