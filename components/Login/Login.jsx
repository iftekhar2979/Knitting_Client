"use client"

import Error from "@/components/utils/Error";
import { useLoginMutation } from "@/lib/features/user/userApiSlice";
import { setCredentials } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import cookieCutter from 'cookie-cutter'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

const Login = (props) => {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login({ email, password: pass }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push('/');
    } catch (err) {
      setError(err?.data?.message || err.message || "Invalid credentials");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#fafbfc] dark:bg-gray-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Abstract Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/40 dark:bg-emerald-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/40 dark:bg-emerald-900/10 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-emerald-100/50 dark:shadow-none border border-emerald-50 dark:border-gray-800 p-8 md:p-10 relative z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4 group transition-transform hover:scale-110">
              <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Enter your credentials to access the console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2" htmlFor="email">
                <Mail className="w-4 h-4 text-emerald-500" /> Email Address
              </label>
              <div className="relative group">
                <input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full h-12 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl transition-all outline-none text-gray-900 dark:text-white placeholder:text-gray-400" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2" htmlFor="password">
                  <Lock className="w-4 h-4 text-emerald-500" /> Password
                </label>
                <Link href="/forgot-password" size="sm" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"> 
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  onChange={(e) => setPass(e.target.value)} 
                  className="w-full h-12 px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl transition-all outline-none text-gray-900 dark:text-white pr-12 placeholder:text-gray-400" 
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center ml-1">
              <input 
                id="remember_me" 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 transition-all cursor-pointer" 
              />
              <label htmlFor="remember_me" className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"> 
                Keep me logged in 
              </label>
            </div>

            {isError && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 p-3 rounded-xl flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center shrink-0">
                  !
                </div>
                {error || "Invalid user information. Please try again."}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              New here?{" "}
              <a href="#" className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-all">
                Create an account
              </a>
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] font-bold">
          © {new Date().getFullYear()} Knitting Company Console
        </p>
      </motion.div>
    </div>
  )
};
export default Login;