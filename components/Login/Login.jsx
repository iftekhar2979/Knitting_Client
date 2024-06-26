"use client"

import Error from "@/components/utils/Error";
import { useLoginMutation } from "@/lib/features/user/userApiSlice";
import { setCredentials } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import cookieCutter from 'cookie-cutter'

const Login = (props) => {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error,setError]=useState("")
  const [login, { isLoading,isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter()

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await login({ email, password: pass }).unwrap();
        dispatch(setCredentials({ ...res }));
        router.push('/');
      } catch (err) {
        setError(err.message);
      }
 

  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email-Address</label>
            <input id="email" type="text" name="email" onChange={(e) => setEmail(e.target.value)} className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Password</label>
            <input id="password" type="password" name="password" onChange={(e) => setPass(e.target.value)} className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" type="checkbox" className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
            </div>
            <a href="#" className="text-sm"> Forgot your password? </a>
          </div>
          {isError && <Error data={"Invalid User Information"}/> }
          <div className="mt-6">
            <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"> Sign In</button>
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="underline">Sign up for an account</a>
          </div>
        </form>
      </div>
    </div>
  )
};
export default Login;