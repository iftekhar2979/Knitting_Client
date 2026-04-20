"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  useForgotPasswordMutation, 
  useVerifyOtpMutation, 
  useResetPasswordMutation, 
  useResendOtpMutation 
} from "@/lib/features/user/userApiSlice";
import Error from "@/components/utils/Error";
import { FiEye, FiEyeOff, FiArrowLeft, FiMail, FiLock, FiCheckCircle, FiShield } from "react-icons/fi";
import OTPInput from "./OTPInput";

const ForgotPassword = () => {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset, 4: Success
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [resetToken, setResetToken] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cooldown, setCooldown] = useState(0);

    const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
    const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
    const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();
    const [resendOtp, { isLoading: isResendLoading }] = useResendOtpMutation();

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else router.push("/login");
    };

    const onForgotPassword = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            await forgotPassword({ email }).unwrap();
            setStep(2);
            setCooldown(60);
        } catch (err) {
            setErrorMessage(err.data?.message || "Failed to send OTP. Please check your email.");
        }
    };

    const onVerifyOtp = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const res = await verifyOtp({ email, otp }).unwrap();
            setResetToken(res.resetToken);
            setStep(3);
        } catch (err) {
            setErrorMessage(err.data?.message || "Invalid OTP. Please try again.");
        }
    };

    const onResendOtp = async () => {
        if (cooldown > 0) return;
        setErrorMessage("");
        try {
            await resendOtp({ email }).unwrap();
            setCooldown(60);
        } catch (err) {
            setErrorMessage(err.data?.message || "Failed to resend OTP.");
        }
    };

    const onResetPassword = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            await resetPassword({ resetToken, newPassword }).unwrap();
            setStep(4);
        } catch (err) {
            setErrorMessage(err.data?.message || "Failed to reset password.");
        }
    };

    const isGlobalLoading = isForgotLoading || isVerifyLoading || isResetLoading || isResendLoading;

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <div className="w-full sm:max-w-md p-8 mx-auto bg-white rounded-xl shadow-lg min-h-[450px] flex flex-col transition-all duration-300">
                <button 
                    onClick={handleBack} 
                    className="flex items-center text-gray-500 hover:text-red-600 transition-colors mb-6 text-sm font-medium"
                >
                    <FiArrowLeft className="mr-2" /> Back to Login
                </button>

                <div className="flex-grow relative">
                    {isGlobalLoading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex items-center justify-center rounded-lg">
                            <div className="flex space-x-1.5">
                                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Email Entry */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                            <p className="text-gray-500 mb-8 text-sm">Enter your email and we'll send you an OTP to reset your password.</p>
                            
                            <form onSubmit={onForgotPassword}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <FiMail />
                                        </div>
                                        <input 
                                            id="email" 
                                            type="email" 
                                            required 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isForgotLoading}
                                    className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
                                >
                                    {isForgotLoading ? "Sending..." : "Send Reset OTP"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl shadow-inner">
                                    <FiShield />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Verify OTP</h2>
                            <p className="text-gray-500 text-center mb-8 text-sm">
                                We've sent a 6-digit code to <br />
                                <span className="font-semibold text-gray-800">{email}</span>.
                            </p>
                            
                            <form onSubmit={onVerifyOtp}>
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-4 text-center" htmlFor="otp">Enter Verification Code</label>
                                    <OTPInput 
                                        value={otp} 
                                        onChange={setOtp} 
                                        error={errorMessage && errorMessage.includes("OTP")} 
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isVerifyLoading || otp.length < 6}
                                    className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
                                >
                                    {isVerifyLoading ? "Verifying..." : "Verify & Continue"}
                                </button>
                                
                                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                                    <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
                                    <button 
                                        type="button" 
                                        onClick={onResendOtp}
                                        disabled={cooldown > 0 || isResendLoading}
                                        className="text-red-600 font-bold hover:text-red-700 transition-colors disabled:text-gray-400 flex items-center justify-center w-full"
                                    >
                                        {isResendLoading ? (
                                            "Sending..."
                                        ) : cooldown > 0 ? (
                                            <span className="flex items-center justify-center">
                                                Resend OTP in <span className="ml-1 text-red-700 font-mono tracking-tighter w-8 text-center">{cooldown}s</span>
                                            </span>
                                        ) : (
                                            "Resend OTP"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 3: Password Reset */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                            <p className="text-gray-500 mb-8 text-sm">Create a new, strong password for your account.</p>
                            
                            <form onSubmit={onResetPassword}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="new-password">New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <FiLock />
                                        </div>
                                        <input 
                                            id="new-password" 
                                            type={showPassword ? "text" : "password"} 
                                            required 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isResetLoading || newPassword.length < 6}
                                    className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
                                >
                                    {isResetLoading ? "Resetting..." : "Update Password"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Step 4: Success Confirmation */}
                    {step === 4 && (
                        <div className="text-center animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl shadow-inner">
                                    <FiCheckCircle />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">All Set!</h2>
                            <p className="text-gray-500 mb-8 text-sm">Your password has been reset successfully. You can now log in with your new credentials.</p>
                            
                            <button 
                                onClick={() => router.push("/login")}
                                className="w-full py-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center group"
                            >
                                Continue to Login
                                <FiArrowLeft className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                {errorMessage && (
                    <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        <Error data={errorMessage} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
