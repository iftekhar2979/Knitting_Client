"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Globe, Factory, ArrowRight } from 'lucide-react';

const Feature = (props) => {
    const stats = [
        { icon: Award, value: "10+", label: "Years Experience", delay: 0.1 },
        { icon: Globe, value: "50+", label: "Clients Worldwide", delay: 0.2 },
        { icon: Factory, value: "1.2M", label: "Units Per Annum", delay: 0.3 },
    ];

    return (
        <section className="bg-white overflow-hidden">
            {/* Stats Bar */}
            <div className="bg-[#FAF9F6] border-y border-gray-100 py-12 lg:py-20">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: stat.delay, duration: 0.5 }}
                                className="flex flex-col items-center md:items-start group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-4xl lg:text-5xl font-black text-gray-900">{stat.value}</span>
                                </div>
                                <span className="text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-emerald-600 transition-colors">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Feature Content */}
            <div className="container mx-auto px-6 lg:px-8 py-24 lg:py-32">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Visual Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full relative"
                    >
                        <div className="absolute -inset-4 bg-emerald-50 rounded-[2.5rem] rotate-3 -z-10" />
                        <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[2rem] shadow-2xl border-8 border-white">
                            <img 
                                src="/assets/feature_texture.png" 
                                alt="Knitted Texture Craftsmanship" 
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-emerald-900/5 mix-blend-multiply" />
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-left"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            Expertise & Heritage
                        </span>
                        
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-[1.2] mb-10">
                            Crafting Excellence in <br/>
                            <span className="text-emerald-600">Every Single Stitch</span>
                        </h2>
                        
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                            <p>
                                Based at the heart of textile innovation in Gazipur, Tertiary Colour Knit Fabrics combines 
                                traditional craftsmanship with disruptive manufacturing technologies. 
                            </p>
                            <p className="font-medium text-gray-900">
                                We specialize in high-end knit garments that meet the rigorous 
                                standards of global fashion houses.
                            </p>
                        </div>

                        <div className="mt-12">
                            <Link 
                                href="/about"
                                className="group inline-flex items-center gap-6 text-emerald-600 font-black tracking-tight text-xl"
                            >
                                <span>Our Sustainability Charter</span>
                                <div className="w-12 h-12 rounded-full border-2 border-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white transition-all duration-300">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
};

export default Feature;