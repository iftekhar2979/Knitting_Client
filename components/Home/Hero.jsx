"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { Button } from '../ui/button';

const Hero = (props) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] pt-16 pb-24 lg:pt-32 lg:pb-52">
      {/* Animated background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-left z-10"
          >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">
                    Industry Leaders in Textiles
                </span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-8">
              Premium Knitwear <br/>
              <span className="text-emerald-600 italic">Manufacturing</span> <br/>
              for Global Brands
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed">
              High-quality, sustainable, and scalable garment solutions 
              engineered with industrial precision and tactile elegance. 
              100% export-oriented production from Gazipur.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-emerald-200 transition-all active:scale-95 flex gap-2">
                    Get a Quote
                    <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-gray-200 hover:bg-white hover:border-emerald-600 hover:text-emerald-600 font-bold h-14 px-10 rounded-2xl transition-all active:scale-95">
                    Our Heritage
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-12 flex items-center gap-8 grayscale opacity-50 overflow-hidden"
            >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">Trusted by industry giants</p>
                <div className="h-px w-12 bg-gray-200" />
                <div className="flex gap-6 italic font-black text-gray-400 text-xl">
                    <span>ISO 9001</span>
                    <span>OEKO-TEX</span>
                </div>
            </motion.div>
          </motion.div>

          {/* Right Visual (Circular Mask) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
                {/* Decorative rings */}
                <div className="absolute inset-[-20px] border border-emerald-100 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-[-40px] border border-emerald-50/50 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                
                <div className="relative w-full h-full overflow-hidden rounded-[3rem] rotate-3 shadow-2xl border-4 border-white">
                    <img 
                        src="/assets/hero_banner.png" 
                        alt="Premium Knitwear Textures" 
                        className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Floating Experience Card */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-6 -right-6 md:right-0 bg-white p-6 rounded-3xl shadow-2xl border border-emerald-50 z-20"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
                            <Play className="fill-current w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900 leading-none">25+</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Years Experience</p>
                        </div>
                    </div>
                </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
};

export default Hero;