"use client";
import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, Factory, Zap, ShieldCheck, Truck, HeadphonesIcon, Settings, Microscope, Globe } from "lucide-react";

const Services = () => {
    const services = [
        { icon: Settings, title: "Custom Design Service", desc: "Tailored textile solutions from concept to creation." },
        { icon: Microscope, title: "Pattern Development", desc: "Precision engineering for complex knit structures." },
        { icon: Zap, title: "Yarn Sourcing", desc: "Global network for premium sustainable fibers." },
        { icon: ShieldCheck, title: "Sample Knitting", desc: "Rapid prototyping with industrial accuracy." },
        { icon: Factory, title: "Bulk Production", desc: "Large-scale 100% export oriented manufacturing." },
        { icon: CheckCircle2, title: "Finishing Services", desc: "Expert treatment for superior hand-feel." },
        { icon: Globe, title: "Packaging & Branding", desc: "Retail-ready solutions for global markets." },
        { icon: Truck, title: "Logistics Support", desc: "Seamless international shipping coordination." },
        { icon: HeadphonesIcon, title: "After-Sales Support", desc: "Dedicated technical assistance for partners." }
    ];

    return (
        <section className="py-24 lg:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Content Side */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl"
                        >
                            <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">End-to-End Solutions</span>
                            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-tight">
                                Integrated Manufacturing <br/>
                                <span className="text-emerald-600">Excellence</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                                From initial concept to global distribution, we provide a comprehensive suite of services 
                                engineered to support the world's most demanding fashion brands.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-emerald-50 transition-colors group"
                                    >
                                        <div className="mt-1 w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                                            <service.icon className="w-4 h-4 text-emerald-700 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{service.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{service.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-full blur-[100px] -z-10 opacity-60" />
                        
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-emerald-600/5 rounded-[3rem] -rotate-3 scale-95 group-hover:rotate-0 transition-transform duration-700" />
                            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
                                <img 
                                    src="https://i.postimg.cc/65FY4XMJ/yellow-maching.png" 
                                    alt="Advanced Knitting Machinery" 
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />
                            </div>

                            {/* Floating Quality Tag */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-emerald-50 max-w-[200px]">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Quality Control</p>
                                <p className="text-sm font-bold text-gray-900">4-Point Inspection System on every roll.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Services;