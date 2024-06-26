'use client'
import dashboard from '@/app/dashboard/page';
import Link from 'next/link';
import { usePathname, useRouter, } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import '../app/globals.css'
import { useGetUserByIdQuery, useLogoutMutation } from '@/lib/features/user/userApiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { removeCredentials, setCredentials } from '@/lib/features/user/userSlice';
import { Button } from './ui/button';

const Navbar = ({bg}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userInfo ,path} = useAppSelector((state) => state.user);
    const { data: userInformation, isLoading } = useGetUserByIdQuery()
    // const [path,setPath]=useState(['about', 'service', 'contact', 'login'])
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const router=useRouter()
    const [selectedRoute, setSelectedRoute] = useState()

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        setLoading(true)
        if (userInformation) {
            dispatch(setCredentials(userInformation))
            setUser(userInformation.data.name)
            setLoading(false)
        }

    }, [userInformation])
    useEffect(() => {
        let pathIndex = path.indexOf(pathName.split("/")[1])
        setSelectedRoute(pathName.split('/')[1])
    }, [pathName])

const handleLogOut=()=>{
        logout().then(res => {
          dispatch(removeCredentials())
          router.push('/')
        })
}
// console.log(selectedRoute)
    return (

        <nav className={`${bg} relative`}>
            <div className="container flex flex-wrap justify-between items-center mx-auto shadow-sm py-4">
                <Link href={"/"} className="flex items-center">
                    {/* <Image src={tertiary} alt='Tertiary Color Knit '/> */}
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-white">Tertiary Colour Knit Fabrics</span>
                </Link>
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
                        <li ><Link href={`/`} className={`text-black hover:px-2 hover:text-white hover:bg-purple-700 cursor-pointer py-4 ${!selectedRoute && "text-white border-b"}`}>HOME</Link></li>
                        {path?.map((item, i) => {
                            return (
                                <li key={i}><Link href={`/${item}`} className={`text-black hover:px-2 hover:text-white hover:bg-purple-700 cursor-pointer py-4 ${selectedRoute === item && "text-white"}`}>{item.toUpperCase()}</Link></li>
                            )
                        })}
                      
                    </ul>
                </div>
                {/* Desktop Menu */}
                <div className="hidden lg:block ">
                    <ul className="flex flex-row items-center justify-center py-2 space-x-4 text-white ">
                        <li ><Link href={`/`} className={` hover:px-2 hover:text-white hover:border-b cursor-pointer py-4 ${!selectedRoute && "text-white border-b"}`}>HOME</Link></li>
                        {path?.map((item, i) => {
                            return (
                                <li key={i}><Link href={`/${item}`} className={` hover:px-2 hover:text-white hover:border-b cursor-pointer py-4 ${selectedRoute === item && "text-white border-b"}`}>{item.toUpperCase()}</Link></li>
                            )
                        })}
                        { 
                        userInfo ? <Button onClick={handleLogOut}>Log Out</Button> : ""
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
