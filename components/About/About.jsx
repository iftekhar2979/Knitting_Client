"use client";
import { motion } from 'framer-motion';
import { Target, Award, Users, ChevronRight } from 'lucide-react';

const About = (props) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative overflow-hidden bg-white dark:bg-gray-950 py-16 md:py-24">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                                Our Legacy
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                Crafting Excellence in <span className="text-emerald-600">Modern Knitting</span>
                            </h2>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                            With decades of expertise, we blend traditional craftsmanship with cutting-edge technology to deliver superior textile solutions. Our commitment to sustainability and precision defines every thread we produce.
                        </motion.p>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { icon: Target, title: "Precision", sub: "Micro-accuracy" },
                                { icon: Award, title: "Quality", sub: "ISO Certified" },
                                { icon: Users, title: "Ethics", sub: "Fair Trade" }
                            ].map((feature, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{feature.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">{feature.sub}</p>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <button className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none active:scale-95 leading-none">
                                Discover Our Story
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Decorative background for image */}
                        <div className="absolute -inset-4 bg-emerald-100 dark:bg-emerald-900/20 rounded-[2.5rem] -rotate-3" />
                        
                        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                            <img
                                alt="Modern Knitting Factory"
                                src="/about-hero.png"
                                className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                            />
                            
                            {/* Floating Stats */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex justify-between items-center">
                                <div>
                                    <p className="text-3xl font-black text-emerald-600">25+</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Years Experience</p>
                                </div>
                                <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
                                <div>
                                    <p className="text-3xl font-black text-emerald-600">500+</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Clients</p>
                                </div>
                                <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
                                <div>
                                    <p className="text-3xl font-black text-emerald-600">99%</p>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Quality Success</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
export default About;