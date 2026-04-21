"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const collections = [
    {
        title: "Premium T-Shirts",
        description: "100% Organic Pima Cotton",
        image: "/assets/tshirt_collection.png",
        span: "md:col-span-2",
        delay: 0.1
    },
    {
        title: "Heritage Polos",
        description: "Interlock & Piqué Weaves",
        image: "/assets/polo_collection.png",
        span: "md:col-span-1",
        delay: 0.2
    },
    {
        title: "Urban Hoodies",
        description: "Heavyweight Brushed Fleece",
        image: "/assets/hoodie_collection.png",
        span: "md:col-span-1",
        delay: 0.3
    },
    {
        title: "Fine Sweaters",
        description: "Merino & Cashmere Blends",
        image: "/assets/sweater_collection.png",
        span: "md:col-span-2",
        delay: 0.4
    }
];

const Collections = () => {
    return (
        <section className="bg-[#FAF9F6] py-24 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Portfolio</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Core Manufacturing Range</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Precision manufacturing for the essentials of modern global wardrobes.
                        </p>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {collections.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.5 }}
                            className={`relative overflow-hidden rounded-[2rem] group cursor-pointer shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 h-[350px] lg:h-[500px] ${item.span}`}
                        >
                            {/* Image Background */}
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                            
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full flex justify-between items-end">
                                <div>
                                    <h3 className="text-3xl font-black text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest">{item.description}</p>
                                    
                                    {/* Hover Indicator */}
                                    <div className="mt-6 h-1 w-0 bg-emerald-500 group-hover:w-24 transition-all duration-500 rounded-full"></div>
                                </div>
                                
                                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>

                            {/* Link Mask */}
                            <Link href={`/portfolio`} className="absolute inset-0 z-10">
                                <span className="sr-only">View {item.title}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collections;